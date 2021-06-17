import SettingDomainAdd from "../components/SettingDomainAdd.vue";
import NavBar from "../components/NavBar.vue";
import {useRouter} from "vue-router";
import {onMounted, reactive, toRefs} from "vue";
// import {dealAppDetail, getAppDetail} from "../services/app";
import { getAppDomains, dealAppDomains } from "../services/domain"

export default {
    name: "SettingDomains",
    components: {
        'nav-bar': NavBar,
        'setting-domain-add': SettingDomainAdd
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            // appDetail: Object,
            domains: [],
            isShowEdit: false,
            editAccess: null
        })

        const showEdit = () => {
            // if (access) {
            //     state.editAccess = access
            // }
            state.isShowEdit = true
        }

        const closeEdit = () => {
            state.editAccess = null
            state.isShowEdit = false
        }

        onMounted(async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            // const data = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = data.data ? dealAppDetail(data) : null
            const res = await getAppDomains(JSON.parse(currentCluster).name, params.id)
            state.domains = res ? dealAppDomains(res) : null
        })

        return {
            ...toRefs(state),
            showEdit,
            closeEdit
        }
    },
}
