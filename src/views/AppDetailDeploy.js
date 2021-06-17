import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onMounted , computed} from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
import DeployDryccGit from "../components/DeployDryccGit.vue";
import DeployDryccImage from "../components/DeployDryccImage.vue";
import { getAppDetail, dealAppDetail } from "../services/app";

export default {
    name: "AppDetailDeploy",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        'deploy-drycc-git': DeployDryccGit,
        'deploy-drycc-image': DeployDryccImage
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params

        const state = reactive({
            appDetail: Object,
            depolyType: params.deployType,
        })

        const goToDryccGit = () => {
            router.push({ path: `/apps/${params.id}/deploy/drycc-git` })
            state.depolyType = 'drycc-git'
        }

        const goToDryccImage = () => {
            router.push({ path: `/apps/${params.id}/deploy/drycc-image` })
            state.depolyType = 'drycc-image'
        }

        if (!state.depolyType) {
            goToDryccGit()
        }

        onMounted(async () => {
            let app = localStorage.getItem('currentApp')
            state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
            // var currentCluster = localStorage.getItem('currentCluster')
            // const data = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = data.data ? dealAppDetail(data) : null
        })

        return {
            ...toRefs(state),
            goToDryccGit,
            goToDryccImage
        }
    },
}
