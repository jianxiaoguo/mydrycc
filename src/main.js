import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import store from './store'
import VueApexCharts from "vue3-apexcharts";

import { i18n, setLang, getUAgentLang } from './lang'


/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

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
