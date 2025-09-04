import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
interface ImageUploadBoxProps {
  onImageUpload: (file: File | null) => void;
  uploadedImage: File | null;
}

// @component: ImageUploadBox
export const ImageUploadBox = ({
  onImageUpload,
  uploadedImage
}: ImageUploadBoxProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  }, []);
  const handleFileSelect = useCallback((file: File) => {
    onImageUpload(file);
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    // Allow selecting the same file again later
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [onImageUpload]);
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);
  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    onImageUpload(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageUpload]);
  // Clicking is handled by the overlaid <input>; no manual trigger to avoid double-open

  // @return
  return <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">
        <span>Product Image</span>
      </h3>
      
      {previewUrl ? <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="relative group">
          <div className="relative bg-card border border-border rounded-lg overflow-hidden">
            <img src={previewUrl} alt="Uploaded product preview" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
            <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={handleRemoveImage} className="absolute top-3 right-3 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/90">
              <X className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">File:</span> <span>{uploadedImage?.name}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Size:</span> <span>{uploadedImage ? (uploadedImage.size / 1024 / 1024).toFixed(2) : '0'} MB</span>
            </p>
          </div>
        </motion.div> : <motion.div whileHover={{
      scale: 1.01
    }} whileTap={{
      scale: 0.99
    }} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${isDragOver ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-accent/50'}`}>
          <div className="space-y-4">
            <motion.div animate={isDragOver ? {
          scale: 1.1
        } : {
          scale: 1
        }} className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              {isDragOver ? <Upload className="w-8 h-8 text-primary" /> : <ImageIcon className="w-8 h-8 text-muted-foreground" />}
            </motion.div>
            
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-foreground">
                <span>{isDragOver ? 'Drop your image here' : 'Upload Product Image'}</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                <span>Drag and drop your image here, or click to browse</span>
              </p>
              <p className="text-xs text-muted-foreground">
                <span>Supports JPG, PNG, WebP up to 5MB</span>
              </p>
            </div>
          </div>
          
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </motion.div>}
    </div>;
};
