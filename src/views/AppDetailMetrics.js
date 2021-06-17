import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted, onBeforeMount, onUpdated } from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
import MetricMemory from "../components/MetricMemory.vue";
import MetricNetwork from "../components/MetricNetwork.vue";
import MetricCpu from "../components/MetricCpu.vue";
import { getAppDetail, dealAppDetail } from "../services/app";
import { getAppProcessTypes, dealProcessTypes } from "../services/process";
import { getMetric, dealMetricCpus, dealMetricMemory, dealMetricNetworks } from "../services/metric";

export default {
    name: "AppDetailMetrics",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        'metric-memory': MetricMemory,
        'metric-network': MetricNetwork,
        'metric-cpu': MetricCpu
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            appDetail: Object,
            processTypes: [],
            showProcessTypes: false,
            currentType: Object,
            metricCpus : [],
            metricMemory : [],
            metricNetworks : []
        })
        const currentCluster = localStorage.getItem('currentCluster')
        const fetchMetric = () =>{
            getMetric(JSON.parse(currentCluster).name, params.id, state.currentType.name).then(res=>{
                state.metricCpus = res.data ? dealMetricCpus(res) : []
                state.metricMemory = res.data ? dealMetricMemory(res) : []
                state.metricNetworks = res.data ? dealMetricNetworks(res) : []
            })
        }
        onBeforeMount( async () => {
            let app = localStorage.getItem('currentApp')
            state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
            let res = await getAppProcessTypes(JSON.parse(currentCluster).name, params.id)
            state.processTypes = res.data ? dealProcessTypes(res) : []
            getAppDetail(JSON.parse(currentCluster).name, params.id).then(res => {
                // state.appDetail = res.data ? dealAppDetail(res) : null
                if (state.processTypes.length > 0) {
                    if (!params.processType) {
                        state.currentType = state.processTypes[0]
                        router.push({path: `/apps/${params.id}/metrics/processes/${state.currentType.name}`})
                    } else {
                        const l = state.processTypes.filter(item => {
                            if (item.name.includes(params.processType)) {
                                return item
                            }
                        })
                        console.log(l)
                        if (l.length > 0) {
                            state.currentType = l[0]
                        } else {
                            state.currentType = state.processTypes[0]
                        }
                    }
                    fetchMetric()
                }
                console.log("onBeforeMount")
            })
        })
        const goToOtherProcessType = (pt) => {
            router.push({ path: `/apps/${params.id}/metrics/processes/${pt.name}` })
            state.currentType = pt
            state.showProcessTypes = false
            fetchMetric()
        }
        onMounted( async () => {
            document.addEventListener('click', function (e) {
                const d = document.getElementById('process-picker')
                // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
                // if (!d.contains(e.target)) {
                //     state.showProcessTypes = false
                // }
            })
            document.addEventListener('click', function (e) {
                // state.showProcessTypes = true
                // console.log(state.showProcessTypes)
            })
        })

        const openShowProcessTypes = () => {
            state.showProcessTypes = !state.showProcessTypes
        }


        return {
            ...toRefs(state),
            goToOtherProcessType,
            openShowProcessTypes
        }
    },
}
