import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { sha256 } from 'js-sha256';
import { v4 as uuidv4 } from 'uuid';

const CropsList = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    crop_name: '',
    type: '',
    quantity: '',
    price_per_unit: '',
    sowing_date: '',
    harvest_date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('User not authenticated');

    const batch_number = `BATCH-${uuidv4().slice(0, 8)}`;
    const hash_input = `${formData.crop_name}-${formData.type}-${formData.quantity}-${batch_number}-${new Date().toISOString()}`;
    const blockchain_hash = sha256(hash_input);

    const { error } = await supabase.from('crops').insert([
      {
        ...formData,
        quantity: parseFloat(formData.quantity),
        price_per_unit: parseFloat(formData.price_per_unit),
        batch_number,
        blockchain_hash,
        status: 'harvested',
        farmer_id: user.id,
      },
    ]);

    if (error) {
      toast.error('Failed to register crop');
      console.error(error);
    } else {
      toast.success('Crop registered successfully');
      setFormData({
        crop_name: '',
        type: '',
        quantity: '',
        price_per_unit: '',
        sowing_date: '',
        harvest_date: '',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Crop</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {['crop_name', 'type', 'quantity', 'price_per_unit', 'sowing_date', 'harvest_date'].map((field) => (
            <div key={field} className="grid gap-1">
              <Label htmlFor={field}>{field.replace(/_/g, ' ').toUpperCase()}</Label>
              <Input
                type={field.includes('date') ? 'date' : field === 'price_per_unit' || field === 'quantity' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <Button type="submit">Register Crop</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CropsList;