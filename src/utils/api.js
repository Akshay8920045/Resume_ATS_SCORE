import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeResumeAPI = (formData) => {
  return api.post('/resumes/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const listResumesAPI = () => {
  return api.get('/resumes');
};

export const getResumeAPI = (id) => {
  return api.get(`/resumes/${id}`);
};

export default api;