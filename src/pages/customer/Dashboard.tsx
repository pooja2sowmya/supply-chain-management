
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Search, Star, Home, ShoppingCart, FileText, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CustomerDashboard = () => {
  const sidebarItems = [
    { label: 'Home', icon: <Home className="h-5 w-5" />, href: '/customer/dashboard' },
    { label: 'View Crops', icon: <ShoppingBag className="h-5 w-5" />, href: '/customer/crops' },
    { label: 'Trace Product', icon: <Search className="h-5 w-5" />, href: '/customer/trace' },
    { label: 'My Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/customer/orders' },
    { label: 'Feedback', icon: <Star className="h-5 w-5" />, href: '/customer/feedback' },
  ];

  const products = [
    { id: 1, name: 'Organic Rice', quantity: '50 kg', retailer: 'Green Farms', price: '₹75/kg', region: 'Punjab' },
    { id: 2, name: 'Fresh Tomatoes', quantity: '25 kg', retailer: 'Fresh Harvest', price: '₹35/kg', region: 'Karnataka' },
    { id: 3, name: 'Premium Wheat', quantity: '100 kg', retailer: 'Golden Grains', price: '₹45/kg', region: 'Haryana' },
    { id: 4, name: 'Organic Potatoes', quantity: '40 kg', retailer: 'Earth Produce', price: '₹30/kg', region: 'Uttar Pradesh' },
    { id: 5, name: 'Basmati Rice', quantity: '75 kg', retailer: 'Aromatic Farms', price: '₹120/kg', region: 'Punjab' },
  ];

  const handleProductTrace = () => {
    toast.success('Product verified successfully!');
  };

  return (
    <DashboardLayout role="farmer" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Welcome, Rahul Singh</h1>
        <p className="text-muted-foreground">
          Browse and verify agricultural products from our trusted network
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Purchases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Blockchain verified transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Farmers</CardTitle>
            <Avatar className="h-4 w-4">
              <AvatarFallback className="bg-agri-green-100 text-agri-green-800 text-xs">F</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">From 12 different regions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="mb-8">
        <TabsList>
          <TabsTrigger value="products">Available Products</TabsTrigger>
          <TabsTrigger value="trace">Trace Products</TabsTrigger>
          <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4 mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Retailer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.retailer}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.region}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{product.name} Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Retailer: {product.retailer}</p>
                              <p className="text-sm font-medium">Price: {product.price}</p>
                              <p className="text-sm font-medium">Available: {product.quantity}</p>
                              <p className="text-sm font-medium">Region: {product.region}</p>
                              <div className="mt-4">
                                <Badge className="bg-agri-green-600">Organic Certified</Badge>
                                <Badge className="ml-2 bg-blue-600">Blockchain Verified</Badge>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button variant="outline" onClick={() => toast.info('Inquiry sent!')}>Enquire</Button>
                              <Button onClick={() => toast.success('Added to cart!')}>Buy Now</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="trace" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trace Agricultural Product</CardTitle>
              <CardDescription>
                Enter the batch number or scan QR code to verify the product origin and journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input placeholder="Enter Batch Number (e.g., BTC-12345)" className="flex-1" />
                <Button onClick={handleProductTrace}>Verify</Button>
              </div>
              <div className="text-center p-8 border rounded-lg border-dashed">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Scan QR code with your camera or upload image
                </p>
                <Button variant="outline" className="mt-4">Scan QR</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recently Traced Products</CardTitle>
              <CardDescription>
                Your recent product verification history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Organic Rice - Batch #BTC-23456</h4>
                    <div className="text-sm text-muted-foreground">Verified on May 10, 2023</div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">View Journey</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Product Journey</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Product Details</h4>
                          <p className="text-sm">Organic Rice - 25kg</p>
                          <p className="text-sm">Batch #BTC-23456</p>
                          <Badge className="my-1 bg-agri-green-600">Certified Organic</Badge>
                        </div>
                        
                        <div className="space-y-1 border-l-2 border-agri-green-500 pl-4 ml-2">
                          <div className="relative">
                            <span className="absolute -left-[22px] top-1 h-4 w-4 rounded-full bg-agri-green-500"></span>
                            <p className="font-medium">Grown & Harvested</p>
                            <p className="text-sm text-muted-foreground">By Farmer: Ranjeet Kumar</p>
                            <p className="text-xs text-muted-foreground">May 1, 2023</p>
                          </div>
                          
                          <div className="relative mt-6">
                            <span className="absolute -left-[22px] top-1 h-4 w-4 rounded-full bg-agri-green-500"></span>
                            <p className="font-medium">Processed & Packed</p>
                            <p className="text-sm text-muted-foreground">At: Green Farms Processing Center</p>
                            <p className="text-xs text-muted-foreground">May 3, 2023</p>
                          </div>
                          
                          <div className="relative mt-6">
                            <span className="absolute -left-[22px] top-1 h-4 w-4 rounded-full bg-agri-green-500"></span>
                            <p className="font-medium">Distributed</p>
                            <p className="text-sm text-muted-foreground">By: FastTrack Logistics</p>
                            <p className="text-xs text-muted-foreground">May 5, 2023</p>
                          </div>
                          
                          <div className="relative mt-6">
                            <span className="absolute -left-[22px] top-1 h-4 w-4 rounded-full bg-agri-green-500"></span>
                            <p className="font-medium">Received by Retailer</p>
                            <p className="text-sm text-muted-foreground">At: Green Grocery Mart</p>
                            <p className="text-xs text-muted-foreground">May 7, 2023</p>
                          </div>
                        </div>
                        
                        <div className="text-xs">
                          <p className="font-medium text-sm mt-4">Blockchain Verification:</p>
                          <p className="font-mono overflow-x-auto text-muted-foreground my-1">
                            0x7cbf...e8d9
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>
                Share your experience with our agricultural products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Product</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="">Select a product</option>
                    <option value="organic-rice">Organic Rice</option>
                    <option value="fresh-tomatoes">Fresh Tomatoes</option>
                    <option value="premium-wheat">Premium Wheat</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" className="text-yellow-400">
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Comments</label>
                  <Textarea placeholder="Share your experience with this product" />
                </div>
                
                <Button type="button" onClick={() => toast.success('Feedback submitted!')} className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
