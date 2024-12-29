import React from 'react';
import { Frame, Palette, Sparkles, Settings } from 'lucide-react';

interface FrameControlsProps {
  currentFrame: string;
  frameColor: string;
  frameWidth: number;
  disabled: boolean;
  onFrameChange: (frame: string) => void;
  onFrameColorChange: (color: string) => void;
  onFrameWidthChange: (width: number) => void;
}

export const FrameControls: React.FC<FrameControlsProps> = ({
  currentFrame,
  frameColor,
  frameWidth,
  disabled,
  onFrameChange,
  onFrameColorChange,
  onFrameWidthChange,
}) => {
  const frames = [
    { id: 'none', name: 'No Frame', icon: Frame },
    { id: 'solid', name: 'Solid Border', icon: Palette },
    { id: 'dashed', name: 'Dashed Border', icon: Sparkles },
    { id: 'double', name: 'Double Border', icon: Settings },
  ];

  const frameStyles = {
    solid: `border-solid`,
    dashed: `border-dashed`,
    double: `border-double`,
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-900">Frame Style</h3>
      <div className="grid grid-cols-2 gap-3">
        {frames.map((frame) => {
          const Icon = frame.icon;
          return (
            <button
              key={frame.id}
              onClick={() => onFrameChange(frame.id)}
              disabled={disabled}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                currentFrame === frame.id
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                  : 'border-2 border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">{frame.name}</span>
            </button>
          );
        })}
      </div>

      {currentFrame !== 'none' && (
        <div className="space-y-3 mt-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Frame Color</label>
            <input
              type="color"
              value={frameColor}
              onChange={(e) => onFrameColorChange(e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer"
              disabled={disabled}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Frame Width</label>
            <input
              type="range"
              min="1"
              max="20"
              value={frameWidth}
              onChange={(e) => onFrameWidthChange(Number(e.target.value))}
              className="w-full"
              disabled={disabled}
            />
            <div className="text-xs text-gray-500 text-right">{frameWidth}px</div>
          </div>
        </div>
      )}

      {/* Example of how to apply the frame */}
      <div
        className={`mt-6 p-4 ${
          currentFrame !== 'none' ? `${frameStyles[currentFrame]} border` : ''
        }`}
        style={{
          borderColor: frameColor,
          borderWidth: currentFrame !== 'none' ? `${frameWidth}px` : undefined,
        }}
      >
        <div className="text-center text-gray-500">
          This is your image preview with the selected frame.
        </div>
      </div>
    </div>
  );
};
