import '@/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.js';
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes
});
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
