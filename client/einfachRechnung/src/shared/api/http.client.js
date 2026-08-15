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

let refreshRequest = null;

http.interceptors.response.use(
	response => response,
	async error => {
		const request = error.config;
		const isAuthRequest = request?.url?.startsWith("/auth/");
		if(error.response?.status !== 401 || isAuthRequest || request?.skipAuthRefresh || request?._retry){
			return Promise.reject(error);
		}

		request._retry = true;
		const authStore = useAuthStore();
		try {
			refreshRequest ??= authStore.refresh();
			await refreshRequest;
			request.headers.Authorization = `Bearer ${authStore.accessToken}`;
			return http(request);
		}
		catch (refreshError) {
			authStore.$patch({accessToken: "", user: {}, isAuthenticated: false});
			return Promise.reject(refreshError);
		}
		finally {
			refreshRequest = null;
		}
	},
);

export default http;
