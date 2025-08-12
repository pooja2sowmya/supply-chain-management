
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NotificationsPanel from '@/components/shared/NotificationsPanel';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, Truck, CheckSquare, Map, MessageSquare, Bell } from 'lucide-react';

const DistributorNotifications = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/distributor/dashboard' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/distributor/shipments' },
    { label: 'Verify Products', icon: <CheckSquare className="h-5 w-5" />, href: '/distributor/verify' },
    { label: 'Route Tracker', icon: <Map className="h-5 w-5" />, href: '/distributor/routes' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/distributor/complaint' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/distributor/notifications', notification: 5 },
  ];

  return (
    <DashboardLayout role="distributor" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest information from the supply chain
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <div className="max-w-3xl mx-auto">
        <NotificationsPanel role="distributor" />
      </div>
    </DashboardLayout>
  );
};

export default DistributorNotifications;
