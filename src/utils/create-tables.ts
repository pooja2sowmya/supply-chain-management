
// This file contains the SQL commands to create the necessary tables in Supabase
// Run these commands in the Supabase SQL editor to create the tables

/*
-- Create complaints table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role user_role NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  target_role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES public.crops(id) NOT NULL,
  retailer_id UUID REFERENCES auth.users(id) NOT NULL,
  price NUMERIC NOT NULL,
  stock NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for complaints table
CREATE POLICY "Users can create complaints" ON public.complaints
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can view their own complaints" ON public.complaints
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Admins can view all complaints" ON public.complaints
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin'));
  
-- Create RLS policies for notifications table
CREATE POLICY "Users can view notifications targeted to their role" ON public.notifications
  FOR SELECT USING (
    target_role = (SELECT role FROM public.users WHERE id = auth.uid()) 
    OR target_role = 'all'
  );
  
CREATE POLICY "Admins can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- Create RLS policies for products table
CREATE POLICY "Retailers can create products" ON public.products
  FOR INSERT WITH CHECK (
    auth.uid() = retailer_id AND
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'retailer')
  );
  
CREATE POLICY "Retailers can update their own products" ON public.products
  FOR UPDATE USING (
    auth.uid() = retailer_id AND
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'retailer')
  );
  
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);
  
-- Create a trigger to automatically update the updated_at field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
*/
