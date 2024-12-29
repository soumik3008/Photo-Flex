import React from 'react';
import { TextType } from '../../types/image';
import { X } from 'lucide-react';

interface TextLayerProps {
  text: TextType;
  onUpdate: (id: string, updates: Partial<TextType>) => void;
  onDelete: (id: string) => void;
}

export const TextLayer: React.FC<TextLayerProps> = ({ text, onUpdate, onDelete }) => {
  const handleDragStart = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: text.id, offsetX, offsetY }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="absolute inline-block cursor-move group"
      style={{
        left: text.x,
        top: text.y,
        color: text.color,
        fontSize: `${text.fontSize}px`,
        fontFamily: text.fontFamily
      }}
    >
      <input
        type="text"
        value={text.content}
        onChange={(e) => onUpdate(text.id, { content: e.target.value })}
        className="bg-transparent border-none outline-none"
        style={{ width: `${text.content.length + 2}ch` }}
      />
      <button
        onClick={() => onDelete(text.id)}
        className="absolute -top-3 -right-3 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={12} />
      </button>
    </div>
  );
};