export const applyImageAdjustments = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  brightness: number,
  contrast: number,
  blur: number,
  gradient: string,
  crop: { x: number; y: number; width: number; height: number } | null,
  rotation: number
) => {
  ctx.save();
  
  if (rotation !== 0) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  }

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) ${gradient !== 'none' ? gradient : ''}`;
  
  if (crop) {
    ctx.drawImage(
      img,
      crop.x, crop.y, crop.width, crop.height,
      0, 0, canvas.width, canvas.height
    );
  } else {
    ctx.drawImage(img, 0, 0);
  }

  ctx.restore();
};