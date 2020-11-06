import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
