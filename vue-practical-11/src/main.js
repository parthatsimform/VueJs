import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import i18n from "./includes/i18n";
import NavBar from "./components/NavBar.vue";
import Translate from "./components/Translate.vue";

const app = createApp(App);
app.component("NavBar", NavBar);
app.component("Translate", Translate);
app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount("#app");
