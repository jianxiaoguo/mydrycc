import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onMounted , computed} from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
import AccessCollaboratorEdit from "../components/AccessCollaboratorEdit.vue";
import { getAppDetail, dealAppDetail } from "../services/app";
import { getAppAccesses, dealAppAccesses } from "../services/access"

export default {
    name: "AppDetailAccess",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        'access-collaborator-edit': AccessCollaboratorEdit
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            appDetail: Object,
            accesses: [],
            isShowEdit: false,
            editAccess: null
        })

        const showEdit = (access) => {
            if (access) {
                state.editAccess = access
            }
            state.isShowEdit = true
        }

        const closeEdit = () => {
            state.editAccess = null
            state.isShowEdit = false
        }

        onMounted(async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            let app = localStorage.getItem('currentApp')
            state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
            // const res = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = res.data ? dealAppDetail(res) : null
            const accessData = await getAppAccesses(JSON.parse(currentCluster).name, params.id)
            state.accesses = accessData ? dealAppAccesses(accessData) : null
        })

        return {
            ...toRefs(state),
            showEdit,
            closeEdit
        }
    },
}
