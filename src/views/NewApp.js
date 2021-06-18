import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import { reactive, toRefs, onMounted , computed} from 'vue'
import {getClusters, dealClusterData} from "../services/cluster";
import { createApp } from "../services/app"
import { Toast } from 'vant'

export default {
    name: "NewApp",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
    },
    setup() {
        const state = reactive({
            isMenuActived: false,
            clusters: [],
            selectedClusterId: '',
            appName: ''
        })

        const createNewApp = () => {
            createApp(state.selectedClusterId, state.appName).then(res=>{
                if (res.status == 200) {
                    Toast.success('OK')
                }
            })
        }

        onMounted(async () => {
            let cluster = localStorage.getItem('clusters')
            if (cluster && (cluster != "[]" && cluster != "" && cluster != "undefined")){
                state.clusters = JSON.parse(localStorage.getItem('clusters'))
            } else {
                let res = await getClusters()
                state.clusters = res ? dealClusterData(res) : []
                if(state.clusters.length > 0){
                    localStorage.setItem("clusters", JSON.stringify(state.clusters))
                }
                console.log(111,state.clusters)
            }

            console.log(222222)
            state.selectedClusterId = state.clusters[0].name
        })

        return {
            ...toRefs(state),
            createNewApp
        }
    },

    mounted() {
        let _this = this
        document.addEventListener('click', function (e) {
            // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
            if (e.target.id !== 'menu-select-group') {
                _this.isMenuActived = false
            }

        })
    }
}
