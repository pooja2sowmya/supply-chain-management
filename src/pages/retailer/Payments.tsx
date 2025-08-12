
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Download, 
  DollarSign, 
  TrendingUp, 
  ArrowDown, 
  ArrowUp,
  Search 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: string;
  from?: string;
  to?: string;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

const Payments = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const sidebarItems = [
    { label: 'Dashboard', icon: <Home className="h-5 w-5" />, href: '/retailer/dashboard' },
    { label: 'Orders', icon: <ShoppingCart className="h-5 w-5" />, href: '/retailer/orders', notification: 5 },
    { label: 'Products', icon: <Package className="h-5 w-5" />, href: '/retailer/products' },
    { label: 'Payments', icon: <CreditCard className="h-5 w-5" />, href: '/retailer/payments' },
    { label: 'Submit Complaint', icon: <CreditCard className="h-5 w-5" />, href: '/retailer/complaint' },
  ];

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  useEffect(() => {
    filterTransactions();
  }, [debouncedSearchTerm, transactions, activeTab]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch transactions from the database
      // For now, using mock data
      const mockTransactions: Transaction[] = [
        { 
          id: 'TRX-1001',
          type: 'incoming',
          amount: '$125.00',
          from: 'Jane Smith',
          description: 'Payment for order #ORD-1001',
          date: '2023-04-14',
          status: 'completed',
        },
        { 
          id: 'TRX-1002',
          type: 'outgoing',
          amount: '$750.00',
          to: 'ABC Distributors',
          description: 'Payment for crop shipment #SH-1234',
          date: '2023-04-13',
          status: 'completed',
        },
        { 
          id: 'TRX-1003',
          type: 'incoming',
          amount: '$85.00',
          from: 'Alice Johnson',
          description: 'Payment for order #ORD-1003',
          date: '2023-04-12',
          status: 'completed',
        },
        { 
          id: 'TRX-1004',
          type: 'outgoing',
          amount: '$500.00',
          to: 'XYZ Logistics',
          description: 'Payment for crop shipment #SH-1235',
          date: '2023-04-11',
          status: 'pending',
        },
        { 
          id: 'TRX-1005',
          type: 'incoming',
          amount: '$37.50',
          from: 'Bob Wilson',
          description: 'Payment for order #ORD-1004',
          date: '2023-04-10',
          status: 'completed',
        },
      ];

      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction data');
    } finally {
      setIsLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;
    
    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(tx => tx.type === activeTab);
    }
    
    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(tx => 
        tx.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        tx.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (tx.from && tx.from.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (tx.to && tx.to.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }
    
    setFilteredTransactions(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleExport = () => {
    toast.success('Transactions exported successfully');
  };

  return (
    <DashboardLayout role="retailer" sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Track your financial transactions with suppliers and customers
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.85</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,250.00</div>
            <div className="flex items-center pt-1 text-xs text-red-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8.3% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit (MTD)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,300.85</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <Button variant="outline" className="flex items-center" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="incoming">Incoming</TabsTrigger>
              <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>From/To</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center p-4">
                          <div className="flex justify-center">
                            <svg className="animate-spin h-6 w-6 text-agri-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                tx.type === 'incoming' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-blue-100 text-blue-800 border-blue-200'
                              }
                            >
                              {tx.type === 'incoming' ? (
                                <><ArrowDown className="h-3 w-3 mr-1 inline" /> Incoming</>
                              ) : (
                                <><ArrowUp className="h-3 w-3 mr-1 inline" /> Outgoing</>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className={tx.type === 'incoming' ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>
                            {tx.amount}
                          </TableCell>
                          <TableCell>{tx.from || tx.to}</TableCell>
                          <TableCell>{tx.description}</TableCell>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                tx.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              }
                            >
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="incoming">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center p-4">
                          <div className="flex justify-center">
                            <svg className="animate-spin h-6 w-6 text-agri-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          No incoming transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id}</TableCell>
                          <TableCell className="text-green-600 font-medium">{tx.amount}</TableCell>
                          <TableCell>{tx.from}</TableCell>
                          <TableCell>{tx.description}</TableCell>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                tx.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              }
                            >
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="outgoing">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center p-4">
                          <div className="flex justify-center">
                            <svg className="animate-spin h-6 w-6 text-agri-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          No outgoing transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id}</TableCell>
                          <TableCell className="text-blue-600 font-medium">{tx.amount}</TableCell>
                          <TableCell>{tx.to}</TableCell>
                          <TableCell>{tx.description}</TableCell>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                tx.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              }
                            >
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Payments;
