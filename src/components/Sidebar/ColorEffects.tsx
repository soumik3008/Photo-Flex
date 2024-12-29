import React from 'react';
import { colorGradients } from '../../utils/gradients';

interface ColorEffectsProps {
  currentGradient: string;
  disabled: boolean;
  onGradientChange: (gradient: string) => void;
}

export const ColorEffects: React.FC<ColorEffectsProps> = ({
  currentGradient,
  disabled,
  onGradientChange
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">Color Effects</h3>
      <div className="grid grid-cols-5 gap-2">
        {colorGradients.map((gradient, index) => (
          <button
            key={index}
            className={`w-full aspect-square rounded-md border-2 ${
              currentGradient === gradient 
                ? 'border-blue-500' 
                : 'border-gray-200'
            }`}
            style={{ filter: gradient }}
            onClick={() => onGradientChange(gradient)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorEffects;