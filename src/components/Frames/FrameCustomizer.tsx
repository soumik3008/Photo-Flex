import React from 'react';
import { Frame } from '../../types/frame';
import { Sliders, Palette } from 'lucide-react';

interface FrameCustomizerProps {
  frame: Frame | null;
  opacity: number;
  thickness: number;
  color: string;
  onUpdateFrame: (updates: Partial<Frame>) => void;
  onUpdateOpacity: (opacity: number) => void;
  onUpdateThickness: (thickness: number) => void;
  onUpdateColor: (color: string) => void;
}

export const FrameCustomizer: React.FC<FrameCustomizerProps> = ({
  frame,
  opacity,
  thickness,
  color,
  onUpdateFrame,
  onUpdateOpacity,
  onUpdateThickness,
  onUpdateColor,
}) => {
  if (!frame) return null;

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="flex items-center text-sm text-gray-600 mb-2">
          <Sliders className="w-4 h-4 mr-2" />
          Opacity
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => onUpdateOpacity(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-right text-xs text-gray-500">{opacity}%</div>
      </div>

      <div>
        <label className="flex items-center text-sm text-gray-600 mb-2">
          <Sliders className="w-4 h-4 mr-2" />
          Thickness
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={thickness}
          onChange={(e) => onUpdateThickness(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-right text-xs text-gray-500">{thickness}px</div>
      </div>

      <div>
        <label className="flex items-center text-sm text-gray-600 mb-2">
          <Palette className="w-4 h-4 mr-2" />
          Color Tint
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => onUpdateColor(e.target.value)}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>
    </div>
  );
};