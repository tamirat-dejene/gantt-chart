import { useEffect, useState } from 'react';
import './App.css';

type TaskRowProps = {
  taskName: string;
  taskTime: string;
  taskDuration: string;
}

const mock_tasks = [{
    taskName: 'Task 1',
    taskTime: '10:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 2',
    taskTime: '12:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 3',
    taskTime: '13:00',
    taskDuration: '3h'
  },{
    taskName: 'Task 4',
    taskTime: '16:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 5',
    taskTime: '18:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 6',
    taskTime: '19:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 7',
    taskTime: '21:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 8',
    taskTime: '22:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 9',
    taskTime: '00:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 10',
    taskTime: '01:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 11',
    taskTime: '03:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 12',
    taskTime: '04:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 13',
    taskTime: '06:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 14',
    taskTime: '07:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 15',
    taskTime: '09:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 16',
    taskTime: '10:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 17',
    taskTime: '12:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 18',
    taskTime: '13:00',
    taskDuration: '3h'
  },{
    taskName: 'Task 19',
    taskTime: '16:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 20',
    taskTime: '18:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 21',
    taskTime: '19:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 22',
    taskTime: '21:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 23',
    taskTime: '22:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 24',
    taskTime: '00:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 25',
    taskTime: '01:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 26',
    taskTime: '03:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 27',
    taskTime: '04:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 28',
    taskTime: '06:00',
    taskDuration: '1h'
  },{
    taskName: 'Task 29',
    taskTime: '07:00',
    taskDuration: '2h'
  },{
    taskName: 'Task 30',
    taskTime: '09:00',
    taskDuration: '1h'
  }
];

const TaskRow = ({ taskName, taskTime, taskDuration }: TaskRowProps) => {
  return (
    <div className='task-row'>
      <div className="task-name">{taskName}</div>
      <div className="task-time">{taskTime}</div>
      <div className="task-duration">{taskDuration}</div>
    </div>
  )
};

function App() {
  const [tasks, setTasks] = useState(mock_tasks);
  const [canvaHeight, setCanvaHeight] = useState(0);

  useEffect(() => {
    setTasks(tasks);
    setCanvaHeight(tasks.length * 15.06666);
  }, [tasks]);

  return (
    <main>
      <div className='container' style={
       { height: canvaHeight + 50 } 
      }>
        <div className="tasks-container">
          <div className="tasks-header">
            <div className="task-name">Task Name</div>
            <div className="task-time" title='Start time'>Time</div>
            <div className="task-duration">Duration</div>
            <div className="task-add" title='Add task/project'><button className="add-task-btn">+</button></div>
          </div>
          <div className="tasks-list" style={{height: canvaHeight}} >{tasks.map((task, index) => (
              <TaskRow key={index} taskName={task.taskName} taskTime={task.taskTime} taskDuration={task.taskDuration} />
            ))}</div>
        </div>
        <div className="gant-container">
          <div className="months-header">
            <div className="month">Jan</div>
            <div className="month">Feb</div>
            <div className="month">Mar</div>
            <div className="month">Apr</div>
            <div className="month">May</div>
            <div className="month">Jun</div>
            <div className="month">Jul</div>
            <div className="month">Aug</div>
            <div className="month">Seb</div>
            <div className="month">Oct</div>
            <div className="month">Nov</div>
            <div className="month">Dec</div>
          </div>
          <canvas className="gant-canvas" height={canvaHeight/1. } style={{backgroundColor: "ThreeDFace"}} ></canvas>
        </div>
      </div>
    </main>
  );
}

export default App;
