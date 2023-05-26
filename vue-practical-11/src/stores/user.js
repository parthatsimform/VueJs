import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: window.localStorage.getItem("isLoggedIn"),
		user: {
			name: "",
			email: "",
			password: "",
			cPassword: "",
			role: "",
			gender: "",
			age: "",
			dob: "",
		},
	}),
	actions: {
		logOut() {
			window.localStorage.removeItem("isLoggedIn");
			window.localStorage.removeItem("token");
			this.isLoggedIn = false;
		},
	},
});
