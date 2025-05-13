
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Save, Send } from 'lucide-react';

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

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
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
          });
          
          setContent(mockPost.content);
          setTags(mockPost.tags);
          setSlug(mockPost.slug);
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
      };
      
      console.log('Saving post:', postData);
      
      // Mock API call - would use React Query mutation in a real implementation
      // Example: const mutation = useMutation({ mutationFn: createPost });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      toast({
        title: isDraft ? 'Draft Saved' : 'Post Published',
        description: isDraft 
          ? 'Your draft has been saved successfully' 
          : 'Your post has been published successfully',
      });
      
      // Navigate to community page after successful save
      navigate('/community');
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
    const imageHtml = `<img src="${imageUrl}" alt="Uploaded image" />`;
    setContent(prev => prev + imageHtml);
    form.setValue('content', content + imageHtml);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        {isEditing && <p className="text-gray-600 mb-4">Editing post with ID: {id}</p>}
        
        {/* Toggle Preview Mode */}
        <div className="mb-6 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>
        </div>
        
        {previewMode ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{formValues.title || 'Untitled Post'}</h2>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                {formValues.category || 'Uncategorized'}
              </span>
              {tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <div 
              className="prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(data => onSubmit(data, false))} className="space-y-6">
              {/* Category Select - with admin restriction warning */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug Input (auto-generated but editable) */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
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
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
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
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter meta description for SEO" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rich Text Editor */}
              <FormItem>
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

              {/* Image Upload */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-md font-medium mb-2">Add Image</h3>
                <ImageUpload onUploadComplete={handleUploadComplete} />
              </div>

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

              {/* Submission Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
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
                  Publish
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Editor;
