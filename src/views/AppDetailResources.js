import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onMounted , computed} from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
import { getAppDetail, dealAppDetail } from "../services/app";
import ResourcesDyno from "../components/ResourcesDyno.vue";
import ResourcesAddons from "../components/ResourcesAddons.vue";

export default {
    name: "AppDetailResources",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        'resources-dyno': ResourcesDyno,
        'resources-addons': ResourcesAddons
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            appDetail: Object
        })

        onMounted(async () => {
            let app = localStorage.getItem('currentApp')
            state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
            // var currentCluster = localStorage.getItem('currentCluster')
            // const data = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = data.data ? dealAppDetail(data) : null
        })

        return {
            ...toRefs(state)
        }
    },
}