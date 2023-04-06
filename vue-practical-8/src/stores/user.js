import Axios from "axios";
import router from "../router";
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
		async signupUser(newUser) {
			try {
				const res = await Axios.post(
					"https://testapi.io/api/dartya/resource/users",
					newUser
				);
				if (res.status === 201) {
					this.isLoggedIn = true;
					window.localStorage.setItem("isLoggedIn", true);
					router.push({ name: "home" });
				}
			} catch (err) {
				alert(err);
			}
		},
		async signinUser(email, password) {
			let allUsers;
			try {
				const res = await Axios.get(
					"https://testapi.io/api/dartya/resource/users"
				);
				const data = await res.data.data;
				allUsers = data;
				let user = allUsers.find(
					(u) => u.email == email && u.password == password
				);
				if (user) {
					this.isLoggedIn = true;
					window.localStorage.setItem("isLoggedIn", true);
					router.push({ name: "home" });
				} else {
					alert("User not found");
				}
			} catch (err) {
				alert(err);
			}
		},
		logOut() {
			window.localStorage.removeItem("isLoggedIn");
			this.isLoggedIn = false;
		},
	},
});
