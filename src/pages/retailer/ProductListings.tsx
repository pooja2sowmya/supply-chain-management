
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, ShoppingCart, Package, CreditCard, Search, Plus, Edit, Trash } from 'lucide-react';

const ProductListings = () => {
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/retailer/dashboard' },
    { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/retailer/orders', notification: 5 },
    { label: 'Products', icon: <Package className="h-5 w-5" />, href: '/retailer/products' },
    { label: 'Payments', icon: <CreditCard className="h-5 w-5" />, href: '/retailer/payments' },
  ];

  const products = [
    { 
      id: 'PROD-1001',
      name: 'Organic Corn',
      image: '🌽',
      price: '$2.50/kg',
      stock: 120,
      batch: 'BATCH-A7B2C3',
      category: 'grain',
      verified: true,
    },
    { 
      id: 'PROD-1002',
      name: 'Premium Wheat',
      image: '🌾',
      price: '$3.00/kg',
      stock: 85,
      batch: 'BATCH-D8E9F1',
      category: 'grain',
      verified: true,
    },
    { 
      id: 'PROD-1003',
      name: 'Farm Fresh Rice',
      image: '🍚',
      price: '$4.25/kg',
      stock: 210,
      batch: 'BATCH-G5H6I7',
      category: 'grain',
      verified: true,
    },
    { 
      id: 'PROD-1004',
      name: 'Organic Soybean',
      image: '🫘',
      price: '$3.75/kg',
      stock: 65,
      batch: 'BATCH-J8K9L1',
      category: 'legume',
      verified: true,
    },
    { 
      id: 'PROD-1005',
      name: 'Premium Barley',
      image: '🌾',
      price: '$2.85/kg',
      stock: 95,
      batch: 'BATCH-M3N4P5',
      category: 'grain',
      verified: false,
    },
    { 
      id: 'PROD-1006',
      name: 'Organic Tomatoes',
      image: '🍅',
      price: '$5.50/kg',
      stock: 45,
      batch: 'BATCH-Q7R8S9',
      category: 'vegetable',
      verified: true,
    },
  ];

  return (
    <DashboardLayout role="retailer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Listings</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="text" placeholder="Search products by name, batch, or category..." className="pl-8" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="bg-gray-100 p-4 flex justify-center items-center text-4xl">
              {product.image}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                </div>
                {product.verified && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Verified ✓
                  </Badge>
                )}
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="font-medium">{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">In Stock:</span>
                  <span className="font-medium">{product.stock} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Batch:</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.batch}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="flex items-center text-red-600 hover:text-red-800 hover:bg-red-50">
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ProductListings;
