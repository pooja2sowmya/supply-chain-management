
import { Database } from './types';

// Define the structure of Complaints table
export type Complaint = {
  id: string;
  user_id: string;
  role: Database['public']['Enums']['user_role'];
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  created_at: string;
  blockchain_hash?: string | null;
};

// Define the structure of Notifications table
export type Notification = {
  id: string;
  title: string;
  message: string;
  target_role: Database['public']['Enums']['user_role'];
  created_at: string;
};

// Define the structure for Products table
export type Product = {
  id: string;
  crop_id: string;
  retailer_id: string;
  price: number;
  stock: number;
  created_at: string;
  crop_name?: string;
  batch_number?: string;
};
