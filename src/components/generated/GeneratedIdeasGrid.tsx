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
    }} className="space-y-8 py-12" data-magicpath-id="15" data-magicpath-path="GeneratedIdeasGrid.tsx">
          <div className="text-center space-y-4" data-magicpath-id="16" data-magicpath-path="GeneratedIdeasGrid.tsx">
            <div className="flex items-center justify-center gap-3 mb-6" data-magicpath-id="17" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center" data-magicpath-id="18" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground" data-magicpath-id="19" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <span data-magicpath-id="20" data-magicpath-path="GeneratedIdeasGrid.tsx">AI Campaign Generator</span>
              </h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-magicpath-id="21" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <span data-magicpath-id="22" data-magicpath-path="GeneratedIdeasGrid.tsx">Upload your product image to generate multiple AI-powered advertising campaigns with compelling visuals and copy</span>
            </p>
          </div>

          {/* Preview of what will be generated */}
          <div className="space-y-8" data-magicpath-id="23" data-magicpath-path="GeneratedIdeasGrid.tsx">
            {/* Mock Campaign 1 */}
            <div className="space-y-4 opacity-40" data-magicpath-id="24" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <div className="flex items-center gap-3" data-magicpath-id="25" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center" data-magicpath-id="26" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground" data-magicpath-id="27" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <span data-magicpath-id="28" data-magicpath-path="GeneratedIdeasGrid.tsx">Premium Lifestyle Campaign</span>
                </h4>
              </div>
              <p className="text-muted-foreground ml-11 text-sm" data-magicpath-id="29" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <span data-magicpath-id="30" data-magicpath-path="GeneratedIdeasGrid.tsx">Sophisticated visuals targeting affluent customers with elegant compositions</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11" data-magicpath-id="31" data-magicpath-path="GeneratedIdeasGrid.tsx">
                {[1, 2, 3].map(i => <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border rounded-lg overflow-hidden" data-magicpath-id="32" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center" data-magicpath-id="34" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" data-magicpath-id="35" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      </div>
                    </div>
                    <div className="p-3" data-magicpath-id="36" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <p className="text-xs text-muted-foreground" data-magicpath-id="37" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <span data-magicpath-id="38" data-magicpath-path="GeneratedIdeasGrid.tsx">Variation {i}</span>
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Mock Campaign 2 */}
            <div className="space-y-4 opacity-30" data-magicpath-id="39" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <div className="flex items-center gap-3" data-magicpath-id="40" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center" data-magicpath-id="41" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground" data-magicpath-id="42" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <span data-magicpath-id="43" data-magicpath-path="GeneratedIdeasGrid.tsx">Social Media Ready</span>
                </h4>
              </div>
              <p className="text-muted-foreground ml-11 text-sm" data-magicpath-id="44" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <span data-magicpath-id="45" data-magicpath-path="GeneratedIdeasGrid.tsx">Optimized for Instagram, Facebook, and TikTok with engaging formats</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11" data-magicpath-id="46" data-magicpath-path="GeneratedIdeasGrid.tsx">
                {[1, 2, 3].map(i => <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border rounded-lg overflow-hidden" data-magicpath-id="47" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center" data-magicpath-id="48" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center" data-magicpath-id="49" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" data-magicpath-id="50" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      </div>
                    </div>
                    <div className="p-3" data-magicpath-id="51" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <p className="text-xs text-muted-foreground" data-magicpath-id="52" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <span data-magicpath-id="53" data-magicpath-path="GeneratedIdeasGrid.tsx">Variation {i}</span>
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Mock Campaign 3 */}
            <div className="space-y-4 opacity-20" data-magicpath-id="54" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <div className="flex items-center gap-3" data-magicpath-id="55" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center" data-magicpath-id="56" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground" data-magicpath-id="57" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <span data-magicpath-id="58" data-magicpath-path="GeneratedIdeasGrid.tsx">Bold & Dynamic</span>
                </h4>
              </div>
              <p className="text-muted-foreground ml-11 text-sm" data-magicpath-id="59" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <span data-magicpath-id="60" data-magicpath-path="GeneratedIdeasGrid.tsx">High-energy campaigns with vibrant colors and action-oriented messaging</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-11" data-magicpath-id="61" data-magicpath-path="GeneratedIdeasGrid.tsx">
                {[1, 2, 3].map(i => <div key={i} className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border rounded-lg overflow-hidden" data-magicpath-id="62" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center" data-magicpath-id="63" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <div className="w-8 h-8 bg-white/50 dark:bg-black/20 rounded-lg flex items-center justify-center" data-magicpath-id="64" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" data-magicpath-id="65" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      </div>
                    </div>
                    <div className="p-3" data-magicpath-id="66" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <p className="text-xs text-muted-foreground" data-magicpath-id="67" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <span data-magicpath-id="68" data-magicpath-path="GeneratedIdeasGrid.tsx">Variation {i}</span>
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-border" data-magicpath-id="69" data-magicpath-path="GeneratedIdeasGrid.tsx">
            <p className="text-sm text-muted-foreground" data-magicpath-id="70" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <span data-magicpath-id="71" data-magicpath-path="GeneratedIdeasGrid.tsx">Upload an image above to generate personalized campaigns like these</span>
            </p>
          </div>
        </motion.div> : <div className="space-y-12" data-magicpath-id="72" data-magicpath-path="GeneratedIdeasGrid.tsx">
          {ideas.map((idea, ideaIndex) => <motion.div key={idea.id} initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: ideaIndex * 0.2
      }} className="space-y-6" data-magicpath-id="73" data-magicpath-path="GeneratedIdeasGrid.tsx">
              <div className="space-y-3" data-magicpath-id="74" data-magicpath-path="GeneratedIdeasGrid.tsx">
                <div className="flex items-center gap-3" data-magicpath-id="75" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center" data-magicpath-id="76" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground" data-magicpath-id="77" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <span data-magicpath-id="78" data-magicpath-path="GeneratedIdeasGrid.tsx">{idea.title}</span>
                  </h3>
                </div>
                <p className="text-muted-foreground ml-11" data-magicpath-id="79" data-magicpath-path="GeneratedIdeasGrid.tsx">
                  <span data-magicpath-id="80" data-magicpath-path="GeneratedIdeasGrid.tsx">{idea.description}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-11" data-magicpath-id="81" data-magicpath-path="GeneratedIdeasGrid.tsx">
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
          }} className="group cursor-pointer" onClick={() => onImageClick(image, idea.title)} data-magicpath-id="82" data-magicpath-path="GeneratedIdeasGrid.tsx">
                    <div className="relative bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200" data-magicpath-id="83" data-magicpath-path="GeneratedIdeasGrid.tsx">
                      <div className="aspect-[4/3] overflow-hidden" data-magicpath-id="84" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <img src={image.url} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-magicpath-id="85" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" data-magicpath-id="86" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                      
                      <motion.div initial={{
                opacity: 0
              }} whileHover={{
                opacity: 1
              }} className="absolute inset-0 flex items-center justify-center" data-magicpath-id="87" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <div className="bg-background/90 backdrop-blur-sm p-3 rounded-full" data-magicpath-id="88" data-magicpath-path="GeneratedIdeasGrid.tsx">
                          <Eye className="w-5 h-5 text-foreground" data-magicpath-id="89" data-magicpath-path="GeneratedIdeasGrid.tsx" />
                        </div>
                      </motion.div>
                      
                      <div className="p-4" data-magicpath-id="90" data-magicpath-path="GeneratedIdeasGrid.tsx">
                        <p className="text-sm text-muted-foreground" data-magicpath-id="91" data-magicpath-path="GeneratedIdeasGrid.tsx">
                          <span data-magicpath-id="92" data-magicpath-path="GeneratedIdeasGrid.tsx">Variation {imageIndex + 1}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>}
    </div>;
};