
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { 
  MessageSquare, 
  CalendarIcon, 
  Clock, 
  Share, 
  Heart, 
  Bookmark, 
  ChevronRight,
  User
} from 'lucide-react';

// Mock fetch function for post details
const fetchPostDetails = async (id: string) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  // Get post from mock db
  const post = await db.getPostById(Number(id));
  
  if (!post) {
    throw new Error(`Post with ID ${id} not found`);
  }
  
  // For demo purposes, we'll enhance the post with more data
  return {
    ...post,
    author: "Courtney Henry",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    readTime: "5 min read",
    publishedDate: "November 10, 2024",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200",
    likes: 47,
    comments: 12,
    relatedPosts: [
      {
        id: 101,
        title: "How to optimize your website for faster loading times",
        excerpt: "Speed up your data visualizations and improve user experience with these optimization tips.",
        author: "Sofia Rodriguez",
        date: "November 8, 2024",
        readTime: "4 min read",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=300&h=200"
      },
      {
        id: 102,
        title: "The importance of typography in web design",
        excerpt: "A guide to selecting fonts that enhance readability and user experience.",
        author: "Jessica Taylor",
        date: "November 6, 2024",
        readTime: "6 min read",
        category: "Design",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=200"
      },
      {
        id: 103,
        title: "Building interactive dashboards with React",
        excerpt: "Create beautiful dashboards that are both functional and visually appealing.",
        author: "Alex Johnson",
        date: "November 4, 2024",
        readTime: "8 min read",
        category: "Development",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=200"
      }
    ],
    comments: [
      {
        id: 201,
        author: "Michael Chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
        content: "This is a great article! I've learned a lot about modern portfolio features.",
        date: "November 11, 2024",
        likes: 5
      },
      {
        id: 202,
        author: "Sarah Williams",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120",
        content: "I would add that accessibility is another crucial feature for any modern website. It ensures that your portfolio can be used by everyone, regardless of abilities.",
        date: "November 11, 2024",
        likes: 8,
        replies: [
          {
            id: 2021,
            author: "Courtney Henry",
            authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
            content: "Absolutely! Accessibility is definitely a crucial aspect that I should have included. Thanks for pointing that out.",
            date: "November 11, 2024",
            likes: 3
          }
        ]
      }
    ]
  };
};

const Post = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostDetails(id || '1'),
    enabled: !!id
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-xl font-medium text-red-700">Error Loading Article</h1>
          <p className="mt-2 text-red-600">We couldn't load this article. It may have been removed or doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/community">Back to Community</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <Link to="/" className="hover:text-gray-800">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/community" className="hover:text-gray-800">Community</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-800">{post.category}</span>
              </div>
            </div>
            
            {/* Category and Post Info */}
            <div className="mb-4">
              <Badge variant="outline" className="bg-white text-gray-800 font-medium px-3 py-1 rounded-full">
                {post.category}
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">{post.title}</h1>
              
              <div className="flex items-center mb-8">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                  <span className="font-medium text-gray-900">{post.author}</span>
                  <div className="flex items-center mt-1 sm:mt-0 sm:ml-4">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-500 mr-4">{post.publishedDate}</span>
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full object-cover h-[400px]"
              />
            </div>
            
            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              
              {/* Content Blocks - For demo purposes */}
              <p className="text-lg leading-relaxed mb-6">
                In today's digital landscape, having a strong online presence is essential for professionals across all industries. Your portfolio website is often the first point of contact between you and potential clients, employers, or collaborators, making it crucial to stand out from the competition.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-5">Insights and Strategies</h2>
              
              <p className="mb-6">
                Creating an effective portfolio isn't simply about showcasing your past projects. It's about telling a compelling story that highlights your unique strengths, your problem-solving capabilities, and your creative vision. Here are the key features that every modern portfolio website should include:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Responsive and fluid design</strong> that adapts seamlessly across all devices and screen sizes.</li>
                <li><strong>Clear information architecture</strong> that guides visitors toward your most valuable content.</li>
                <li><strong>Engaging visuals and interactions</strong> that keep visitors interested without overwhelming them.</li>
                <li><strong>Fast load times</strong> and smooth animations to provide an optimal user experience.</li>
              </ul>
              
              <p className="mb-6">
                Remember that your portfolio should evolve as you grow professionally. Regularly updating your work not only shows your latest capabilities but also demonstrates your commitment to improvement and growth in your field.
              </p>
              
              <blockquote className="border-l-4 border-black pl-6 italic my-8">
                "It's always seems impossible until it's done. Every great design is a stunning challenge, yet persistence and faith have a way of transforming dreams into reality." — Nelson Mandela
              </blockquote>
              
              <h2 className="text-2xl font-bold mt-10 mb-5">As Have to Achieves Always People</h2>
              
              <p className="mb-6">
                Great design isn't simply the art of making things look good—it's about solving real-world problems in elegant and intuitive ways. When approaching your portfolio, think about the challenges your target audience faces and how your work demonstrates solutions to those problems. Show not only the final outcome but also glimpses into your process, highlighting key decisions and how they contributed to the project's success.
              </p>
              
              <div className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=800"
                  alt="Colorful abstract design"
                  className="rounded-xl w-full"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Creative design thinking brings compelling results</p>
              </div>
              
              <h2 className="text-2xl font-bold mt-10 mb-5">The Fixed Enormity, This Thousands Turner</h2>
              
              <p className="mb-6">
                The choice and consistency in styling theme is essential for creating a memorable and cohesive visual identity for your portfolio. When building your site, focus on creating a visual language that aligns with your personal brand. Consider how color, typography, and space work together to convey meaning and emotion that reflects your professional identity.
              </p>
            </article>
            
            {/* Article Actions */}
            <div className="flex justify-between items-center mt-10 py-6 border-t border-b">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-500 hover:text-gray-900">
                  <Heart className="h-5 w-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-gray-900">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-500 hover:text-gray-900">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="flex items-center text-gray-500 hover:text-gray-900">
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{post.author}</h3>
                  <p className="text-sm text-gray-600">Content Strategist & UX Designer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Courtney is a professional content strategist and UX designer with over 10 years of experience in creating user-centered digital experiences. She specializes in bridging the gap between design and content strategy.
              </p>
              <Button variant="outline" className="mt-4">View profile</Button>
            </div>
            
            {/* Comments Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Comments ({post.comments?.length || 0})</h3>
              
              {/* Comment Form */}
              <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea 
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Join the discussion..."
                    ></textarea>
                    <Button className="mt-2">Post Comment</Button>
                  </div>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-6">
                {post.comments?.map((comment) => (
                  <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{comment.author}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.content}</p>
                        <div className="flex items-center mt-3 space-x-4">
                          <button className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                            <Heart className="h-4 w-4 mr-1" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-sm text-gray-500 hover:text-gray-900">Reply</button>
                        </div>
                        
                        {/* Nested Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-6 pl-4 border-l-2 border-gray-100 space-y-4">
                            {comment.replies.map(reply => (
                              <div key={reply.id} className="pt-2">
                                <div className="flex items-start">
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                                    <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-medium">{reply.author}</h5>
                                      <span className="text-xs text-gray-500">{reply.date}</span>
                                    </div>
                                    <p className="mt-1 text-gray-700">{reply.content}</p>
                                    <div className="flex items-center mt-2 space-x-4">
                                      <button className="flex items-center text-xs text-gray-500 hover:text-gray-900">
                                        <Heart className="h-3 w-3 mr-1" />
                                        <span>{reply.likes}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Related Articles */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-4">Related Articles</h3>
              <div className="space-y-6">
                {post.relatedPosts?.map(related => (
                  <Link key={related.id} to={`/community/${related.id}`} className="block group">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg">
                        <img 
                          src={related.image} 
                          alt={related.title} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">{related.title}</h4>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{related.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Button variant="link" className="mt-4 w-full" asChild>
                <Link to="/community" className="flex items-center justify-center">
                  View all articles
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl text-white">
              <h3 className="text-lg font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-300 text-sm mb-4">Get the latest articles and insights delivered to your inbox weekly.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded text-black" 
                  placeholder="Your email address"
                />
                <Button className="w-full bg-white text-black hover:bg-gray-200">Subscribe</Button>
              </form>
            </div>
            
            {/* Advertisement */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="text-center">
                <span className="text-xs uppercase text-gray-400 tracking-wider">Advertisement</span>
                <div className="mt-2 aspect-video bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400">Ad Placement</span>
                </div>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Design", "UX", "Portfolio", "Productivity", "Websites", "Frontend", "Strategy", "Typography"].map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for the post page while loading
const PostSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <Skeleton className="h-4 w-40" />
            </div>
            
            <div className="mb-8">
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-12 w-3/4" />
            </div>
            
            <div className="flex items-center mb-8">
              <Skeleton className="h-10 w-10 rounded-full mr-3" />
              <div>
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-3 w-60" />
              </div>
            </div>
            
            <Skeleton className="h-[400px] w-full mb-8" />
            
            <div className="space-y-4 mb-8">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-xl">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex space-x-4">
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-20 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <Skeleton className="h-6 w-48 mb-4 bg-gray-700" />
              <Skeleton className="h-4 w-full mb-4 bg-gray-700" />
              <Skeleton className="h-10 w-full mb-2 bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
