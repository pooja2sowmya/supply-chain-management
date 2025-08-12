
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Menu, User, Bell, LogOut, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';

interface TopNavProps {
  sidebarItems: {
    label: string;
    icon: React.ReactNode;
    href: string;
    notification?: number;
  }[];
  userName: string;
  userInitials: string;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const TopNav: React.FC<TopNavProps> = ({
  sidebarItems,
  userName,
  userInitials,
  toggleSidebar,
  handleLogout
}) => {
  return (
    <header className="z-10 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm sm:px-6">
      <div className="flex flex-1 items-center gap-4">
        <button 
          type="button"
          className="lg:hidden p-2 text-gray-500 rounded-md"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <AlignLeft className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="p-4 border-b">
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
            </div>
            <nav className="flex-1 overflow-auto py-2">
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="flex items-center justify-center w-6 h-6 mr-3">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.notification && (
                    <div className="bg-agri-green-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                      {item.notification}
                    </div>
                  )}
                </a>
              ))}
              <Separator className="my-2" />
              <a
                href="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <span className="flex items-center justify-center w-6 h-6 mr-3">
                  <LogOut className="w-5 h-5" />
                </span>
                <span className="flex-1">Logout</span>
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 bg-gray-50 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />

        <Separator orientation="vertical" className="h-8" />

        <UserDropdown 
          userName={userName} 
          userInitials={userInitials} 
          handleLogout={handleLogout} 
        />
      </div>
    </header>
  );
};

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-64 overflow-auto">
          <div className="flex items-start gap-4 p-3 hover:bg-gray-50">
            <div className="flex-shrink-0 rounded bg-agri-green-100 p-1 text-agri-green-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">New harvest added</p>
              <p className="text-xs text-gray-500">Farmer added 500kg of Rice</p>
              <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-3 hover:bg-gray-50">
            <div className="flex-shrink-0 rounded bg-blue-100 p-1 text-blue-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Shipment status updated</p>
              <p className="text-xs text-gray-500">Order #1234 is now in transit</p>
              <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 text-center">
          <Button variant="ghost" size="sm" className="w-full text-agri-green-600">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdown = ({ userName, userInitials, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="" alt={userName} />
            <AvatarFallback className="bg-agri-green-200 text-agri-green-700">{userInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
            {userName}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopNav;
