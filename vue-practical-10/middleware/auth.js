import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
export default defineNuxtRouteMiddleware(async (to, from) => {
	await userStore.initialize();
	if (process.client) {
		if (!userStore.isLoggedIn) {
			return navigateTo("/login");
		}
	}
});
