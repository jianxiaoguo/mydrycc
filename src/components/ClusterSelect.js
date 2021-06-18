import { reactive, toRefs, onBeforeMount, onMounted , computed} from 'vue'
import {getClusters, dealClusterData} from "../services/cluster";
import {getCsrf} from "../services/user";
import { useStore } from 'vuex'

export default {
    name: "ClusterSelect",
    setup() {
        const store = useStore()
        const state = reactive({
            isMenuActived: false,
            clusters: [],
            currentCluster: JSON.parse(localStorage.getItem('currentCluster'))
        })

        const openOrCloseMenu = () => {
            state.isMenuActived = !state.isMenuActived;
        }

        const changeCluster = (cluster) => {
            localStorage.setItem('currentCluster', JSON.stringify(cluster))
            location.reload()
        }


        onBeforeMount(async () => {
            const token =await getCsrf()
            sessionStorage.setItem('csrftoken', token.data.token)

            if (state.currentCluster) {
                store.dispatch('changeCurrentCluster', state.currentCluster)
            } else {
                const res = await getClusters()
                state.clusters = res ? dealClusterData(res) : []
                if(state.clusters.length > 0){
                    store.dispatch('changeCurrentCluster', state.clusters[0])
                    localStorage.setItem('currentCluster', JSON.stringify(state.clusters[0]))
                    state.currentCluster = state.clusters[0]
                }
            }
        })
        return {
            ...toRefs(state),
            openOrCloseMenu,
            changeCluster
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
