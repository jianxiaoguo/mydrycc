import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onMounted , provide} from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import ClusterSelectAppDetail from "../components/ClusterSelectAppDetail.vue";
import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
import MainNav from "../components/MainNav.vue";
import ActivityRollBack from "../components/ActivityRollBack.vue";
import { getAppDetail, dealAppDetail } from "../services/app";
import { getAppActivities, dealAppActivities, postAppActivitieRollback } from "../services/activity";
import { Toast } from 'vant'

export default {
    name: "AppDetailActivity",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'cluster-select-v2': ClusterSelectAppDetail,
        'nav-box-app-detail-menu': NavBoxAppDetailMenu,
        'main-nav': MainNav,
        'activity-roll-back': ActivityRollBack
    },
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            appDetail: Object,
            activities: [],
            isShowRollBack: false,
            rollBackIndex: 0
        })

        onMounted(async () => {
            var currentCluster = localStorage.getItem('currentCluster')
            let app = localStorage.getItem('currentApp')
            state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
            // const data = await getAppDetail(JSON.parse(currentCluster).name, params.id)
            // state.appDetail = data.data ? dealAppDetail(data) : null
            const activityData = await getAppActivities(JSON.parse(currentCluster).name, params.id)

            state.activities = activityData.data ? dealAppActivities(activityData) : null
        })

        provide(

        )

        const closeRollBack = () => {
            state.rollBackIndex = 0
            state.isShowRollBack = false
        }

        const openRollBack = (v) => {
            state.rollBackVersion = v
            state.isShowRollBack = true
            var currentCluster = localStorage.getItem('currentCluster')
            postAppActivitieRollback(JSON.parse(currentCluster).name, params.id, v).then(res=>{
                if (res.status == 201){
                    Toast("OK")
                }
            })
        }


        return {
            ...toRefs(state),
            openRollBack,
            closeRollBack
        }
    },
}
