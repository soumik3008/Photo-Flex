import React, { useState } from 'react';
import { Send, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { parseInstruction, generateResponse } from '../../utils/instructionParser';

interface ChatInterfaceProps {
  onInstruction: (instruction: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onInstruction }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Hi! I can help you edit your image. Try saying things like:\n- "Add text saying Hello at the center"\n- "Make the image brighter"\n- "Add a sepia filter"', 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { 
      id: crypto.randomUUID(), 
      text: input, 
      isBot: false 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Parse and process the instruction
    const instructions = parseInstruction(input);
    const response = generateResponse(instructions);
    
    // Execute the instruction
    onInstruction(input);
    setInput('');

    // Add bot response
    const botResponse: Message = { 
      id: crypto.randomUUID(), 
      text: response,
      isBot: true 
    };
    
    setTimeout(() => setMessages(prev => [...prev, botResponse]), 300);
  };

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 ${isMinimized ? 'h-12' : ''}`}>
      <div 
        className="flex items-center justify-between p-3 border-b border-gray-200 bg-blue-50 rounded-t-lg cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center">
          <Bot className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-medium text-blue-600">Image Editor AI</span>
        </div>
        <button className="text-blue-600 hover:text-blue-700">
          {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
        </button>
      </div>
      
      {!isMinimized && (
        <>
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your instructions..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};