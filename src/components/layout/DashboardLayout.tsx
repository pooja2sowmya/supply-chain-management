
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import SidebarContent from "@/components/layout/SidebarContent";
import TopNav from "@/components/layout/TopNav";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "farmer" | "distributor" | "retailer" | "admin" | "customer";
  sidebarItems: {
    label: string;
    icon: JSX.Element;
    href: string;
    notification?: number;
  }[];
}

const DashboardLayout = ({ children, role, sidebarItems }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const roleNames = {
    farmer: 'Farmer',
    distributor: 'Distributor',
    retailer: 'Retailer',
    admin: 'Administrator',
    customer: 'Customer'
  };

  const userInitials = 'JD';
  const userName = 'John Doe';

  return (
    <div className="dashboard-container">
      {/* Desktop Sidebar */}
      <SidebarContent 
        sidebarItems={sidebarItems}
        userName={userName}
        userInitials={userInitials}
        roleName={roleNames[role]}
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Navigation Bar */}
        <TopNav 
          sidebarItems={sidebarItems}
          userName={userName}
          userInitials={userInitials}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
