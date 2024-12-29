import React from 'react';
import { Frame } from '../../types/frame';

const frameLibrary: Frame[] = [
  {
    id: 'classic-gold',
    name: 'Classic Gold',
    preview: 'https://images.unsplash.com/photo-1516684442030-515238027046?w=50&h=50&fit=crop',
    borderImage: 'linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
    borderWidth: '20px',
    borderStyle: 'solid'
  },
  {
    id: 'vintage-wood',
    name: 'Vintage Wood',
    preview: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=50&h=50&fit=crop',
    borderImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
    borderWidth: '25px',
    borderStyle: 'solid'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&h=50&fit=crop',
    borderImage: 'linear-gradient(to right, #000000, #333333)',
    borderWidth: '15px',
    borderStyle: 'solid'
  }
];

interface FrameLibraryProps {
  onSelectFrame: (frame: Frame) => void;
}

export const FrameLibrary: React.FC<FrameLibraryProps> = ({ onSelectFrame }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {frameLibrary.map((frame) => (
        <div
          key={frame.id}
          className="group cursor-pointer"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(frame));
          }}
          onClick={() => onSelectFrame(frame)}
        >
          <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all">
            <img
              src={frame.preview}
              alt={frame.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">{frame.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};