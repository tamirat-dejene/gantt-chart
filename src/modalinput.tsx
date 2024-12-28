import './modal.css';
import { TaskProps } from './tasksmodel';

type ModalInputProps = {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void,
    tasks: TaskProps[],
    setTasks: (tasks: TaskProps[]) => void
}

const ModalInput = ({ showModal, setShowModal, tasks, setTasks }: ModalInputProps) => {
    const handlSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const taskName = (form?.elements.namedItem('taskName') as HTMLInputElement).value;
        const startDate = (form?.elements.namedItem('startDate') as HTMLInputElement).value;
        const duration = (form?.elements.namedItem('duration') as HTMLInputElement).value;
        const newTask: TaskProps = { taskName, taskTime: startDate, taskDuration: duration }
        setTasks([...tasks, newTask])
        setShowModal(false);
    }
    return (
        <div className="modal-input" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Task</h2>
                    <span className="close" title='close' onClick={() => setShowModal(false)}>&times;</span>
                </div>
                <div className="modal-body">
                    <form>
                        <label>Task Name</label>
                        <input type="text" name='taskName' placeholder="a short descriptive name for your task" required maxLength={20} />
                        <label>Task Start Date</label>
                        <input type="date" name='startDate' required placeholder='the starting date of your task' />
                        <label>Task Duration</label>
                        <input type="number" name='duration' placeholder="duration in days" required min={1} max={getDaysLeftInthisYear()} />
                        <button type="submit" onClick={handlSubmit}>Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const getDaysLeftInthisYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const lastDay = new Date(year, 11, 31);
    const daysLeft = Math.floor((lastDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
}

export default ModalInput;