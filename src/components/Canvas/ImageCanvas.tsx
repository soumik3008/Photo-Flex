import React, { useRef } from 'react';
import { ImageState } from '../../types/image';
import { useCropInteraction } from '../../hooks/useCropInteraction';
import { TextEditor } from '../Text/TextEditor';

interface ImageCanvasProps {
  image: ImageState;
  onCrop: (crop: { x: number; y: number; width: number; height: number } | null) => void;
  onUpdateText: (id: string, updates: Partial<TextType>) => void;
  onDeleteText: (id: string) => void;
  onTextDrop: (e: React.DragEvent) => void;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ 
  image, 
  onCrop,
  onUpdateText,
  onDeleteText,
  onTextDrop
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCropInteraction(canvasRef, image, onCrop);

  const getFrameStyle = () => {
    if (!image.activeFrame) return {};

    return {
      padding: `${image.frameThickness}px`,
      background: image.frameColor,
      borderRadius: '4px',
      opacity: image.frameOpacity / 100
    };
  };

  const getImageContainerStyle = () => {
    if (!image.activeFrame) return {};

    return {
      border: `${image.frameThickness}px solid ${image.frameColor}`,
      borderImage: image.activeFrame.borderImage,
      borderStyle: image.activeFrame.borderStyle,
      opacity: image.frameOpacity / 100
    };
  };

  return (
    <div 
      ref={canvasRef}
      className="bg-white rounded-lg shadow-lg w-full h-full min-h-[500px] flex items-center justify-center relative p-8"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {image.url ? (
        <div className="relative" style={getFrameStyle()}>
          <div 
            className="relative transition-all duration-300"
            style={getImageContainerStyle()}
          >
            <img
              src={image.url}
              alt="Editing canvas"
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{
                filter: `brightness(${image.brightness}%) contrast(${image.contrast}%) blur(${image.blur}px) ${image.gradient !== 'none' ? image.gradient : ''}`,
                transform: `scale(${image.scale}) rotate(${image.rotation}deg)`
              }}
            />
            {image.crop && (
              <div
                className="absolute border-2 border-blue-500 bg-blue-500/10"
                style={{
                  left: image.crop.x,
                  top: image.crop.y,
                  width: image.crop.width,
                  height: image.crop.height
                }}
              />
            )}
            <TextEditor
              texts={image.texts}
              onUpdateText={onUpdateText}
              onDeleteText={onDeleteText}
              onDrop={onTextDrop}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Drag and drop an image or click to upload</p>
      )}
    </div>
  );
};