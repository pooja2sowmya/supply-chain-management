
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Users, FileText, Truck, Database, Check, X, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Complaint } from '@/integrations/supabase/tables';
import { toast } from 'sonner';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/admin/dashboard' },
    { label: 'Users', icon: <Users className="h-5 w-5" />, href: '/admin/users' },
    { label: 'Reports', icon: <FileText className="h-5 w-5" />, href: '/admin/reports' },
    { label: 'Shipments', icon: <Truck className="h-5 w-5" />, href: '/admin/shipments' },
    { label: 'Logs', icon: <Database className="h-5 w-5" />, href: '/admin/logs' },
    { label: 'Complaints', icon: <MessageSquare className="h-5 w-5" />, href: '/admin/complaints', notification: 3 },
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select(`
          *,
          users (name, email)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setComplaints(data as any);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Failed to load complaints');
    } finally {
      setIsLoading(false);
    }
  };

  const updateComplaintStatus = async (id: string, status: 'resolved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      setComplaints(prev => 
        prev.map(complaint => 
          complaint.id === id ? { ...complaint, status } : complaint
        )
      );
      
      toast.success(`Complaint marked as ${status}`);
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Failed to update complaint status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout role="admin" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Manage Complaints</h1>
        <p className="text-muted-foreground">
          Review and process user complaints across the platform
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-agri-green-600 rounded-full border-t-transparent"></div>
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2">No complaints have been submitted</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint: any) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.users?.name || 'Unknown'}</TableCell>
                    <TableCell className="capitalize">{complaint.role}</TableCell>
                    <TableCell>{complaint.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{complaint.description}</TableCell>
                    <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                    <TableCell>
                      {complaint.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                            onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                          >
                            <Check className="h-4 w-4 mr-1" /> Resolve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                            onClick={() => updateComplaintStatus(complaint.id, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ManageComplaints;
