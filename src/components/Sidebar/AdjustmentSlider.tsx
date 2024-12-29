import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdjustmentSliderProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit?: string;
  min: number;
  max: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

export const AdjustmentSlider: React.FC<AdjustmentSliderProps> = ({
  icon: Icon,
  label,
  value,
  unit = '%',
  min,
  max,
  disabled,
  onChange
}) => {
  return (
    <div>
      <label className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span className="flex items-center space-x-2">
          <Icon size={16} />
          <span>{label}</span>
        </span>
        <span>{value}{unit}</span>
      </label>
      <input 
        type="range" 
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        disabled={disabled}
      />
    </div>
  );
};

export default AdjustmentSlider;