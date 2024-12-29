import { useRef, useCallback } from 'react';
import { ImageState } from '../types/image';

export const useCropInteraction = (
  canvasRef: React.RefObject<HTMLDivElement>,
  image: ImageState,
  onCrop: (crop: { x: number; y: number; width: number; height: number } | null) => void
) => {
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!image.url) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      isDragging.current = true;
      startPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }, [image.url]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !image.url) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const currentPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      onCrop({
        x: Math.min(startPos.current.x, currentPos.x),
        y: Math.min(startPos.current.y, currentPos.y),
        width: Math.abs(currentPos.x - startPos.current.x),
        height: Math.abs(currentPos.y - startPos.current.y)
      });
    }
  }, [image.url, onCrop]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};