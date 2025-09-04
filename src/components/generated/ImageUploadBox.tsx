import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
interface ImageUploadBoxProps {
  onImageUpload: (file: File) => void;
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
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // @return
  return <div className="space-y-4" data-magicpath-id="0" data-magicpath-path="ImageUploadBox.tsx">
      <h3 className="text-lg font-medium text-foreground" data-magicpath-id="1" data-magicpath-path="ImageUploadBox.tsx">
        <span data-magicpath-id="2" data-magicpath-path="ImageUploadBox.tsx">Product Image</span>
      </h3>
      
      {previewUrl ? <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="relative group" data-magicpath-id="3" data-magicpath-path="ImageUploadBox.tsx">
          <div className="relative bg-card border border-border rounded-lg overflow-hidden" data-magicpath-id="4" data-magicpath-path="ImageUploadBox.tsx">
            <img src={previewUrl} alt="Uploaded product preview" className="w-full h-64 object-cover" data-magicpath-id="5" data-magicpath-path="ImageUploadBox.tsx" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" data-magicpath-id="6" data-magicpath-path="ImageUploadBox.tsx" />
            <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={handleRemoveImage} className="absolute top-3 right-3 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/90" data-magicpath-id="7" data-magicpath-path="ImageUploadBox.tsx">
              <X className="w-4 h-4" data-magicpath-id="8" data-magicpath-path="ImageUploadBox.tsx" />
            </motion.button>
          </div>
          
          <div className="mt-3 p-3 bg-muted rounded-lg" data-magicpath-id="9" data-magicpath-path="ImageUploadBox.tsx">
            <p className="text-sm text-muted-foreground" data-magicpath-id="10" data-magicpath-path="ImageUploadBox.tsx">
              <span className="font-medium" data-magicpath-id="11" data-magicpath-path="ImageUploadBox.tsx">File:</span> <span data-magicpath-id="12" data-magicpath-path="ImageUploadBox.tsx">{uploadedImage?.name}</span>
            </p>
            <p className="text-sm text-muted-foreground" data-magicpath-id="13" data-magicpath-path="ImageUploadBox.tsx">
              <span className="font-medium" data-magicpath-id="14" data-magicpath-path="ImageUploadBox.tsx">Size:</span> <span data-magicpath-id="15" data-magicpath-path="ImageUploadBox.tsx">{uploadedImage ? (uploadedImage.size / 1024 / 1024).toFixed(2) : '0'} MB</span>
            </p>
          </div>
        </motion.div> : <motion.div whileHover={{
      scale: 1.01
    }} whileTap={{
      scale: 0.99
    }} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick} className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${isDragOver ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-accent/50'}`} data-magicpath-id="16" data-magicpath-path="ImageUploadBox.tsx">
          <div className="space-y-4" data-magicpath-id="17" data-magicpath-path="ImageUploadBox.tsx">
            <motion.div animate={isDragOver ? {
          scale: 1.1
        } : {
          scale: 1
        }} className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center" data-magicpath-id="18" data-magicpath-path="ImageUploadBox.tsx">
              {isDragOver ? <Upload className="w-8 h-8 text-primary" data-magicpath-id="19" data-magicpath-path="ImageUploadBox.tsx" /> : <ImageIcon className="w-8 h-8 text-muted-foreground" data-magicpath-id="20" data-magicpath-path="ImageUploadBox.tsx" />}
            </motion.div>
            
            <div className="space-y-2" data-magicpath-id="21" data-magicpath-path="ImageUploadBox.tsx">
              <h4 className="text-lg font-medium text-foreground" data-magicpath-id="22" data-magicpath-path="ImageUploadBox.tsx">
                <span data-magicpath-id="23" data-magicpath-path="ImageUploadBox.tsx">{isDragOver ? 'Drop your image here' : 'Upload Product Image'}</span>
              </h4>
              <p className="text-sm text-muted-foreground" data-magicpath-id="24" data-magicpath-path="ImageUploadBox.tsx">
                <span data-magicpath-id="25" data-magicpath-path="ImageUploadBox.tsx">Drag and drop your image here, or click to browse</span>
              </p>
              <p className="text-xs text-muted-foreground" data-magicpath-id="26" data-magicpath-path="ImageUploadBox.tsx">
                <span data-magicpath-id="27" data-magicpath-path="ImageUploadBox.tsx">Supports JPG, PNG, WebP up to 10MB</span>
              </p>
            </div>
          </div>
          
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" data-magicpath-id="28" data-magicpath-path="ImageUploadBox.tsx" />
        </motion.div>}
    </div>;
};