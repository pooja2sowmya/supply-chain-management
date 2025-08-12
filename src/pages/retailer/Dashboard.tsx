
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProductManagement from '@/components/retailer/ProductManagement';
import ComplaintForm from '@/components/complaints/ComplaintForm';
import NotificationsPanel from '@/components/notifications/NotificationsPanel';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ShoppingCart, Package, DollarSign, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const RetailerDashboard = () => {
  const { userData } = useAuth();

  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/retailer/dashboard' },
    { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/retailer/orders' },
    { label: 'Products', icon: <Package className="h-5 w-5" />, href: '/retailer/products' },
    { label: 'Payments', icon: <DollarSign className="h-5 w-5" />, href: '/retailer/payments' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/retailer/complaint' },
  ];

  return (
    <DashboardLayout role="retailer" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Retailer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userData?.name || 'Retailer'}! Manage your inventory and sales
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +8 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ProductManagement />
          <NotificationsPanel />
        </div>
        <ComplaintForm />
      </div>
    </DashboardLayout>
  );
};

export default RetailerDashboard;
