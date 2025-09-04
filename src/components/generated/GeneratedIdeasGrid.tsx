import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
interface GeneratedImage {
  id: string;
  url: string;
  alt: string;
}
interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  images: GeneratedImage[];
}
interface GeneratedIdeasGridProps {
  ideas: GeneratedIdea[];
  isLoading: boolean;
  onImageClick: (image: {
    url: string;
    alt: string;
  }, ideaTitle: string) => void;
}
const PLACEHOLDER_CARDS = Array.from({
  length: 3
}, (_, i) => ({
  id: `placeholder-${i}`
}));

// @component: GeneratedIdeasGrid
export const GeneratedIdeasGrid = ({
  ideas,
  isLoading,
  onImageClick
}: GeneratedIdeasGridProps) => {
  const placeholderIdeas = useMemo<GeneratedIdea[]>(() => {
    const TITLES = [
      'Golden Hour Gatherings',
      'The Culinary Retreat',
      'Unstoppable Craving',
      'Urban Rooftop Moments',
      'Cozy Afternoon Break',
    ];
    return TITLES.slice(0, 3).map((title, i) => ({
      id: `ph-idea-${i}`,
      title,
      description: 'Example prompt preview. Upload an image to generate personalized campaigns.',
      images: [],
    }));
  }, []);
  // @return
  return <div className="space-y-8">
      {isLoading ? <div className="space-y-8">
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}>
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-medium text-foreground">
                <span>AI is generating your campaigns...</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              <span>This may take a few moments while we analyze your image and create compelling ad variations</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_CARDS.map((placeholder, index) => <motion.div key={placeholder.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3] bg-muted animate-pulse">
                  <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary" />
                  </motion.div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </motion.div>)}
          </div>
        </div> : ideas.length === 0 ? <div className="space-y-12">
          {(placeholderIdeas).map((idea, ideaIndex) => <motion.div key={idea.id} initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: ideaIndex * 0.1
      }} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      <span>{idea.title}</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-11">
                {[1, 2, 3].map((_, imageIndex) => (
                  <motion.div key={`ph-${imageIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ideaIndex * 0.1 + imageIndex * 0.05 }} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="relative aspect-[4/3] bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>)}
        </div> : <div className="space-y-12">
          {ideas.map((idea, ideaIndex) => <motion.div key={idea.id} initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: ideaIndex * 0.2
      }} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      <span>{idea.title}</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-11">
                {(idea.images && idea.images.length > 0 ? idea.images : [1, 2, 3]).map((image: any, imageIndex: number) => (
                  idea.images && idea.images.length > 0 ?
                  <motion.div key={image.id} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: ideaIndex * 0.2 + imageIndex * 0.1
          }} whileHover={{
            scale: 1.02
          }} className="group cursor-pointer" onClick={() => onImageClick(image, idea.title)}>
                    <div className="relative bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden">
                        <img src={image.url} alt={image.alt} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-100" />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                      
                      <motion.div initial={{
                opacity: 0
              }} whileHover={{
                opacity: 1
              }} className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm p-3 rounded-full">
                          <Eye className="w-5 h-5 text-foreground" />
                        </div>
                      </motion.div>
                      
                    </div>
                  </motion.div>
                  :
                  <motion.div key={`ph-${imageIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ideaIndex * 0.2 + imageIndex * 0.05 }} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="relative aspect-[4/3] bg-muted animate-pulse">
                      <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary" />
                      </motion.div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>)}
        </div>}
    </div>;
};
