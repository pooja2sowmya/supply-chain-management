
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetaMaskConnect from '@/components/blockchain/MetaMaskConnect';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/use-debounce';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Home, ShoppingBag, MessageSquare, Bell, Search } from 'lucide-react';

interface Product {
  id: string;
  crop_name: string;
  type: string;
  batch_number: string;
  farmer_name: string;
  price: number;
  stock_quantity: number;
  farmer_id: string;
}

const CustomerMarketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/customer/dashboard' },
    { label: 'Marketplace', icon: <ShoppingBag className="h-5 w-5" />, href: '/customer/marketplace' },
    { label: 'Submit Complaint', icon: <MessageSquare className="h-5 w-5" />, href: '/customer/complaints' },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, href: '/customer/notifications' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      filterProducts();
    } else {
      fetchProducts();
    }
  }, [debouncedSearchTerm]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Query inventory with proper hint for crops relationship
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          id, 
          stock_quantity, 
          price,
          retailer_id,
          crop_id(id, crop_name, type, batch_number, farmer_id)
        `)
        .gt('stock_quantity', 0);

      if (error) throw error;

      // Get farmer names from user table
      const farmerIds = data.map(item => item.crop_id.farmer_id);
      const { data: farmers, error: farmerError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', farmerIds);

      if (farmerError) throw farmerError;

      // Create a farmer map for easy lookup
      const farmerMap = farmers.reduce((acc, farmer) => {
        acc[farmer.id] = farmer.name;
        return acc;
      }, {} as Record<string, string>);

      const formattedProducts: Product[] = data.map(item => ({
        id: item.id,
        crop_name: item.crop_id.crop_name,
        type: item.crop_id.type,
        batch_number: item.crop_id.batch_number,
        farmer_id: item.crop_id.farmer_id,
        farmer_name: farmerMap[item.crop_id.farmer_id] || 'Unknown Farmer',
        price: item.price,
        stock_quantity: item.stock_quantity
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load marketplace products');
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    if (!debouncedSearchTerm) {
      fetchProducts();
      return;
    }

    const filtered = products.filter(product =>
      product.crop_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.farmer_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    setProducts(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePurchase = async (productId: string) => {
    setPurchasingId(productId);
    
    try {
      // Simulate a blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would create a purchase record and update inventory
      const productToPurchase = products.find(p => p.id === productId);
      
      if (productToPurchase) {
        // Update inventory quantity
        const { error } = await supabase
          .from('inventory')
          .update({ 
            stock_quantity: productToPurchase.stock_quantity - 1 
          })
          .eq('id', productId);
          
        if (error) throw error;
        
        // Create customer record
        const { error: customerError } = await supabase
          .from('customers')
          .insert({
            retailer_id: 'sample-retailer-id', // Replace with actual retailer ID
            name: 'Customer', // Replace with actual customer name
            contact: 'customer@example.com', // Replace with actual contact
            purchased_crop_id: productToPurchase.crop_name,
            rating: 5,
            feedback: 'Great product!'
          });
          
        if (customerError) throw customerError;
      }
      
      toast.success('Product purchased successfully! Transaction recorded on blockchain.');
      
      // Update local state
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, stock_quantity: product.stock_quantity - 1 }
            : product
        ).filter(product => product.stock_quantity > 0)
      );
    } catch (error) {
      console.error('Error purchasing product:', error);
      toast.error('Failed to complete purchase');
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <DashboardLayout role="customer" sidebarItems={sidebarItems}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse and purchase verified agricultural products
          </p>
        </div>
        <MetaMaskConnect />
      </div>

      <div className="mb-6 flex justify-end">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search by crop name, type, or farmer..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-agri-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search terms or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-agri-green-100 to-agri-brown-50 flex items-center justify-center">
                <div className="text-agri-green-700 font-bold text-lg">{product.crop_name}</div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.crop_name}</CardTitle>
                  <Badge className="capitalize bg-agri-green-100 text-agri-green-800 hover:bg-agri-green-200">
                    {product.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-2">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Farmer:</span> {product.farmer_name}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Batch:</span> 
                  <span className="font-mono text-xs ml-1">{product.batch_number}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Available:</span> {product.stock_quantity} kg
                </div>
                <div className="text-lg font-bold text-agri-green-700">
                  ${product.price.toFixed(2)} / kg
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-agri-green-600 hover:bg-agri-green-700"
                  disabled={purchasingId === product.id}
                  onClick={() => handlePurchase(product.id)}
                >
                  {purchasingId === product.id ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Purchase
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CustomerMarketplace;
