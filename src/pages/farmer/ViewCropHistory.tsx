
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CropInventoryTable from '@/components/farmer/CropInventoryTable';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, Sprout, Search, MessageSquare, Bell } from 'lucide-react';

const ViewCropHistory = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/farmer/dashboard' },
    { label: 'Add New Crop', icon: <Sprout className="h-5 w-5" />, href: '/farmer/add-crop' },
    { label: 'Search Crops', icon: <Search className="h-5 w-5" />, href: '/farmer/crop-history' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/farmer/complaint' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/farmer/notifications' },
  ];

  return (
    <DashboardLayout role="farmer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Search Crops</h1>
          <p className="text-muted-foreground">
            Search and view your crop history in the blockchain-based supply chain
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <CropInventoryTable />
    </DashboardLayout>
  );
};

export default ViewCropHistory;
