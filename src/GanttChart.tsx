import { mock_tasks, TaskProps } from './tasksmodel';
import { useEffect, useState } from 'react';
import { drawGant } from './drawchart';
import ModalInput from './modalinput';
import './styles/App.css';
import { MdRemove } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

interface TaskRowProps {
  id: number;
  task: TaskProps;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const TaskRow = ({ id, task, handleDelete, handleEdit }: TaskRowProps) => {
  return (
    <div className='task-row'>
      <div className="task-name">{task.taskName}</div>
      <div className="task-time">{task.taskTime}</div>
      <div className="task-duration">{task.taskDuration}</div>
      <div className='btn-container'>
        <button className='delete' onClick={() => handleDelete(id)}><MdRemove /></button>
        <button className="edit" onClick={() => handleEdit(id)}><FiEdit /></button>
      </div>
    </div>
  )
};

function GanttChart() {
  const [tasks, setTasks] = useState<TaskProps[]>(mock_tasks);
  const [editingTask, setEditingTask] = useState<TaskProps | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [canvasHeight, setCanvaHeight] = useState(0);

  const handleDelete = (id: number) => {
    const newTasks = tasks.filter((_, index) => index !== id);
    setTasks(newTasks);
  }

  const handleEdit = (id: number) => {
    const task = tasks.find((_, index) => index === id);
    if (!task) return;
    setEditingTask(task);
    setShowModal(true);
  }

  useEffect(() => {
    setCanvaHeight(tasks.length * 34); // 34px : height of each task row
  }, [tasks]);

  useEffect(() => {
    if (canvasHeight == 0 && !editingTask) return;
    try {
      drawGant("canvas-sheet", {
        tasks: tasks, options: {
          gant_offset: 0,
          border_radius: 5
        }
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasHeight, editingTask]);

  return (
    <main>
      <div className='container'>
        <div className="tasks-container" style={{ height: canvasHeight + 34 }}>
          <div className="tasks-header">
            <div className="task-name">Task Name</div>
            <div className="task-time" title='Start date'>Start Date</div>
            <div className="task-duration" title='duration/days'>Duration</div>
            <div className="task-add" title='Add task/project'>
              <button className="add-task-btn" onClick={() => {
                setEditingTask(null)
                setShowModal(true)
              }}>+</button>
            </div>
          </div>
          <div className="tasks-list" style={{ height: canvasHeight + 34 }}>
            {tasks.map((task, index) => (
              <TaskRow key={index} id={index} task={task} handleEdit={handleEdit} handleDelete={handleDelete} />
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
      <ModalInput editingTask={editingTask} showModal={showModal} setShowModal={setShowModal} setEditingTask={setEditingTask} tasks={tasks} setTasks={setTasks} />
    </main>
  );
}

export default GanttChart;
