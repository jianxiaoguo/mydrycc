import {getCollaboratorActivities, dealCollaboratorActivities } from '../services/activity'
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted} from 'vue'

export default {
    name: "OverviewCollaboratorActivity",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            activities: []
        })

        const goToAccess = () => {
            router.push({ path: `/apps/${props.appDetail.id}/access` })
        }

        onMounted(async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            const res =  await getCollaboratorActivities(JSON.parse(currentCluster).name, params.id)

            state.activities = dealCollaboratorActivities(res)
        })


        return {
            ...toRefs(state),
            goToAccess
        }

    }
}
