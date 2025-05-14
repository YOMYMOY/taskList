const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

let tasks = [];
let nextId = 1;

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task) {
        return res.status(404).json({message: 'Tarea no encontrada.'})
    }
    res.json(task);
});

app.post('/api/tasks', (req, res) => {
    const {title, description} = req.body;

    if(!title) {
        return res.status(400).json({message: 'Falta el nombre de la tarea.'})
    }

    if(!description) {
        return res.status(400).json({message: 'Falta la descripción de la tarea.'})
    }

    const newTask = {
        id: nextId++,
        title,
        description,
        complete: false,
        createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {title, description, complete} = req.body;

    const task = tasks.find(t => t.id === id);
    if(!task) {
        return res.status(404).json({message: 'Tarea no encontrada'});
    }

    if(title !== undefined) task.title = title;
    if(description !== undefined) task.description = description;
    if(complete !== undefined) task.complete = complete;

    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if(index === -1) {
        return res.status(404).json({message: 'Tarea no encontrada'});
    }

    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});