export interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export interface ImageInstruction {
  type: 'brightness' | 'contrast' | 'blur' | 'text' | 'filter' | 'position';
  value: string | number;
  target?: string;
}