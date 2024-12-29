import React from 'react';
import { Type, Plus } from 'lucide-react';

interface TextControlsProps {
  onAddText: () => void;
  disabled: boolean;
}

export const TextControls: React.FC<TextControlsProps> = ({ onAddText, disabled }) => {
  return (
    <button 
      className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-md ${
        disabled ? 'bg-gray-100 text-gray-400' : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onAddText}
      disabled={disabled}
    >
      <Type size={18} />
      <span>Add Text</span>
    </button>
  );
};