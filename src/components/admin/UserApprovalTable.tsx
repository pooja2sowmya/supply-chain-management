
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, EyeIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Sample data for the table
const pendingUsers = [
  {
    id: 'USER-001',
    name: 'John Smith',
    role: 'Farmer',
    company: 'Green Valley Farms',
    email: 'john.smith@example.com',
    location: 'Sacramento, CA',
    documents: ['ID Proof', 'Farm License'],
    status: 'Pending',
    created: '2025-05-10',
  },
  {
    id: 'USER-002',
    name: 'Maria Rodriguez',
    role: 'Distributor',
    company: 'Quick Logistics LLC',
    email: 'maria@quicklogistics.com',
    location: 'San Francisco, CA',
    documents: ['ID Proof', 'Business License', 'Vehicle Registration'],
    status: 'Pending',
    created: '2025-05-12',
  },
  {
    id: 'USER-003',
    name: 'David Chen',
    role: 'Retailer',
    company: 'Fresh Market',
    email: 'david@freshmarket.com',
    location: 'Los Angeles, CA',
    documents: ['ID Proof', 'Store License'],
    status: 'Pending',
    created: '2025-05-13',
  },
  {
    id: 'USER-004',
    name: 'Sarah Johnson',
    role: 'Farmer',
    company: 'Sunny Acres',
    email: 'sarah@sunnyacres.com',
    location: 'Fresno, CA',
    documents: ['ID Proof', 'Farm License', 'Organic Certification'],
    status: 'Pending',
    created: '2025-05-14',
  },
  {
    id: 'USER-005',
    name: 'Michael Wong',
    role: 'Distributor',
    company: 'Farm to Market Logistics',
    email: 'michael@f2mlogistics.com',
    location: 'San Diego, CA',
    documents: ['ID Proof', 'Business License'],
    status: 'Pending',
    created: '2025-05-15',
  },
];

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case 'rejected':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
    case 'pending':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case 'farmer':
      return 'bg-green-100 text-green-800';
    case 'distributor':
      return 'bg-blue-100 text-blue-800';
    case 'retailer':
      return 'bg-amber-100 text-amber-800';
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UserApprovalTable = () => {
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleApprove = (user: any) => {
    toast.success(`User ${user.name} has been approved`);
    // In a real application, update the user status in the database
  };

  const handleReject = (user: any) => {
    toast.error(`User ${user.name} has been rejected`);
    // In a real application, update the user status in the database
  };

  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>User Approval Requests</CardTitle>
        <CardDescription>
          Review and approve new user registration requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gray-100 text-gray-800">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getRoleColor(user.role)}`}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.documents.map((doc, index) => (
                      <span key={index} className="inline-block text-xs px-2 py-1 bg-gray-100 rounded">
                        {doc}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => viewUserDetails(user)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(user)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleReject(user)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            {selectedUser && (
              <>
                <DialogHeader>
                  <DialogTitle>User Details</DialogTitle>
                  <DialogDescription>
                    Review user information and verification documents
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-center">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-xl bg-gray-100 text-gray-800">
                        {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="text-center mb-2">
                    <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                    <Badge className={`${getRoleColor(selectedUser.role)} mt-1`}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-500">Company:</div>
                    <div>{selectedUser.company}</div>
                    
                    <div className="text-gray-500">Email:</div>
                    <div>{selectedUser.email}</div>
                    
                    <div className="text-gray-500">Location:</div>
                    <div>{selectedUser.location}</div>
                    
                    <div className="text-gray-500">Joined:</div>
                    <div>{new Date(selectedUser.created).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <h4 className="font-medium mb-2">Verification Documents</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedUser.documents.map((doc: string, i: number) => (
                        <div key={i} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                          <span>{doc}</span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button 
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApprove(selectedUser);
                      setIsDialogOpen(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedUser);
                      setIsDialogOpen(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserApprovalTable;
