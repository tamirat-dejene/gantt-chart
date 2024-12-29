import './modal.css';
import { TaskProps } from './tasksmodel';

type ModalInputProps = {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void,
    tasks: TaskProps[],
    setTasks: (tasks: TaskProps[]) => void
}

const ModalInput = ({ showModal, setShowModal, tasks, setTasks }: ModalInputProps) => {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const taskName = (form?.elements.namedItem('taskName') as HTMLInputElement).value;
        const startDate = (form?.elements.namedItem('startDate') as HTMLInputElement).value;
        const duration = (form?.elements.namedItem('duration') as HTMLInputElement).value;
        const newTask: TaskProps = { taskName, taskTime: startDate, taskDuration: duration }
        const daysLeft = getDaysLeftInthisYear(startDate);
        if (Number(duration) > daysLeft) {
            alert('Duration exceeds the days left in this year');
            return;
        }
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
                    <form onSubmit={handleSubmit}>
                        <label>Task Name</label>
                        <input type="text" name='taskName' placeholder="a short descriptive name for your task" required maxLength={20} />
                        <label>Task Start Date</label>
                        <input type="date" name='startDate' id='start_date' required placeholder='the starting date of your task' />
                        <label>Task Duration</label>
                        <input type="number" name='duration' placeholder="duration in days" required min={1} />
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const getDaysLeftInthisYear = (date: string) => {
    const start_day = new Date(date);
    const year = start_day.getFullYear();
    const lastDay = new Date(year, 11, 31);
    const daysLeft = Math.floor((lastDay.getTime() - start_day.getTime()) / (1000 * 60 * 60 * 24));
    console.log(daysLeft);
    return daysLeft;
}

export default ModalInput;