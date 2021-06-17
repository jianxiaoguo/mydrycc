import { getAppActivities, dealAppActivities } from '../services/activity'
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted} from 'vue'

export default {
    name: "OverviewLatestActivity",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            activities: []
        })

        const goToActivity = () => {
            router.push({ path: `/apps/${props.appDetail.id}/activity` })
        }

        onMounted(async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            const res =  await getAppActivities(JSON.parse(currentCluster).name, params.id)

            state.activities = res.data ? dealAppActivities(res) : []
        })

        return {
            ...toRefs(state),
            goToActivity
        }

    }
}
