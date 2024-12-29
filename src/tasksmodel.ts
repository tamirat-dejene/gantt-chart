type TaskProps = {
  taskName: string;
  taskTime: string;
  taskDuration: string;
};

const mock_tasks: TaskProps[] = [
  {
    taskName: "Requirements Gathering",
    taskTime: "2023-01-01",
    taskDuration: "30",
  },
  {
    taskName: "Design Phase",
    taskTime: "2023-01-08",
    taskDuration: "3",
  },
  {
    taskName: "Prototype Development",
    taskTime: "2023-01-15",
    taskDuration: "7",
  },
  {
    taskName: "User Testing",
    taskTime: "2023-01-25",
    taskDuration: "4",
  },
  {
    taskName: "Deployment",
    taskTime: "2023-02-01",
    taskDuration: "2",
  },
];

export { mock_tasks };
export type { TaskProps };
