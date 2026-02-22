import axios from "axios";
import { getEnvVariables } from "../utils/getEnvVariables";

// GET Enviroments
const { VITE_API_URL } = getEnvVariables();

// Create axios instance
const saldoAppApi = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
});

// Interceptors for inject JWT in each request
saldoAppApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default saldoAppApi;