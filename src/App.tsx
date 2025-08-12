
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Index from './pages/Index';
import AdminDashboard from './pages/admin/Dashboard';
import FarmerDashboard from './pages/farmer/Dashboard';
import DistributorDashboard from './pages/distributor/Dashboard';
import RetailerDashboard from './pages/retailer/Dashboard';
import CustomerDashboard from './pages/customer/Dashboard';
import NotFound from './pages/NotFound';

// Admin Pages
import ManageUsers from './pages/admin/ManageUsers';
import ViewReports from './pages/admin/ViewReports';
import ApproveShipments from './pages/admin/ApproveShipments';
import SystemLogs from './pages/admin/SystemLogs';
import ManageComplaints from './pages/admin/ManageComplaints';

// Farmer Pages
import AddNewCrop from './pages/farmer/AddNewCrop';
import ViewCropHistory from './pages/farmer/ViewCropHistory';
import RequestShipment from './pages/farmer/RequestShipment';
import FarmerComplaint from './pages/farmer/Complaint';
import FarmerNotifications from './pages/farmer/Notifications';

// Distributor Pages
import DistributorHome from './pages/distributor/Home';
import Shipments from './pages/distributor/Shipments';
import VerifyProducts from './pages/distributor/VerifyProducts';
import RouteTracker from './pages/distributor/RouteTracker';
import DistributorComplaint from './pages/distributor/Complaint';
import DistributorNotifications from './pages/distributor/Notifications';

// Retailer Pages
import Orders from './pages/retailer/Orders';
import ProductListings from './pages/retailer/ProductListings';
import Payments from './pages/retailer/Payments';
import RetailerComplaint from './pages/retailer/Complaint';
import RetailerNotifications from './pages/retailer/Notifications';

// Customer Pages
import CustomerComplaints from './pages/customer/Complaints';
import CustomerNotifications from './pages/customer/Notifications';
import CustomerMarketplace from './pages/customer/Marketplace';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ViewReports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/shipments" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ApproveShipments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/logs" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SystemLogs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/complaints" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageComplaints />
                </ProtectedRoute>
              } 
            />
            
            {/* Farmer Routes */}
            <Route 
              path="/farmer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/add-crop" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <AddNewCrop />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/crop-history" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <ViewCropHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/request-shipment" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <RequestShipment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/complaint" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerComplaint />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/notifications" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerNotifications />
                </ProtectedRoute>
              } 
            />
            
            {/* Distributor Routes */}
            <Route 
              path="/distributor/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <DistributorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distributor/home" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <DistributorHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distributor/shipments" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <Shipments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distributor/verify" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <VerifyProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distributor/routes" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <RouteTracker />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distributor/complaint" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <DistributorComplaint />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distributor/notifications" 
              element={
                <ProtectedRoute allowedRoles={['distributor']}>
                  <DistributorNotifications />
                </ProtectedRoute>
              } 
            />
            
            {/* Retailer Routes */}
            <Route 
              path="/retailer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/retailer/orders" 
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <Orders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/retailer/products" 
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <ProductListings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/retailer/payments" 
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <Payments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/retailer/complaint" 
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerComplaint />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/retailer/notifications" 
              element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerNotifications />
                </ProtectedRoute>
              } 
            />
            
            {/* Customer Routes */}
            <Route 
              path="/customer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customer/complaints" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerComplaints />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customer/notifications" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerNotifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customer/marketplace" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerMarketplace />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster position="top-right" closeButton />
    </>
  );
};

export default App;
