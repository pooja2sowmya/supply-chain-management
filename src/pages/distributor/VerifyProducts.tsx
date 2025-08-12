
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import VerifyProductsComponent from '@/components/distributor/VerifyProducts';
import { Home, Truck, QrCode, Map, MessageSquare } from 'lucide-react';

const VerifyProducts = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/distributor/dashboard' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/distributor/shipments' },
    { label: 'Verify Products', icon: <QrCode className="h-5 w-5" />, href: '/distributor/verify' },
    { label: 'Route Tracker', icon: <Map className="h-5 w-5" />, href: '/distributor/routes' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/distributor/complaint' },
  ];

  return (
    <DashboardLayout role="distributor" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Verify Products</h1>
        <p className="text-muted-foreground">
          Verify the authenticity of products using blockchain technology
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <VerifyProductsComponent />
      </div>
    </DashboardLayout>
  );
};

export default VerifyProducts;
