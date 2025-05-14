import {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

function TaskItem() {
    const [task, setTask] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
            .then(response => response.json())
            .then(data => setTask(data));
    }, [id]);

    const handleDelete = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        });
        navigate('/');
    };

    const handleEdit = () => {
        navigate(`/task/edit/${id}`);
    };

    return (
        <div className='container mt-5'>
            {task ? (
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='card-title'>{task.title}</h2>
                        <p className='card-text'>{task.description}</p>
                        <p className='card-text'>
                            <strong>Estado:</strong>{" "}
                            <span className={task.complete ? 'text-success' : 'text-warning'}>
                                {task.complete ? "Completada" : "Pendiente"}
                            </span>
                        </p>
                        <div className='d-flex gap-2 mt-3 justify-content-center'>
                            <button onClick={handleEdit} className='btn btn-warning'>Editar</button>
                            <button onClick={handleDelete} className='btn btn-danger'>Eliminar</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-center mt-5'>
                    <div className='spinner-border text-primary' role='status' />
                    <p className='mt-3'>Cargando....</p>
                </div>
            )}
        </div>
    );
}

export default TaskItem;