import { useEffect, useState } from 'react';
import { mock_tasks, TaskProps } from './tasksmodel';
import './App.css';
import ModalInput from './modalinput';
import { drawGant } from './drawchart';

const TaskRow = ({ taskName, taskTime, taskDuration }: TaskProps) => {
  return (
    <div className='task-row'>
      <div className="task-name">{taskName}</div>
      <div className="task-time">{taskTime}</div>
      <div className="task-duration">{taskDuration}</div>
    </div>
  )
};



function App() {
  const [tasks, setTasks] = useState(mock_tasks.slice(0, 5));
  const [showModal, setShowModal] = useState(false);
  const [canvaHeight, setCanvaHeight] = useState(0);

  useEffect(() => {
    setTasks(tasks);
    setCanvaHeight(tasks.length * 34); // 34px : height of each task row
  }, [tasks]);


  return (
    <main>
      <div className='container'>
        <div className="tasks-container" style={{ height: canvaHeight + 34 }}>
          <div className="tasks-header">
            <div className="task-name">Task Name</div>
            <div className="task-time" title='Start date'>Start Date</div>
            <div className="task-duration/days">Duration</div>
            <div className="task-add" title='Add task/project'>
              <button className="add-task-btn" onClick={() => {
                const paper = document.getElementById('canvas-sheet')
                drawGant(paper as HTMLCanvasElement)
              }}>+</button>
            </div>
          </div>
          <div className="tasks-list" style={{ height: canvaHeight + 34 }}>
            {tasks.map((task, index) => (
              <TaskRow key={index} taskName={task.taskName} taskTime={task.taskTime} taskDuration={task.taskDuration} />
            ))}
          </div>
        </div>
        <div className="gant-container" style={{ height: canvaHeight + 34 }}>
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
          <canvas className="gant-canvas" id='canvas-sheet' style={{ height: canvaHeight, borderBottom: tasks.length == 0 ? 'none' : '1px solid rgb(138, 138, 138)' }} ></canvas>
        </div>
      </div>
      <ModalInput showModal={showModal} setShowModal={setShowModal} tasks={tasks} setTasks={setTasks} />
    </main>
  );
}

export default App;
