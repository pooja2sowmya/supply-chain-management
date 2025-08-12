
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NotificationsPanel from '@/components/shared/NotificationsPanel';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, Sprout, Search, MessageSquare, Bell } from 'lucide-react';

const FarmerNotifications = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/farmer/dashboard' },
    { label: 'Add New Crop', icon: <Sprout className="h-5 w-5" />, href: '/farmer/add-crop' },
    { label: 'Search Crops', icon: <Search className="h-5 w-5" />, href: '/farmer/crop-history' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/farmer/complaint' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/farmer/notifications', notification: 3 },
  ];

  return (
    <DashboardLayout role="farmer" sidebarItems={sidebarItems}>
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
        <NotificationsPanel role="farmer" />
      </div>
    </DashboardLayout>
  );
};

export default FarmerNotifications;
