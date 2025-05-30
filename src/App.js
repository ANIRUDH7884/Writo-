import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const [tasks, setTasks] = useState([]);

  const handleAdd = (task) => {
    const newTask = { ...task, _id: Date.now().toString(), completed: false };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdate = (id, data) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...data } : task))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <div className={`app-wrapper ${darkMode ? '' : 'light'}`}>
      <nav className="navbar navbar-expand-lg px-4 py-3">
        <a href="/" className="navbar-brand">
          Writo🖋️
        </a>
        <div className="ms-auto toggle-switch" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </div>
      </nav>

      <TaskList
        tasks={tasks}
        onAdd={handleAdd}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
