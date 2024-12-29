import './styles/modal.css';
import { TaskProps } from './tasksmodel';
import { getDaysLeftInthisYear } from './utils';

interface ModalInputProps {
    showModal: boolean;
    editingTask: TaskProps | null;
    setShowModal: (show: boolean) => void;
    setEditingTask: (task: TaskProps | null) => void;
    tasks: TaskProps[];
    setTasks: (tasks: TaskProps[]) => void;
}

const ModalInput = ({ showModal, editingTask, setShowModal, setEditingTask, tasks, setTasks }: ModalInputProps) => {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const taskName = (form?.elements.namedItem('taskName') as HTMLInputElement).value;
        const startDate = (form?.elements.namedItem('startDate') as HTMLInputElement).value;
        const duration = (form?.elements.namedItem('duration') as HTMLInputElement).value;
        const borderColor = (form?.elements.namedItem('borderColor') as HTMLInputElement).value;
        const fillColor = (form?.elements.namedItem('fillColor') as HTMLInputElement).value;
        const newTask: TaskProps = { taskName, taskTime: startDate, taskDuration: duration, borderColor, fillColor };
        const daysLeft = getDaysLeftInthisYear(startDate);
        if (Number(duration) > daysLeft) {
            alert('Duration exceeds the days left in this year');
            return;
        }
        if (editingTask) {
            const newTasks = tasks.map(task => task === editingTask ? newTask : task);
            setTasks(newTasks);
            setEditingTask(null);
            setShowModal(false);
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
                        <input type="text"
                            name='taskName'
                            defaultValue={editingTask?.taskName}
                            placeholder="a short descriptive name for your task" required maxLength={25} />
                        <label>Task Start Date</label>
                        <input type="date"
                            name='startDate'
                            defaultValue={editingTask?.taskTime}
                            required placeholder='the starting date of your task' />
                        <label>Task Duration</label>
                        <input type="number"
                            name='duration'
                            defaultValue={editingTask?.taskDuration}
                            placeholder="duration in days" required min={1} />
                        <div className="color-picker-container">
                            <div className="border-color">
                                <label>Border Color</label>
                                <input type="color" defaultValue={editingTask?.borderColor || "#ff4000"} name="borderColor" />
                            </div>
                            <div className="fill-color">
                                <label>Fill Color</label>
                                <input type="color" defaultValue={editingTask?.fillColor || "#ffbf00"} name="fillColor" />
                            </div>
                        </div>
                        <button type="submit">{editingTask ? 'Edit Task' : 'Add Task'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ModalInput;