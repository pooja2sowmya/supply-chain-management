
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NotificationsPanel from '@/components/shared/NotificationsPanel';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, ShoppingCart, Package, CreditCard, MessageSquare, Bell } from 'lucide-react';

const RetailerNotifications = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/retailer/dashboard' },
    { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/retailer/orders' },
    { label: 'Products', icon: <Package className="h-5 w-5" />, href: '/retailer/products' },
    { label: 'Payments', icon: <CreditCard className="h-5 w-5" />, href: '/retailer/payments' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/retailer/complaint' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/retailer/notifications', notification: 3 },
  ];

  return (
    <DashboardLayout role="retailer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest information about your inventory and orders
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <div className="max-w-3xl mx-auto">
        <NotificationsPanel role="retailer" />
      </div>
    </DashboardLayout>
  );
};

export default RetailerNotifications;
