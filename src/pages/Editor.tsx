
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  Save, 
  Send, 
  Eye, 
  EyeOff, 
  Heading, 
  Image, 
  Link, 
  List,
  Tags,
  Trash2,
  Undo,
  Redo 
} from 'lucide-react';

// Components
import CKEditor from '@/components/editor/CKEditor';
import ImageUpload from '@/components/editor/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// Types from schema
import { Post } from '@/shared/schema';

// Form schema validation
const postFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  category: z.enum(['Tutorial', 'News', 'Community']),
  tags: z.array(z.string()).min(1, { message: 'Add at least one tag' }),
  metaDescription: z.string().max(160, { message: 'Meta description should be less than 160 characters' }).optional(),
  slug: z.string().optional(),
  publishDate: z.date().optional(),
  coverImage: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});

type PostFormValues = z.infer<typeof postFormSchema>;

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isEditing = Boolean(id);
  
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('content');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [editorHistory, setEditorHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize form
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'Community',
      tags: [],
      metaDescription: '',
      slug: '',
      status: 'draft',
    },
  });

  // Get form values for preview
  const formValues = form.watch();

  // Generate slug from title
  useEffect(() => {
    const title = form.watch('title');
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setSlug(generatedSlug);
      form.setValue('slug', generatedSlug);
    }
  }, [form.watch('title')]);

  // Calculate word count and read time
  useEffect(() => {
    if (content) {
      const text = content.replace(/<[^>]*>/g, ' ');
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const count = words.length;
      
      setWordCount(count);
      // Assuming average reading speed of 200 words per minute
      setReadTime(Math.ceil(count / 200));
    }
  }, [content]);

  // Track editor history for undo/redo
  useEffect(() => {
    if (content && (editorHistory.length === 0 || content !== editorHistory[editorHistory.length - 1])) {
      // Add to history if it's different from the last entry
      const newHistory = [...editorHistory.slice(0, historyIndex + 1), content];
      setEditorHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [content]);

  // Load post data if editing
  useEffect(() => {
    if (isEditing && id) {
      // Mock fetch for now - would use React Query in a real implementation
      const fetchPost = async () => {
        try {
          console.log(`Fetching post with ID: ${id}`);
          // Simulating API call
          // In a real app, use React Query: const { data } = useQuery({ queryKey: ['post', id], queryFn: () => fetchPostById(id) });
          
          // Mock data for now
          const mockPost = {
            id: Number(id),
            title: `Sample Post ${id}`,
            content: '<p>This is sample content for editing.</p>',
            category: 'Community' as const,
            tags: ['sample', 'editing'],
            metaDescription: 'This is a sample post for editing',
            slug: `sample-post-${id}`,
            publishedAt: new Date(),
            coverImage: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
          };
          
          // Populate form
          form.reset({
            title: mockPost.title,
            content: mockPost.content,
            category: mockPost.category,
            tags: mockPost.tags,
            metaDescription: mockPost.metaDescription,
            slug: mockPost.slug,
            publishDate: mockPost.publishedAt,
            coverImage: mockPost.coverImage,
          });
          
          setContent(mockPost.content);
          setTags(mockPost.tags);
          setSlug(mockPost.slug);
          setCoverImage(mockPost.coverImage);

          // Initialize editor history
          setEditorHistory([mockPost.content]);
          setHistoryIndex(0);
        } catch (error) {
          console.error('Error fetching post:', error);
          toast({
            title: 'Error',
            description: 'Failed to load the post',
            variant: 'destructive',
          });
        }
      };
      
      fetchPost();
    }
  }, [id, isEditing]);

  // Handle form submission
  const onSubmit = async (data: PostFormValues, isDraft: boolean = false) => {
    // Check if user is authorized for the category
    if ((data.category === 'Tutorial' || data.category === 'News') && user?.role !== 'admin') {
      toast({
        title: 'Permission Denied',
        description: 'Only administrators can create tutorials or news',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const postData = {
        ...data,
        content, // Using the CKEditor content
        publishedAt: isDraft ? null : (data.publishDate || new Date()),
        status: isDraft ? 'draft' : 'published',
        coverImage: coverImage,
      };
      
      console.log('Saving post:', postData);
      
      // Mock API call - would use React Query mutation in a real implementation
      // Example: const mutation = useMutation({ mutationFn: createPost });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Generate a post ID (in a real app this would come from the backend)
      const postId = isEditing ? Number(id) : Math.floor(Math.random() * 1000) + 100;
      
      toast({
        title: isDraft ? 'Draft Saved' : 'Post Published',
        description: isDraft 
          ? 'Your draft has been saved successfully' 
          : 'Your post has been published successfully',
      });
      
      // Navigate to the post page if published, otherwise to community page
      if (!isDraft) {
        navigate(`/community/${postId}`);
      } else {
        navigate('/community');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save the post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle content change from CKEditor
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    form.setValue('content', newContent);
  };

  // Handle tag input 
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    form.setValue('tags', newTags);
  };

  // Handle upload complete
  const handleUploadComplete = (imageUrl: string) => {
    // Insert image URL into CKEditor content
    const imageHtml = `<img src="${imageUrl}" alt="Uploaded image" class="my-4 max-w-full h-auto rounded-lg shadow-md" />`;
    setContent(prev => prev + imageHtml);
    form.setValue('content', content + imageHtml);
  };

  // Handle cover image upload
  const handleCoverImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
    form.setValue('coverImage', imageUrl);
    toast({
      title: 'Cover Image Uploaded',
      description: 'Your cover image has been set successfully',
    });
  };

  // Handle undo/redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousContent = editorHistory[newIndex];
      setContent(previousContent);
      form.setValue('content', previousContent);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editorHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextContent = editorHistory[newIndex];
      setContent(nextContent);
      form.setValue('content', nextContent);
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        toast({
          title: 'Post Deleted',
          description: 'Your post has been deleted successfully',
        });
        navigate('/community');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete the post. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          
          <div className="flex space-x-2">
            {isEditing && (
              <Button 
                variant="destructive" 
                onClick={handleDelete} 
                disabled={isSubmitting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Exit Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>
        
        {previewMode ? (
          <Card className="overflow-hidden shadow-lg">
            {coverImage && (
              <div className="w-full h-64 overflow-hidden">
                <img 
                  src={coverImage} 
                  alt={formValues.title || 'Cover image'} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  {formValues.category || 'Uncategorized'}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-md">
                  {readTime} min read
                </span>
              </div>
              <CardTitle className="text-3xl">{formValues.title || 'Untitled Post'}</CardTitle>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </CardContent>
            
            <CardFooter className="border-t pt-4 text-sm text-gray-500">
              {formValues.publishDate ? `To be published on ${format(formValues.publishDate, "PPP")}` : 'Draft'}
            </CardFooter>
          </Card>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 grid grid-cols-3">
                <TabsTrigger value="content" className="text-center">
                  <Heading className="mr-2 h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="metadata" className="text-center">
                  <Tags className="mr-2 h-4 w-4" />
                  Metadata
                </TabsTrigger>
                <TabsTrigger value="media" className="text-center">
                  <Image className="mr-2 h-4 w-4" />
                  Media
                </TabsTrigger>
              </TabsList>
            
              <Form {...form}>
                <form onSubmit={form.handleSubmit(data => onSubmit(data, false))} className="space-y-6">
                  <TabsContent value="content">
                    {/* Category Select - with admin restriction warning */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Community">Community</SelectItem>
                              <SelectItem value="Tutorial">Tutorial</SelectItem>
                              <SelectItem value="News">News</SelectItem>
                            </SelectContent>
                          </Select>
                          {user?.role !== 'admin' && field.value !== 'Community' && (
                            <Alert className="mt-2" variant="destructive">
                              <AlertTitle>Permission Required</AlertTitle>
                              <AlertDescription>
                                Only administrators can create tutorial or news posts.
                              </AlertDescription>
                            </Alert>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Title Input */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter post title" className="text-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Editor Tools */}
                    <div className="flex items-center mb-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        type="button"
                        onClick={handleUndo}
                        disabled={historyIndex <= 0}
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        type="button"
                        onClick={handleRedo}
                        disabled={historyIndex >= editorHistory.length - 1}
                      >
                        <Redo className="h-4 w-4" />
                      </Button>
                      <div className="ml-auto text-sm text-gray-500">
                        {wordCount} words · {readTime} min read
                      </div>
                    </div>

                    {/* Rich Text Editor */}
                    <FormItem className="mb-6">
                      <FormLabel>Content</FormLabel>
                      <CKEditor 
                        initialValue={content} 
                        onChange={handleContentChange} 
                      />
                      {form.formState.errors.content && (
                        <p className="text-sm font-medium text-destructive mt-1">
                          {form.formState.errors.content.message}
                        </p>
                      )}
                    </FormItem>
                  </TabsContent>

                  <TabsContent value="metadata">
                    {/* Slug Input (auto-generated but editable) */}
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="post-url-slug" 
                              value={slug} 
                              onChange={(e) => {
                                setSlug(e.target.value);
                                field.onChange(e);
                              }} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Tags Input */}
                    <FormItem className="mb-6">
                      <FormLabel>Tags</FormLabel>
                      <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                        {tags.map(tag => (
                          <div key={tag} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleTagsChange(tags.filter(t => t !== tag))}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <Input
                          placeholder="Add tag and press Enter"
                          className="flex-1 min-w-[150px] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              const value = input.value.trim();
                              if (value && !tags.includes(value)) {
                                handleTagsChange([...tags, value]);
                                input.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                      {form.formState.errors.tags && (
                        <p className="text-sm font-medium text-destructive mt-1">
                          {form.formState.errors.tags.message}
                        </p>
                      )}
                    </FormItem>

                    {/* Meta Description */}
                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter meta description for SEO" 
                              className="resize-none h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Publication Date Picker */}
                    <FormField
                      control={form.control}
                      name="publishDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Publication Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="media">
                    {/* Cover Image Upload */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Cover Image</h3>
                      {coverImage ? (
                        <div className="mb-4">
                          <div className="relative w-full h-48 rounded-md overflow-hidden border">
                            <img 
                              src={coverImage} 
                              alt="Cover" 
                              className="w-full h-full object-cover" 
                            />
                            <Button 
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setCoverImage(null)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed rounded-md p-6 text-center mb-4">
                          <p className="mb-2 text-gray-500">Upload a cover image for your post</p>
                          <ImageUpload onUploadComplete={handleCoverImageUpload} />
                        </div>
                      )}
                    </div>

                    {/* Image Upload for Content */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-2">Add Image to Content</h3>
                      <p className="text-sm text-gray-500 mb-4">Upload an image to insert into your post content</p>
                      <ImageUpload onUploadComplete={handleUploadComplete} />
                    </div>

                    {/* YouTube Video Embed */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">YouTube Video</h3>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Paste YouTube URL" 
                          id="youtube-url"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('youtube-url') as HTMLInputElement;
                            const url = input.value;
                            if (!url) return;

                            let videoId = '';
                            try {
                              const urlObj = new URL(url);
                              if (urlObj.hostname === 'youtu.be') {
                                videoId = urlObj.pathname.slice(1);
                              } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
                                videoId = urlObj.searchParams.get('v') || '';
                              }

                              if (videoId) {
                                const embedCode = `<div class="aspect-w-16 aspect-h-9 mb-4">
                                  <iframe 
                                    src="https://www.youtube.com/embed/${videoId}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                    class="w-full h-full rounded-lg"
                                  ></iframe>
                                </div>`;
                                
                                handleContentChange(content + embedCode);
                                input.value = '';
                                setActiveTab('content');
                                toast({
                                  title: "Video Embedded",
                                  description: "Your YouTube video has been added to the content"
                                });
                              } else {
                                toast({
                                  title: "Invalid URL",
                                  description: "Could not extract YouTube video ID",
                                  variant: "destructive"
                                });
                              }
                            } catch (e) {
                              toast({
                                title: "Invalid URL",
                                description: "Please enter a valid YouTube URL",
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          Embed
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Submission Buttons - shown on all tabs */}
                  <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={() => form.handleSubmit(data => onSubmit(data, true))()}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save as Draft
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Publishing...' : 'Publish'}
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
