
import React, { useState } from 'react';
import { uploadImage } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';

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

    try {
      setIsUploading(true);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 200);

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
    <div className="mb-4">
      <div className="flex items-center">
        <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          {isUploading ? 'Uploading...' : 'Choose File'}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {progress > 0 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {progress < 100 ? `Uploading: ${progress}%` : 'Upload complete!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
