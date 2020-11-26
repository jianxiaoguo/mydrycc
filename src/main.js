import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import store from './store'
import VueApexCharts from "vue3-apexcharts";

import { i18n, setLang, getUAgentLang } from './lang'

// 初始化
function init () {
    // 语言初始化
    const lang = getUAgentLang()
    setLang(lang)
}

init()

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(store)
app.use(VueApexCharts)
app.mount('#app')
