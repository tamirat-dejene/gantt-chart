import { mock_tasks, TaskProps } from './tasksmodel';
import { useEffect, useState } from 'react';
import { drawGant } from './drawchart';
import ModalInput from './modalinput';
import './App.css';

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
  const [tasks, setTasks] = useState<TaskProps[]>(mock_tasks);
  const [showModal, setShowModal] = useState(false);
  const [canvasHeight, setCanvaHeight] = useState(0);

  useEffect(() => {
    setCanvaHeight(tasks.length * 34); // 34px : height of each task row
  }, [tasks]);

  useEffect(() => {
    if (canvasHeight == 0) return;
    try {
      drawGant("canvas-sheet", {
        tasks: tasks, options: {
          gant_color: "#ffbf00",
          stroke_color: "#ff4000",
          gant_offset: 0,
          border_radius: 5
        }
      });
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasHeight]);

  return (
    <main>
      <div className='container'>
        <div className="tasks-container" style={{ height: canvasHeight + 34 }}>
          <div className="tasks-header">
            <div className="task-name">Task Name</div>
            <div className="task-time" title='Start date'>Start Date</div>
            <div className="task-duration/days">Duration</div>
            <div className="task-add" title='Add task/project'>
              <button className="add-task-btn" onClick={() => { setShowModal(true) }}>+</button>
            </div>
          </div>
          <div className="tasks-list" style={{ height: canvasHeight + 34 }}>
            {tasks.map((task, index) => (
              <TaskRow key={index} taskName={task.taskName} taskTime={task.taskTime} taskDuration={task.taskDuration} />
            ))}
          </div>
        </div>
        <div className="gant-container" style={{ height: canvasHeight + 34 }}>
          <div className="months-header">
            <div className="month">Jan</div>
            <div className="month">Feb</div>
            <div className="month">Mar</div>
            <div className="month">Apr</div>
            <div className="month">May</div>
            <div className="month">Jun</div>
            <div className="month">Jul</div>
            <div className="month">Aug</div>
            <div className="month">Sep</div>
            <div className="month">Oct</div>
            <div className="month">Nov</div>
            <div className="month">Dec</div>
          </div>
          <canvas className="gant-canvas" id='canvas-sheet'
            height={canvasHeight}
            style={{
              height: canvasHeight,
              borderBottom: tasks.length == 0 ? 'none' : '1px solid rgb(138, 138, 138)'
            }}></canvas>
        </div>
      </div>
      <ModalInput showModal={showModal} setShowModal={setShowModal} tasks={tasks} setTasks={setTasks} />
    </main>
  );
}

export default App;
