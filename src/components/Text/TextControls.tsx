// import React from 'react';
// import { Type, Plus } from 'lucide-react';

// interface TextControlsProps {
//   onAddText: () => void;
//   disabled: boolean;
// }

// export const TextControls: React.FC<TextControlsProps> = ({ onAddText, disabled }) => {
//   return (
//     <button 
//       className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-md ${
//         disabled ? 'bg-gray-100 text-gray-400' : 'text-gray-700 hover:bg-gray-100'
//       }`}
//       onClick={onAddText}
//       disabled={disabled}
//     >
//       <Type size={18} />
//       <span>Add Text</span>
//     </button>
//   );
// };
import React, { useState } from 'react';
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

// Example of how to handle multiline text input
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const MultilineTextInput: React.FC<TextInputProps> = ({ value, onChange, onBlur }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className="w-full p-2 border border-gray-300 rounded-md resize-none overflow-hidden"
      placeholder="Type your text here... Press Enter for new lines"
      rows={1}
      style={{ minHeight: '40px' }}
      onInput={(e) => {
        // Auto-resize textarea based on content
        const target = e.target as HTMLTextAreaElement;
        target.style.height = '40px';
        target.style.height = `${target.scrollHeight}px`;
      }}
    />
  );
};

// Example of how to render text with line breaks preserved
interface TextDisplayProps {
  text: string;
  className?: string;
}

export const TextDisplay: React.FC<TextDisplayProps> = ({ text, className = '' }) => {
  return (
    <div className={`whitespace-pre-wrap ${className}`}>
      {text}
    </div>
  );
};

// Alternative: Using dangerouslySetInnerHTML for HTML line breaks
export const TextDisplayHTML: React.FC<TextDisplayProps> = ({ text, className = '' }) => {
  // Convert \n to <br> tags
  const htmlText = text.replace(/\n/g, '<br>');
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlText }}
    />
  );
};

// Complete example component showing usage
export const TextEditor: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const addText = () => {
    setTexts([...texts, 'New text']);
    setEditingIndex(texts.length);
    setEditingText('New text');
  };

  const saveText = () => {
    if (editingIndex !== null) {
      const newTexts = [...texts];
      newTexts[editingIndex] = editingText;
      setTexts(newTexts);
      setEditingIndex(null);
      setEditingText('');
    }
  };

  return (
    <div className="p-4">
      <TextControls onAddText={addText} disabled={false} />
      
      <div className="mt-4 space-y-2">
        {texts.map((text, index) => (
          <div key={index} className="border p-2 rounded">
            {editingIndex === index ? (
              <div>
                <MultilineTextInput
                  value={editingText}
                  onChange={setEditingText}
                  onBlur={saveText}
                />
                <button
                  onClick={saveText}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setEditingIndex(index);
                  setEditingText(text);
                }}
                className="cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <TextDisplay text={text} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};