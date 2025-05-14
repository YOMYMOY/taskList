import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const handleDelete = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        });
    };

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-between align-items-center mb-4 gap-5'>
            <h1>Lista de Tareas</h1>
            <Link to="/task/new" className='btn btn-primary'>Crear nueva tarea</Link>
            </div>
            <ul className='list-group'>
                {tasks.map(task => (
                    <li key={task.id} className='list-group-item d-flex justify-content-between align-items-center'>
                        <Link to={`/task/${task.id}`} className='text-decoration-none flex-grow-1'>
                            {task.title}
                        </Link>
                        <span className={`badge me-3 ${task.complete ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {task.complete ? 'Completada' : 'Pendiente'}
                        </span>
                        <div className='btn-group btn-group-sm'>
                            <Link to={`/task/edit/${task.id}`} className='btn btn-warning'>Editar</Link>
                            <button onClick={() => handleDelete(task.id)} className='btn btn-danger'>Eliminar</button>
                        </div>                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;