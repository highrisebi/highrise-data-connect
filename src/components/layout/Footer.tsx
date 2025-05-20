
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Home, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/6ef14066-8b8f-406f-9a6b-1fe1dd875e31.png" 
                alt="HighriseBI Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="text-xl font-bold">HighriseBI</span>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Empowering businesses with data-driven insights and analytics solutions.
            </p>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+84 88 666 8890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:duong@highrisebi.com" className="hover:text-blue-400">duong@highrisebi.com</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:highrisebi@gmail.com" className="hover:text-blue-400">highrisebi@gmail.com</a>
              </li>
            </ul>
          </div>
          
          {/* Sitemap */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                <Link to="/" className="hover:text-blue-400">Home</Link>
              </li>
              <li className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <Link to="/services" className="hover:text-blue-400">Services</Link>
              </li>
              <li className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <Link to="/community" className="hover:text-blue-400">Community</Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <Link to="/contact" className="hover:text-blue-400">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* QR Code */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Scan to Connect</h3>
            <div className="bg-white p-2 rounded-lg inline-block">
              <img 
                src="/lovable-uploads/1f8ee609-93eb-4a8f-980c-d9421a670529.png" 
                alt="Contact QR Code" 
                className="h-32 w-auto" 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} HighriseBI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
