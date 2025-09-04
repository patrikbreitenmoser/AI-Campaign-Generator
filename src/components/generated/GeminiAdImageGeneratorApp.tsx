import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ImageUploadBox } from './ImageUploadBox';
import { AdditionalInfoTextarea } from './AdditionalInfoTextarea';
import { IdeasGrid } from '@/components/IdeasGrid';
import { HighResImageModal } from './HighResImageModal';
import { analyzeImage, generateBatch } from '@/lib/api';
import { Sparkles } from 'lucide-react';
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
  const requestRef = useRef<AbortController | null>(null);
  const handleImageUpload = useCallback((file: File | null) => {
    // Cancel any in-flight request when image changes
    if (requestRef.current) {
      requestRef.current.abort();
      requestRef.current = null;
    }
    setUploadedImage(file);
    setGeneratedIdeas([]);
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
    // Client-side size check (<= 5MB)
    if (uploadedImage.size > 5 * 1024 * 1024) {
      setError('Image exceeds 5MB limit');
      return;
    }
    setIsGenerating(true);
    setError('');
    // Abort previous request if any
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    try {
      const ideas = await analyzeImage(uploadedImage, additionalInfo, { signal: controller.signal });
      const mapped: GeneratedIdea[] = ideas.map(i => ({
        id: i.id,
        title: i.title,
        description: i.description,
        images: [],
      }));
      setGeneratedIdeas(mapped);
      // Show ideas immediately
      setIsGenerating(false);

      // Generate three diverse images per idea using batch endpoint
      try {
        const batchItems = mapped.map(idea => ({
          id: idea.id,
          title: idea.title,
          description: idea.description,
          count: 3, // Generate 3 variants per idea
        }));

        const batchResults = await generateBatch(
          batchItems,
          uploadedImage,
          additionalInfo,
          { signal: controller.signal, concurrency: 2 }
        );

        // Update all ideas with their generated images at once
        setGeneratedIdeas(prev =>
          prev.map(idea => {
            const result = batchResults.find(r => r.id === idea.id);
            return {
              ...idea,
              images: result?.images || [],
            };
          })
        );
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          return; // Swallow aborted requests quietly
        }
        // If batch generation fails, show error but keep the ideas
        console.error('Batch image generation failed:', e);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Swallow aborted requests quietly
        return;
      }
      const message = err instanceof Error ? err.message : 'Failed to generate ideas. Please try again.';
      setError(message);
    } finally {
      requestRef.current = null;
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              <span>AI Campaign Generator</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span>Upload your product image to generate multiple AI-powered advertising campaigns with compelling visuals and copy</span>
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
              
              <IdeasGrid ideas={generatedIdeas} isLoading={isGenerating} onImageClick={handleImageClick} additionalInfo={additionalInfo} />
            </div>
          </motion.section>
        </div>
      </div>

      {modalImage && <HighResImageModal image={modalImage} onClose={handleCloseModal} />}
    </div>;
};
