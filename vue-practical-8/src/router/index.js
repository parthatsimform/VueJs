import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CarDetail from "../views/CarDetail.vue";
// import { useUserStore } from "../stores/user";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
		meta: {
			needAuthentication: true,
		},
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
	{
		path: "/details/:id",
		name: "details",
		component: CarDetail,
		meta: {
			needAuthentication: true,
		},
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkExactActiveClass: "activeBtn",
});

router.beforeEach((to, from, next) => {
	if (!to.meta.needAuthentication) {
		next();
		return;
	}
	if (
		window.localStorage.getItem("isLoggedIn") &&
		window.localStorage.getItem("token")
	) {
		next();
	} else {
		alert("Please login first to see this protected content");
		next("/login");
	}
});

export default router;
