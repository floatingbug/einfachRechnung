import {defineStore} from "pinia";
import {actions} from "./actions";


export const useAuthStore = defineStore("auth", {
	state: () => ({
		accessToken: "",
		user: {},
		isAuthenticated: false,
	}),

	actions,
});
