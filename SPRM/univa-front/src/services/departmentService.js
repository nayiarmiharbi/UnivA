import axios from 'axios';
const API = 'http://localhost:8081/api/departments';

export const getDepartments = () => axios.get(API);
export const getDepartment = (id) => axios.get(`${API}/${id}`);
export const createDepartment = (data) => axios.post(API, data);
export const updateDepartment = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API}/${id}`);
