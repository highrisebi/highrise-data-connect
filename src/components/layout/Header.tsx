
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">HighriseBI</Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
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
          )}
          
          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            {isAuthenticated && (
              <button className="text-gray-700 hover:text-blue-600 mr-4">
                <Bell className="h-5 w-5" />
              </button>
            )}
            
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none mr-4">
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
            )}
            
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link to="/community" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
              Community
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            {!isAuthenticated && (
              <Link to="/auth/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
