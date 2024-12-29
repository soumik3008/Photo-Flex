import { ImageInstruction } from '../types/chat';

export function parseInstruction(input: string): ImageInstruction[] {
  const instructions: ImageInstruction[] = [];
  const normalized = input.toLowerCase();

  // Brightness adjustments
  if (normalized.includes('bright')) {
    const value = normalized.includes('increase') || normalized.includes('brighter') ? 20 : -20;
    instructions.push({ type: 'brightness', value });
  }

  // Contrast adjustments
  if (normalized.includes('contrast')) {
    const value = normalized.includes('increase') || normalized.includes('more') ? 20 : -20;
    instructions.push({ type: 'contrast', value });
  }

  // Text operations
  const textMatch = input.match(/add text (?:saying\s+)?["']?([^"']+)["']?/i);
  if (textMatch) {
    instructions.push({ type: 'text', value: textMatch[1] });
    
    if (normalized.includes('center')) {
      instructions.push({ type: 'position', value: 'center', target: textMatch[1] });
    }
  }

  // Filter applications
  if (normalized.includes('sepia')) {
    instructions.push({ type: 'filter', value: 'sepia(100%)' });
  } else if (normalized.includes('grayscale') || normalized.includes('black and white')) {
    instructions.push({ type: 'filter', value: 'grayscale(100%)' });
  }

  return instructions;
}

export function generateResponse(instructions: ImageInstruction[]): string {
  if (instructions.length === 0) {
    return "I understand you want to edit the image. Could you please be more specific about what changes you'd like to make?";
  }

  const actions = instructions.map(instruction => {
    switch (instruction.type) {
      case 'brightness':
        return `adjusting brightness by ${instruction.value}%`;
      case 'contrast':
        return `modifying contrast by ${instruction.value}%`;
      case 'text':
        return `adding text "${instruction.value}"`;
      case 'filter':
        return `applying ${instruction.value.split('(')[0]} filter`;
      case 'position':
        return `positioning at ${instruction.value}`;
      default:
        return '';
    }
  });

  return `I'm ${actions.join(' and ')}`;
}