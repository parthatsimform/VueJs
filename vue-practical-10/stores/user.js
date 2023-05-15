import Axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: null,
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
	persist: true,
	getters: {
		initialize() {
			if (process.client) {
				this.isLoggedIn = JSON.parse(
					localStorage.getItem("isLoggedIn")
				);
			}
		},
	},
	actions: {
		async signupUser(newUser) {
			try {
				const res = await Axios.post(
					import.meta.env.VITE_USER_URL,
					newUser
				);
				if (res.status === 201) {
					this.isLoggedIn = true;
					if (process.client) {
						localStorage.setItem("isLoggedIn", true);
						localStorage.setItem("token", `ThisIsRandomKey`);
						navigateTo("/");
					}
				}
			} catch (err) {
				alert(err);
			}
		},
		async signinUser(email, password) {
			let allUsers;
			try {
				const res = await Axios.get(import.meta.env.VITE_USER_URL);
				const data = await res.data.data;
				allUsers = data;
				let user = allUsers.find(
					(u) => u.email == email && u.password == password
				);
				if (user) {
					this.isLoggedIn = true;
					if (process.client) {
						localStorage.setItem("isLoggedIn", true);
						localStorage.setItem("token", `ThisIsRandomKey`);
						navigateTo("/");
					}
				} else {
					alert("User not found");
				}
			} catch (err) {
				alert(err);
			}
		},
		logOut() {
			if (process.client) {
				localStorage.removeItem("isLoggedIn");
				localStorage.removeItem("token");
				this.isLoggedIn = false;
			}
		},
	},
});
