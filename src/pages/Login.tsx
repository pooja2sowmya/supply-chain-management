
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agri-green-50 to-agri-brown-50 p-4">
      <div className="max-w-md w-full">
        <LoginForm />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-agri-green-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
