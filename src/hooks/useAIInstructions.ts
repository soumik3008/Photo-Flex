import { useCallback } from 'react';
import { ImageState, TextType } from '../types/image';

export const useAIInstructions = (
  image: ImageState,
  updateAdjustment: (type: 'brightness' | 'contrast' | 'blur' | 'gradient', value: number | string) => void,
  addText: () => void,
  updateText: (id: string, updates: Partial<TextType>) => void
) => {
  const processInstruction = useCallback((instruction: string) => {
    const normalized = instruction.toLowerCase();

    // Brightness adjustments
    if (normalized.includes('bright')) {
      const currentBrightness = image.brightness;
      if (normalized.includes('increase') || normalized.includes('brighter')) {
        updateAdjustment('brightness', Math.min(currentBrightness + 20, 200));
      } else if (normalized.includes('decrease') || normalized.includes('darker')) {
        updateAdjustment('brightness', Math.max(currentBrightness - 20, 0));
      }
    }

    // Contrast adjustments
    if (normalized.includes('contrast')) {
      const currentContrast = image.contrast;
      if (normalized.includes('increase') || normalized.includes('more')) {
        updateAdjustment('contrast', Math.min(currentContrast + 20, 200));
      } else if (normalized.includes('decrease') || normalized.includes('less')) {
        updateAdjustment('contrast', Math.max(currentContrast - 20, 0));
      }
    }

    // Filter applications
    if (normalized.includes('sepia')) {
      updateAdjustment('gradient', 'sepia(100%)');
    } else if (normalized.includes('grayscale') || normalized.includes('black and white')) {
      updateAdjustment('gradient', 'grayscale(100%)');
    }

    // Text operations
    if (normalized.includes('add text')) {
      addText();
      const lastText = image.texts[image.texts.length - 1];
      if (lastText) {
        const textMatch = instruction.match(/add text (?:saying\s+)?["']?([^"']+)["']?/i);
        if (textMatch) {
          updateText(lastText.id, { content: textMatch[1] });
        }
        
        // Position text
        if (normalized.includes('center')) {
          updateText(lastText.id, { x: 200, y: 200 });
        }
      }
    }
  }, [image, updateAdjustment, addText, updateText]);

  return { processInstruction };
};