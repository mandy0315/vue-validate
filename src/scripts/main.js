import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/WWW.vue";
import "@/assets/scss/style.scss";
// windi.css
import "virtual:windi.css";
import "virtual:windi-devtools";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
