import { useState, useCallback } from 'react';
import { ImageState, TextType } from '../types/image';
import { Frame } from '../types/frame';
import { applyImageAdjustments } from '../utils/imageProcessing';

const defaultImageState: ImageState = {
  url: '',
  brightness: 100,
  contrast: 100,
  blur: 0,
  gradient: 'none',
  crop: null,
  scale: 1,
  rotation: 0,
  texts: [],
  activeFrame: null,
  frameOpacity: 100,
  frameThickness: 20,
  frameColor: '#000000'
};

export const useImageEditor = () => {
  const [image, setImage] = useState<ImageState>(defaultImageState);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(prev => ({ ...prev, url }));
    }
  }, []);

  const removeImage = useCallback(() => {
    if (image.url) {
      URL.revokeObjectURL(image.url);
      setImage(defaultImageState);
    }
  }, [image.url]);

  const updateAdjustment = useCallback((
    type: 'brightness' | 'contrast' | 'blur' | 'gradient',
    value: number | string
  ) => {
    setImage(prev => ({ ...prev, [type]: value }));
  }, []);

  const setCrop = useCallback((cropData: { x: number; y: number; width: number; height: number } | null) => {
    setImage(prev => ({ ...prev, crop: cropData }));
  }, []);

  const cancelCrop = useCallback(() => {
    setImage(prev => ({ ...prev, crop: null }));
  }, []);

  const setScale = useCallback((scale: number) => {
    setImage(prev => ({ ...prev, scale }));
  }, []);

  const setRotation = useCallback((rotation: number) => {
    setImage(prev => ({ ...prev, rotation }));
  }, []);

  const addText = useCallback(() => {
    const newText: TextType = {
      id: crypto.randomUUID(),
      content: 'New Text',
      x: 50,
      y: 50,
      color: '#000000',
      fontSize: 24,
      fontFamily: 'Arial'
    };
    setImage(prev => ({
      ...prev,
      texts: [...prev.texts, newText]
    }));
  }, []);

  const updateText = useCallback((id: string, updates: Partial<TextType>) => {
    setImage(prev => ({
      ...prev,
      texts: prev.texts.map(text => 
        text.id === id ? { ...text, ...updates } : text
      )
    }));
  }, []);

  const deleteText = useCallback((id: string) => {
    setImage(prev => ({
      ...prev,
      texts: prev.texts.filter(text => text.id !== id)
    }));
  }, []);

  const handleTextDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      const { id, offsetX, offsetY } = JSON.parse(data);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - offsetX;
      const y = e.clientY - rect.top - offsetY;
      updateText(id, { x, y });
    }
  }, [updateText]);

  const updateFrame = useCallback((frame: Frame | null) => {
    setImage(prev => ({ ...prev, activeFrame: frame }));
  }, []);

  const updateFrameSettings = useCallback((
    settings: { opacity?: number; thickness?: number; color?: string }
  ) => {
    setImage(prev => ({
      ...prev,
      frameOpacity: settings.opacity ?? prev.frameOpacity,
      frameThickness: settings.thickness ?? prev.frameThickness,
      frameColor: settings.color ?? prev.frameColor
    }));
  }, []);

  const exportImage = useCallback(async () => {
    if (!image.url) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = image.url;
    await new Promise(resolve => img.onload = resolve);

    canvas.width = img.width;
    canvas.height = img.height;

    if (ctx) {
      applyImageAdjustments(
        canvas,
        ctx,
        img,
        image.brightness,
        image.contrast,
        image.blur,
        image.gradient,
        image.crop,
        image.rotation
      );

      image.texts.forEach(text => {
        ctx.font = `${text.fontSize}px ${text.fontFamily}`;
        ctx.fillStyle = text.color;
        ctx.fillText(text.content, text.x, text.y);
      });

      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }, [image]);

  return {
    image,
    handleFileUpload,
    removeImage,
    updateAdjustment,
    setCrop,
    cancelCrop,
    setScale,
    setRotation,
    addText,
    updateText,
    deleteText,
    handleTextDrop,
    exportImage,
    updateFrame,
    updateFrameSettings
  };
};