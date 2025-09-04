import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Maximize2 } from 'lucide-react';
interface ModalImage {
  url: string;
  alt: string;
  title: string;
}
interface HighResImageModalProps {
  image: ModalImage;
  onClose: () => void;
}

// @component: HighResImageModal
export const HighResImageModal = ({
  image,
  onClose
}: HighResImageModalProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.replace(/\s+/g, '_').toLowerCase()}_ad_image.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [image.url, image.title]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  // @return
  return <AnimatePresence>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={handleBackdropClick} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} transition={{
        type: "spring",
        damping: 25,
        stiffness: 300
      }} className="relative max-w-6xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background/90 to-transparent p-4 pointer-events-none">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">
                  <span>{image.title}</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  <span>High Resolution Preview</span>
                </p>
              </div>
              
              <div className="flex items-center gap-2 pointer-events-auto">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={handleDownload} className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200" title="Download image">
                  <Download className="w-4 h-4" />
                </motion.button>
                
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={onClose} className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors duration-200" title="Close modal">
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="relative w-full min-h-[400px] max-h-[80vh] overflow-auto pt-16 pb-12 flex items-center justify-center">
            <img src={image.url} alt={image.alt} className="max-w-full max-h-full object-contain" />
            
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Maximize2 className="w-3 h-3" />
                <span>Click outside to close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};
