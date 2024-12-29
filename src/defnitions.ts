import { TaskProps } from "./tasksmodel";

export type Gant = {
  tasks: TaskProps[]; // the tasks to be displayed

  options?: {
    gant_offset?: number; // the offset of the gant from the top of the task row and the bottom
    gant_color?: string; // the color to fill the bar
    stroke_color?: string; // outline color
    border_radius?: number; // dermines the curveness of th gant
  };
};

export type _2DCoordinate = {
  x: number;
  y: number;
};
