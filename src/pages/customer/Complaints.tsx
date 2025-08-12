
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ComplaintForm from '@/components/shared/ComplaintForm';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, ShoppingBag, MessageSquare, Bell } from 'lucide-react';

const CustomerComplaints = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/customer/dashboard' },
    { label: 'Marketplace', icon: <ShoppingBag className="h-5 w-5" />, href: '/customer/marketplace' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/customer/complaints' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/customer/notifications' },
  ];

  return (
    <DashboardLayout role="customer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Submit a Complaint</h1>
          <p className="text-muted-foreground">
            Let us know about any issues or concerns with your purchased products
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <div className="max-w-2xl mx-auto">
        <ComplaintForm role="customer" />
      </div>
    </DashboardLayout>
  );
};

export default CustomerComplaints;
