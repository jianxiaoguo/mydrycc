import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelect from "../components/ClusterSelect.vue";
import OneApp from "../components/OneApp.vue";
import Pagination from "../components/Pagination.vue";
import { reactive, toRefs, onMounted } from 'vue'
import { getAPPList, dealAPPList } from "../services/app";
import { useRouter } from 'vue-router'
import { dealClusterData, getClusters } from "../services/cluster";
import { getCsrf } from "../services/user";
import { useStore } from "vuex";

export default {
    name: "AppList",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select': ClusterSelect,
        'one-app': OneApp,
        'pagination': Pagination
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const state = reactive({
            clusters:[],
            apps: [],
            cPage: 1,
            tPage: 2,
            hasNextPage: false,
            isHiddenPagination: true,
        })
        let currentCluster = null
        const perPageNum = 15
        const totalPageNum = 30
        let count = 0
        let reqNext = ''
        const goToNewApp = () => {
            router.push({ path: '/new-app'})
        }

        const updatePage = (n) => {
            if (n < 1) {
                return;
            }
            state.cPage = n
            if ((state.tPage < totalPageNum) && (n * perPageNum < count)){
                state.tPage = Math.min(totalPageNum, n+1)
                state.hasNextPage=true
            }else {
                state.hasNextPage=false
            }
            // 显示当前页后的两个页码，提前掉两页接口取数据
            if (reqNext && (state.cPage + 2 > state.apps.length)) {
                var currentCluster = localStorage.getItem('currentCluster')
                getAPPList(JSON.parse(currentCluster).name, reqNext.split('?')[1]).then(res=>{
                    reqNext = res.data.next
                    count = res.data.count
                    var appdatas = res.data && res.data.results ? dealAPPList(res) : []
                    for (let j = 0; j < appdatas.length; j += perPageNum){
                        state.apps.push(appdatas.slice(j, j + perPageNum))
                    }
                })
            }
        }
        const localStorageInit = () => {
            if (state.clusters && state.clusters != []){
                localStorage.setItem('clusters', JSON.stringify(state.clusters))
            }

            store.dispatch('changeCurrentCluster', state.clusters[0])
            let cluster = currentCluster ? currentCluster : state.clusters[0]
            localStorage.setItem('currentCluster', JSON.stringify(cluster))

            getCsrf().then(res=>{
                sessionStorage.setItem('csrftoken', res.data.token)
            })
        }

        onMounted(async () => {
            var localCluster = localStorage.getItem('currentCluster')
            if(localCluster){
                currentCluster = JSON.parse(localCluster)
            }
            else{
                let res = await getClusters()
                state.clusters = res ? dealClusterData(res) : []
                currentCluster = state.clusters[0]
            }
            let res = await getAPPList(currentCluster.name)
            reqNext = res.data.next
            count = res.data.count
            var appdatas = res.data && res.data.results ? dealAPPList(res) : []
            for (let j = 0; j < appdatas.length; j += perPageNum){
                state.apps.push(appdatas.slice(j, j + perPageNum))
            }
            if(count > (2 * perPageNum)){
                state.hasNextPage=true
            }
            if(count > perPageNum){
                state.isHiddenPagination = false
            }
            localStorageInit()
        })

        return {
            ...toRefs(state),
            goToNewApp,
            updatePage
        }
    },
}
