import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const loginUser = async (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const registerUser = async (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const getCurrencyExchange = async (token, baseCurrency, targetCurrency, amount) => {
    console.log("Отправляем токен:", token);  // Проверяем токен в консоли

    return axios.post(`${API_URL}/currency/exchange`, 
        { base_currency: baseCurrency, target_currency: targetCurrency, amount },  // Данные в body
        { headers: { Authorization: `Bearer ${token}` } }  // Токен в заголовке
    );
};