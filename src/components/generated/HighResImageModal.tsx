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
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="HighResImageModal.tsx">
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={handleBackdropClick} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" data-magicpath-id="1" data-magicpath-path="HighResImageModal.tsx">
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
      }} className="relative max-w-6xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden shadow-2xl" data-magicpath-id="2" data-magicpath-path="HighResImageModal.tsx">
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background/90 to-transparent p-4" data-magicpath-id="3" data-magicpath-path="HighResImageModal.tsx">
            <div className="flex items-center justify-between" data-magicpath-id="4" data-magicpath-path="HighResImageModal.tsx">
              <div className="space-y-1" data-magicpath-id="5" data-magicpath-path="HighResImageModal.tsx">
                <h2 className="text-lg font-semibold text-foreground" data-magicpath-id="6" data-magicpath-path="HighResImageModal.tsx">
                  <span data-magicpath-id="7" data-magicpath-path="HighResImageModal.tsx">{image.title}</span>
                </h2>
                <p className="text-sm text-muted-foreground" data-magicpath-id="8" data-magicpath-path="HighResImageModal.tsx">
                  <span data-magicpath-id="9" data-magicpath-path="HighResImageModal.tsx">High Resolution Preview</span>
                </p>
              </div>
              
              <div className="flex items-center gap-2" data-magicpath-id="10" data-magicpath-path="HighResImageModal.tsx">
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={handleDownload} className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200" title="Download image" data-magicpath-id="11" data-magicpath-path="HighResImageModal.tsx">
                  <Download className="w-4 h-4" data-magicpath-id="12" data-magicpath-path="HighResImageModal.tsx" />
                </motion.button>
                
                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={onClose} className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors duration-200" title="Close modal" data-magicpath-id="13" data-magicpath-path="HighResImageModal.tsx">
                  <X className="w-4 h-4" data-magicpath-id="14" data-magicpath-path="HighResImageModal.tsx" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full min-h-[400px] max-h-[80vh] overflow-hidden" data-magicpath-id="15" data-magicpath-path="HighResImageModal.tsx">
            <img src={image.url} alt={image.alt} className="w-full h-full object-contain" data-magicpath-id="16" data-magicpath-path="HighResImageModal.tsx" />
            
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full" data-magicpath-id="17" data-magicpath-path="HighResImageModal.tsx">
              <div className="flex items-center gap-2 text-xs text-muted-foreground" data-magicpath-id="18" data-magicpath-path="HighResImageModal.tsx">
                <Maximize2 className="w-3 h-3" data-magicpath-id="19" data-magicpath-path="HighResImageModal.tsx" />
                <span data-magicpath-id="20" data-magicpath-path="HighResImageModal.tsx">Click outside to close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};