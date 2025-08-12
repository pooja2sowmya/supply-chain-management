
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sprout,
  Truck,
  Store,
  Users,
  PackageOpen,
  LineChart,
  Calendar,
  ShieldCheck
} from 'lucide-react';

// Sample data for the dashboard stats
const stats = {
  farmers: 245,
  distributors: 38,
  retailers: 127,
  products: 1892,
  transactions: 5436,
  pendingApprovals: 17,
  activeUsers: 352,
  blocksCreated: 12896,
};

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="animate-fade-in" style={{ animationDelay: '0ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
          <Sprout className="h-4 w-4 text-agri-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.farmers}</div>
          <p className="text-xs text-muted-foreground">
            +12 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Distributors</CardTitle>
          <Truck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.distributors}</div>
          <p className="text-xs text-muted-foreground">
            +3 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Retailers</CardTitle>
          <Store className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.retailers}</div>
          <p className="text-xs text-muted-foreground">
            +8 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">
            +28 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products Tracked</CardTitle>
          <PackageOpen className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.products}</div>
          <p className="text-xs text-muted-foreground">
            +153 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          <LineChart className="h-4 w-4 text-cyan-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.transactions}</div>
          <p className="text-xs text-muted-foreground">
            +432 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          <Calendar className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          <p className="text-xs text-muted-foreground">
            -4 from last week
          </p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in" style={{ animationDelay: '700ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blockchain Blocks</CardTitle>
          <ShieldCheck className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.blocksCreated}</div>
          <p className="text-xs text-muted-foreground">
            +243 from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
