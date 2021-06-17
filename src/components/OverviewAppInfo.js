import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted} from 'vue'
import { getAppDomains, dealAppDomains } from '../services/domain'
// import { getPsList, dealPsList } from '../services/process'

export default {
    name: "OverviewAppInfo",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            domains: [],
            ps: Object
        })
        onMounted(async () => {
            let currentCluster = localStorage.getItem('currentCluster')
            let domainsData =  await getAppDomains(JSON.parse(currentCluster).name, params.id)
            state.domains = domainsData ? dealAppDomains(domainsData): []

            // let psData =  await getPsList(JSON.parse(currentCluster).name, params.id)
            // state.ps = psData ? dealPsList(psData) : Object
            // console.log('state.ps: ', state.ps)
        })


        return {
            ...toRefs(state),
            // goToAccess
        }

    }
}
