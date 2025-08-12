
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { generateBlockchainHash } from '@/utils/blockchain';
import { Database } from '@/integrations/supabase/types';

type UserRole = 'farmer' | 'distributor' | 'retailer' | 'admin' | 'customer';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, userData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!user || !userData) {
      toast.error('You must be logged in to submit a complaint');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate a blockchain hash for the complaint
      const blockchainHash = generateBlockchainHash({
        title,
        description,
        userId: user.id,
        role: userData.role,
        timestamp: new Date().toISOString()
      });

      // Insert complaint data
      const { data, error } = await supabase
        .from('complaints')
        .insert({
          user_id: user.id,
          role: userData.role as UserRole,
          title: title,
          description: description,
          status: 'pending',
          blockchain_hash: blockchainHash
        });

      if (error) throw error;
      
      toast.success('Complaint submitted successfully');
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error: any) {
      console.error('Error submitting complaint:', error);
      toast.error(error.message || 'Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Submit a Complaint
        </CardTitle>
        <CardDescription>
          Tell us about any issues or concerns you're experiencing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="complaint-title">Title</Label>
            <Input
              id="complaint-title"
              placeholder="Brief summary of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="complaint-description">Description</Label>
            <Textarea
              id="complaint-description"
              placeholder="Provide details about your complaint"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => {
          setTitle('');
          setDescription('');
        }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-agri-green-600 hover:bg-agri-green-700"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
              Submitting...
            </span>
          ) : 'Submit Complaint'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComplaintForm;
