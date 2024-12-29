import React, { useRef } from 'react';
import { FileInput, Save, Download, Undo, Redo, Trash2 } from 'lucide-react';

interface TopBarProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onRemoveImage: () => void;
  hasImage: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ 
  onFileUpload, 
  onExport, 
  onRemoveImage,
  hasImage 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          accept="image/*"
          className="hidden"
        />
        <button 
          className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => fileInputRef.current?.click()}
        >
          <FileInput size={18} />
          <span>Open</span>
        </button>
        <button 
          className="flex items-center space-x-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={!hasImage}
          onClick={onExport}
        >
          <Save size={18} />
          <span>Save</span>
        </button>
        <button 
          className="flex items-center space-x-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={!hasImage}
          onClick={onExport}
        >
          <Download size={18} />
          <span>Export</span>
        </button>
        <button 
          className="flex items-center space-x-2 px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50"
          disabled={!hasImage}
          onClick={onRemoveImage}
        >
          <Trash2 size={18} />
          <span>Remove</span>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          disabled={!hasImage}
        >
          <Undo size={20} />
        </button>
        <button 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          disabled={!hasImage}
        >
          <Redo size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;