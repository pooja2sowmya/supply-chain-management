
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { isMetaMaskAvailable, connectToMetaMask } from '@/utils/CropContract';

const MetaMaskConnect = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    checkMetaMaskStatus();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          toast.success('Account changed: ' + formatAddress(accounts[0]));
        } else {
          setAccount(null);
          toast.info('Disconnected from MetaMask');
        }
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);
  
  const checkMetaMaskStatus = async () => {
    const metaMaskAvailable = isMetaMaskAvailable();
    setIsMetaMaskInstalled(metaMaskAvailable);
    
    if (metaMaskAvailable) {
      try {
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    }
  };

  const handleConnect = async () => {
    if (!isMetaMaskInstalled) {
      toast.error('MetaMask is not installed. Please install MetaMask extension and refresh the page.');
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const result = await connectToMetaMask();
      
      if (result.success) {
        setAccount(result.account);
        toast.success('Connected to MetaMask!');
      } else {
        toast.error(result.error || 'Failed to connect to MetaMask');
      }
    } catch (error: any) {
      console.error('Error connecting to MetaMask:', error);
      toast.error(error.message || 'An unknown error occurred');
    } finally {
      setIsConnecting(false);
    }
  };
  
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <Button variant="outline" className="flex items-center" onClick={() => window.open('https://metamask.io/download.html', '_blank')}>
        <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
        Install MetaMask
      </Button>
    );
  }

  return (
    <Button
      variant={account ? "outline" : "default"}
      className={`flex items-center ${account ? 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200' : ''}`}
      onClick={handleConnect}
      disabled={isConnecting || !!account}
    >
      {isConnecting ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        </>
      ) : account ? (
        <>
          <Wallet className="mr-2 h-4 w-4 text-green-600" />
          {formatAddress(account)}
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default MetaMaskConnect;
