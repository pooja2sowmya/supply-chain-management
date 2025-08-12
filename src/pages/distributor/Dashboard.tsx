
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ShipmentManagement from '@/components/distributor/ShipmentManagement';
import QrScanner from '@/components/distributor/QrScanner';
import ComplaintForm from '@/components/complaints/ComplaintForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Truck, QrCode, Map, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DistributorDashboard = () => {
  const { userData } = useAuth();

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
        <h1 className="text-2xl font-bold tracking-tight">Distributor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userData?.name || 'Distributor'}! Manage shipments and verify products in the supply chain
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Shipments
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Transit
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Updated 3 hours ago
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19</div>
            <p className="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              -1 since yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ShipmentManagement />
          <ComplaintForm />
        </div>
        <QrScanner />
      </div>
    </DashboardLayout>
  );
};

export default DistributorDashboard;
