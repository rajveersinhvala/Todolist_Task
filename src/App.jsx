import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const completeTask = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
    setTasks(newTasks);
  };

  const removeTask = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <TaskInput addTask={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          completeTask={() => completeTask(index)}
          removeTask={() => removeTask(index)}
        />
      ))}
    </div>
  );
}

const TaskInput = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      addTask({ details: inputValue, completed: false });
      setInputValue('');
    }
  };

  return (
    <div className="TaskInput">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

const Task = ({ task, completeTask, removeTask }) => {
  return (
    <div className="Task">
      <label>
        <input type="checkbox" checked={task.completed} onChange={completeTask} />
        {task.details}
      </label>
      <button onClick={removeTask}>Delete</button>
    </div>
  );
}

export default App;
