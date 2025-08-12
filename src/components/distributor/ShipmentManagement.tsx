
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Truck, Package, Check, X, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatBlockchainHash } from '@/utils/blockchain';
import { Database } from '@/integrations/supabase/types';

type ShipmentStatus = Database['public']['Enums']['shipment_status'];

type Shipment = {
  id: string;
  crop_id: string;
  from_user_id: string;
  to_user_id: string;
  status: ShipmentStatus;
  shipment_date: string;
  delivery_date: string | null;
  blockchain_hash: string | null;
  created_at: string;
  crop: {
    crop_name: string;
    batch_number: string;
    quantity: number;
    type: string;
  };
  from_user: {
    name: string;
    region: string | null;
  };
};

const ShipmentManagement = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchShipments = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Get shipments where the distributor is either sender or receiver
      const { data, error } = await supabase
        .from('shipments')
        .select(`
          *,
          crop:crop_id(crop_name, batch_number, quantity, type),
          from_user:from_user_id(name, region)
        `)
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setShipments(data as unknown as Shipment[]);
    } catch (error: any) {
      console.error('Error fetching shipments:', error);
      toast.error(error.message || 'Failed to load shipments');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateShipmentStatus = async (shipmentId: string, newStatus: ShipmentStatus) => {
    try {
      setProcessingId(shipmentId);
      
      // Update shipment status
      const { error } = await supabase
        .from('shipments')
        .update({ 
          status: newStatus,
          delivery_date: newStatus === 'delivered' ? new Date().toISOString() : null
        })
        .eq('id', shipmentId);
        
      if (error) throw error;
      
      // If delivered, update the crop status as well
      if (newStatus === 'delivered') {
        const shipment = shipments.find(s => s.id === shipmentId);
        if (shipment) {
          const { error: cropError } = await supabase
            .from('crops')
            .update({ status: 'delivered' })
            .eq('id', shipment.crop_id);
            
          if (cropError) throw cropError;
        }
      }
      
      toast.success(`Shipment ${newStatus}`);
      
      // Update local state
      setShipments((prevShipments) => 
        prevShipments.map((shipment) => 
          shipment.id === shipmentId ? { ...shipment, status: newStatus } : shipment
        )
      );
    } catch (error: any) {
      console.error('Error updating shipment status:', error);
      toast.error(error.message || 'Failed to update shipment status');
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchShipments();
    
    // Set up real-time subscription for shipments
    const channel = supabase
      .channel('shipments_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'shipments' },
        (payload) => {
          console.log('Shipment change received!', payload);
          fetchShipments(); // Refetch on any change
        })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'in_transit':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      case 'stored':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Stored</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Truck className="mr-2 h-5 w-5" />
          Shipment Management
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchShipments}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-agri-green-600" />
          </div>
        ) : shipments.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No shipments found</p>
            <p className="text-sm text-gray-400 mt-1">
              Shipments will appear here when farmers request them
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id.substring(0, 8)}</TableCell>
                    <TableCell>{shipment.crop?.crop_name || 'Unknown'}</TableCell>
                    <TableCell>{shipment.crop?.batch_number || 'N/A'}</TableCell>
                    <TableCell>{shipment.crop?.quantity || 'N/A'} kg</TableCell>
                    <TableCell>{shipment.from_user?.name || 'Unknown'}</TableCell>
                    <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {shipment.status === 'pending' && (
                          <>
                            <Button 
                              variant="default"
                              size="sm" 
                              className="bg-agri-green-600 hover:bg-agri-green-700"
                              onClick={() => updateShipmentStatus(shipment.id, 'in_transit')}
                              disabled={processingId === shipment.id}
                            >
                              {processingId === shipment.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Truck className="h-4 w-4 mr-1" /> Ship
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => updateShipmentStatus(shipment.id, 'stored')}
                              disabled={processingId === shipment.id}
                            >
                              <X className="h-4 w-4 mr-1" /> Deny
                            </Button>
                          </>
                        )}
                        {shipment.status === 'in_transit' && (
                          <Button 
                            variant="default"
                            size="sm"
                            className="bg-agri-green-600 hover:bg-agri-green-700"
                            onClick={() => updateShipmentStatus(shipment.id, 'delivered')}
                            disabled={processingId === shipment.id}
                          >
                            {processingId === shipment.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-1" /> Mark Delivered
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShipmentManagement;
