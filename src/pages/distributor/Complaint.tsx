
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ComplaintForm from '@/components/shared/ComplaintForm';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, Truck, CheckSquare, Map, MessageSquare, Bell } from 'lucide-react';

const DistributorComplaint = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/distributor/dashboard' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/distributor/shipments' },
    { label: 'Verify Products', icon: <CheckSquare className="h-5 w-5" />, href: '/distributor/verify' },
    { label: 'Route Tracker', icon: <Map className="h-5 w-5" />, href: '/distributor/routes' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/distributor/complaint' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/distributor/notifications' },
  ];

  return (
    <DashboardLayout role="distributor" sidebarItems={sidebarItems}>
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
        <ComplaintForm role="distributor" />
      </div>
    </DashboardLayout>
  );
};

export default DistributorComplaint;
