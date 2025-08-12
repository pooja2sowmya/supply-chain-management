
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
import { FileText, Eye, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample data for the table
const cropRecords = [
  {
    id: 'CROP-001',
    name: 'Rice',
    type: 'Grain',
    quantity: '500 kg',
    sowingDate: '2025-01-15',
    harvestDate: '2025-05-20',
    status: 'Verified',
    blockchainHash: '0x3a1b2c3d4e5f67890',
    timestamp: '2025-01-15 08:30:22',
  },
  {
    id: 'CROP-002',
    name: 'Wheat',
    type: 'Grain',
    quantity: '750 kg',
    sowingDate: '2025-02-10',
    harvestDate: '2025-06-25',
    status: 'In Transit',
    blockchainHash: '0x7a8b9c0d1e2f34560',
    timestamp: '2025-02-10 10:15:45',
  },
  {
    id: 'CROP-003',
    name: 'Tomatoes',
    type: 'Vegetable',
    quantity: '300 kg',
    sowingDate: '2025-03-05',
    harvestDate: '2025-05-15',
    status: 'Harvested',
    blockchainHash: '0xb1c2d3e4f5a67890',
    timestamp: '2025-03-05 14:22:33',
  },
  {
    id: 'CROP-004',
    name: 'Sugarcane',
    type: 'Cash Crop',
    quantity: '2 tons',
    sowingDate: '2025-01-20',
    harvestDate: '2025-11-15',
    status: 'Growing',
    blockchainHash: '0xe1f2a3b4c5d67890',
    timestamp: '2025-01-20 09:12:18',
  },
  {
    id: 'CROP-005',
    name: 'Cotton',
    type: 'Cash Crop',
    quantity: '800 kg',
    sowingDate: '2025-02-25',
    harvestDate: '2025-08-10',
    status: 'Growing',
    blockchainHash: '0x1a2b3c4d5e6f7890',
    timestamp: '2025-02-25 11:45:30',
  },
];

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'verified':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case 'in transit':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    case 'harvested':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
    case 'growing':
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const CropTable = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Crop Records</CardTitle>
        <CardDescription>
          View all your submitted crop records and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Crop Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Sowing Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Blockchain Hash
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                          <HelpCircle className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60 text-xs">
                          This is the unique hash that identifies this crop record on the blockchain. 
                          It ensures immutability and traceability of your data.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cropRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.quantity}</TableCell>
                <TableCell>{new Date(record.sowingDate).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell className="font-mono text-xs">
                  <div className="flex items-center">
                    {`${record.blockchainHash.substring(0, 8)}...${record.blockchainHash.substring(record.blockchainHash.length - 4)}`}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-mono text-xs">{record.blockchainHash}</p>
                          <p className="text-xs text-gray-500 mt-1">Created: {record.timestamp}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CropTable;
