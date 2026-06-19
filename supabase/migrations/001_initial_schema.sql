-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'driver', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trucks table
CREATE TABLE IF NOT EXISTS public.trucks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('small', 'medium', 'large', 'xl')),
  capacity TEXT NOT NULL,
  price_per_mile DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_per_hour DECIMAL(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  location TEXT,
  features TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  truck_id UUID REFERENCES public.trucks(id) ON DELETE SET NULL,
  pickup_address TEXT NOT NULL,
  dropoff_address TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  distance DECIMAL(10,2) DEFAULT 0,
  estimated_hours INTEGER DEFAULT 1,
  total_price DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for trucks (public read)
CREATE POLICY "Trucks are viewable by everyone" 
  ON public.trucks FOR SELECT 
  TO authenticated, anon 
  USING (true);

CREATE POLICY "Only admins can modify trucks" 
  ON public.trucks FOR ALL 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" 
  ON public.bookings FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Drivers can view assigned bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'driver'));

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone" 
  ON public.reviews FOR SELECT 
  TO authenticated, anon 
  USING (true);

CREATE POLICY "Users can create own reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample trucks
INSERT INTO public.trucks (name, type, capacity, price_per_mile, price_per_hour, location, features, rating, reviews_count) VALUES
  ('Compact Van', 'small', '1-2 rooms', 1.50, 29, 'New York, NY', ARRAY['A/C', 'Bluetooth', 'Backup Camera'], 4.8, 124),
  ('Box Truck Medium', 'medium', '2-3 rooms', 2.00, 49, 'Brooklyn, NY', ARRAY['A/C', 'Lift Gate', 'GPS'], 4.9, 89),
  ('Large Box Truck', 'large', '3-5 rooms', 2.50, 79, 'Queens, NY', ARRAY['A/C', 'Lift Gate', 'GPS', 'Dolly Included'], 4.7, 56),
  ('XL Moving Truck', 'xl', '5+ rooms', 3.00, 119, 'Manhattan, NY', ARRAY['A/C', 'Lift Gate', 'GPS', 'Dolly', 'Ramps'], 4.9, 34),
  ('Cargo Van', 'small', 'Studio apt', 1.75, 35, 'Jersey City, NJ', ARRAY['A/C', 'Bluetooth'], 4.6, 201),
  ('Flatbed Truck', 'medium', 'Heavy items', 2.25, 55, 'Staten Island, NY', ARRAY['A/C', 'Winch', 'Tie-downs'], 4.8, 45);
