
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { generateBlockchainHash, verifyBlockchainHash } from '@/utils/blockchain';

const VerifyProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isVerified: boolean;
    crop?: any;
    message: string;
  } | null>(null);

  const handleVerify = async () => {
    if (!searchTerm) {
      toast.error('Please enter a batch number or blockchain hash');
      return;
    }

    setIsLoading(true);
    setVerificationResult(null);

    try {
      // Search by batch number or blockchain hash
      const { data, error } = await supabase
        .from('crops')
        .select('*, farmer:farmer_id(name, region)')
        .or(`batch_number.eq.${searchTerm},blockchain_hash.eq.${searchTerm}`);

      if (error) throw error;

      if (!data || data.length === 0) {
        setVerificationResult({
          isVerified: false,
          message: 'No crop found with this batch number or blockchain hash',
        });
        return;
      }

      const crop = data[0];
      
      // Verify the blockchain hash
      let isVerified = false;
      if (crop.blockchain_hash) {
        isVerified = verifyBlockchainHash(crop.blockchain_hash);
      }

      // If verified, mark the crop as verified in the database
      if (isVerified) {
        // Only update if not already verified
        if (crop.status !== 'verified') {
          const { error: updateError } = await supabase
            .from('crops')
            .update({ status: 'verified' })
            .eq('id', crop.id);
            
          if (updateError) throw updateError;
          
          toast.success('Crop has been verified and updated in the database');
        }
      }

      setVerificationResult({
        isVerified,
        crop,
        message: isVerified 
          ? 'Product verified successfully! This product is authentic.' 
          : 'Verification failed. This product may not be authentic.',
      });
    } catch (error: any) {
      console.error('Error verifying product:', error);
      toast.error(error.message || 'Failed to verify product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2 h-5 w-5" />
          Verify Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter batch number or blockchain hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleVerify}
              disabled={isLoading || !searchTerm}
              className="bg-agri-green-600 hover:bg-agri-green-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Verify'
              )}
            </Button>
          </div>

          {verificationResult && (
            <div className={`mt-6 p-4 rounded-md ${
              verificationResult.isVerified 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start">
                <div className={`rounded-full p-2 ${
                  verificationResult.isVerified ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {verificationResult.isVerified ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className={`text-sm font-medium ${
                    verificationResult.isVerified ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {verificationResult.message}
                  </h3>
                  
                  {verificationResult.crop && (
                    <div className="mt-2 text-sm">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p className="text-gray-500">Batch Number:</p>
                        <p className="font-medium">{verificationResult.crop.batch_number}</p>
                        
                        <p className="text-gray-500">Crop:</p>
                        <p className="font-medium">{verificationResult.crop.crop_name}</p>
                        
                        <p className="text-gray-500">Type:</p>
                        <p className="font-medium">{verificationResult.crop.type}</p>
                        
                        <p className="text-gray-500">Quantity:</p>
                        <p className="font-medium">{verificationResult.crop.quantity} kg</p>
                        
                        <p className="text-gray-500">Farmer:</p>
                        <p className="font-medium">{verificationResult.crop.farmer?.name || 'Unknown'}</p>
                        
                        <p className="text-gray-500">Region:</p>
                        <p className="font-medium">{verificationResult.crop.farmer?.region || 'Unknown'}</p>
                        
                        <p className="text-gray-500">Harvest Date:</p>
                        <p className="font-medium">
                          {verificationResult.crop.harvest_date 
                            ? new Date(verificationResult.crop.harvest_date).toLocaleDateString() 
                            : 'Not recorded'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyProducts;
