
// This is a mock database implementation for development
// In a real app, this would be replaced by an actual database connection

import { User, Post, Comment } from '@/shared/schema';

// Mock data
export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    createdAt: new Date('2023-01-15'),
    profileImage: '/lovable-uploads/39739171-e649-42e9-900c-f588d7d31d90.png'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password456',
    role: 'user',
    createdAt: new Date('2023-02-20')
  }
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Data Analysis',
    content: 'This is a comprehensive guide to help you begin your journey in data analysis...',
    authorId: '1',
    category: 'Tutorial',
    tags: ['beginners', 'data analysis', 'guide'],
    createdAt: new Date('2023-03-10'),
    publishedAt: new Date('2023-03-12')
  },
  {
    id: '2',
    title: 'Advanced Visualization Techniques',
    content: 'Take your data visualization skills to the next level with these advanced techniques...',
    authorId: '1',
    category: 'Tutorial',
    tags: ['advanced', 'visualization', 'techniques'],
    createdAt: new Date('2023-04-05'),
    publishedAt: new Date('2023-04-07')
  },
  {
    id: '3',
    title: 'Upcoming Community Webinar',
    content: 'Join us next month for an exciting community webinar on the latest trends in BI...',
    authorId: '2',
    category: 'Community',
    tags: ['webinar', 'community', 'events'],
    createdAt: new Date('2023-05-15'),
    publishedAt: new Date('2023-05-16')
  },
  {
    id: '4',
    title: 'New Feature Release',
    content: 'We are excited to announce the release of our latest feature...',
    authorId: '1',
    category: 'News',
    tags: ['release', 'features', 'updates'],
    createdAt: new Date('2023-06-20'),
    publishedAt: null
  }
];

export const comments: Comment[] = [
  {
    id: '1',
    content: 'This is really helpful, thank you!',
    authorId: '2',
    postId: '1',
    createdAt: new Date('2023-03-13')
  },
  {
    id: '2',
    content: 'Looking forward to the webinar!',
    authorId: '1',
    postId: '3',
    createdAt: new Date('2023-05-17')
  }
];

// Mock database operations
export const getPostById = (id: string) => {
  return posts.find(post => post.id === id);
};

export const getPostsByCategory = (category: Post['category']) => {
  return posts.filter(post => post.category === category);
};

export const getCommentsByPostId = (postId: string) => {
  return comments.filter(comment => comment.postId === postId);
};

export const getUserById = (id: string) => {
  return users.find(user => user.id === id);
};

export const createPost = (post: Omit<Post, 'id' | 'createdAt'>) => {
  const newPost: Post = {
    ...post,
    id: (posts.length + 1).toString(),
    createdAt: new Date(),
  };
  posts.push(newPost);
  return newPost;
};

export const updatePost = (updatedPost: Post) => {
  const index = posts.findIndex(post => post.id === updatedPost.id);
  if (index >= 0) {
    posts[index] = updatedPost;
    return posts[index];
  }
  return null;
};
