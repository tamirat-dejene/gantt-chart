export type Gant = {
  id: number; // the row at wich the task exists : order of the task
  start_date: string; // determines starting pixel for the row
  duration: number; // determines the length of the task
  task_row_height: number; // height of the row the task takes
  canva_width?: number; // determines total_number of pixels that equals a year

  options: {
    gant_height?: number; // determines thickness of the gant within its row
    gant_color?: string; // the color to fill the bar
    stroke_width?: string; // the weight of the outline color,
    stroke_color?: string; // outline color
    border_radius?: string; // dermines the curveness of th gant
  };
};

export type _2DCoordinate = {
  x: number;
  y: number;
};