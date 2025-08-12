
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface SidebarContentProps {
  sidebarItems: {
    label: string;
    icon: React.ReactNode;
    href: string;
    notification?: number;
  }[];
  userName: string;
  userInitials: string;
  roleName: string;
  handleLogout: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  sidebarItems,
  userName,
  userInitials,
  roleName,
  handleLogout,
  isSidebarOpen,
  toggleSidebar
}) => {
  const location = useLocation();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 lg:static lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-agri-green-100 rounded-md">
              <div className="w-6 h-6 text-agri-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" />
                  <path d="M12 2v10l4.24 4.24" />
                </svg>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-900">AgriTrace</span>
          </div>
          <button 
            type="button"
            className="p-2 text-gray-500 rounded-md lg:hidden"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex items-center p-4 border-b border-gray-200">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="" alt={userName} />
            <AvatarFallback className="bg-agri-green-200 text-agri-green-700">{userInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{roleName}</p>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={index}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm rounded-md group ${
                  isActive
                    ? 'bg-agri-green-100 text-agri-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 mr-3">
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.notification && (
                  <Badge className="bg-agri-green-500 hover:bg-agri-green-600">
                    {item.notification}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarContent;
