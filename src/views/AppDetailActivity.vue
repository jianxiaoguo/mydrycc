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
                <nav-box-app-detail-menu />
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
                            <span :title="activity.createdTime.format('yyyy.MM.dd hh:mm:ss')" class="timeago ember-view">{{activity.createdTime.format("yyyy-MM-dd at hh:mm")}}</span>
                            ·
                            {{activity.v}}

                            <span class="confirmable-action ember-view" v-if="index > 0">·
                                <a @click="openRollBack(index)" href="#" class="hk-link rollback">
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
    import { getAppDetail } from "../services/app";
    import {getAppActivities} from "../services/activity";

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

                const  data = await getAppDetail(params.id)
                if (!data) {
                    state.appDetail = null
                    return
                }
                state.appDetail = {
                    id: data.id,
                    name: data.name,
                    lang: data.lang,
                    baseImage: data.base_image
                }

                const activityData = getAppActivities()

                if (!activityData) {
                    state.activities = []
                    return
                }

                state.activities = activityData.map(item => {
                    return {
                        'username': item.username,
                        'content': item.content,
                        'createdTime': new Date(parseInt(item.created_time * 1000)),
                        'v': item.v
                    }
                })
            })

            provide(

            )

            const closeRollBack = () => {
                state.rollBackIndex = 0
                state.isShowRollBack = false
            }

            const openRollBack = (index) => {
                console.log(index)
                state.rollBackIndex = index
                state.isShowRollBack = true
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
