import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, ImageIcon } from 'lucide-react';
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
  length: 6
}, (_, i) => ({
  id: `placeholder-${i}`
}));

// @component: GeneratedIdeasGrid
export const GeneratedIdeasGrid = ({
  ideas,
  isLoading,
  onImageClick
}: GeneratedIdeasGridProps) => {
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
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </motion.div>)}
          </div>
        </div> : ideas.length === 0 ? <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="space-y-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                <span>AI Campaign Generator</span>
              </h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              <span>Upload your product image to generate multiple AI-powered advertising campaigns with compelling visuals and copy</span>
            </p>
          </div>

          {/* Preview of what will be generated */}
          <div className="space-y-8">
            {/* Mock Campaign 1 */}
            <div className="space-y-4 opacity-40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  <span>Premium Lifestyle Campaign</span>
                </h4>
              </div>
              <p className="text-muted-foreground ml-11 text-sm">
                <span>Sophisticated visuals targeting affluent customers with elegant compositions</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11">
                {[1, 2, 3].map(i => <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border rounded-lg overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">
                        <span>Variation {i}</span>
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Mock Campaign 2 */}
            <div className="space-y-4 opacity-30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  <span>Social Media Ready</span>
                </h4>
              </div>
              <p className="text-muted-foreground ml-11 text-sm">
                <span>Optimized for Instagram, Facebook, and TikTok with engaging formats</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11">
                {[1, 2, 3].map(i => <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border rounded-lg overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">
                        <span>Variation {i}</span>
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Mock Campaign 3 */}
            <div className="space-y-4 opacity-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  <span>Bold & Dynamic</span>
                </h4>
              </div>
              <p className="text-muted-foreground ml-11 text-sm">
                <span>High-energy campaigns with vibrant colors and action-oriented messaging</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11">
                {[1, 2, 3].map(i => <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border rounded-lg overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">
                        <span>Variation {i}</span>
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span>Upload an image above to generate personalized campaigns like these</span>
            </p>
          </div>
        </motion.div> : <div className="space-y-12">
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
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    <span>{idea.title}</span>
                  </h3>
                </div>
                <p className="text-muted-foreground ml-11">
                  <span>{idea.description}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-11">
                {idea.images.map((image, imageIndex) => <motion.div key={image.id} initial={{
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
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={image.url} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                      
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">
                          <span>Variation {imageIndex + 1}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>}
    </div>;
};