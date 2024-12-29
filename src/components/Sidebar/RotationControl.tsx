import React from 'react';
import { RotateCw } from 'lucide-react';
import { AdjustmentSlider } from './AdjustmentSlider';

interface RotationControlProps {
  rotation: number;
  disabled: boolean;
  onChange: (rotation: number) => void;
}

export const RotationControl: React.FC<RotationControlProps> = ({
  rotation,
  disabled,
  onChange
}) => {
  return (
    <AdjustmentSlider
      icon={RotateCw}
      label="Rotation"
      value={rotation}
      min={-180}
      max={180}
      unit="°"
      disabled={disabled}
      onChange={onChange}
    />
  );
};