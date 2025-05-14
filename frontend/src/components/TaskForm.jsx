import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
                .then(response => response.json())
                .then(task => {
                    setTitle(task.title);
                    setDescription(task.description);
                    setComplete(task.complete);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            complete,
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${import.meta.env.VITE_API_URL}/api/tasks/${id}`
                        : `${import.meta.env.VITE_API_URL}/api/tasks`;

        fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskData)  
        })
        .then((response) => response.json())
        .then(() => navigate('/'))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className='container mt-5'>
            <h2>{id ? 'Editar Tarea' : 'Crear Tarea'}</h2>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div>
                    <label className='form-label'>Título</label>
                    <input
                        type='text'
                        className='form-control'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción</label>
                    <textarea
                        className='form-control'
                        rows='3'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='form-check mb-3'>
                    <input
                        type='checkbox'
                        className='form-check-input'
                        id='completeCheck'
                        checked={complete}
                        onChange={(e) => setComplete(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="completeCheck">
                        Completado
                    </label>
                </div>
                <button type='submit' className='btn btn-primary'>
                    {id ? 'Actualizar Tarea' : 'Crear Tarea'}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;