import axios from 'axios';

let token: string | null = localStorage.getItem('token'); // pega token salvo no LocalStorage

export const setToken = (t: string) => {
  token = t;
  localStorage.setItem('token', t); // persiste no LocalStorage
};

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// envia token em todas as requisições
api.interceptors.request.use((config) => {
  if (token) {
    config.headers!['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// interceptor de resposta
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // sessão expirada
//       localStorage.removeItem('token'); // limpa token
//       window.location.href = "/login"; // redireciona
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
