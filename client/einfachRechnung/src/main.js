import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './app/router'
import customPreset from "./shared/config/primevue/customPreset.js"
import Button from "primevue/button";
import ToastService from "primevue/toastservice";
import {useAuthStore} from "./features/auth/store";
import { createPinia } from "pinia";


import "./shared/styles/main.scss";
import 'primeicons/primeicons.css'


const app = createApp(App)
const pinia = createPinia();
const authStore = useAuthStore(pinia);


app.use(pinia);
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: customPreset,
    }
});

app.use(ToastService);


app.component("Button", Button);


try{
    await authStore.refresh();
}
catch(error){
    await router.push("/auth/sign-in");
}

app.mount('#app')
