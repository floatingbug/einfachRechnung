import axios from "axios";
import { API_BASE_URL } from "@/shared/config/env.js";
import {useAuthStore} from "@/features/auth/store";


const http = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


http.interceptors.request.use(
    (config) => {
		const authStore = useAuthStore();

        if (authStore.isAuthenticated) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default http;
