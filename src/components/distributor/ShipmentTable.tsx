
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

interface Shipment {
  id: string;
  shipment_date: string;
  delivery_date: string | null;
  blockchain_hash: string | null;
  status: 'pending' | 'in_transit' | 'delivered' | 'rejected';
  crop_id: string;
  from_user_id: string;
  to_user_id: string;
  created_at: string;
  crop_name?: string;
  batch_number?: string;
  from_name?: string;
  to_name?: string;
}

const ShipmentTable: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchShipments();
    }
  }, [user]);

  useEffect(() => {
    filterShipments();
  }, [debouncedSearchTerm, shipments]);

  const fetchShipments = async () => {
    setIsLoading(true);
    try {
      // In a real app, we would fetch from the actual crops, users tables to get related data
      // For simplicity, we'll generate mock data here
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('from_user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Enhance with mock related data since we don't have the actual joins
      const enhancedData = data.map(shipment => ({
        ...shipment,
        crop_name: `Crop ${Math.floor(Math.random() * 5) + 1}`,
        batch_number: `BATCH-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
        from_name: 'Your Farm',
        to_name: `Retailer ${Math.floor(Math.random() * 3) + 1}`
      })) as Shipment[];

      setShipments(enhancedData);
      setFilteredShipments(enhancedData);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      toast.error('Failed to load shipments');
    } finally {
      setIsLoading(false);
    }
  };

  const filterShipments = () => {
    if (!debouncedSearchTerm) {
      setFilteredShipments(shipments);
      return;
    }

    const filtered = shipments.filter(shipment =>
      shipment.batch_number?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      shipment.crop_name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      shipment.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    setFilteredShipments(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const updateShipmentStatus = async (id: string, status: 'pending' | 'in_transit' | 'delivered' | 'rejected') => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setShipments(prevShipments =>
        prevShipments.map(shipment =>
          shipment.id === id ? { ...shipment, status } : shipment
        )
      );

      toast.success(`Shipment status updated to ${status}`);
    } catch (error) {
      console.error('Error updating shipment status:', error);
      toast.error('Failed to update shipment status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shipments</CardTitle>
        <div className="w-64">
          <Input
            placeholder="Search by batch or status..."
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
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Shipment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No shipments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-mono text-xs">
                        {shipment.batch_number}
                      </TableCell>
                      <TableCell>{shipment.crop_name}</TableCell>
                      <TableCell>{shipment.from_name}</TableCell>
                      <TableCell>{shipment.to_name}</TableCell>
                      <TableCell>
                        {new Date(shipment.shipment_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getStatusBadgeColor(shipment.status)}
                        >
                          {shipment.status === 'in_transit' 
                            ? 'In Transit' 
                            : shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            disabled={updatingId === shipment.id}
                            defaultValue={shipment.status}
                            onValueChange={(value) => updateShipmentStatus(shipment.id, value as any)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_transit">In Transit</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {updatingId === shipment.id && (
                          <div className="flex items-center mt-2">
                            <svg className="animate-spin h-4 w-4 text-agri-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-xs">Updating...</span>
                          </div>
                        )}
                      </TableCell>
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

export default ShipmentTable;
