
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Notification } from '@/integrations/supabase/tables';

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userData } = useAuth();

  useEffect(() => {
    if (!userData) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('target_role', userData.role)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      if (data) {
        setNotifications(data as Notification[]);
      }
    };

    fetchNotifications();

    // Set up real-time subscription
    const notificationChannel = supabase
      .channel('notifications_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `target_role=eq.${userData.role}` },
        (payload) => {
          console.log('New notification received!', payload);
          setNotifications(prev => [payload.new as Notification, ...prev].slice(0, 5));
        })
      .subscribe();

    return () => {
      supabase.removeChannel(notificationChannel);
    };
  }, [userData]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Latest Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="border-l-4 border-agri-green-500 pl-4 py-2">
              <h3 className="font-medium text-gray-900">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
