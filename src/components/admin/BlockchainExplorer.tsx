
import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, User, Activity, FileText, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample data for blockchain transactions
const transactions = [
  {
    id: '0xf7a8b9c0d1e2f34567',
    role: 'Farmer',
    action: 'Add Crop',
    user: 'John Smith',
    timestamp: '2025-05-15T08:30:22Z',
    data: {
      cropId: 'CROP-001',
      cropName: 'Rice',
      quantity: '500 kg',
      farmerId: 'FARM-0123',
    },
    blockNumber: 12896,
  },
  {
    id: '0xe1d2c3b4a5968d7e0',
    role: 'Distributor',
    action: 'Update Status',
    user: 'Maria Rodriguez',
    timestamp: '2025-05-15T10:15:45Z',
    data: {
      shipmentId: 'SHIP-001',
      newStatus: 'In Transit',
      previousStatus: 'Stored',
    },
    blockNumber: 12897,
  },
  {
    id: '0xa9b8c7d6e5f43210',
    role: 'Retailer',
    action: 'Receive Shipment',
    user: 'David Chen',
    timestamp: '2025-05-15T14:22:33Z',
    data: {
      shipmentId: 'SHIP-001',
      productId: 'CROP-001',
      quantity: '200 kg',
    },
    blockNumber: 12898,
  },
  {
    id: '0xc1d2e3f4a5b67890',
    role: 'Admin',
    action: 'Approve User',
    user: 'Admin',
    timestamp: '2025-05-14T09:12:18Z',
    data: {
      userId: 'USER-005',
      userName: 'Michael Wong',
      userRole: 'Distributor',
    },
    blockNumber: 12890,
  },
  {
    id: '0xb5c4d3e2f1a09876',
    role: 'Farmer',
    action: 'Upload Document',
    user: 'Sarah Johnson',
    timestamp: '2025-05-14T11:45:30Z',
    data: {
      documentType: 'Organic Certification',
      cropId: 'CROP-004',
      documentHash: '0x5e6f7g8h9i0jklmn',
    },
    blockNumber: 12892,
  },
];

const getRoleBadge = (role: string) => {
  switch (role.toLowerCase()) {
    case 'farmer':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{role}</Badge>;
    case 'distributor':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{role}</Badge>;
    case 'retailer':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{role}</Badge>;
    case 'admin':
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{role}</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

const getActionBadge = (action: string) => {
  switch (action.toLowerCase()) {
    case 'add crop':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{action}</Badge>;
    case 'update status':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{action}</Badge>;
    case 'receive shipment':
      return <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">{action}</Badge>;
    case 'approve user':
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{action}</Badge>;
    case 'upload document':
      return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{action}</Badge>;
    default:
      return <Badge variant="outline">{action}</Badge>;
  }
};

const BlockchainExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery) {
      toast.error('Please enter a transaction hash or block number');
      return;
    }
    
    const foundTransaction = transactions.find(t => 
      t.id.includes(searchQuery) || 
      t.blockNumber.toString() === searchQuery
    );
    
    if (foundTransaction) {
      setSelectedTransaction(foundTransaction);
      setIsDialogOpen(true);
      toast.success('Transaction found');
    } else {
      toast.error('No matching transaction or block found');
    }
  };

  const viewTransactionDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Blockchain Explorer</CardTitle>
        <CardDescription>
          Explore and verify agricultural supply chain transactions on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                placeholder="Search by transaction hash or block number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit">
              Search
            </Button>
          </div>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-xs">
                  {`${transaction.id.substring(0, 6)}...${transaction.id.substring(transaction.id.length - 4)}`}
                </TableCell>
                <TableCell>{transaction.blockNumber}</TableCell>
                <TableCell>{getRoleBadge(transaction.role)}</TableCell>
                <TableCell>{getActionBadge(transaction.action)}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(transaction.timestamp).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => viewTransactionDetails(transaction)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            {selectedTransaction && (
              <>
                <DialogHeader>
                  <DialogTitle>Transaction Details</DialogTitle>
                  <DialogDescription>
                    Blockchain transaction information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Transaction Hash</h3>
                    <div className="flex items-center">
                      <span className="font-mono text-xs mr-2">{selectedTransaction.id}</span>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Block Number:</div>
                    <div className="font-medium">{selectedTransaction.blockNumber}</div>
                    
                    <div className="text-gray-500">Role:</div>
                    <div>{getRoleBadge(selectedTransaction.role)}</div>
                    
                    <div className="text-gray-500">Action:</div>
                    <div>{getActionBadge(selectedTransaction.action)}</div>
                    
                    <div className="text-gray-500">User:</div>
                    <div className="font-medium flex items-center">
                      <User className="h-3 w-3 mr-1 text-gray-400" />
                      {selectedTransaction.user}
                    </div>
                    
                    <div className="text-gray-500">Timestamp:</div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-gray-400" />
                      {new Date(selectedTransaction.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Transaction Data</h3>
                    <div className="bg-gray-50 p-3 rounded-md text-xs font-mono overflow-auto">
                      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(selectedTransaction.data, null, 2)}</pre>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Activity className="h-3 w-3" />
                    <span>Confirmed and immutable on the blockchain</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
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

export default BlockchainExplorer;
