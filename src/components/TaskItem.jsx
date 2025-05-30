import React from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div
      className={`card mb-3 shadow-sm ${
        task.completed ? "border-success bg-light" : ""
      }`}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div
          onClick={() => onToggle(task._id)}
          style={{ flex: 1 }}
          title="Toggle Complete"
          className="d-flex align-items-center gap-3"
        >
          <FaCheckCircle
            className={`fs-4 ${task.completed ? "text-success" : "text-muted"}`}
          />
          <div>
            <h5
              className={`mb-1 ${task.completed ? "text-decoration-line-through text-success" : ""
                }`}
            >
              {task.title}
            </h5>
            {task.dueTime && (
              <small className="text-muted">
                Due: {new Date(task.dueTime).toLocaleString()}
              </small>
            )}
          </div>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Edit task"
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
