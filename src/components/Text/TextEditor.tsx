import React from 'react';
import { TextType } from '../../types/image';
import { TextLayer } from './TextLayer';

interface TextEditorProps {
  texts: TextType[];
  onUpdateText: (id: string, updates: Partial<TextType>) => void;
  onDeleteText: (id: string) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  texts,
  onUpdateText,
  onDeleteText,
  onDrop
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="absolute inset-0"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      {texts.map((text) => (
        <TextLayer
          key={text.id}
          text={text}
          onUpdate={onUpdateText}
          onDelete={onDeleteText}
        />
      ))}
    </div>
  );
};