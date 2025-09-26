import axios from 'axios';
import Cookies from 'js-cookie';


const baseURL = import.meta.env.VITE_API_KEY;


export const api = axios.create({baseURL, withCredentials: true});


api.interceptors.request.use(config=>{
    const token = Cookies.get('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error=>{
        if(error.response?.status===401){
            Cookies.remove('token');
            window.location.href = 'login';
        }
        return Promise.reject(error);
    }
)