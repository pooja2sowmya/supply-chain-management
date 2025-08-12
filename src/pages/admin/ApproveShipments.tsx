
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Users, Database, Shield, FileText, LogOut, Check, X } from 'lucide-react';

const ApproveShipments = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin/dashboard' },
    { label: 'Manage Users', icon: <Users className="h-5 w-5" />, href: '/admin/users', notification: 4 },
    { label: 'View Reports', icon: <FileText className="h-5 w-5" />, href: '/admin/reports' },
    { label: 'Approve Shipments', icon: <Database className="h-5 w-5" />, href: '/admin/shipments' },
    { label: 'System Logs', icon: <Shield className="h-5 w-5" />, href: '/admin/logs' },
  ];

  const shipments = [
    { 
      id: 'SH-1234',
      crop: 'Corn',
      batchNumber: 'BATCH-A7B2C3-20230410',
      quantity: '500 kg',
      from: 'John Farmer',
      to: 'ABC Distributors',
      status: 'pending',
      date: '2023-04-10',
    },
    { 
      id: 'SH-1235',
      crop: 'Wheat',
      batchNumber: 'BATCH-D8E9F1-20230411',
      quantity: '750 kg',
      from: 'Jane Farmer',
      to: 'XYZ Distributors',
      status: 'pending',
      date: '2023-04-11',
    },
    { 
      id: 'SH-1236',
      crop: 'Rice',
      batchNumber: 'BATCH-G5H6I7-20230412',
      quantity: '1000 kg',
      from: 'Bob Farmer',
      to: 'LMN Distributors',
      status: 'pending',
      date: '2023-04-12',
    },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Approve Shipments</h1>
        <p className="text-muted-foreground">
          Review and approve pending shipment requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.crop}</TableCell>
                  <TableCell>{shipment.batchNumber}</TableCell>
                  <TableCell>{shipment.quantity}</TableCell>
                  <TableCell>{shipment.from}</TableCell>
                  <TableCell>{shipment.to}</TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className="bg-yellow-100 text-yellow-800 border-yellow-200"
                    >
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button variant="outline" size="sm" className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
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

export default ApproveShipments;
