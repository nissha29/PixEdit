export function isPointInRect(x: number, y: number, box: { minX: number, minY: number, maxX: number, maxY: number }) {
  return x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY;
}

export function getHandlerHitIndex(x: number, y: number, handlers: { x: number, y: number }[], hitRadius = 10) {
  for (let i = 0; i < handlers.length; i++) {
    const h = handlers[i];
    const dx = x - h.x;
    const dy = y - h.y;
    if (Math.sqrt(dx * dx + dy * dy) <= hitRadius) {
      return i;
    }
  }
  return null;
}

export function getBoundingBox({ x, y, text, font, fontSize }: { x: number, y: number, text: string, font: string, fontSize: number }, ctx: CanvasRenderingContext2D) {
  ctx.font = font || "24px Arial";
  const width = ctx.measureText(text).width;
  const height = fontSize * 1.2;
  return {
    minX: x,
    minY: y,
    maxX: x + width,
    maxY: y + height
  }
}

export function getHandlerPositions(box: {
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
    handlers: [
      { x: paddedBox.minX, y: paddedBox.minY },
      { x: paddedBox.maxX, y: paddedBox.minY },
      { x: paddedBox.maxX, y: paddedBox.maxY },
      { x: paddedBox.minX, y: paddedBox.maxY },
    ]
  }
}

export function drawBoundingBox(ctx: CanvasRenderingContext2D, box: { minX: number; minY: number; maxX: number; maxY: number }, handlers: {x: number, y: number}[]) {
  ctx.save();
  ctx.strokeStyle = '#00CCCC';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 3]);

  ctx.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY);

  ctx.setLineDash([]);
  ctx.fillStyle = '#00FFFFaa';

  handlers.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}
