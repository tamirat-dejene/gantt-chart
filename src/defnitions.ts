import { TaskProps } from "./tasksmodel";

export type Gant = {
  tasks: TaskProps[]; // the tasks to be displayed
  options?: {
    gant_offset?: number; // the offset of the gant from the top of the task row and the bottom
    border_radius?: number; // dermines the curveness of th gant
  };
};

export type _2DCoordinate = {
  x: number;
  y: number;
};