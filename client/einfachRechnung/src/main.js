import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './app/router'
import customPreset from './shared/config/primevue/customPreset.js'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import Divider from 'primevue/divider'
import { registerLicense } from '@primeui/license-manager'

import './shared/styles/main.scss'
import 'primeicons/primeicons.css'

registerLicense({
	primeui: "eyJpZCI6IjRmYTdkNjIwLWJhZmItNDhmMy04ZGZiLWYxNDRlMzJjMzRjYyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODY4Nzc5MTcsImV4cCI6MTgxODQxMzkxN30.MkTWMYcGYejgucuNjwxVMfW09jZ8L-YGEFWtvgO8uL38U5KXF4wBSuOEY4EmyuNfwSG_GOUv2kvukiXV6kc3CA"
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(PrimeVue, {
	theme: {
		preset: customPreset,
	},
})

app.use(ToastService)

app.component('Button', Button)
app.component('Divider', Divider)

app.mount('#app')
