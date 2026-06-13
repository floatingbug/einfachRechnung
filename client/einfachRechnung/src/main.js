import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './app/router'
import customPreset from "./shared/config/primevue/customPreset.js"
import Button from "primevue/button";
import ToastService from "primevue/toastservice";



import initDemoState from "@/shared/demo/initDemoState.js";
initDemoState();



import "./shared/styles/main.scss";
import 'primeicons/primeicons.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: customPreset,
    }
});
app.use(ToastService);

app.component("Button", Button);

app.mount('#app')
