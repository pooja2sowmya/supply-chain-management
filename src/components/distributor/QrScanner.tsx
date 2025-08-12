
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Search, Upload, Check, X } from 'lucide-react';
import { toast } from "sonner";

const QrScanner = () => {
  const [hashInput, setHashInput] = useState('');
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);

  const startCameraScanning = () => {
    setScanMode('camera');
    setIsScanning(true);
    
    // Simulate camera scanning
    setTimeout(() => {
      const mockHash = '0x3a1b2c3d4e5f67890';
      setHashInput(mockHash);
      verifyProduct(mockHash);
      setIsScanning(false);
    }, 3000);
  };
  
  const verifyProduct = (hash: string) => {
    // Simulate verification
    setTimeout(() => {
      // Fake verification - in a real app this would check against blockchain
      const isValid = hash.startsWith('0x');
      setIsVerified(isValid);
      
      if (isValid) {
        toast.success('Product verified successfully');
        setScanResult({
          id: 'CROP-001',
          name: 'Rice',
          type: 'Grain',
          farmerId: 'FARM-0123',
          farmerName: 'Green Valley Farms',
          quantity: '500 kg',
          harvestDate: '2025-05-20',
          certifications: ['Organic', 'Non-GMO'],
          timestamp: '2025-01-15T08:30:22Z',
        });
      } else {
        toast.error('Invalid product hash');
        setScanResult(null);
      }
    }, 1500);
  };
  
  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hashInput) {
      toast.error('Please enter a blockchain hash or scan a QR code');
      return;
    }
    
    verifyProduct(hashInput);
  };
  
  const resetScan = () => {
    setHashInput('');
    setIsVerified(null);
    setScanResult(null);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Verify Product</CardTitle>
        <CardDescription>
          Scan QR code or enter blockchain hash to verify product authenticity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Verification Method</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={scanMode === 'camera' ? 'default' : 'outline'}
                  onClick={() => setScanMode('camera')}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR Code
                </Button>
                <Button 
                  variant={scanMode === 'manual' ? 'default' : 'outline'}
                  onClick={() => setScanMode('manual')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
              </div>
            </div>
            
            {scanMode === 'camera' ? (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-md aspect-square max-w-xs mx-auto flex items-center justify-center mb-4">
                  {isScanning ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-pulse mb-2">
                        <QrCode className="h-12 w-12 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Scanning...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <QrCode className="h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600 mt-2">Camera preview will appear here</p>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={startCameraScanning}
                  disabled={isScanning}
                  className="mb-2 w-full md:w-auto"
                >
                  {isScanning ? 'Scanning...' : 'Start Camera Scan'}
                </Button>
                <p className="text-xs text-gray-500">Position the QR code within the frame</p>
              </div>
            ) : (
              <form onSubmit={handleManualVerify}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hash-input">Blockchain Hash</Label>
                    <Input
                      id="hash-input"
                      placeholder="Enter 0x... hash or product ID"
                      value={hashInput}
                      onChange={(e) => setHashInput(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={!hashInput}
                    className="w-full"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
            <h3 className="text-lg font-medium mb-4">Verification Result</h3>
            
            {isVerified === null ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Scan a QR code or enter a blockchain hash to verify</p>
              </div>
            ) : isVerified ? (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-2 rounded">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Authentic Product Verified</span>
                </div>
                
                {scanResult && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                      <div className="text-gray-500">Product ID:</div>
                      <div className="font-medium">{scanResult.id}</div>
                      
                      <div className="text-gray-500">Name:</div>
                      <div className="font-medium">{scanResult.name}</div>
                      
                      <div className="text-gray-500">Type:</div>
                      <div className="font-medium">{scanResult.type}</div>
                      
                      <div className="text-gray-500">Farmer:</div>
                      <div className="font-medium">{scanResult.farmerName}</div>
                      
                      <div className="text-gray-500">Quantity:</div>
                      <div className="font-medium">{scanResult.quantity}</div>
                      
                      <div className="text-gray-500">Harvest Date:</div>
                      <div className="font-medium">{new Date(scanResult.harvestDate).toLocaleDateString()}</div>
                      
                      <div className="text-gray-500">Certifications:</div>
                      <div className="font-medium">
                        {scanResult.certifications.map((cert: string, i: number) => (
                          <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                      Verified on blockchain at: {new Date(scanResult.timestamp).toLocaleString()}
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={resetScan}
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Verify Another Product
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                  <X className="h-5 w-5" />
                  <span className="font-medium">Invalid or Unverified Product</span>
                </div>
                
                <p className="text-gray-700 text-sm">
                  This product could not be verified on the blockchain. This may indicate:
                </p>
                
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Counterfeit product</li>
                  <li>Invalid blockchain hash</li>
                  <li>Product not registered on the platform</li>
                </ul>
                
                <Button 
                  variant="outline" 
                  onClick={resetScan}
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QrScanner;
