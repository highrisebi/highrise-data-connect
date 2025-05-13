
import React, { useState } from 'react';
import { uploadImage } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';

interface ImageUploadProps {
  onUploadComplete: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Images must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPEG, PNG, GIF, or WebP image",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);

      // Upload the image
      const result = await uploadImage(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Pass the image URL to the parent component
      onUploadComplete(result.url);
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 h-auto py-3"
          disabled={isUploading}
        >
          <label className="cursor-pointer flex items-center justify-center w-full">
            {isUploading ? (
              <>
                <Upload className="h-5 w-5 mr-2 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Image className="h-5 w-5 mr-2" />
                Choose Image
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </Button>
      </div>
      
      {progress > 0 && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">
            {progress < 100 ? `${progress}%` : 'Complete!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
