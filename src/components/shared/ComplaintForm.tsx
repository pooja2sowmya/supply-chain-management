
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ComplaintFormData {
  title: string;
  description: string;
}

interface ComplaintFormProps {
  role: 'farmer' | 'distributor' | 'retailer' | 'admin' | 'customer';
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ role }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ComplaintFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const onSubmit = async (data: ComplaintFormData) => {
    if (!user) {
      toast.error('You must be logged in to submit a complaint');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('complaints')
        .insert({
          title: data.title,
          description: data.description,
          user_id: user.id,
          role: role
        });

      if (error) throw error;

      toast.success('Complaint submitted successfully');
      reset();
      
      // Log complaint to console for debugging
      console.log('Complaint submitted:', {
        title: data.title,
        description: data.description,
        user_id: user.id,
        role: role
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit complaint');
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter the complaint title"
              {...register('title', { required: 'Title is required' })}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your complaint in detail..."
              rows={5}
              {...register('description', { 
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description should be at least 10 characters'
                }
              })}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-agri-green-600 hover:bg-agri-green-700"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
