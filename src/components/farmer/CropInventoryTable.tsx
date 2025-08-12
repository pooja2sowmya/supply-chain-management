
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type CropInventoryItem = {
  id: string;
  crop_name: string;
  type: string;
  quantity: number;
  sowing_date: string;
  harvest_date: string;
  price_per_unit: number;
  batch_number: string;
  blockchain_hash: string;
  status: string;
  inventory_id: string;
  stock_quantity: number;
  inventory_price: number;
};

const CropInventoryTable = () => {
  const [crops, setCrops] = useState<CropInventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { user } = useAuth();

  useEffect(() => {
    fetchCropsWithInventory();
  }, [user]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      filterCrops();
    } else {
      fetchCropsWithInventory();
    }
  }, [debouncedSearchTerm]);

  const fetchCropsWithInventory = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('crops')
        .select(`
          id, crop_name, type, quantity, sowing_date, harvest_date, 
          price_per_unit, batch_number, blockchain_hash, status,
          inventory:inventory(id, stock_quantity, price)
        `)
        .eq('farmer_id', user.id);

      if (error) throw error;

      const formattedData = data.map(crop => {
        const inventory = crop.inventory && crop.inventory.length > 0 ? crop.inventory[0] : null;
        return {
          id: crop.id,
          crop_name: crop.crop_name,
          type: crop.type,
          quantity: crop.quantity,
          sowing_date: crop.sowing_date,
          harvest_date: crop.harvest_date,
          price_per_unit: crop.price_per_unit,
          batch_number: crop.batch_number,
          blockchain_hash: crop.blockchain_hash,
          status: crop.status,
          inventory_id: inventory?.id || null,
          stock_quantity: inventory?.stock_quantity || 0,
          inventory_price: inventory?.price || 0
        };
      });

      setCrops(formattedData);
    } catch (error) {
      console.error('Error fetching crops with inventory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCrops = () => {
    if (!debouncedSearchTerm) {
      fetchCropsWithInventory();
      return;
    }

    const filteredCrops = crops.filter(crop => 
      crop.crop_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      crop.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      crop.batch_number.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    setCrops(filteredCrops);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crops & Inventory</CardTitle>
        <div className="w-64">
          <Input
            placeholder="Search crops..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <svg className="animate-spin h-8 w-8 text-agri-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Sowing Date</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Inventory Stock</TableHead>
                  <TableHead>Inventory Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crops.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No crops found. Add your first crop to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  crops.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell className="font-medium">{crop.crop_name}</TableCell>
                      <TableCell className="capitalize">{crop.type}</TableCell>
                      <TableCell>
                        <span className="text-xs font-mono">{crop.batch_number}</span>
                      </TableCell>
                      <TableCell>{crop.quantity}</TableCell>
                      <TableCell>{new Date(crop.sowing_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(crop.harvest_date).toLocaleDateString()}</TableCell>
                      <TableCell>${crop.price_per_unit.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className="capitalize" variant="outline">
                          {crop.status || 'harvested'}
                        </Badge>
                      </TableCell>
                      <TableCell>{crop.stock_quantity}</TableCell>
                      <TableCell>${crop.inventory_price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropInventoryTable;
