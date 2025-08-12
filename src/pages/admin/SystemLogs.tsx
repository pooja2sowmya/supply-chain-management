
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home, Users, Database, Shield, FileText, LogOut, Search, Download } from 'lucide-react';

const SystemLogs = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin/dashboard' },
    { label: 'Manage Users', icon: <Users className="h-5 w-5" />, href: '/admin/users', notification: 4 },
    { label: 'View Reports', icon: <FileText className="h-5 w-5" />, href: '/admin/reports' },
    { label: 'Approve Shipments', icon: <Database className="h-5 w-5" />, href: '/admin/shipments' },
    { label: 'System Logs', icon: <Shield className="h-5 w-5" />, href: '/admin/logs' },
  ];

  const logs = [
    { 
      id: 'LOG-1001',
      timestamp: '2023-04-14 08:15:22',
      action: 'USER_LOGIN',
      user: 'admin@agritrace.com',
      details: 'Admin login successful',
      level: 'info',
    },
    { 
      id: 'LOG-1002',
      timestamp: '2023-04-14 08:30:45',
      action: 'CROP_ADDED',
      user: 'farmer@agritrace.com',
      details: 'New crop added: Corn (BATCH-A7B2C3)',
      level: 'info',
    },
    { 
      id: 'LOG-1003',
      timestamp: '2023-04-14 09:12:33',
      action: 'SHIPMENT_CREATED',
      user: 'farmer@agritrace.com',
      details: 'New shipment created: SH-1234',
      level: 'info',
    },
    { 
      id: 'LOG-1004',
      timestamp: '2023-04-14 10:05:18',
      action: 'AUTHENTICATION_FAILED',
      user: 'unknown@user.com',
      details: 'Failed login attempt',
      level: 'warning',
    },
    { 
      id: 'LOG-1005',
      timestamp: '2023-04-14 11:23:01',
      action: 'BLOCKCHAIN_VERIFICATION',
      user: 'system',
      details: 'Batch BATCH-D8E9F1 verified on blockchain',
      level: 'info',
    },
    { 
      id: 'LOG-1006',
      timestamp: '2023-04-14 12:45:52',
      action: 'SYSTEM_ERROR',
      user: 'system',
      details: 'Database connection timeout',
      level: 'error',
    },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
        <p className="text-muted-foreground">
          Monitor system activity and debug issues
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="text" placeholder="Search logs..." className="pl-8" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">Apply Filters</Button>
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        log.level === 'info' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : log.level === 'warning' 
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {log.level}
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

export default SystemLogs;
