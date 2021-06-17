import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted} from 'vue'
import { getAppProcesses, dealAppProcesses } from "../services/process";
import {useStore} from "vuex";

export default {
    name: "OverviewFormation",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const store = useStore()
        const state = reactive({
            processes: []
        })

        const goToResources = () => {
            router.push({ path: `/apps/${props.appDetail.id}/resources` })
        }

        onMounted(async () => {
            // var currentCluster = store.getters.getCurrentCluster
            var currentCluster = localStorage.getItem('currentCluster')
            var res =  await getAppProcesses(JSON.parse(currentCluster).name, params.id)
            state.processes = dealAppProcesses(res)
        })

        return {
            ...toRefs(state),
            goToResources
        }

    }
}
