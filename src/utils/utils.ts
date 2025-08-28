import { BrushType, ToolType } from "@/types/types";

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, options: {
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
  textAlign: CanvasTextAlign;
  fillStyle: string;
}) {
  const fontParts = [];
  if (options.isItalic) fontParts.push('italic');
  if (options.isBold) fontParts.push('bold');
  else fontParts.push(options.fontWeight);
  fontParts.push(`${options.fontSize}px`);
  fontParts.push(options.fontFamily);

  ctx.font = fontParts.join(' ');
  ctx.fillStyle = options.fillStyle;
  ctx.textAlign = options.textAlign;
  ctx.textBaseline = 'top';

  ctx.fillText(text, x, y);

  if (options.isUnderlined) {
    const textWidth = ctx.measureText(text).width;
    const underlineHeight = options.fontSize / 15;
    let startX = x;
    if (options.textAlign === 'center') startX = x - textWidth / 2;
    else if (options.textAlign === 'right') startX = x - textWidth;

    const underlineY = y + options.fontSize + 2;
    ctx.fillRect(startX, underlineY, textWidth, underlineHeight);
  }
}

function hexToRGBA(hex: string, alpha = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export const resetContextStyles = (ctx: CanvasRenderingContext2D, tool: ToolType, brushType: BrushType, selectedColor: string, brushSize: number) => {
  ctx.globalAlpha = 1;
  ctx.lineDashOffset = 0;
  ctx.setLineDash([]);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.lineCap = brushType === 'round' ? 'round' : 'square';
  ctx.lineJoin = brushType === 'round' ? 'round' : 'miter';

  switch (tool) {
    case 'brush':
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;

      if (brushType === 'soft') {
        ctx.shadowColor = selectedColor;
        ctx.shadowBlur = brushSize * 1.5;
      }
      break;

    case 'pencil':
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = brushSize * 0.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const patternCanvas = document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 20;
      const pctx = patternCanvas.getContext('2d');
      if (pctx) {
        const rgbaColor = hexToRGBA(selectedColor, 0.15);
        for (let i = 0; i < 50; i++) {
          pctx.fillStyle = rgbaColor;
          pctx.beginPath();
          pctx.arc(Math.random() * 20, Math.random() * 20, 1, 0, Math.PI * 2);
          pctx.fill();
        }
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        if (pattern) ctx.strokeStyle = pattern;
      }
      ctx.setLineDash([]);
      break;

    case 'dotted':
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.setLineDash([5, 15]);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      break;

    case 'chalk':
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = brushSize * 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = brushSize * 1;
      ctx.strokeStyle = selectedColor;
      ctx.setLineDash([]);
      break;

    default:
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
  }
};

export function isPointInRect(x: number, y: number, box: { minX: number, minY: number, maxX: number, maxY: number }) {
  return x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY;
}

export function getBoundingBox({ x, y, text, font, fontSize, textAlign }: { x: number, y: number, text: string, font: string, fontSize: number, textAlign: string }, ctx: CanvasRenderingContext2D) {
  ctx.font = font || "24px Arial";
  const width = ctx.measureText(text).width;
  const height = fontSize * 1.2;

  let minX = x;
  let maxX = x + width;

  if (textAlign === 'center') {
    minX = x - width / 2;
    maxX = x + width / 2;
  } else if (textAlign === 'right') {
    minX = x - width;
    maxX = x;
  }

  return {
    minX,
    minY: y,
    maxX,
    maxY: y + height
  };
}

export function getBox(box: {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}, pad = 4) {
  const paddedBox = {
    minX: box.minX - pad,
    minY: box.minY - pad,
    maxX: box.maxX + pad,
    maxY: box.maxY + pad,
  };
  return {
    paddedBox,
  };
}


export function drawBoundingBox(ctx: CanvasRenderingContext2D, box: { minX: number; minY: number; maxX: number; maxY: number }) {
  ctx.save();

  ctx.strokeStyle = '#40ac02';
  ctx.lineWidth = 2;

  ctx.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY);

  ctx.fillStyle = '#40ac02';
  ctx.restore();
}

export function getCanvasCoords(canvas: HTMLCanvasElement | null, e: React.MouseEvent<HTMLCanvasElement>) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}

export function pixelate(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strength: number) {
  const canvas = ctx.canvas;
  const pixelBlock = Math.max(1, Math.round(strength));
  const size = radius;
  const startX = Math.max(x - radius, 0);
  const startY = Math.max(y - radius, 0);
  const width = Math.min(size * 2, canvas.width - startX);
  const height = Math.min(size * 2, canvas.height - startY);

  const imageData = ctx.getImageData(startX, startY, width, height);

  for (let py = 0; py < height; py += pixelBlock) {
    for (let px = 0; px < width; px += pixelBlock) {
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      for (let y1 = py; y1 < py + pixelBlock && y1 < height; y1++) {
        for (let x1 = px; x1 < px + pixelBlock && x1 < width; x1++) {
          const idx = (y1 * width + x1) * 4;
          rSum += imageData.data[idx];
          gSum += imageData.data[idx + 1];
          bSum += imageData.data[idx + 2];
          count++;
        }
      }
      const rAvg = rSum / count;
      const gAvg = gSum / count;
      const bAvg = bSum / count;
      for (let y1 = py; y1 < py + pixelBlock && y1 < height; y1++) {
        for (let x1 = px; x1 < px + pixelBlock && x1 < width; x1++) {
          const idx = (y1 * width + x1) * 4;
          imageData.data[idx] = rAvg;
          imageData.data[idx + 1] = gAvg;
          imageData.data[idx + 2] = bAvg;
        }
      }
    }
  }
  ctx.putImageData(imageData, startX, startY);
}

export function smudge(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strength: number) {
  const canvas = ctx.canvas;
  const startX = Math.max(x - radius, 0);
  const startY = Math.max(y - radius, 0);
  const size = radius * 2;
  const width = Math.min(size, canvas.width - startX);
  const height = Math.min(size, canvas.height - startY);

  const imageData = ctx.getImageData(startX, startY, width, height);
  const data = imageData.data;

  const kernelSize = 3;
  const half = Math.floor(kernelSize / 2);

  const passes = Math.max(1, Math.round(strength / 5));
  for (let pass = 0; pass < passes; pass++) {
    const copy = new Uint8ClampedArray(data);

    for (let y1 = half; y1 < height - half; y1++) {
      for (let x1 = half; x1 < width - half; x1++) {
        let r = 0, g = 0, b = 0;
        let count = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const idx = ((y1 + ky) * width + (x1 + kx)) * 4;
            r += copy[idx];
            g += copy[idx + 1];
            b += copy[idx + 2];
            count++;
          }
        }
        const idx = (y1 * width + x1) * 4;
        data[idx] = r / count;
        data[idx + 1] = g / count;
        data[idx + 2] = b / count;
        data[idx + 3] = copy[idx + 3];
      }
    }
  }

  ctx.putImageData(imageData, startX, startY);
}

export function snowy(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strength: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';

  const baseDotCount = Math.max(5, Math.floor(radius / 2));
  const dotCount = Math.min(30, baseDotCount + Math.round(strength / 2));
  const maxDotRadius = radius / 3 + strength / 4;
  const minDotRadius = radius / 6 + strength / 6;

  for (let i = 0; i < dotCount; i++) {
    const offsetX = (Math.random() - 0.5) * radius * 2;
    const offsetY = (Math.random() - 0.5) * radius * 2;
    const dotRadius = minDotRadius + Math.random() * (maxDotRadius - minDotRadius);

    ctx.beginPath();
    ctx.arc(x + offsetX, y + offsetY, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.shadowColor = 'rgba(255,255,255,0.08)';
  ctx.shadowBlur = radius / 8 + strength / 10;

  ctx.restore();
}

export function blur(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strength: number) {
  const startX = Math.max(x - radius, 0);
  const startY = Math.max(y - radius, 0);
  const size = radius * 2;
  const canvas = ctx.canvas;
  const width = Math.min(size, canvas.width - startX);
  const height = Math.min(size, canvas.height - startY);

  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const offCtx = offscreen.getContext('2d');
  if (!offCtx) return;

  offCtx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);

  offCtx.filter = `blur(${strength}px)`;
  const blurred = offCtx.getImageData(0, 0, width, height);
  offCtx.clearRect(0, 0, width, height);
  offCtx.putImageData(blurred, 0, 0);

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.drawImage(offscreen, startX, startY);
  ctx.restore();
}