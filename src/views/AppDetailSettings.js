import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onMounted , computed} from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
import SettingAppInfo from "../components/SettingAppInfo.vue";
// import SettingBuildpacks from "../components/SettingBuildpacks.vue";
import SettingConfigVars from "../components/SettingConfigVars.vue";
import SettingDeleteApp from "../components/SettingDeleteApp.vue";
import SettingDomains from "../components/SettingDomains.vue";
// import SettingMaintenanceMode from "../components/SettingMaintenanceMode.vue";
import SettingTransferOwnership from "../components/SettingTransferOwnership.vue";
import { getAppDetail, dealAppDetail } from "../services/app";

export default {
    name: "AppDetailSettings",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        'setting-app-info': SettingAppInfo,
        'setting-config-vars': SettingConfigVars,
        // 'setting-buildpacks': SettingBuildpacks,
        'setting-domains': SettingDomains,
        // 'setting-maintenance-mode': SettingMaintenanceMode,
        'setting-transfer-ownership': SettingTransferOwnership,
        'setting-delete-app': SettingDeleteApp
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
            // const res = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = res.data ? dealAppDetail(res) : null
        })

        return {
            ...toRefs(state)
        }
    },
}
