
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Users, Database, Shield, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ViewReports = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin/dashboard' },
    { label: 'Manage Users', icon: <Users className="h-5 w-5" />, href: '/admin/users', notification: 4 },
    { label: 'View Reports', icon: <FileText className="h-5 w-5" />, href: '/admin/reports' },
    { label: 'Approve Shipments', icon: <Database className="h-5 w-5" />, href: '/admin/shipments' },
    { label: 'System Logs', icon: <Shield className="h-5 w-5" />, href: '/admin/logs' },
  ];

  const reports = [
    {
      id: 1,
      title: 'Monthly Crop Overview',
      description: 'Aggregated view of crop production and distribution',
      date: '2023-04-01',
      status: 'Available',
    },
    {
      id: 2,
      title: 'User Activity Summary',
      description: 'Summary of user activities across all roles',
      date: '2023-04-05',
      status: 'Available',
    },
    {
      id: 3,
      title: 'Shipment Analytics',
      description: 'Trends and analysis of shipment data',
      date: '2023-04-10',
      status: 'Processing',
    },
    {
      id: 4,
      title: 'Blockchain Verification Report',
      description: 'Verification status of blockchain entries',
      date: '2023-04-12',
      status: 'Available',
    },
  ];

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">System Reports</h1>
        <p className="text-muted-foreground">
          Access and download analytics reports for the supply chain system
        </p>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Generate Custom Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle>{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Generated: {report.date}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      disabled={report.status !== 'Available'}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {report.status === 'Available' ? 'Download' : 'Processing...'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have no scheduled reports. Configure your preferences to automatically generate reports on a schedule.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Select parameters to generate a custom report based on your requirements.</p>
              <div className="flex justify-end">
                <Button>Configure Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ViewReports;
