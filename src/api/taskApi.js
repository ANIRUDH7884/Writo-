import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

export const fetchTasks = () => axios.get(`${API_URL}/`);
export const createTask = (data) => axios.post(`${API_URL}/create`, data);
export const toggleTask = (id) => axios.patch(`${API_URL}/toggle/${id}`);
export const updateTask = (id, data) => axios.patch(`${API_URL}/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
