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

  ctx.strokeStyle = '#075985';
  ctx.lineWidth = 2;

  ctx.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY);

  ctx.fillStyle = '#075985';
  ctx.restore();
}
