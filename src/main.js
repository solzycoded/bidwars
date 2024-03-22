import './assets/main.css'
import "./assets/css/bootstrap.css"
import "./assets/css/app.css"
import "./assets/css/search.css"
import "./assets/css/room.css"
import "./assets/css/profile.css"
import "./assets/css/sell-an-item.css"
import "./assets/css/login.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from './assets/js/store';

// new Vue({
//   store,
//   render: h => h(App)
// }).$mount('#app');

const app = createApp(App)

app.use(router);
app.use(store);

app.mount('#app');