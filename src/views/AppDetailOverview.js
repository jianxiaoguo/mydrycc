import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
// import OverviewMetrics from "../components/OverviewMetrics.vue";
import OverviewAppInfo from "../components/OverviewAppInfo.vue";
import OverviewAddons from "../components/OverviewAddons.vue";
import OverviewFormation from "../components/OverviewFormation.vue";
import OverviewCollaboratorActivity from "../components/OverviewCollaboratorActivity.vue";
import OverviewLatestActivity from "../components/OverviewLatestActivity.vue";
import { getAppDetail, dealAppDetail } from "../services/app";
import {useStore} from "vuex";

export default {
    name: "AppDetailOverview",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        // 'overview-metrics': OverviewMetrics,
        'overview-appinfo': OverviewAppInfo,
        'overview-addons': OverviewAddons,
        'overview-formation': OverviewFormation,
        'overview-collaborator-activity': OverviewCollaboratorActivity,
        'overview-latest-activity': OverviewLatestActivity
    },

    setup() {
        const router = useRouter()
        const store = useStore()
        const params = router.currentRoute.value.params
        const state = reactive({
            appDetail: Object,
        })
        onBeforeMount(async  () => {
            let currentCluster = localStorage.getItem('currentCluster')
            const res = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            state.appDetail = res.data ? dealAppDetail(res) : null
            if(state.appDetail){
                localStorage.setItem('currentApp', JSON.stringify(state.appDetail))
            }
        })
        onMounted(async () => {
            // let app = localStorage.getItem('currentApp')
            // state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
            // var currentCluster = store.getters.getCurrentCluster
            // var currentCluster = localStorage.getItem('currentCluster')
            // const res = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = res ? dealAppDetail(res) : null
        })
        return {
            ...toRefs(state)
        }
    },
}
