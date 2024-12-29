export interface TextType {
  id: string;
  content: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  fontFamily: string;
}

export interface ImageState {
  url: string;
  brightness: number;
  contrast: number;
  blur: number;
  gradient: string;
  crop: { x: number; y: number; width: number; height: number } | null;
  scale: number;
  rotation: number;
  texts: TextType[];
  activeFrame: Frame | null;
  frameOpacity: number;
  frameThickness: number;
  frameColor: string;
}