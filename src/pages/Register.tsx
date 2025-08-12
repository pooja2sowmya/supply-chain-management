
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Shield, Truck, Store, Sprout, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Define the role type based on the Supabase enum
type UserRole = Database['public']['Enums']['user_role'];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !role) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Insert user data into our users table
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            name,
            email,
            role: role as UserRole,
            region: region || null,
          });

        if (userError) throw userError;

        toast.success(`Successfully registered as ${role}`);
        
        // Automatically sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          // If auto sign-in fails, redirect to login
          navigate('/login');
        } else {
          // If auto sign-in succeeds, redirect to dashboard
          navigate(`/${role}/dashboard`);
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (userRole: string) => {
    switch (userRole) {
      case 'farmer':
        return <Sprout className="h-5 w-5" />;
      case 'distributor':
        return <Truck className="h-5 w-5" />;
      case 'retailer':
        return <Store className="h-5 w-5" />;
      case 'admin':
        return <Shield className="h-5 w-5" />;
      case 'customer':
        return <User className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agri-green-50 to-agri-brown-50 p-4">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
            <Sprout className="h-8 w-8 text-agri-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our blockchain-powered agricultural supply chain</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={role} 
              onValueChange={(value: UserRole) => setRole(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              placeholder="California"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                Registering...
              </span>
            ) : (
              <span className="flex items-center">
                {role && getRoleIcon(role)}
                <span className="ml-2">Register</span>
              </span>
            )}
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-agri-green-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
