import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList({ tasks, onToggle, onUpdate, onDelete, onAdd }) {
  const [editingTask, setEditingTask] = useState(null);

  const startEdit = (task) => setEditingTask(task);
  const cancelEdit = () => setEditingTask(null);

  const handleUpdate = async (data) => {
    await onUpdate(editingTask._id, data);
    setEditingTask(null);
  };

  return (
    <div className="container my-5">

      <div className="mb-5 mx-auto" style={{ maxWidth: "600px" }}>
        {!editingTask && <TaskForm onSubmit={onAdd} />}
        {editingTask && (
          <TaskForm
            initialData={editingTask}
            onSubmit={handleUpdate}
            onCancel={cancelEdit}
          />
        )}
      </div>

      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        {tasks.length === 0 ? (
          <p className="text-center text-muted fs-5">No tasks found. Add a new task!</p>
        ) : (
          tasks.map((task) =>
            editingTask && editingTask._id === task._id ? null : (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggle}
                onEdit={startEdit}
                onDelete={onDelete}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
