
import { SHA256 } from 'crypto-js';

// Generate a blockchain hash for a given data input
export const generateBlockchainHash = (data: any): string => {
  // Convert data to string if it's an object
  const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
  
  // Add timestamp and random salt for uniqueness
  const timestamp = new Date().toISOString();
  const randomSalt = Math.random().toString(36).substring(2, 15);
  
  // Generate SHA-256 hash
  const hash = SHA256(`${dataString}_${timestamp}_${randomSalt}`).toString();
  
  return hash;
};

// Format a blockchain hash for display (truncate with ellipsis)
export const formatBlockchainHash = (hash: string): string => {
  if (!hash) return '';
  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
};

// Verify if a hash is valid (simulated function)
export const verifyBlockchainHash = (hash: string): boolean => {
  // In a real blockchain, we would verify the hash against the blockchain network
  // For this simulation, we just check if it's a valid SHA-256 hash (64 characters, hex)
  return /^[a-f0-9]{64}$/i.test(hash);
};
