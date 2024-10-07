import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  const addOrUpdateTask = () => {
    if (task.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex].text = task;
        setTasks(updatedTasks);
        setEditingIndex(null);
        setError('');
      } else if (tasks.some(t => t.text.toLowerCase() === task.toLowerCase())) {
        setError('Task already exists!');
      } else {
        setTasks([...tasks, { text: task, isCompleted: false }]);
        setError('');
      }
      setTask('');
    }
  };

  const toggleCompleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
    setError('');
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addOrUpdateTask}>
        {editingIndex !== null ? 'Update Task' : 'Add Task'}
      </button>
      {error && <p className="error">{error}</p>}

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.isCompleted ? 'completed' : ''}>
            <span onClick={() => toggleCompleteTask(index)}>
              {task.text}
            </span>
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
