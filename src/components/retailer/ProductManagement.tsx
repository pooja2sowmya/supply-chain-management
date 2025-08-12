
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, RefreshCw, Plus, Package, Edit, Trash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/integrations/supabase/tables';

type ShipmentWithCrop = {
  id: string;
  crop_id: string;
  status: string;
  crop: {
    id: string;
    crop_name: string;
    batch_number: string;
    quantity: number;
    price_per_unit: number;
    type: string;
  };
};

const ProductManagement = () => {
  const [shipments, setShipments] = useState<ShipmentWithCrop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentWithCrop | null>(null);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const fetchShipments = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Get delivered shipments where the retailer is the recipient
      const { data, error } = await supabase
        .from('shipments')
        .select(`
          id,
          crop_id,
          status,
          crop:crop_id(id, crop_name, batch_number, quantity, price_per_unit, type)
        `)
        .eq('to_user_id', user.id)
        .eq('status', 'delivered');
        
      if (error) throw error;
      
      setShipments(data as unknown as ShipmentWithCrop[]);
    } catch (error: any) {
      console.error('Error fetching shipments:', error);
      toast.error(error.message || 'Failed to load shipments');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    if (!user) return;
    
    try {
      // Get products created by this retailer
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          id,
          crop_id,
          price,
          stock_quantity,
          crop:crop_id(crop_name, batch_number)
        `)
        .eq('retailer_id', user.id);
        
      if (error) throw error;
      
      // Transform data to include crop_name and batch_number
      const productsWithCropDetails = data.map((product: any) => ({
        id: product.id,
        crop_id: product.crop_id,
        retailer_id: user.id,
        price: product.price,
        stock: product.stock_quantity,
        created_at: new Date().toISOString(),
        crop_name: product.crop?.crop_name,
        batch_number: product.crop?.batch_number
      }));
      
      setProducts(productsWithCropDetails as Product[]);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error(error.message || 'Failed to load products');
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchProducts();
    
    // Set up real-time subscription for shipments
    const shipmentChannel = supabase
      .channel('shipments_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'shipments', filter: `to_user_id=eq.${user?.id}` },
        (payload) => {
          console.log('Shipment change received!', payload);
          fetchShipments(); // Refetch on any change
        })
      .subscribe();
      
    // Set up real-time subscription for products
    const productChannel = supabase
      .channel('products_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'inventory', filter: `retailer_id=eq.${user?.id}` },
        (payload) => {
          console.log('Product change received!', payload);
          fetchProducts(); // Refetch on any change
        })
      .subscribe();

    return () => {
      supabase.removeChannel(shipmentChannel);
      supabase.removeChannel(productChannel);
    };
  }, [user?.id]);

  const handleSelectShipment = (shipment: ShipmentWithCrop) => {
    setSelectedShipment(shipment);
    // Set default price based on the crop's price_per_unit with a markup
    const markupPrice = shipment.crop.price_per_unit * 1.3; // 30% markup
    setPrice(markupPrice.toFixed(2));
    setStock(shipment.crop.quantity.toString());
  };

  const handleCreateProduct = async () => {
    if (!selectedShipment || !price || !stock || !user) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if product already exists for this crop
      const { data: existingProducts, error: checkError } = await supabase
        .from('inventory')
        .select('id')
        .eq('crop_id', selectedShipment.crop.id)
        .eq('retailer_id', user.id);
        
      if (checkError) throw checkError;
      
      if (existingProducts && existingProducts.length > 0) {
        // Update existing product
        const { error: updateError } = await supabase
          .from('inventory')
          .update({
            price: parseFloat(price),
            stock_quantity: parseFloat(stock)
          })
          .eq('id', existingProducts[0].id);
          
        if (updateError) throw updateError;
        
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const { error: insertError } = await supabase
          .from('inventory')
          .insert({
            crop_id: selectedShipment.crop.id,
            retailer_id: user.id,
            price: parseFloat(price),
            stock_quantity: parseFloat(stock)
          });
          
        if (insertError) throw insertError;
        
        toast.success('Product added to inventory');
      }
      
      // Reset form
      setSelectedShipment(null);
      setPrice('');
      setStock('');
      
      // Refetch products
      fetchProducts();
    } catch (error: any) {
      console.error('Error creating/updating product:', error);
      toast.error(error.message || 'Failed to add product to inventory');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', productId)
        .eq('retailer_id', user.id); // Security check
        
      if (error) throw error;
      
      toast.success('Product removed from inventory');
      
      // Update local state
      setProducts(products.filter(p => p.id !== productId));
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Failed to remove product');
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Inventory Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Add Product to Inventory</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shipment">Select Delivered Shipment</Label>
                  <select
                    id="shipment"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedShipment?.id || ''}
                    onChange={(e) => {
                      const shipment = shipments.find(s => s.id === e.target.value);
                      if (shipment) handleSelectShipment(shipment);
                    }}
                  >
                    <option value="">Select a shipment</option>
                    {shipments.map((shipment) => (
                      <option key={shipment.id} value={shipment.id}>
                        {shipment.crop.crop_name} - {shipment.crop.batch_number} ({shipment.crop.quantity} kg)
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedShipment && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Retail Price (USD)</Label>
                        <Input
                          id="price"
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          min="1"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCreateProduct}
                        disabled={isSubmitting}
                        className="bg-agri-green-600 hover:bg-agri-green-700"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Inventory
                          </span>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Current Inventory</h3>
              {products.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <Package className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No products in inventory</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add products from delivered shipments
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.crop_name}</TableCell>
                        <TableCell>{product.batch_number}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" title="Edit product">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              title="Remove product"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
