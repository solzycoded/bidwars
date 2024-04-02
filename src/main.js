import './assets/main.css'
import "./assets/css/bootstrap.css"
import "./assets/css/app.css"
import "./assets/css/search.css"
import "./assets/css/room.css"
import "./assets/css/profile.css"
import "./assets/css/sell-an-item.css"
import "./assets/css/login.css"
import "./assets/css/dashboard.css"
import "./assets/css/notifications.css"
import "./assets/css/item-details.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from './assets/js/store/index.js'
import './registerServiceWorker'

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered: ', registration)
        })
        .catch(error => {
          console.error('Service Worker registration failed: ', error)
        })
    })
}

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');