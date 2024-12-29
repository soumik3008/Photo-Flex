import React from 'react';
import { ImageState } from '../../types/image';
import { Frame } from '../../types/frame';
import { ImageDown } from 'lucide-react';
import { AdjustmentSlider } from './AdjustmentSlider';
import { ColorEffectGrid } from './ColorEffectGrid';
import { CropControls } from './CropControls';
import { TextControls } from '../Text/TextControls';
import { RotationControl } from './RotationControl';
import { ImageAdjustments } from './ImageAdjustments';
import { FrameLibrary } from '../Frames/FrameLibrary';
import { FrameCustomizer } from '../Frames/FrameCustomizer';

interface ToolsSidebarProps {
  image: ImageState;
  onAdjustmentChange: (type: 'brightness' | 'contrast' | 'blur' | 'gradient', value: number | string) => void;
  onScaleChange: (scale: number) => void;
  onRotationChange: (rotation: number) => void;
  onCancelCrop: () => void;
  onAddText: () => void;
  onUpdateFrame: (frame: Frame | null) => void;
  onUpdateFrameSettings: (settings: { opacity?: number; thickness?: number; color?: string }) => void;
}

export const ToolsSidebar: React.FC<ToolsSidebarProps> = ({ 
  image, 
  onAdjustmentChange,
  onScaleChange,
  onRotationChange,
  onCancelCrop,
  onAddText,
  onUpdateFrame,
  onUpdateFrameSettings
}) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="space-y-6 p-6">
        {/* Basic Tools Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Tools</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <CropControls
                isCropping={!!image.crop}
                disabled={!image.url}
                onStartCrop={() => {}}
                onCancelCrop={onCancelCrop}
              />
              <TextControls
                onAddText={onAddText}
                disabled={!image.url}
              />
            </div>
            <AdjustmentSlider
              icon={ImageDown}
              label="Scale"
              value={image.scale * 100}
              min={10}
              max={200}
              disabled={!image.url}
              onChange={(value) => onScaleChange(value / 100)}
            />
            <RotationControl
              rotation={image.rotation}
              disabled={!image.url}
              onChange={onRotationChange}
            />
          </div>
        </div>

        {/* Frame Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Frames</h3>
          <FrameLibrary onSelectFrame={onUpdateFrame} />
          <FrameCustomizer
            frame={image.activeFrame}
            opacity={image.frameOpacity}
            thickness={image.frameThickness}
            color={image.frameColor}
            onUpdateFrame={onUpdateFrame}
            onUpdateOpacity={(opacity) => onUpdateFrameSettings({ opacity })}
            onUpdateThickness={(thickness) => onUpdateFrameSettings({ thickness })}
            onUpdateColor={(color) => onUpdateFrameSettings({ color })}
          />
        </div>

        {/* Image Adjustments */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ImageAdjustments
            brightness={image.brightness}
            contrast={image.contrast}
            blur={image.blur}
            disabled={!image.url}
            onAdjustmentChange={onAdjustmentChange}
          />
        </div>

        {/* Color Effects */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ColorEffectGrid
            currentEffect={image.gradient}
            disabled={!image.url}
            onEffectChange={(effect) => onAdjustmentChange('gradient', effect)}
          />
        </div>
      </div>
    </div>
  );
};