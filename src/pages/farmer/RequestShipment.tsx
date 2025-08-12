
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Home, Package, History, Sprout, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import crypto from 'crypto-js';

type ShipmentFormData = {
  cropId: string;
  quantity: number;
  distributorId: string;
  pickupDate: Date;
  pickupAddress: string;
  notes: string;
};

type Crop = {
  id: string;
  crop_name: string;
  batch_number: string;
  quantity: number;
  type: string;
};

type Distributor = {
  id: string;
  name: string;
};

const RequestShipment = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  
  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<ShipmentFormData>();
  
  const cropId = watch('cropId');
  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        
        const { data, error } = await supabase
          .from('crops')
          .select('id, crop_name, batch_number, quantity, type')
          .eq('farmer_id', userData.user.id)
          .eq('status', 'harvested');
          
        if (error) throw error;
        setCrops(data || []);
      } catch (error) {
        console.error('Error fetching crops:', error);
        toast.error('Failed to load your crops');
      }
    };
    
    const fetchDistributors = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name')
          .eq('role', 'distributor');
          
        if (error) throw error;
        setDistributors(data || []);
      } catch (error) {
        console.error('Error fetching distributors:', error);
        toast.error('Failed to load distributors');
      }
    };
    
    fetchCrops();
    fetchDistributors();
  }, []);
  
  // Update form when date changes
  useEffect(() => {
    if (date) {
      setValue('pickupDate', date);
    }
  }, [date, setValue]);
  
  const onSubmit = async (data: ShipmentFormData) => {
    try {
      setIsLoading(true);
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast.error('You must be logged in to request a shipment');
        navigate('/login');
        return;
      }

      // Generate a blockchain hash for the shipment
      const shipmentData = JSON.stringify({
        cropId: data.cropId,
        farmerId: userData.user.id,
        distributorId: data.distributorId,
        quantity: data.quantity,
        pickupDate: data.pickupDate,
        timestamp: new Date().toISOString()
      });
      
      const blockchainHash = crypto.SHA256(shipmentData).toString();
      
      // Insert the shipment into Supabase
      const { data: shipment, error } = await supabase
        .from('shipments')
        .insert({
          crop_id: data.cropId,
          from_user_id: userData.user.id,
          to_user_id: data.distributorId,
          status: 'pending',
          shipment_date: data.pickupDate.toISOString(),
          blockchain_hash: blockchainHash
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Shipment request submitted successfully!');
      reset();
      setDate(addDays(new Date(), 1));
      
    } catch (error) {
      console.error('Error submitting shipment request:', error);
      toast.error('Failed to submit shipment request');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/farmer/dashboard' },
    { label: 'Add New Crop', icon: <Sprout className="h-5 w-5" />, href: '/farmer/add-crop' },
    { label: 'Crop History', icon: <History className="h-5 w-5" />, href: '/farmer/crop-history' },
    { label: 'Request Shipment', icon: <Package className="h-5 w-5" />, href: '/farmer/request-shipment' },
  ];

  return (
    <DashboardLayout role="farmer" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Request Shipment</h1>
        <p className="text-muted-foreground">
          Request a shipment to transport your crops to distributors
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="crop" className={errors.cropId ? 'text-destructive' : ''}>Select Crop</Label>
                <Select 
                  onValueChange={(value) => setValue('cropId', value)}
                  value={cropId}
                >
                  <SelectTrigger id="crop">
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.crop_name} ({crop.batch_number})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cropId && (
                  <p className="text-sm text-destructive mt-1">{errors.cropId.message?.toString()}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity" className={errors.quantity ? 'text-destructive' : ''}>Quantity (kg)</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1" 
                  placeholder="e.g., 500"
                  {...register('quantity', { 
                    required: 'Quantity is required',
                    min: { value: 1, message: 'Quantity must be at least 1' },
                    valueAsNumber: true
                  })}
                />
                {errors.quantity && (
                  <p className="text-sm text-destructive mt-1">{errors.quantity.message?.toString()}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="distributor" className={errors.distributorId ? 'text-destructive' : ''}>Select Distributor</Label>
                <Select
                  onValueChange={(value) => setValue('distributorId', value)}
                >
                  <SelectTrigger id="distributor">
                    <SelectValue placeholder="Select a distributor" />
                  </SelectTrigger>
                  <SelectContent>
                    {distributors.map((distributor) => (
                      <SelectItem key={distributor.id} value={distributor.id}>
                        {distributor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.distributorId && (
                  <p className="text-sm text-destructive mt-1">{errors.distributorId.message?.toString()}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className={errors.pickupDate ? 'text-destructive' : ''}>Requested Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.pickupDate && (
                  <p className="text-sm text-destructive mt-1">{errors.pickupDate.message?.toString()}</p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className={errors.pickupAddress ? 'text-destructive' : ''}>Pickup Address</Label>
                <Input 
                  id="address" 
                  placeholder="Enter the full pickup address"
                  {...register('pickupAddress', { required: 'Pickup address is required' })}
                />
                {errors.pickupAddress && (
                  <p className="text-sm text-destructive mt-1">{errors.pickupAddress.message?.toString()}</p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <textarea 
                  id="notes" 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Any special instructions or requirements (optional)"
                  {...register('notes')}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-agri-green-600 hover:bg-agri-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default RequestShipment;
