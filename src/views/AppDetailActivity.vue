<template>
    <nav-bar />
    <activity-roll-back v-if="isShowRollBack && rollBackIndex>0"
                        :activities="activities"
                        :rollBackIndex="rollBackIndex"
                        :appDetail="appDetail"
                        @closeRB="closeRollBack"
    />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <cluster-select-v2 :app-detail="appDetail"/>
            </template>
            <template v-slot:create-new-app>
                <nav-box-app-detail-menu :app-detail="appDetail"/>
            </template>
        </nav-box>
        <div class="main-content">
            <main-nav :is-activity-active="true" :app-detail="appDetail"/>
            <h5 class="limit-width">Activity Feed</h5>
            <div class="hk-hide-bb-last-row list-group limit-width ember-view">
                <div class="flex bb pv3 b--light-silver activity-item ember-view" v-for="(activity, index) in activities">
                    <div class="pt1 mr3 nowrap">
                        <div class="relative dib ember-view">
                            <svg style="height: 28px; width: 28px;" class="icon malibu-icon fill-dark-gray" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#configure-28"></use>
                            </svg>
                        </div>
                        <span style="width:28px; height:28px" class="ml2 gravatar-icon br-100 ember-view">
                    <img src="https://gravatar.com/avatar/9ab286614379ac593637847f1f50b006?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" alt="heroku-redis@addons.heroku.com">
                </span>
                    </div>

                    <div class="flex flex-column lh-copy">
                        <div class="f5">
                            <span class="b">{{activity.username}}:</span>
                            <span>{{activity.content}}</span>
                        </div>
                        <div class="f5 gray">
<!--                            <span :title="activity.createdTime.format('yyyy.MM.dd hh:mm:ss')" class="timeago ember-view">{{activity.createdTime.format("yyyy-MM-dd at hh:mm")}}</span>-->
                            <span :title="activity.createdTime" class="timeago ember-view">{{activity.createdTime}}</span>
                            ·
                            {{activity.v}}

                            <span class="confirmable-action ember-view" v-if="activity.v > 1">·
                                <a @click="openRollBack(activity.v)" href="#" class="hk-link rollback">
                                    Roll back to here
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted , provide} from 'vue'
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import ClusterSelect from "../components/ClusterSelectAppDetail.vue";
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
            'cluster-select-v2': ClusterSelect,
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
</script>

<style scoped>

</style>
