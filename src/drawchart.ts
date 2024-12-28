import { _2DCoordinate } from "./defnitions";

/**
 *
 * @param paper canvas sheet
 * @param _Gant canvas props
 */
export const drawGant = (paper: HTMLCanvasElement) => {
  const ctx = paper?.getContext("2d");
  if (!ctx) {
    console.log("Context not found.");
    return;
  }
    drawRectangle({ x: 25, y: 30 }, { x: 75, y: 90 }, "#000000", 1, ctx);

    drawLine({x: 25, y: 120 }, { x: 200, y: 120 }, "red", 1, ctx)
    drawLine({x: 125, y: 60 }, { x: 125, y: 90 }, "red", 1, ctx)
  
};

/** Utility functions*/
export const put_pixel = (
  cord: _2DCoordinate,
  weight: number,
  color: string,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = color;
  ctx.strokeRect(cord.x, cord.y, weight / 2, weight);
};

// Bresenham's line drawing algo
export const drawLine = (
  start: _2DCoordinate,
  end: _2DCoordinate,
  color: string,
  weight: number,
  ctx: CanvasRenderingContext2D
) => {
  let x1 = start.x;
  let y1 = start.y;
  const x2 = end.x;
  const y2 = end.y;

  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    put_pixel({ x: x1, y: y1 }, weight, color, ctx);
    if (x1 === x2 && y1 === y2) break;
    const e2 = 2 * err;
    if (e2 + dy > 0) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
};

export const drawRectangle = (
  topLeft: _2DCoordinate,
  btmRight: _2DCoordinate,
  color: string,
  weight: number,
  // radius: number,
  ctx: CanvasRenderingContext2D
) => {
  drawLine(topLeft, { x: btmRight.x, y: topLeft.y }, color, weight, ctx);
  drawLine({ x: btmRight.x, y: topLeft.y }, btmRight, color, weight, ctx);
  drawLine(btmRight, { x: topLeft.x, y: btmRight.y }, color, weight, ctx);
  drawLine({ x: topLeft.x, y: btmRight.y }, topLeft, color, weight, ctx);
};
