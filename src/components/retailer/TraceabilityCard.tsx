
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, QrCode, FileText, MapPin, UploadCloud, Clock, Activity } from 'lucide-react';
import { toast } from "sonner";

const TraceabilityCard = () => {
  const [productId, setProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      toast.error('Please enter a product ID');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to fetch product data
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock product data for demo
      if (productId === 'CROP-001' || productId.startsWith('0x3a')) {
        const mockData = {
          id: 'CROP-001',
          name: 'Premium Rice',
          type: 'Grain',
          journey: [
            {
              stage: 'Farming',
              actor: 'Green Valley Farms',
              location: 'Sacramento, CA',
              date: '2025-01-15',
              actions: 'Sowing seeds',
              blockchainHash: '0x3a1b2c3d4e5f67890'
            },
            {
              stage: 'Harvesting',
              actor: 'Green Valley Farms',
              location: 'Sacramento, CA',
              date: '2025-05-20',
              actions: 'Harvested 500kg of rice',
              blockchainHash: '0x4b5c6d7e8f90abcde'
            },
            {
              stage: 'Processing',
              actor: 'Green Valley Mills',
              location: 'Sacramento, CA',
              date: '2025-05-21',
              actions: 'Cleaned and processed rice',
              blockchainHash: '0x5e6f7g8h9i0jklmn'
            },
            {
              stage: 'Distribution',
              actor: 'Farm Fresh Logistics',
              location: 'San Francisco, CA',
              date: '2025-05-25',
              actions: 'Transported 200kg to City Fresh Market',
              blockchainHash: '0x6g7h8i9j0k1lmnop'
            },
            {
              stage: 'Retail',
              actor: 'City Fresh Market',
              location: 'San Francisco, CA',
              date: '2025-05-28',
              actions: 'Received and displayed for sale',
              blockchainHash: '0x7i8j9k0l1m2nopqr'
            }
          ],
          certifications: ['Organic', 'Non-GMO', 'Sustainably Grown'],
          environmentalImpact: {
            waterUsage: '320 gallons per kg',
            carbonFootprint: '0.5 kg CO2 per kg',
            sustainability: 'High'
          }
        };
        
        setProductData(mockData);
        toast.success('Product traceability information found');
      } else {
        setProductData(null);
        toast.error('Product not found or not traceable');
      }
    }, 1500);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Product Traceability</CardTitle>
        <CardDescription>
          Trace a product's journey from farm to store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                placeholder="Enter product ID or blockchain hash"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="button" variant="outline">
              <QrCode className="h-4 w-4" />
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Trace Product'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Enter a product ID (e.g., CROP-001) or scan QR code to trace its origin
          </p>
        </form>
        
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <Activity className="h-12 w-12 text-agri-green-300 mx-auto mb-3" />
            </div>
            <p className="text-gray-500">Searching blockchain for product data...</p>
          </div>
        )}
        
        {!isLoading && productData && (
          <div className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-medium">{productData.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {productData.certifications.map((cert: string, i: number) => (
                  <span key={i} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="journey">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="journey" className="flex items-center justify-center">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>Journey</span>
                </TabsTrigger>
                <TabsTrigger value="certifications" className="flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>Documents</span>
                </TabsTrigger>
                <TabsTrigger value="environmental" className="flex items-center justify-center">
                  <UploadCloud className="h-4 w-4 mr-1" />
                  <span>Environmental</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="journey">
                <div className="relative pl-8 border-l border-gray-200">
                  {productData.journey.map((stage: any, index: number) => (
                    <div key={index} className="mb-6 relative">
                      <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full border-2 border-white">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(stage.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-1 text-sm">
                          <div className="flex items-start mt-1">
                            <div className="flex-shrink-0 text-gray-500 w-20">Actor:</div>
                            <div>{stage.actor}</div>
                          </div>
                          <div className="flex items-start mt-1">
                            <div className="flex-shrink-0 text-gray-500 w-20">Location:</div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                              {stage.location}
                            </div>
                          </div>
                          <div className="flex items-start mt-1">
                            <div className="flex-shrink-0 text-gray-500 w-20">Actions:</div>
                            <div>{stage.actions}</div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs font-mono text-gray-500">
                            Blockchain hash: {stage.blockchainHash.substring(0, 10)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="certifications">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-green-100 mr-3">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Organic Certification</h4>
                          <p className="text-sm text-gray-500">Certified by Green Agriculture Board</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Certificate
                      </Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Non-GMO Verification</h4>
                          <p className="text-sm text-gray-500">Verified by Natural Food Alliance</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Certificate
                      </Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-amber-100 mr-3">
                          <FileText className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Quality Assurance</h4>
                          <p className="text-sm text-gray-500">Quality tested on May 22, 2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Report
                      </Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-purple-100 mr-3">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Sustainability Practices</h4>
                          <p className="text-sm text-gray-500">Sustainability rating: High</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="environmental">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Water Usage</h4>
                      <p className="text-lg font-bold text-green-700">{productData.environmentalImpact.waterUsage}</p>
                      <p className="text-xs text-gray-500 mt-1">Per kilogram of product</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Carbon Footprint</h4>
                      <p className="text-lg font-bold text-blue-700">{productData.environmentalImpact.carbonFootprint}</p>
                      <p className="text-xs text-gray-500 mt-1">CO₂ equivalent per kg</p>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg p-4 text-center">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Sustainability</h4>
                      <p className="text-lg font-bold text-amber-700">{productData.environmentalImpact.sustainability}</p>
                      <p className="text-xs text-gray-500 mt-1">Environmental rating</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Environmental Practices</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Sustainable irrigation techniques to reduce water consumption
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        No synthetic pesticides or fertilizers used
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Renewable energy used in processing facilities
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Short transportation distances to reduce emissions
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {!isLoading && !productData && productId && (
          <div className="text-center py-12 animate-fade-in">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <Search className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Product Not Found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find a product with ID "{productId}" in our blockchain records
            </p>
            <Button variant="outline" onClick={() => setProductId('')}>
              Search Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TraceabilityCard;
