
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, CalendarIcon, ChevronRight, User } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for community posts
const recentPosts = [
  {
    id: 1,
    title: 'Boost your online sales with these top conversion strategies',
    excerpt: 'Learn how to transform your data into actionable insights that drive business growth.',
    author: 'Courtney Henry',
    date: 'November 10, 2024',
    readTime: '2 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 2,
    title: 'The ultimate guide to creating a standout portfolio in 2024',
    excerpt: 'Showcase your data analytics skills with these portfolio tips and tricks.',
    author: 'Michael Chen',
    date: 'November 10, 2024',
    readTime: '7 min read',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 3,
    title: 'How to optimize your website for faster loading times',
    excerpt: 'Speed up your data visualizations and improve user experience with these optimization tips.',
    author: 'Sofia Rodriguez',
    date: 'November 10, 2024',
    readTime: '4 min read',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 4,
    title: '5 design trends shaping the future of digital experiences',
    excerpt: 'Create beautiful dashboards that are both functional and visually appealing.',
    author: 'Alex Johnson',
    date: 'November 10, 2024',
    readTime: '5 min read',
    category: 'Hobbies',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=280'
  }
];

const featuredPosts = [
  {
    id: 5,
    title: 'How to balance creativity and functionality in web design',
    excerpt: 'Common pitfalls to avoid when setting up data infrastructure for your business.',
    author: 'Emily Davis',
    date: 'November 10, 2024',
    readTime: '6 min read',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 6,
    title: 'Top mistakes to avoid when building your first website',
    excerpt: 'Design principles for dashboards that are easy to understand and use.',
    author: 'Marcus Johnson',
    date: 'November 10, 2024',
    readTime: '3 min read',
    category: 'Hobbies',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 7,
    title: 'How to create user-friendly websites that convert',
    excerpt: 'Design principles for dashboards that are easy to understand and use.',
    author: 'Sarah Williams',
    date: 'November 10, 2024',
    readTime: '8 min read',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 8,
    title: 'The impact of color psychology in web design',
    excerpt: 'How colors influence user perception and behavior on your website.',
    author: 'David Lee',
    date: 'November 10, 2024',
    readTime: '5 min read',
    category: 'Work Life',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 9,
    title: 'How to choose the right typography for your website',
    excerpt: 'A guide to selecting fonts that enhance readability and user experience.',
    author: 'Jessica Taylor',
    date: 'November 10, 2024',
    readTime: '4 min read',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 10,
    title: 'How to use animations to enhance user experience',
    excerpt: 'Effective animation techniques that improve engagement without sacrificing performance.',
    author: 'Ryan Martinez',
    date: 'November 10, 2024',
    readTime: '6 min read',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=280'
  }
];

const categories = [
  'Hobbies', 'Gaming', 'Automotive', 'Pet Care', 'Science',
  'Work Life', 'Social Issues', 'Entertainment', 'Travel & Culture', 'Technology', 'Lifestyle'
];

// Mock fetch function for posts
const fetchCommunityPosts = async () => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return { recentPosts, featuredPosts };
};

const Community = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['communityPosts'],
    queryFn: fetchCommunityPosts
  });

  // Category rendering helper
  const renderCategoryBadge = (category: string) => (
    <Badge variant="outline" className="bg-white text-gray-800 font-medium px-3 py-1 rounded-full">
      {category}
    </Badge>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Global Stories <br /> & Articles
              </h1>
              <p className="text-xl text-gray-600">
                A place to read, write, and deepen your understanding
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80" 
                  alt="Featured article" 
                  className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-lg">
                  <Badge variant="outline" className="mb-2 bg-white">Design & Culture</Badge>
                  <h3 className="text-lg font-semibold mb-1">The psychology of color impact in web design</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon className="w-4 h-4 mr-1" /> November 11, 2024
                    <span className="mx-2">•</span> 
                    <Clock className="w-4 h-4 mr-1" /> 7 min
                  </div>
                  <Button variant="link" size="sm" className="px-0 text-gray-900 hover:text-gray-700 flex items-center">
                    Read more <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load community posts. Please try again later.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {/* Recent Blogs Section */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold mb-12">Recent Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main featured post */}
                <div className="md:col-span-6">
                  <Card className="overflow-hidden border-0 shadow-lg h-full">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={recentPosts[0].image} 
                          alt={recentPosts[0].title} 
                          className="object-cover w-full h-full rounded-t-lg"
                        />
                      </AspectRatio>
                      <div className="absolute top-4 left-4">
                        {renderCategoryBadge(recentPosts[0].category)}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold line-clamp-2 mb-3">{recentPosts[0].title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <User className="w-4 h-4 mr-1" /> {recentPosts[0].author}
                        <span className="mx-2">•</span>
                        <CalendarIcon className="w-4 h-4 mr-1" /> {recentPosts[0].date}
                        <span className="mx-2">•</span> 
                        <Clock className="w-4 h-4 mr-1" /> {recentPosts[0].readTime}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Button variant="default" className="bg-black hover:bg-gray-800 text-white px-5 rounded-full">
                        Read more <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Right side posts */}
                <div className="md:col-span-6 space-y-8">
                  {recentPosts.slice(1, 4).map((post, index) => (
                    <div key={post.id} className="flex gap-6 items-start">
                      <div className="w-1/3">
                        <div className="relative">
                          <AspectRatio ratio={4/3}>
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="object-cover w-full h-full rounded-lg" 
                            />
                          </AspectRatio>
                          <div className="absolute top-2 left-2">
                            {renderCategoryBadge(post.category)}
                          </div>
                        </div>
                      </div>
                      <div className="w-2/3 space-y-2">
                        <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                        <div className="flex flex-wrap text-sm text-gray-500">
                          <CalendarIcon className="w-4 h-4 mr-1" /> {post.date}
                          <span className="mx-2">•</span> 
                          <Clock className="w-4 h-4 mr-1" /> {post.readTime}
                        </div>
                        <Button variant="link" className="px-0 text-black hover:text-gray-700 flex items-center">
                          Read more <ChevronRight className="ml-1 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Categories Section */}
            <section className="mb-24">
              <h2 className="text-3xl font-bold mb-8">Blog Categories</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/community?category=${encodeURIComponent(category)}`}
                    className="px-5 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Blogs Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold">Featured Blogs</h2>
                <Link to="/community" className="text-black hover:text-gray-700 flex items-center">
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.slice(0, 6).map(post => (
                  <Card key={post.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <div className="absolute top-4 left-4">
                        {renderCategoryBadge(post.category)}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold line-clamp-2 mb-2">{post.title}</h3>
                      <div className="flex text-sm text-gray-500 mb-4">
                        <CalendarIcon className="w-4 h-4 mr-1" /> {post.date}
                        <span className="mx-2">•</span> 
                        <Clock className="w-4 h-4 mr-1" /> {post.readTime}
                      </div>
                      <Button variant="link" className="px-0 text-black hover:text-gray-700 flex items-center">
                        Read more <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Community;
