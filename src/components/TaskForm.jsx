import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dueTime, setDueTime] = useState(
    initialData?.dueTime ? new Date(initialData.dueTime).toISOString().slice(0, 16) : ""
  );

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDueTime(
      initialData?.dueTime ? new Date(initialData.dueTime).toISOString().slice(0, 16) : ""
    );
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    onSubmit({ title, dueTime: dueTime ? new Date(dueTime).toISOString() : null });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <div className="mb-3">
        <label className="form-label fw-bold">Task Title</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label className="form-label fw-bold">Due Date & Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <button type="submit" className="btn btn-primary d-flex align-items-center">
          <FaSave className="me-2" /> {initialData ? "Update Task" : "Add Task"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-secondary d-flex align-items-center"
          >
            <FaTimes className="me-2" /> Cancel
          </button>
        )}
      </div>
    </form>
  );
}
