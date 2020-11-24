import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import AppList from "../views/AppList.vue";
import NewApp from "../views/NewApp.vue";
import AppDetail from "../views/AppDetail.vue";
import AppDetailAccess from "../views/AppDetailAccess.vue";
import AppDetailActivity from "../views/AppDetailActivity.vue";
import AppDetailDeploy from "../views/AppDetailDeploy.vue";
import AppDetailMetrics from "../views/AppDetailMetrics.vue";
import AppDetailResources from "../views/AppDetailResources.vue";
import AppDetailSettings from "../views/AppDetailSettings.vue";

const routes = [
    {
        path: '/',
        redirect: '/apps',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/apps',
        name: 'Apps',
        component: AppList
    },
    {
        path: '/new-app',
        name: 'NewApp',
        component: NewApp
    },
    {
        path: '/apps/:id',
        name: 'AppDetail',
        component: AppDetail
    },
    {
        path: '/apps/:id/resources',
        name: 'AppDetailResources',
        component: AppDetailResources
    },
    {
        path: '/apps/:id/deploy',
        name: 'AppDetailDeploy',
        component: AppDetailDeploy
    },
    {
        path: '/apps/:id/metrics',
        name: 'AppDetailMetrics',
        component: AppDetailMetrics
    },
    {
        path: '/apps/:id/activity',
        name: 'AppDetailActivity',
        component: AppDetailActivity
    },
    {
        path: '/apps/:id/access',
        name: 'AppDetailAccess',
        component: AppDetailAccess
    },
    {
        path: '/apps/:id/settings',
        name: 'AppDetailSettings',
        component: AppDetailSettings
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
