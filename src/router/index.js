import { createRouter, createWebHistory } from 'vue-router'
import AppList from "../views/AppList.vue";
import NewApp from "../views/NewApp.vue";
import AppDetailOverview from "../views/AppDetailOverview.vue";
import AppDetailAccess from "../views/AppDetailAccess.vue";
import AppDetailActivity from "../views/AppDetailActivity.vue";
import AppDetailDeploy from "../views/AppDetailDeploy.vue";
import AppDetailMetrics from "../views/AppDetailMetrics.vue";
import AppDetailResources from "../views/AppDetailResources.vue";
import AppDetailSettings from "../views/AppDetailSettings.vue";
import AccountSetting from "../views/AccountSetting.vue";
import AccountFunding from "../views/AccountFunding.vue";
import ExpenseBill from "../views/ExpenseBill.vue";
import ExpenseBillDetail from "../views/ExpenseBillDetail.vue";


const routes = [
    {
        path: '/',
        redirect: '/apps',
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
        name: 'AppDetailOverview',
        component: AppDetailOverview
    },
    {
        path: '/apps/:id/resources',
        name: 'AppDetailResources',
        component: AppDetailResources
    },
    {
        path: '/apps/:id/deploy/:deployType',
        name: 'AppDetailDeployDetail',
        component: AppDetailDeploy
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
        path: '/apps/:id/metrics/processes/:processType',
        name: 'AppDetailMetricsDetail',
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
    {
        path: '/account',
        name: 'AccountSetting',
        component: AccountSetting
    },
    {
        path: '/account/funding',
        name: 'AccountFunding',
        component: AccountFunding
    },
    {
        path: '/expense-bills',
        name: 'ExpenseBill',
        component: ExpenseBill
    },
    {
        path: '/expense-bills/details',
        name: 'ExpenseBillDetail',
        component: ExpenseBillDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
