type TaskProps = {
  taskName: string;
  taskTime: string;
  taskDuration: string;
};

const mock_tasks: TaskProps[] = [
  {
    taskName: "Sample Task 1",
    taskTime: "2024-12-28",
    taskDuration: "2",
  },
  {
    taskName: "Sample Task 2",
    taskTime: "2024-12-28",
    taskDuration: "2",
  },
  {
    taskName: "Sample Task 3",
    taskTime: "2024-12-28",
    taskDuration: "2",
  },
  {
    taskName: "Sample Task 4",
    taskTime: "2024-12-28",
    taskDuration: "2",
  },
  {
    taskName: "Sample Task 5",
    taskTime: "2024-12-28",
    taskDuration: "2",
  }
];


export { mock_tasks };
export type { TaskProps };