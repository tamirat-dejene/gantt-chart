import { _2DCoordinate, Gant } from "./defnitions";
import { getDayOfYear } from "./utils";

const def_val = {
  gant_offset: 4,
  gant_color: "#ffbf00",
  stroke_color: "#ff4000",
  stroke_width: "1px",
  default_bg: [0, 0, 0, 0],
};

// Draw the gant chart
export const drawGant = (canvas_id: string, gant: Gant) => {
  const canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    console.log("Context not found.");
    return;
  }
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const tasks = gant.tasks;
  tasks.forEach((task, index) => {
    const canvas_width = canvas.width;
    const canvas_height = canvas.height;
    const a_task_height = canvas_height / tasks.length;
    const start_date = task.taskTime;

    const duration = Number(task.taskDuration);
    const day_of_the_year = getDayOfYear(new Date(start_date));

    // get the optional values
    const gant_color = task.fillColor || def_val.gant_color;
    const stroke_color = task.borderColor || def_val.stroke_color;
    const stroke_width = 1;
    const offset = gant.options?.gant_offset || def_val.gant_offset;
    if (offset > a_task_height / 2) {
      throw new Error("Offset cannot be greater than half of the task height.");
    }

    // calculate the top left and bottom right coordinates for the gant
    const tlx = (canvas_width / 365) * day_of_the_year;
    const tly = index * a_task_height + offset;
    const brx = tlx + (canvas_width / 365) * duration - 1; // - 1 is to discount the border width
    const bry = tly + a_task_height - 2 * offset;

    // draw the chart
    drawRectangle(
      { x: Math.floor(tlx), y: Math.floor(tly) },
      { x: Math.floor(brx), y: Math.floor(bry) },
      stroke_color,
      stroke_width,
      ctx
    );

    // paint the chart
    flood_fill(
      {
        x: Math.floor((tlx + brx) / 2),
        y: Math.floor((tly + bry) / 2),
      },
      gant_color,
      def_val.default_bg,
      ctx,
      canvas_id
    );
  });
};

/** Utility functions*/
export const put_pixel = (
  cord: _2DCoordinate,
  weight: number,
  color: string,
  ctx: CanvasRenderingContext2D
) => {
  ctx.fillStyle = color;
  ctx.fillRect(cord.x, cord.y, weight, weight);
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

// Draw a rectangle
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

// Flood fill algorithm
export const flood_fill = (
  cord: _2DCoordinate,
  newColor: string,
  bgColor = def_val.default_bg,
  ctx: CanvasRenderingContext2D,
  canva_id: string
) => {
  const x = cord.x;
  const y = cord.y;

  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const canvas = document.getElementById(canva_id) as HTMLCanvasElement;
  if (!canvas) return;
  if (
    x >= 0 &&
    y >= 0 &&
    x < canvas.width &&
    y < canvas.height &&
    pixel[0] === bgColor[0] &&
    pixel[1] === bgColor[1] &&
    pixel[2] === bgColor[2] &&
    pixel[3] === bgColor[3]
  ) {
    put_pixel({ x, y }, 1, newColor, ctx);
    flood_fill({ x: x - 1, y }, newColor, bgColor, ctx, canva_id);
    flood_fill({ x: x + 1, y }, newColor, bgColor, ctx, canva_id);
    flood_fill({ x, y: y - 1 }, newColor, bgColor, ctx, canva_id);
    flood_fill({ x, y: y + 1 }, newColor, bgColor, ctx, canva_id);
  }
};
