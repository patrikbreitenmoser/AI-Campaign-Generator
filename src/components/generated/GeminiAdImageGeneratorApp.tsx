import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ImageUploadBox } from './ImageUploadBox';
import { AdditionalInfoTextarea } from './AdditionalInfoTextarea';
import { GeneratedIdeasGrid } from './GeneratedIdeasGrid';
import { HighResImageModal } from './HighResImageModal';
interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
  }>;
}
interface ModalImage {
  url: string;
  alt: string;
  title: string;
}

// @component: GeminiAdImageGeneratorApp
export const GeminiAdImageGeneratorApp = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);
  const [error, setError] = useState<string>('');
  const handleImageUpload = useCallback((file: File) => {
    setUploadedImage(file);
    setError('');
  }, []);
  const handleAdditionalInfoChange = useCallback((value: string) => {
    setAdditionalInfo(value);
  }, []);
  const handleGenerateIdeas = useCallback(async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }
    setIsGenerating(true);
    setError('');
    try {
      // Simulate API call - in real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock generated ideas data
      const mockIdeas: GeneratedIdea[] = [{
        id: '1',
        title: 'Premium Lifestyle Campaign',
        description: 'Elegant lifestyle imagery showcasing the product in sophisticated settings',
        images: [{
          id: '1-1',
          url: 'https://picsum.photos/400/300?random=1',
          alt: 'Premium lifestyle ad variant 1'
        }, {
          id: '1-2',
          url: 'https://picsum.photos/400/300?random=2',
          alt: 'Premium lifestyle ad variant 2'
        }, {
          id: '1-3',
          url: 'https://picsum.photos/400/300?random=3',
          alt: 'Premium lifestyle ad variant 3'
        }]
      }, {
        id: '2',
        title: 'Bold & Dynamic Campaign',
        description: 'High-energy visuals with vibrant colors and dynamic compositions',
        images: [{
          id: '2-1',
          url: 'https://picsum.photos/400/300?random=4',
          alt: 'Bold dynamic ad variant 1'
        }, {
          id: '2-2',
          url: 'https://picsum.photos/400/300?random=5',
          alt: 'Bold dynamic ad variant 2'
        }, {
          id: '2-3',
          url: 'https://picsum.photos/400/300?random=6',
          alt: 'Bold dynamic ad variant 3'
        }]
      }];
      setGeneratedIdeas(mockIdeas);
    } catch (err) {
      setError('Failed to generate ideas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [uploadedImage, additionalInfo]);
  const handleImageClick = useCallback((image: {
    url: string;
    alt: string;
  }, ideaTitle: string) => {
    setModalImage({
      url: image.url,
      alt: image.alt,
      title: ideaTitle
    });
  }, []);
  const handleCloseModal = useCallback(() => {
    setModalImage(null);
  }, []);

  // @return
  return <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.header initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            <span>Gemini AI Ad Generator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span>Upload your product image and let AI generate compelling advertising campaigns with multiple creative variations</span>
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.section initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.1
        }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                <span>Upload & Configure</span>
              </h2>
              
              <div className="space-y-6">
                <ImageUploadBox onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
                
                <AdditionalInfoTextarea value={additionalInfo} onChange={handleAdditionalInfoChange} />
                
                {error && <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-destructive text-sm font-medium">
                      <span>{error}</span>
                    </p>
                  </motion.div>}
                
                <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={handleGenerateIdeas} disabled={isGenerating || !uploadedImage} className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-primary/90">
                  {isGenerating ? <span className="flex items-center justify-center gap-3">
                      <motion.div animate={{
                    rotate: 360
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                      <span>Generating Ideas & Images...</span>
                    </span> : <span>Generate Ideas & Images</span>}
                </motion.button>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.2
        }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                <span>Generated Campaigns</span>
              </h2>
              
              <GeneratedIdeasGrid ideas={generatedIdeas} isLoading={isGenerating} onImageClick={handleImageClick} />
            </div>
          </motion.section>
        </div>
      </div>

      {modalImage && <HighResImageModal image={modalImage} onClose={handleCloseModal} />}
    </div>;
};