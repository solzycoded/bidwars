import './assets/main.css'
import "./assets/css/bootstrap.css"
import "./assets/css/app.css"
import "./assets/css/search.css"
import "./assets/css/room.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')