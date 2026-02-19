
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── PROFILES ─────────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('artisan','buyer','boutique','admin')),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ─── ARTISAN DETAILS ──────────────────────────────────────────────────────────
CREATE TABLE public.artisan_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_earnings NUMERIC(12,2) DEFAULT 0,
  pending_earnings NUMERIC(12,2) DEFAULT 0,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending','verified','rejected')),
  aadhaar_number TEXT,
  bank_account TEXT,
  upi_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.artisan_details ENABLE ROW LEVEL SECURITY;

-- ─── PRODUCTS ─────────────────────────────────────────────────────────────────
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artisan_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_hi TEXT,
  name_ur TEXT,
  description TEXT,
  description_hi TEXT,
  description_ur TEXT,
  stitch_type TEXT,
  fabric_type TEXT,
  time_taken_hours NUMERIC(6,2),
  material_cost NUMERIC(10,2),
  fair_min_price NUMERIC(10,2),
  suggested_price NUMERIC(10,2),
  selling_price NUMERIC(10,2),
  images JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  is_certified BOOLEAN DEFAULT false,
  authenticity_score NUMERIC(4,1),
  sold_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ─── ORDERS ───────────────────────────────────────────────────────────────────
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled','disputed')),
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  escrow_released BOOLEAN DEFAULT false,
  shipping_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ─── ORDER ITEMS ──────────────────────────────────────────────────────────────
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_purchase NUMERIC(10,2) NOT NULL,
  artisan_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ─── DISPUTES ─────────────────────────────────────────────────────────────────
CREATE TABLE public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id),
  reported_by UUID NOT NULL REFERENCES public.profiles(id),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','under_review','resolved','closed')),
  resolution TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;

-- ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_my_profile_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin');
$$;

-- ─── UPDATED_AT TRIGGER ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_artisan_details_updated_at BEFORE UPDATE ON public.artisan_details FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_disputes_updated_at BEFORE UPDATE ON public.disputes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── AUTO-CREATE PROFILE ON SIGNUP ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── RLS POLICIES: PROFILES ───────────────────────────────────────────────────
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "profiles_update_own_or_admin" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());

-- ─── RLS POLICIES: ARTISAN_DETAILS ────────────────────────────────────────────
CREATE POLICY "artisan_details_select" ON public.artisan_details
  FOR SELECT USING (
    profile_id = public.get_my_profile_id() OR public.is_admin()
  );

CREATE POLICY "artisan_details_insert_own" ON public.artisan_details
  FOR INSERT WITH CHECK (profile_id = public.get_my_profile_id());

CREATE POLICY "artisan_details_update_own_or_admin" ON public.artisan_details
  FOR UPDATE USING (profile_id = public.get_my_profile_id() OR public.is_admin());

-- ─── RLS POLICIES: PRODUCTS ───────────────────────────────────────────────────
CREATE POLICY "products_select_all_active" ON public.products
  FOR SELECT USING (is_active = true OR artisan_id = public.get_my_profile_id() OR public.is_admin());

CREATE POLICY "products_insert_own_artisan" ON public.products
  FOR INSERT WITH CHECK (artisan_id = public.get_my_profile_id() AND public.get_my_role() = 'artisan');

CREATE POLICY "products_update_own_artisan" ON public.products
  FOR UPDATE USING (artisan_id = public.get_my_profile_id() OR public.is_admin());

CREATE POLICY "products_delete_own_or_admin" ON public.products
  FOR DELETE USING (artisan_id = public.get_my_profile_id() OR public.is_admin());

-- ─── RLS POLICIES: ORDERS ─────────────────────────────────────────────────────
CREATE POLICY "orders_select_buyer_or_admin" ON public.orders
  FOR SELECT USING (buyer_id = public.get_my_profile_id() OR public.is_admin());

CREATE POLICY "orders_insert_buyer" ON public.orders
  FOR INSERT WITH CHECK (buyer_id = public.get_my_profile_id());

CREATE POLICY "orders_update_admin" ON public.orders
  FOR UPDATE USING (public.is_admin());

-- ─── RLS POLICIES: ORDER_ITEMS ────────────────────────────────────────────────
CREATE POLICY "order_items_select" ON public.order_items
  FOR SELECT USING (
    artisan_id = public.get_my_profile_id() OR
    order_id IN (SELECT id FROM public.orders WHERE buyer_id = public.get_my_profile_id()) OR
    public.is_admin()
  );

CREATE POLICY "order_items_insert" ON public.order_items
  FOR INSERT WITH CHECK (
    order_id IN (SELECT id FROM public.orders WHERE buyer_id = public.get_my_profile_id())
  );

-- ─── RLS POLICIES: DISPUTES ───────────────────────────────────────────────────
CREATE POLICY "disputes_select" ON public.disputes
  FOR SELECT USING (reported_by = public.get_my_profile_id() OR public.is_admin());

CREATE POLICY "disputes_insert" ON public.disputes
  FOR INSERT WITH CHECK (reported_by = public.get_my_profile_id());

CREATE POLICY "disputes_update" ON public.disputes
  FOR UPDATE USING (reported_by = public.get_my_profile_id() OR public.is_admin());

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_products_artisan_id ON public.products(artisan_id);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_orders_buyer_id ON public.orders(buyer_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_artisan_details_profile_id ON public.artisan_details(profile_id);
