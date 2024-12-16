import axios from 'axios';
import { Task } from '../types';

const API_URL = 'http://localhost:3000';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`, getAuthHeader());
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>) => {
  const response = await axios.post(`${API_URL}/tasks`, task, getAuthHeader());
  return response.data;
};

export const updateTask = async (task: Task) => {
  const response = await axios.put(`${API_URL}/tasks`, task, getAuthHeader());
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${API_URL}/tasks`, {
    ...getAuthHeader(),
    data: { id: taskId }
  });
  return response.data;
};