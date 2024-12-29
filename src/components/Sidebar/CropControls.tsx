import React from 'react';
import { Crop, X } from 'lucide-react';

interface CropControlsProps {
  isCropping: boolean;
  disabled: boolean;
  onStartCrop: () => void;
  onCancelCrop: () => void;
}

export const CropControls: React.FC<CropControlsProps> = ({
  isCropping,
  disabled,
  onStartCrop,
  onCancelCrop
}) => {
  return (
    <div className="flex items-center gap-2">
      <button 
        className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-md ${
          isCropping 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={onStartCrop}
        disabled={disabled}
      >
        <Crop size={18} />
        <span>Crop</span>
      </button>
      
      {isCropping && (
        <button 
          className="p-2 text-red-700 hover:bg-red-50 rounded-md"
          onClick={onCancelCrop}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};