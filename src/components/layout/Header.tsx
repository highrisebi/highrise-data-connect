
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">HighriseBI</Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link to="/community" className="text-gray-700 hover:text-blue-600">Community</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-blue-600">
                  <Bell className="h-5 w-5" />
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImage || ''} />
                      <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5 text-sm font-medium">{user?.email}</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/editor">Editor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account-settings">Account Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
