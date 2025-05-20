
import React from 'react';

const Services = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      
      <div className="text-center mb-12">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          HighriseBI offers comprehensive data analytics and business intelligence solutions
          to help your organization make data-driven decisions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Card 1 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Data Analytics</h3>
          <p className="text-gray-600">
            Transform your raw data into actionable insights using advanced analytics techniques.
            We help you identify trends, patterns, and correlations to guide your business decisions.
          </p>
        </div>
        
        {/* Service Card 2 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Business Intelligence</h3>
          <p className="text-gray-600">
            Comprehensive BI solutions including dashboards, reports, and data visualization tools
            to help you monitor KPIs and business metrics in real-time.
          </p>
        </div>
        
        {/* Service Card 3 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Data Integration</h3>
          <p className="text-gray-600">
            Connect and integrate data from multiple sources to create a unified view of your 
            business operations and customer interactions.
          </p>
        </div>
        
        {/* Service Card 4 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Custom Reporting</h3>
          <p className="text-gray-600">
            Tailored reporting solutions designed to meet your specific business needs and 
            deliver insights directly to stakeholders.
          </p>
        </div>
        
        {/* Service Card 5 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Predictive Analytics</h3>
          <p className="text-gray-600">
            Leverage machine learning and statistical techniques to forecast trends, predict 
            outcomes, and anticipate future business challenges.
          </p>
        </div>
        
        {/* Service Card 6 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Data Strategy Consulting</h3>
          <p className="text-gray-600">
            Strategic guidance to help you develop a comprehensive data management plan
            that aligns with your business objectives and maximizes ROI.
          </p>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to transform your data?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact us today to discuss how HighriseBI can help your organization harness the power of data.
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default Services;
