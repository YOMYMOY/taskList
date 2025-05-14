import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskItem from './components/TaskItem'
import TaskFrom from './components/TaskForm'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/task/:id' element={<TaskItem />} />
        <Route path='/task/edit/:id' element={<TaskFrom />} />
        <Route path='/task/new' element={<TaskFrom />} />
      </Routes>
    </Router>
  )
}

export default App
