
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home, Truck, FileCheck, Map, Navigation } from 'lucide-react';

const RouteTracker = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/distributor/dashboard' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/distributor/shipments', notification: 3 },
    { label: 'Verify Products', icon: <FileCheck className="h-5 w-5" />, href: '/distributor/verify' },
    { label: 'Route Tracker', icon: <Map className="h-5 w-5" />, href: '/distributor/routes' },
  ];

  const routes = [
    { 
      id: 'RT-1001',
      driver: 'Mike Johnson',
      vehicle: 'Truck XYZ-123',
      origin: 'Farm Depot A',
      destination: 'Green Grocers',
      stops: 2,
      distance: '120 km',
      eta: '2 hours',
      status: 'active',
    },
    { 
      id: 'RT-1002',
      driver: 'Sarah Wilson',
      vehicle: 'Van ABC-456',
      origin: 'Farm Depot B',
      destination: 'Healthy Foods',
      stops: 3,
      distance: '85 km',
      eta: '1.5 hours',
      status: 'completed',
    },
    { 
      id: 'RT-1003',
      driver: 'John Smith',
      vehicle: 'Truck DEF-789',
      origin: 'Distribution Center',
      destination: 'Fresh Markets',
      stops: 4,
      distance: '150 km',
      eta: '3 hours',
      status: 'scheduled',
    },
    { 
      id: 'RT-1004',
      driver: 'Lisa Brown',
      vehicle: 'Van GHI-101',
      origin: 'Farm Depot C',
      destination: 'Organic Choice',
      stops: 1,
      distance: '60 km',
      eta: '1 hour',
      status: 'active',
    },
  ];

  return (
    <DashboardLayout role="distributor" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Route Tracker</h1>
        <p className="text-muted-foreground">
          Monitor delivery routes and optimize shipment logistics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently in transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded border">
            <Map className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Map view goes here</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Stops</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.id}</TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.vehicle}</TableCell>
                  <TableCell>{route.origin}</TableCell>
                  <TableCell>{route.destination}</TableCell>
                  <TableCell>{route.stops}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                  <TableCell>{route.eta}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        route.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : route.status === 'completed' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }
                    >
                      {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default RouteTracker;
