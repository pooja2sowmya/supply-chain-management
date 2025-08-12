
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ComplaintForm from '@/components/complaints/ComplaintForm';
import { Home, ShoppingCart, Package, DollarSign, MessageSquare } from 'lucide-react';

const RetailerComplaint = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/retailer/dashboard' },
    { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/retailer/orders' },
    { label: 'Products', icon: <Package className="h-5 w-5" />, href: '/retailer/products' },
    { label: 'Payments', icon: <DollarSign className="h-5 w-5" />, href: '/retailer/payments' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/retailer/complaint' },
  ];

  return (
    <DashboardLayout role="retailer" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Submit a Complaint</h1>
        <p className="text-muted-foreground">
          Let us know about any issues or concerns you're experiencing
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <ComplaintForm />
      </div>
    </DashboardLayout>
  );
};

export default RetailerComplaint;
