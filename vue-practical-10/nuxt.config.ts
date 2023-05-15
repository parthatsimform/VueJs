// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		pageTransition: { name: "route", mode: "out-in" },
	},
	modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
});
