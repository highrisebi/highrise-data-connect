
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our services? Need data analytics solutions? 
            We'd love to hear from you. Reach out using any of the methods below.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+84 88 666 8890</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:duong@highrisebi.com" className="hover:text-blue-600">duong@highrisebi.com</a>
                </p>
                <p className="text-gray-600">
                  <a href="mailto:highrisebi@gmail.com" className="hover:text-blue-600">highrisebi@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Scan to Connect</h2>
            <div className="bg-white p-4 shadow-lg rounded-lg inline-block">
              <img 
                src="/lovable-uploads/1f8ee609-93eb-4a8f-980c-d9421a670529.png" 
                alt="Contact QR Code" 
                className="h-64 w-auto" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Message subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
