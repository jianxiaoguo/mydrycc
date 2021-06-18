import SettingDomainAdd from "../components/SettingDomainAdd.vue";
import SettingDomainDelete from "../components/SettingDomainDelete.vue"
import NavBar from "../components/NavBar.vue";
import {useRouter} from "vue-router";
import {onMounted, reactive, toRefs, getCurrentInstance} from "vue";
// import {dealAppDetail, getAppDetail} from "../services/app";
import {getAppDomains, dealAppDomains, deleteAppDomains} from "../services/domain"
import {Toast} from "vant";

export default {
    name: "SettingDomains",
    components: {
        'nav-bar': NavBar,
        'setting-domain-add': SettingDomainAdd,
        'setting-domain-delete': SettingDomainDelete
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            domain: Object,
            domains: [],
            isShowEdit: false,
            isShowDelete: false,
            editAccess: null
        })

        const showEdit = () => {
            state.isShowEdit = true
        }

        const closeEdit = () => {
            state.editAccess = null
            state.isShowEdit = false
        }
        const showDelete = (index) => {
            state.isShowDelete = true
            let domains = JSON.parse(JSON.stringify(state.domains));
            state.domain = domains.slice(index, index + 1)[0];
        }
        const closeDelete = (param) => {
            state.isShowDelete = false
            if (param.hasDomainDeleted) {
                fetchDomains()
            }
        }
        const fetchDomains = (async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            const res = await getAppDomains(JSON.parse(currentCluster).name, params.id)
            state.domains = res ? dealAppDomains(res) : null
        })

        onMounted(async () => {
            await fetchDomains()
        })

        return {
            ...toRefs(state),
            showEdit,
            closeEdit,
            showDelete,
            closeDelete
        }
    },
}
