import axios from 'axios';

// ✅ URL CORRETA DA API:
const API_BASE = 'https://e-commerce-api-bcf7.onrender.com/api.ecommerce/v1';
//                                         ↑                        ↑
//                                   

const api = axios.create({
    baseURL: API_BASE,
    timeout: 30000, // Aumente para 30s
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; // ✅ ADD ESTA LINHA!