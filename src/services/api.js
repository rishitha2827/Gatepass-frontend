import axios from 'axios';

// 🔁 Use your deployed backend URL
const API_BASE_URL = 'https://vercel.com/rishithas-projects-00318a93/gatepass-backend';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
