
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Truck, FileCheck, Map, Package, BarChart } from 'lucide-react';

const DistributorHome = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/distributor/dashboard' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/distributor/shipments', notification: 3 },
    { label: 'Verify Products', icon: <FileCheck className="h-5 w-5" />, href: '/distributor/verify' },
    { label: 'Route Tracker', icon: <Map className="h-5 w-5" />, href: '/distributor/routes' },
  ];

  return (
    <DashboardLayout role="distributor" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Distributor Dashboard</h1>
        <p className="text-muted-foreground">
          Summary of your distribution operations and supply chain activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Delivery</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Products</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficient Routes</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8% optimization</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Shipment Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center justify-center bg-gray-100 rounded">
              <BarChart className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Shipment chart goes here</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'SH-1234', product: 'Corn', quantity: '500 kg', status: 'In Transit' },
                { id: 'SH-1235', product: 'Wheat', quantity: '750 kg', status: 'Delivered' },
                { id: 'SH-1236', product: 'Rice', quantity: '1000 kg', status: 'Pending' },
              ].map(shipment => (
                <div key={shipment.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="text-sm font-medium">{shipment.id} - {shipment.product}</p>
                    <p className="text-xs text-gray-500">{shipment.quantity}</p>
                  </div>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      shipment.status === 'In Transit' 
                        ? 'bg-blue-100 text-blue-800' 
                        : shipment.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {shipment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DistributorHome;
