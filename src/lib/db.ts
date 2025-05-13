
// Mock Drizzle ORM setup
// In a real implementation, this would connect to the database

import { User, Post } from '@/shared/schema';

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'hashed_password', // This would be properly hashed in production
    role: 'admin',
    createdAt: new Date('2023-01-01')
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'hashed_password',
    role: 'user',
    createdAt: new Date('2023-01-02')
  }
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Data Analytics',
    content: 'This is a tutorial about getting started with data analytics...',
    authorId: 1,
    category: 'Tutorial',
    tags: ['beginner', 'analytics', 'excel'],
    createdAt: new Date('2023-01-10'),
    publishedAt: new Date('2023-01-10')
  },
  {
    id: 2,
    title: 'New Feature: Advanced Excel Reports',
    content: 'We are excited to announce our new feature: advanced Excel reports...',
    authorId: 1,
    category: 'News',
    tags: ['announcement', 'excel', 'reports'],
    createdAt: new Date('2023-01-15'),
    publishedAt: new Date('2023-01-15')
  },
  {
    id: 3,
    title: 'Question about Dashboard Design',
    content: 'I have a question about designing effective dashboards...',
    authorId: 2,
    category: 'Community',
    tags: ['question', 'dashboard', 'design'],
    createdAt: new Date('2023-01-20'),
    publishedAt: new Date('2023-01-20')
  }
];

// Mock DB functions
export const db = {
  // Users
  getUsers: async (): Promise<User[]> => {
    return [...mockUsers];
  },
  
  getUserById: async (id: number): Promise<User | undefined> => {
    return mockUsers.find(user => user.id === id);
  },
  
  getUserByEmail: async (email: string): Promise<User | undefined> => {
    return mockUsers.find(user => user.email === email);
  },
  
  // Posts
  getPosts: async (): Promise<Post[]> => {
    return [...mockPosts];
  },
  
  getPostById: async (id: number): Promise<Post | undefined> => {
    return mockPosts.find(post => post.id === id);
  },
  
  getPostsByAuthor: async (authorId: number): Promise<Post[]> => {
    return mockPosts.filter(post => post.authorId === authorId);
  },
  
  getPostsByCategory: async (category: Post['category']): Promise<Post[]> => {
    return mockPosts.filter(post => post.category === category);
  }
};
