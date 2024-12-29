import React from 'react';
import { Sun, SlidersHorizontal, Droplets } from 'lucide-react';
import { AdjustmentSlider } from './AdjustmentSlider';

interface ImageAdjustmentsProps {
  brightness: number;
  contrast: number;
  blur: number;
  disabled: boolean;
  onAdjustmentChange: (type: 'brightness' | 'contrast' | 'blur', value: number) => void;
}

export const ImageAdjustments: React.FC<ImageAdjustmentsProps> = ({
  brightness,
  contrast,
  blur,
  disabled,
  onAdjustmentChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Adjustments</h3>
      <AdjustmentSlider
        icon={Sun}
        label="Brightness"
        value={brightness}
        min={0}
        max={200}
        disabled={disabled}
        onChange={(value) => onAdjustmentChange('brightness', value)}
      />
      <AdjustmentSlider
        icon={SlidersHorizontal}
        label="Contrast"
        value={contrast}
        min={0}
        max={200}
        disabled={disabled}
        onChange={(value) => onAdjustmentChange('contrast', value)}
      />
      <AdjustmentSlider
        icon={Droplets}
        label="Blur"
        value={blur}
        min={0}
        max={20}
        unit="px"
        disabled={disabled}
        onChange={(value) => onAdjustmentChange('blur', value)}
      />
    </div>
  );
};