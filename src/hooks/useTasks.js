import { useState, useEffect } from "react";
import * as taskApi from "../api/taskApi";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await taskApi.fetchTasks();
      setTasks(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task) => {
    await taskApi.createTask(task);
    await loadTasks();
  };

  const toggleCompletion = async (id) => {
    await taskApi.toggleTask(id);
    await loadTasks();
  };

  const updateTask = async (id, data) => {
    await taskApi.updateTask(id, data);
    await loadTasks();
  };

  const deleteTask = async (id) => {
    await taskApi.deleteTask(id);
    await loadTasks();
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleCompletion,
    updateTask,
    deleteTask,
  };
}
