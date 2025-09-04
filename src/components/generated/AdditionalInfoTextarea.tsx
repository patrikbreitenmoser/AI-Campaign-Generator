import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
interface AdditionalInfoTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

// @component: AdditionalInfoTextarea
export const AdditionalInfoTextarea = ({
  value,
  onChange
}: AdditionalInfoTextareaProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  // @return
  return <div className="space-y-4" data-magicpath-id="0" data-magicpath-path="AdditionalInfoTextarea.tsx">
      <div className="flex items-center gap-3" data-magicpath-id="1" data-magicpath-path="AdditionalInfoTextarea.tsx">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center" data-magicpath-id="2" data-magicpath-path="AdditionalInfoTextarea.tsx">
          <MessageSquare className="w-4 h-4 text-muted-foreground" data-magicpath-id="3" data-magicpath-path="AdditionalInfoTextarea.tsx" />
        </div>
        <h3 className="text-lg font-medium text-foreground" data-magicpath-id="4" data-magicpath-path="AdditionalInfoTextarea.tsx">
          <span data-magicpath-id="5" data-magicpath-path="AdditionalInfoTextarea.tsx">Additional Information</span>
        </h3>
      </div>
      
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="relative" data-magicpath-id="6" data-magicpath-path="AdditionalInfoTextarea.tsx">
        <textarea value={value} onChange={handleChange} placeholder="Describe your target audience, brand personality, key messaging, or any specific requirements for the advertising campaign..." className="w-full h-32 p-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200" maxLength={500} data-magicpath-id="7" data-magicpath-path="AdditionalInfoTextarea.tsx" />
        
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground" data-magicpath-id="8" data-magicpath-path="AdditionalInfoTextarea.tsx">
          <span data-magicpath-id="9" data-magicpath-path="AdditionalInfoTextarea.tsx">{value.length}/500</span>
        </div>
      </motion.div>
      
      <div className="space-y-2" data-magicpath-id="10" data-magicpath-path="AdditionalInfoTextarea.tsx">
        <p className="text-sm text-muted-foreground" data-magicpath-id="11" data-magicpath-path="AdditionalInfoTextarea.tsx">
          <span className="font-medium" data-magicpath-id="12" data-magicpath-path="AdditionalInfoTextarea.tsx">Tip:</span> <span data-magicpath-id="13" data-magicpath-path="AdditionalInfoTextarea.tsx">Include details about your brand voice, target demographics, and campaign goals for better results.</span>
        </p>
        
        <div className="flex flex-wrap gap-2" data-magicpath-id="14" data-magicpath-path="AdditionalInfoTextarea.tsx">
          {['Target audience: Young professionals', 'Brand: Premium & sophisticated', 'Goal: Increase brand awareness'].map((suggestion, index) => <motion.button key={suggestion} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => onChange(value ? `${value}\n${suggestion}` : suggestion)} className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full hover:bg-accent/80 transition-colors duration-200" data-magicpath-id="15" data-magicpath-path="AdditionalInfoTextarea.tsx">
              <span data-magicpath-id="16" data-magicpath-path="AdditionalInfoTextarea.tsx">{suggestion}</span>
            </motion.button>)}
        </div>
      </div>
    </div>;
};