import React from 'react';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
    <div
      className={`max-w-[80%] p-3 rounded-lg ${
        message.isBot 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-blue-600 text-white'
      }`}
    >
      <p className="whitespace-pre-line">{message.text}</p>
    </div>
  </div>
);