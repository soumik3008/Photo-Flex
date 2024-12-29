import React from 'react';
import { colorEffects } from '../../utils/colorEffects';

interface ColorEffectGridProps {
  currentEffect: string;
  disabled: boolean;
  onEffectChange: (effect: string) => void;
}

export const ColorEffectGrid: React.FC<ColorEffectGridProps> = ({
  currentEffect,
  disabled,
  onEffectChange
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Color Effects</h3>
      <div className="grid grid-cols-4 gap-2">
        {colorEffects.map((effect, index) => (
          <button
            key={index}
            className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              currentEffect === effect.value
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onEffectChange(effect.value)}
            disabled={disabled}
          >
            <div
              className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"
              style={{ filter: effect.value }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity">
              <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {effect.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};