import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  target_role: string;
}

type UserRole = "farmer" | "distributor" | "retailer" | "admin" | "customer";

const NotificationsPanel: React.FC<{ role: UserRole }> = ({ role }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useAuth();

  useEffect(() => {
    fetchNotifications();

    // Real-time subscription
    const channel = supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          if (newNotification.target_role === role) {
            setNotifications((prev) => [newNotification, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('target_role', role)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
    } else {
      setNotifications(data as Notification[]);
    }
    setIsLoading(false);
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHours = Math.round(diffMin / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSec < 60) return `${diffSec} sec ago`;
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Notifications
          <Badge className="bg-agri-green-500 hover:bg-agri-green-600">
            {notifications.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <svg
              className="animate-spin h-8 w-8 text-agri-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                  5.291A7.962 7.962 0 014 12H0c0 
                  3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notifications at this time.
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.created_at)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
