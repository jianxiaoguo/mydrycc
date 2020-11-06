import App from './App.vue'
import './index.css'
import router from './router'
import { createApp } from 'vue'

import { Toast, Button, Calendar } from 'vant'
import { i18n, setLang, getUAgentLang } from './lang'

// // 初始化
// function init () {
//     // 语言初始化
//     const lang = getUAgentLang()
//     setLang(lang)
// }
//
// init()

(function (global) {
    global.hanlucen=false;

})(window)

const app = createApp(App)
app.use(Toast)
app.use(Button)
app.use(Calendar)
app.use(router)
app.use(i18n)
app.mount('#app')
