
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart, Package, CreditCard, Eye, Plus } from 'lucide-react';

const Orders = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/retailer/dashboard' },
    { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/retailer/orders', notification: 5 },
    { label: 'Products', icon: <Package className="h-5 w-5" />, href: '/retailer/products' },
    { label: 'Payments', icon: <CreditCard className="h-5 w-5" />, href: '/retailer/payments' },
  ];

  const orders = [
    { 
      id: 'ORD-1001',
      customer: 'Jane Smith',
      product: 'Organic Corn',
      quantity: '25 kg',
      total: '$62.50',
      date: '2023-04-14',
      status: 'processing',
    },
    { 
      id: 'ORD-1002',
      customer: 'John Doe',
      product: 'Premium Wheat',
      quantity: '15 kg',
      total: '$45.00',
      date: '2023-04-13',
      status: 'completed',
    },
    { 
      id: 'ORD-1003',
      customer: 'Alice Johnson',
      product: 'Farm Fresh Rice',
      quantity: '20 kg',
      total: '$85.00',
      date: '2023-04-12',
      status: 'shipped',
    },
    { 
      id: 'ORD-1004',
      customer: 'Bob Wilson',
      product: 'Organic Soybean',
      quantity: '10 kg',
      total: '$37.50',
      date: '2023-04-10',
      status: 'completed',
    },
    { 
      id: 'ORD-1005',
      customer: 'Emily Davis',
      product: 'Premium Barley',
      quantity: '5 kg',
      total: '$14.25',
      date: '2023-04-09',
      status: 'processing',
    },
  ];

  return (
    <DashboardLayout role="retailer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and track shipments
          </p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        order.status === 'processing' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : order.status === 'shipped' 
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-green-100 text-green-800 border-green-200'
                      }
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
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

export default Orders;
