
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPostId, getUserById } from '@/lib/db';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const postData = getPostById(id);
          
          if (postData) {
            setPost(postData);
            
            const commentsData = getCommentsByPostId(id);
            setComments(commentsData);
            
            const userData = getUserById(postData.authorId);
            setAuthor(userData);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p>The post you're looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unpublished';

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <div>
              <CardTitle className="text-3xl mb-2">{post.title}</CardTitle>
              <CardDescription>
                {formattedDate} | <Badge>{post.category}</Badge>
              </CardDescription>
            </div>
            {author && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{author.email}</p>
                  <p className="text-xs text-muted-foreground">Author</p>
                </div>
                <Avatar>
                  <AvatarImage src={author.profileImage || undefined} />
                  <AvatarFallback>{author.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <p>{post.content}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-muted-foreground text-sm">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </div>
          <Button variant="outline">Share</Button>
        </CardFooter>
      </Card>
      
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => {
            const commentAuthor = getUserById(comment.authorId);
            return (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={commentAuthor?.profileImage || undefined} />
                      <AvatarFallback>{commentAuthor?.email[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{commentAuthor?.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Post;
