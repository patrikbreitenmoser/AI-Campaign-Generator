import React from 'react';
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
  return <div className="space-y-8" data-magicpath-id="0" data-magicpath-path="GeneratedIdeasGrid.tsx">
      {isLoading ? <div className="space-y-8" data-magicpath-id="1" data-magicpath-path="GeneratedIdeasGrid.tsx">
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="text-center py-8" data-magicpath-id="2" data-magicpath-path="GeneratedIdeasGrid.tsx">
            <div className="flex items-center justify-center gap-3 mb-4" data-magicpath-id="3" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }} data-magicpath-id="4" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-medium text-foreground" data-magicpath-id="5" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <span data-magicpath-id="6" data-magicpath-path="GeneratedIdeasGrid.tsx">AI is generating your campaigns...</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground" data-magicpath-id="7" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <span data-magicpath-id="8" data-magicpath-path="GeneratedIdeasGrid.tsx">This may take a few moments while we analyze your image and create compelling ad variations</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-magicpath-id="9" data-magicpath-path="GeneratedIdeasGrid.tsx">
            {PLACEHOLDER_CARDS.map((placeholder, index) => <motion.div key={placeholder.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="bg-card border border-border rounded-lg overflow-hidden" data-magicpath-id="10" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <div className="aspect-[4/3] bg-muted animate-pulse" data-magicpath-id="11" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                <div className="p-4 space-y-3" data-magicpath-id="12" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <div className="h-4 bg-muted rounded animate-pulse" data-magicpath-id="13" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" data-magicpath-id="14" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                </div>
              </motion.div>)}
          </div>
        </div> : ideas.length === 0 ? <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="text-center py-16 bg-card border border-border rounded-lg" data-magicpath-id="15" data-magicpath-path="GeneratedIdeasGrid.tsx">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4" data-magicpath-id="16" data-magicpath-path="GeneratedIdeasGrid.tsx">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2" data-magicpath-id="17" data-magicpath-path="GeneratedIdeasGrid.tsx">
            <span data-magicpath-id="18" data-magicpath-path="GeneratedIdeasGrid.tsx">Ready to Generate</span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto" data-magicpath-id="19" data-magicpath-path="GeneratedIdeasGrid.tsx">
            <span data-magicpath-id="20" data-magicpath-path="GeneratedIdeasGrid.tsx">Upload your product image and click "Generate Ideas & Images" to see AI-powered advertising campaigns</span>
          </p>
        </motion.div> : <div className="space-y-12" data-magicpath-id="21" data-magicpath-path="GeneratedIdeasGrid.tsx">
          {ideas.map((idea, ideaIndex) => <motion.div key={idea.id} initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: ideaIndex * 0.2
      }} className="space-y-6" data-magicpath-id="22" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <div className="space-y-3" data-magicpath-id="23" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <div className="flex items-center gap-3" data-magicpath-id="24" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center" data-magicpath-id="25" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground" data-magicpath-id="26" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <span data-magicpath-id="27" data-magicpath-path="GeneratedIdeasGrid.tsx">{idea.title}</span>
                  </h3>
                </div>
                <p className="text-muted-foreground ml-11" data-magicpath-id="28" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <span data-magicpath-id="29" data-magicpath-path="GeneratedIdeasGrid.tsx">{idea.description}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-11" data-magicpath-id="30" data-magicpath-path="GeneratedIdeasGrid.tsx">
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
          }} className="group cursor-pointer" onClick={() => onImageClick(image, idea.title)} data-magicpath-id="31" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <div className="relative bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200" data-magicpath-id="32" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <div className="aspect-[4/3] overflow-hidden" data-magicpath-id="33" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <img src={image.url} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-magicpath-id="34" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" data-magicpath-id="35" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      
                      <motion.div initial={{
                opacity: 0
              }} whileHover={{
                opacity: 1
              }} className="absolute inset-0 flex items-center justify-center" data-magicpath-id="36" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <div className="bg-background/90 backdrop-blur-sm p-3 rounded-full" data-magicpath-id="37" data-magicpath-path="GeneratedIdeasGrid.tsx">
                          <Eye className="w-5 h-5 text-foreground" data-magicpath-id="38" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                        </div>
                      </motion.div>
                      
                      <div className="p-4" data-magicpath-id="39" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <p className="text-sm text-muted-foreground" data-magicpath-id="40" data-magicpath-path="GeneratedIdeasGrid.tsx">
                          <span data-magicpath-id="41" data-magicpath-path="GeneratedIdeasGrid.tsx">Variation {imageIndex + 1}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>}
    </div>;
};