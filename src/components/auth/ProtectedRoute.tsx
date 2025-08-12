
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, userData, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-agri-green-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has the required role
  if (allowedRoles.length > 0 && userData) {
    if (!allowedRoles.includes(userData.role)) {
      // Redirect to unauthorized page or dashboard if role doesn't match
      return <Navigate to={`/${userData.role}/dashboard`} replace />;
    }
  }

  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute;
