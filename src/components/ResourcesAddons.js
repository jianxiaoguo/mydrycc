
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted} from 'vue'
import { getAppAddons,dealAppAddons } from "../services/addons";

export default {
    name: "ResourcesAddons",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            addons: []
        })

        const goToResources = () => {
            router.push({ path: `/apps/${props.appDetail.id}/resources` })
        }

        onMounted(async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            const data =  await getAppAddons(JSON.parse(currentCluster).name, params.id)

            state.addons = dealAppAddons(data)
        })

        return {
            ...toRefs(state),
            goToResources
        }

    }
}
