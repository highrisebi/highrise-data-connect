
// Mock schema definitions
// In a real app, this would be Drizzle ORM schema definitions

export interface User {
  id: string;
  email: string;
  password: string; // Would be hashed in a real app
  role: 'admin' | 'user';
  createdAt: Date;
  profileImage?: string; // Added profileImage as optional property
}

export interface Post {
  id: string; // Changed from number to string
  title: string;
  content: string;
  authorId: string; // Changed from number to string
  category: 'Tutorial' | 'News' | 'Community';
  tags: string[];
  createdAt: Date;
  publishedAt: Date | null;
}

export interface Comment {
  id: string; // Changed from number to string
  content: string;
  authorId: string; // Changed from number to string
  postId: string; // Changed from number to string
  createdAt: Date;
}

// Example of what actual Drizzle schema would look like:
/*
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id),
  category: text('category', { enum: ['Tutorial', 'News', 'Community'] }).notNull(),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id),
  postId: integer('post_id').references(() => posts.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
*/
