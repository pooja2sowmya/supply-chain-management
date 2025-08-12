import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error('Error fetching users:', error.message);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-right">
            <Button variant="outline">+ Add New User</Button>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No users found.</div>
          ) : (
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border capitalize">{user.role}</td>
                    <td className="p-2 border">{user.status}</td>
                    <td className="p-2 border space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Suspend</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
