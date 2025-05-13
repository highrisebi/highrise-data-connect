
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from '@tanstack/react-query';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mock data for community posts
const recentPosts = [
  {
    id: 1,
    title: 'Boost your data analytics with these top conversion strategies',
    excerpt: 'Learn how to transform your data into actionable insights that drive business growth.',
    author: 'Rachel Thompson',
    date: 'November 10, 2024',
    readTime: '7 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 2,
    title: 'The ultimate guide to creating a standout data portfolio in 2024',
    excerpt: 'Showcase your data analytics skills with these portfolio tips and tricks.',
    author: 'Michael Chen',
    date: 'November 10, 2024',
    readTime: '5 min read',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 3,
    title: 'How to optimize your dashboard for faster loading times',
    excerpt: 'Speed up your data visualizations and improve user experience with these optimization tips.',
    author: 'Sofia Rodriguez',
    date: 'November 9, 2024',
    readTime: '4 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=400&h=280'
  },
];

const featuredPosts = [
  {
    id: 4,
    title: 'How to balance creativity and functionality in dashboard design',
    excerpt: 'Create beautiful dashboards that are both functional and visually appealing.',
    date: 'November 10, 2024',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 5,
    title: 'Top mistakes to avoid when building your first data pipeline',
    excerpt: 'Common pitfalls to avoid when setting up data infrastructure for your business.',
    date: 'November 9, 2024',
    readTime: '8 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=400&h=280'
  },
  {
    id: 6,
    title: 'How to create user-friendly analytics dashboards',
    excerpt: 'Design principles for dashboards that are easy to understand and use.',
    date: 'November 8, 2024',
    readTime: '5 min read',
    category: 'UX Design',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=400&h=280'
  }
];

const categories = [
  'Business Intelligence', 'Data Visualization', 'Excel Tips', 
  'Analytics', 'Reporting', 'Dashboard Design', 
  'Data Cleaning', 'Case Studies', 'Industry Trends'
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
    <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
      {category}
    </span>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Community Stories & Articles
              </h1>
              <p className="text-xl text-gray-600">
                A place to read, write, and deepen your understanding of business intelligence.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80" 
                  alt="Featured article" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load community posts. Please try again later.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">Loading community posts...</p>
          </div>
        ) : (
          <>
            {/* Recent Blogs Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Recent Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
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
                    <CardHeader className="p-6">
                      <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                      <p className="text-gray-500 text-sm mb-4">
                        {post.author && <span className="font-medium">{post.author} · </span>}
                        {post.date} · {post.readTime}
                      </p>
                      <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-6">
                      <Link
                        to={`/community/${post.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Blog Categories Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Blog Categories</h2>
              <div className="flex flex-wrap gap-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/community?category=${encodeURIComponent(category)}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Blogs Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Featured Blogs</h2>
                <Link to="/community" className="text-blue-600 hover:underline">
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
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
                    <CardHeader className="p-6">
                      <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                      <p className="text-gray-500 text-sm mb-4">
                        {post.date} · {post.readTime}
                      </p>
                      <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-6">
                      <Link
                        to={`/community/${post.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Mobile Categories Accordion (visible on small screens) */}
            <div className="md:hidden mb-12">
              <Accordion type="single" collapsible>
                <AccordionItem value="categories">
                  <AccordionTrigger>Browse Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          to={`/community?category=${encodeURIComponent(category)}`}
                          className="px-3 py-1.5 text-gray-700 hover:bg-gray-50 rounded"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Community;
