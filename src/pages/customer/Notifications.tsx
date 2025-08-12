
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NotificationsPanel from '@/components/shared/NotificationsPanel';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, ShoppingBag, MessageSquare, Bell } from 'lucide-react';

const CustomerNotifications = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/customer/dashboard' },
    { label: 'Marketplace', icon: <ShoppingBag className="h-5 w-5" />, href: '/customer/marketplace' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/customer/complaints' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/customer/notifications', notification: 2 },
  ];

  return (
    <DashboardLayout role="customer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest information about your purchases
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <div className="max-w-3xl mx-auto">
        <NotificationsPanel role="customer" />
      </div>
    </DashboardLayout>
  );
};

export default CustomerNotifications;
