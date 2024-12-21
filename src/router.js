import { createRouter, createWebHistory } from 'vue-router';

// Définir vos composants pour les routes
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
