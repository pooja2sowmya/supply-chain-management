
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlockchainExplorer from '@/components/admin/BlockchainExplorer';
import UserApprovalTable from '@/components/admin/UserApprovalTable';
import DashboardStats from '@/components/admin/DashboardStats';
import CreateNotification from '@/components/admin/CreateNotification';
import { Home, Users, FileText, Truck, Database, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin/dashboard' },
    { label: 'Users', icon: <Users className="h-5 w-5" />, href: '/admin/users', notification: 2 },
    { label: 'Reports', icon: <FileText className="h-5 w-5" />, href: '/admin/reports' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/admin/shipments' },
    { label: 'Logs', icon: <Database className="h-5 w-5" />, href: '/admin/logs' },
    { label: 'Complaints', icon: <MessageSquare className="h-5 w-5" />, href: '/admin/complaints', notification: 3 },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage the entire supply chain system
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
          <Button
            onClick={() => navigate('/admin/complaints')}
            className="bg-agri-green-600 hover:bg-agri-green-700"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            View Complaints
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <DashboardStats />
        
        <div className="grid gap-6 md:grid-cols-2">
          <UserApprovalTable />
          <CreateNotification />
        </div>
        
        <BlockchainExplorer />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
