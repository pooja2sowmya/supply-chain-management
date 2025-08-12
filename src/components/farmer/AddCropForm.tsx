import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import CryptoJS from "crypto-js";

interface CropFormData {
  cropName: string;
  type: string;
  quantity: number;
  sowingDate: string;
  harvestDate: string;
  pricePerUnit: number;
}

const AddCropForm = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CropFormData>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (field: keyof CropFormData, value: string) => {
    setValue(field, value);
  };

  const generateBatchNumber = () => {
    const prefix = 'BATCH-';
    const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${prefix}${randomString}-${dateStr}`;
  };

  const generateBlockchainHash = (data: CropFormData, batchNumber: string) => {
    const raw = `${data.cropName}|${data.type}|${data.quantity}|${data.sowingDate}|${data.harvestDate}|${data.pricePerUnit}|${batchNumber}`;
    return CryptoJS.SHA256(raw).toString();
  };

  const onSubmit = async (data: CropFormData) => {
    if (!user) {
      toast.error('You must be logged in to add a crop');
      return;
    }

    setIsLoading(true);

    try {
      const batchNumber = generateBatchNumber();
      const hash = generateBlockchainHash(data, batchNumber);

      const { data: cropData, error: cropError } = await supabase
        .from('crops')
        .insert({
          crop_name: data.cropName,
          type: data.type,
          quantity: data.quantity,
          sowing_date: data.sowingDate,
          harvest_date: data.harvestDate,
          price_per_unit: data.pricePerUnit,
          farmer_id: user.id,
          batch_number: batchNumber,
          blockchain_hash: hash
        })
        .select()
        .single();

      if (cropError) throw cropError;

      const { error: inventoryError } = await supabase
        .from('inventory')
        .insert({
          crop_id: cropData.id,
          stock_quantity: data.quantity,
          price: data.pricePerUnit,
          retailer_id: user.id
        });

      if (inventoryError) throw inventoryError;

      toast.success('Crop added successfully!');
      reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add crop');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Crop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input fields */}
            <div className="space-y-2">
              <Label htmlFor="cropName">Crop Name</Label>
              <Input id="cropName" disabled={isLoading} {...register('cropName', { required: 'Crop name is required' })} />
              {errors.cropName && <p className="text-sm text-red-500">{errors.cropName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select disabled={isLoading} onValueChange={(value) => handleSelectChange('type', value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grain">Grain</SelectItem>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="fruit">Fruit</SelectItem>
                  <SelectItem value="legume">Legume</SelectItem>
                  <SelectItem value="tuber">Tuber</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input id="quantity" type="number" disabled={isLoading} {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 0, message: 'Quantity must be positive' },
                valueAsNumber: true
              })} />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerUnit">Price per Unit</Label>
              <Input id="pricePerUnit" type="number" step="0.01" disabled={isLoading} {...register('pricePerUnit', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
                valueAsNumber: true
              })} />
              {errors.pricePerUnit && <p className="text-sm text-red-500">{errors.pricePerUnit.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sowingDate">Sowing Date</Label>
              <Input id="sowingDate" type="date" disabled={isLoading} {...register('sowingDate', { required: 'Sowing date is required' })} />
              {errors.sowingDate && <p className="text-sm text-red-500">{errors.sowingDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestDate">Harvest Date</Label>
              <Input id="harvestDate" type="date" disabled={isLoading} {...register('harvestDate', { required: 'Harvest date is required' })} />
              {errors.harvestDate && <p className="text-sm text-red-500">{errors.harvestDate.message}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Crop'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCropForm;
