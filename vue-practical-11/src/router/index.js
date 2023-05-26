import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		beforeEnter: (to, from, next) => {
			if (
				window.localStorage.getItem("isLoggedIn") &&
				window.localStorage.getItem("token")
			) {
				next();
			} else {
				next("/login");
			}
		},
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/Register.vue"),
	},
	{
		path: "/details/:id",
		name: "details",
		component: () => import("../views/CarDetail.vue"),
		beforeEnter: (to, from, next) => {
			if (
				window.localStorage.getItem("isLoggedIn") &&
				window.localStorage.getItem("token")
			) {
				next();
			} else {
				next("/login");
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkExactActiveClass: "activeBtn",
});

export default router;
