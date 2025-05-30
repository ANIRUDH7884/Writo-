import React from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";

export default function Home() {
  const { tasks, loading, error, addTask, toggleCompletion, updateTask, deleteTask } = useTasks();

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <TaskList
        tasks={tasks}
        onAdd={addTask}
        onToggle={toggleCompletion}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
