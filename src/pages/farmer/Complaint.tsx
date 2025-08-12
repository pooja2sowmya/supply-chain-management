
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ComplaintForm from '@/components/shared/ComplaintForm';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, MessageSquare, Search, Bell, Sprout } from 'lucide-react';

const FarmerComplaint = () => {
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
          <h1 className="text-2xl font-bold tracking-tight">Submit a Complaint</h1>
          <p className="text-muted-foreground">
            Let us know about any issues or concerns you're experiencing
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <div className="max-w-2xl mx-auto">
        <ComplaintForm role="farmer" />
      </div>
    </DashboardLayout>
  );
};

export default FarmerComplaint;
