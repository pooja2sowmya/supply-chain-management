
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { Bell, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

const CreateNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetRole, setTargetRole] = useState<UserRole | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message || !targetRole) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          title,
          message,
          target_role: targetRole as UserRole
        });

      if (error) throw error;
      
      toast.success(`Notification sent to all ${targetRole} users`);
      setTitle('');
      setMessage('');
      setTargetRole('');
    } catch (error: any) {
      console.error('Error creating notification:', error);
      toast.error(error.message || 'Failed to send notification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Send Notification
        </CardTitle>
        <CardDescription>
          Create system-wide notifications for specific user roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notification-title">Title</Label>
            <Input
              id="notification-title"
              placeholder="Notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notification-message">Message</Label>
            <Textarea
              id="notification-message"
              placeholder="Enter notification content"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="target-role">Target Role</Label>
            <Select 
              value={targetRole} 
              onValueChange={(value: UserRole) => setTargetRole(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target user role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmers</SelectItem>
                <SelectItem value="distributor">Distributors</SelectItem>
                <SelectItem value="retailer">Retailers</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
                <SelectItem value="admin">Administrators</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => {
          setTitle('');
          setMessage('');
          setTargetRole('');
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
              Sending...
            </span>
          ) : 'Send Notification'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateNotification;
