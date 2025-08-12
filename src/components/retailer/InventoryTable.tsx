
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
import { 
  PlusCircle, 
  QrCode, 
  FileText, 
  Edit, 
  CheckCircle, 
  ShieldCheck,
  Star,
  StarHalf
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Sample data for the table
const inventoryItems = [
  {
    id: 'INV-001',
    productId: 'CROP-001',
    name: 'Premium Rice',
    quantity: '150 kg',
    price: '$2.50/kg',
    farmer: 'Green Valley Farms',
    distributor: 'Farm Fresh Logistics',
    receivedDate: '2025-05-28',
    verified: true,
    feedback: 4.8,
  },
  {
    id: 'INV-002',
    productId: 'CROP-002',
    name: 'Organic Wheat',
    quantity: '200 kg',
    price: '$3.20/kg',
    farmer: 'Sunlit Acres',
    distributor: 'EcoDistribution Co.',
    receivedDate: '2025-05-27',
    verified: true,
    feedback: 4.5,
  },
  {
    id: 'INV-003',
    productId: 'CROP-003',
    name: 'Fresh Tomatoes',
    quantity: '80 kg',
    price: '$1.95/kg',
    farmer: 'Fresh Harvest Farms',
    distributor: 'QuickShip Produce',
    receivedDate: '2025-05-26',
    verified: true,
    feedback: 4.2,
  },
  {
    id: 'INV-004',
    productId: 'CROP-006',
    name: 'Organic Potatoes',
    quantity: '120 kg',
    price: '$1.75/kg',
    farmer: 'Earth Bounty Farms',
    distributor: 'Farm Fresh Logistics',
    receivedDate: '2025-05-25',
    verified: false,
    feedback: 3.9,
  },
  {
    id: 'INV-005',
    productId: 'CROP-009',
    name: 'Premium Apples',
    quantity: '100 kg',
    price: '$2.25/kg',
    farmer: 'Orchard Valley',
    distributor: 'QuickShip Produce',
    receivedDate: '2025-05-24',
    verified: true,
    feedback: 4.7,
  },
];

const InventoryTable = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [productName, setProductName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');

  const handleAddToInventory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !quantity || !price) {
      toast.error('Please fill all required fields');
      return;
    }
    
    toast.success(`Added ${productName} to inventory`);
    setIsDialogOpen(false);
    // Reset form
    setProductName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Store Inventory</CardTitle>
          <CardDescription>
            Manage your inventory and product listings
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add to Inventory
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your store inventory
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddToInventory}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g. Organic Apples"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g. 100 kg"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      placeholder="e.g. $2.50/kg"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-id">Product ID (Optional)</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="product-id"
                      placeholder="Enter blockchain product ID"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Link to a blockchain record for supply chain traceability
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div>Farmer: {item.farmer}</div>
                    <div>Distributor: {item.distributor}</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(item.receivedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.verified ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center w-fit">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center w-fit">
                      Unverified
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex items-center text-amber-500 mr-1">
                      {[...Array(Math.floor(item.feedback))].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      {item.feedback % 1 >= 0.5 && <StarHalf className="h-3 w-3 fill-current" />}
                    </div>
                    <span className="text-xs text-gray-600">{item.feedback}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <QrCode className="h-3.5 w-3.5" />
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

export default InventoryTable;
