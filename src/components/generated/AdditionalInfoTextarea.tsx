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
  return <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">
          <span>Additional Information</span>
        </h3>
      </div>
      
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="relative">
        <textarea value={value} onChange={handleChange} placeholder="Describe your target audience, brand personality, key messaging, or any specific requirements for the advertising campaign..." className="w-full h-32 p-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200" maxLength={500} />
        
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          <span>{value.length}/500</span>
        </div>
      </motion.div>
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Tip:</span> <span>Include details about your brand voice, target demographics, and campaign goals for better results.</span>
        </p>
        
        <div className="flex flex-wrap gap-2">
          {['Target audience: Young professionals', 'Brand: Premium & sophisticated', 'Goal: Increase brand awareness'].map((suggestion, index) => <motion.button key={suggestion} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => onChange(value ? `${value}\n${suggestion}` : suggestion)} className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full hover:bg-accent/80 transition-colors duration-200">
              <span>{suggestion}</span>
            </motion.button>)}
        </div>
      </div>
    </div>;
};