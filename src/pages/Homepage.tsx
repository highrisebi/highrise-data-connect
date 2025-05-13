
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600">A+ Business Trusted</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                The Organic Flow<br />of Data Efficiency
              </h1>
              
              <p className="text-gray-600">
                Explore why you should grow yours reports, analytics, trends, manage data with AI and ultimately your entire business workflow.
              </p>
              
              <Button size="lg" className="rounded-full px-6">
                Get started
              </Button>
            </div>
            
            <div className="relative h-full flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-800 text-white p-4 rounded-lg flex flex-col justify-center">
                  <div className="text-xl font-bold">40+</div>
                  <div className="flex -space-x-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                  </div>
                  <div className="text-xs mt-2">We grow with our talented team members</div>
                </div>
                
                <div className="row-span-2">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=600&q=80" 
                    alt="Professional headshot" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" 
                    alt="Plant" 
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <div className="flex justify-between">
                    <div className="text-xs text-gray-500">Design</div>
                    <div className="text-xs text-gray-900">Learn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smarter Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1 rounded-full bg-gray-50">
              Monitor and analyze
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Doing smarter, not harder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better productivity, gain greater results, and grow your enterprise with our advanced data tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            <div className="lg:col-span-3 bg-gray-50 p-5 rounded-lg">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-6 h-6 bg-green-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs">D</span>
                </div>
                <span className="font-medium">HighriseBI</span>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="font-semibold">Dashboard</div>
                <div className="text-gray-500">Projects</div>
                <div className="text-gray-500">Calendar</div>
                <div className="text-gray-500">Reports</div>
                <div className="text-gray-500">Users</div>
                <div className="text-gray-500">Settings</div>
              </div>
            </div>
            
            <div className="lg:col-span-9 bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-sm text-gray-500">Active Users</div>
                  <div className="text-2xl font-bold">471,678</div>
                  <div className="text-xs text-green-600">+2.45% from last week</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Product Revenue</div>
                  <div className="text-2xl font-bold">$17,435</div>
                  <div className="text-xs text-green-600">+4.75% from last month</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Times of Use</div>
                  <div className="text-2xl font-bold">3,254</div>
                  <div className="text-xs text-red-500">-1.23% from yesterday</div>
                </div>
              </div>
              
              <div className="h-40 border-b border-t py-4 flex items-end">
                <div className="h-full w-full bg-gray-50 relative">
                  <svg viewBox="0 0 400 100" className="w-full h-full stroke-green-500 stroke-2 fill-none">
                    <path d="M0,50 C100,30 150,70 200,50 C250,30 300,50 400,20" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">First Name Last Name</div>
                      <div className="text-xs text-gray-500">firstname@example.com</div>
                    </div>
                  </div>
                  <div className="text-green-700">+$2,300.00</div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">Another User</div>
                      <div className="text-xs text-gray-500">another@example.com</div>
                    </div>
                  </div>
                  <div className="text-green-700">+$850.00</div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium">Third Person</div>
                      <div className="text-xs text-gray-500">third@example.com</div>
                    </div>
                  </div>
                  <div className="text-green-700">+$795.00</div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button variant="outline" className="rounded-full">
                  Get this demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1 rounded-full bg-white">
              Recent Updates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our latest innovation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our next-gen dashboard includes sophisticated analytics tools that will transform how your business performs and delivers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="space-y-6">
              <Card className="border shadow-none bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <div className="w-6 h-6 bg-green-700 text-white rounded flex items-center justify-center text-xs">P</div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Performance</h3>
                      <p className="text-gray-600 text-sm">
                        Advanced reports, dashboards, and dashboards let you monitor, analyze, and optimize business operations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-none bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <div className="w-6 h-6 bg-green-700 text-white rounded flex items-center justify-center text-xs">A</div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Accessibility</h3>
                      <p className="text-gray-600 text-sm">
                        21% higher rating than other tools for every organization, because everyone matters to us.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-none bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <div className="w-6 h-6 bg-green-700 text-white rounded flex items-center justify-center text-xs">I</div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Innovation</h3>
                      <p className="text-gray-600 text-sm">
                        Whatever your goals are, building products, orders, sales, etc. collaboration and productivity will improve.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80" 
                alt="Person using laptop" 
                className="w-full h-auto object-cover rounded-lg"
              />
              
              <div className="absolute bottom-8 right-8">
                <div className="bg-white p-4 rounded-lg shadow-lg w-64">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-1 text-sm">
                      <span>Connect with Service</span>
                      <div className="flex -space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>
                        <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium">Project Meeting</div>
                      <div className="text-xs text-gray-500">Tomorrow @ 3PM</div>
                    </div>
                    <Button variant="outline" size="sm" className="h-6 text-xs bg-white">
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-5 gap-8 mb-8 justify-items-center">
            <img src="https://via.placeholder.com/100x30" alt="Client logo" className="h-8" />
            <img src="https://via.placeholder.com/100x30" alt="Client logo" className="h-8" />
            <img src="https://via.placeholder.com/100x30" alt="Client logo" className="h-8" />
            <img src="https://via.placeholder.com/100x30" alt="Client logo" className="h-8" />
            <img src="https://via.placeholder.com/100x30" alt="Client logo" className="h-8" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-medium mb-8">
              HighriseBI has made client management so much easier and keeps our workflow organized and efficient. Highly recommend!
            </p>
            
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Emily Carter" 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <div className="font-medium">Emily Carter</div>
                <div className="text-sm text-gray-500">Marketing Manager</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1 rounded-full bg-gray-50">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprises. Select a plan that works for your needs with predictable billing and no increasing costs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="font-medium mb-1">Pro</h3>
                  <p className="text-sm text-gray-500">Perfect for individuals</p>
                  
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$29.90</span>
                    <span className="text-gray-500 text-sm">/per month</span>
                  </div>
                  
                  <Button className="w-full mt-4 rounded-lg" variant="outline">
                    Get started
                  </Button>
                </div>
                
                <div className="border-t p-6">
                  <h4 className="text-sm font-medium mb-4">Key features:</h4>
                  <ul className="space-y-3">
                    {['Up to 10 projects', 'Up to 5 users', 'Up to 20 tasks', 'Task management'].map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="font-medium mb-1">Business</h3>
                  <p className="text-sm text-gray-500">Perfect for teams</p>
                  
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$49.90</span>
                    <span className="text-gray-500 text-sm">/per month</span>
                  </div>
                  
                  <Button className="w-full mt-4 rounded-lg bg-green-800 hover:bg-green-900">
                    Get started
                  </Button>
                </div>
                
                <div className="border-t p-6">
                  <h4 className="text-sm font-medium mb-4">Key features:</h4>
                  <ul className="space-y-3">
                    {['Up to 100 projects', 'Up to 20 users', 'Up to 50 tasks', 'Task management'].map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">The Latest Buzz in Tech</h2>
            <div className="flex items-center">
              <span className="text-sm mr-2">View all</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <Link to="/community">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80" 
                    alt="Blog post" 
                    className="w-full h-64 object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">How AI is Rapidly Transforming Our Modern Everyday Life</h3>
                </div>
                <div className="flex justify-between mt-4 items-center">
                  <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200">Technology</Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    Read more <ArrowRight className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </Link>
            </div>
            
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Link to="/community">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="Blog post" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Badge className="mb-1 bg-gray-100 text-gray-600 hover:bg-gray-200">Trends</Badge>
                      <h3 className="text-base font-bold mb-1">The Future of AI: What's Coming Next?</h3>
                      <span className="text-sm text-gray-500">Read more</span>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div>
                <Link to="/community">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="Blog post" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Badge className="mb-1 bg-gray-100 text-gray-600 hover:bg-gray-200">Business</Badge>
                      <h3 className="text-base font-bold mb-1">How AI is Boosting Modern Business Growth</h3>
                      <span className="text-sm text-gray-500">Read more</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your business?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of companies using HighriseBI to improve efficiency and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-green-800">
              Request a demo
            </Button>
            <Button size="lg" className="rounded-full bg-white text-green-800 hover:bg-gray-100">
              Start free trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
