// LoginForm.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { Wallet, Sprout, Truck, Store, ShieldCheck, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Type alias for user roles from Supabase enum
type UserRole = Database['public']['Enums']['user_role'];

const LoginForm = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        if (userData) {
          const userRole = userData.role;
          toast.success(`Logged in as ${userRole}`);
          navigate(`/${userRole}/dashboard`);
        } else {
          toast.error('User role not found');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for MetaMask/Web3 login
  const handleMetaMaskLogin = () => {
    toast.info('MetaMask login functionality would connect to Web3 wallet');
  };

  // Returns an icon component based on user role
  const getRoleIcon = (userRole: UserRole) => {
    switch (userRole) {
      case 'farmer': return <Sprout className="h-4 w-4 mr-2" />;
      case 'distributor': return <Truck className="h-4 w-4 mr-2" />;
      case 'retailer': return <Store className="h-4 w-4 mr-2" />;
      case 'admin': return <ShieldCheck className="h-4 w-4 mr-2" />;
      case 'customer': return <User className="h-4 w-4 mr-2" />;
    }
  };

  // Main UI
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <Sprout className="h-8 w-8 text-agri-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">SCMA Login</h1>
        <p className="text-gray-600 mt-2">Blockchain-powered agricultural supply chain</p>
      </div>

      <Tabs defaultValue="farmer" onValueChange={(value) => setRole(value as UserRole)}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="farmer"><Sprout className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Farmer</span></TabsTrigger>
          <TabsTrigger value="distributor"><Truck className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Distributor</span></TabsTrigger>
          <TabsTrigger value="retailer"><Store className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Retailer</span></TabsTrigger>
          <TabsTrigger value="admin"><ShieldCheck className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Admin</span></TabsTrigger>
          <TabsTrigger value="customer"><User className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Customer</span></TabsTrigger>
        </TabsList>

        {['farmer', 'distributor', 'retailer', 'admin', 'customer'].map((roleType) => (
          <TabsContent key={roleType} value={roleType}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`${roleType}@example.com`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-agri-green-600 hover:underline">Forgot password?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-agri-green-600 hover:bg-agri-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    {getRoleIcon(role)}
                    Login as {roleType.charAt(0).toUpperCase() + roleType.slice(1)}
                  </span>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleMetaMaskLogin}
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect with MetaMask
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By logging in, you agree to our
                <a href="#" className="text-agri-green-600 hover:underline mx-1">Terms of Service</a>
                and
                <a href="#" className="text-agri-green-600 hover:underline mx-1">Privacy Policy</a>
              </p>
            </form>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LoginForm;
