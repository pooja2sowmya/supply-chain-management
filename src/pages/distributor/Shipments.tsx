
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ShipmentTable from '@/components/distributor/ShipmentTable';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Home, Truck, CheckSquare, Map, MessageSquare, Bell } from 'lucide-react';

const Shipments = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/distributor/dashboard' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/distributor/shipments', notification: 3 },
    { label: 'Verify Products', icon: <CheckSquare className="h-5 w-5" />, href: '/distributor/verify' },
    { label: 'Route Tracker', icon: <Map className="h-5 w-5" />, href: '/distributor/routes' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/distributor/complaint' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/distributor/notifications' },
  ];

  return (
    <DashboardLayout role="distributor" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shipments</h1>
          <p className="text-muted-foreground">
            Manage and track your product shipments in the supply chain
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <ShipmentTable />
    </DashboardLayout>
  );
};

export default Shipments;
