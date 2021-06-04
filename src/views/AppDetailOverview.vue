<template>
    <nav-bar />
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
            <main-nav :is-overview-active="true" :app-detail="appDetail"/>
            <div id="overview-page">
                <div class="overview-content">
                    <div class="limit-width">
                        <overview-metrics :app-detail="appDetail"/>
                        <overview-addons :app-detail="appDetail"/>
                        <overview-formation :app-detail="appDetail"/>
                        <overview-collaborator-activity :app-detail="appDetail" />
                    </div>
                </div>
                <div class="overview-activity">
                    <div class="app-overview-stream">
                        <overview-latest-activity :app-detail="appDetail" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import ClusterSelect from "../components/ClusterSelectAppDetail.vue";
    import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
    import MainNav from "../components/MainNav.vue";
    import OverviewMetrics from "../components/OverviewMetrics.vue";
    import OverviewAddons from "../components/OverviewAddons.vue";
    import OverviewFormation from "../components/OverviewFormation.vue";
    import OverviewCollaboratorActivity from "../components/OverviewCollaboratorActivity.vue";
    import OverviewLatestActivity from "../components/OverviewLatestActivity.vue";
    import { getAppDetail, dealAppDetail } from "../services/app";
    import {useStore} from "vuex";

    export default {
        name: "AppDetailOverview",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select-v2': ClusterSelect,
            'nav-box-app-detail-menu': NavBoxAppDetailMenu,
            'main-nav': MainNav,
            'overview-metrics': OverviewMetrics,
            'overview-addons': OverviewAddons,
            'overview-formation': OverviewFormation,
            'overview-collaborator-activity': OverviewCollaboratorActivity,
            'overview-latest-activity': OverviewLatestActivity
        },

        setup() {
            const router = useRouter()
            const store = useStore()
            const params = router.currentRoute.value.params
            const state = reactive({
                appDetail: Object,
            })
            onBeforeMount(async  () => {
                let currentCluster = localStorage.getItem('currentCluster')
                const res = await getAppDetail(JSON.parse(currentCluster).name, params.id)
                state.appDetail = res.data ? dealAppDetail(res) : null
                localStorage.setItem('currentApp', JSON.stringify(state.appDetail))
            })
            onMounted(async () => {
                // let app = localStorage.getItem('currentApp')
                // state.appDetail = app ? JSON.parse(localStorage.getItem('currentApp')) : null
                // var currentCluster = store.getters.getCurrentCluster
                // var currentCluster = localStorage.getItem('currentCluster')
                // const res = await getAppDetail(JSON.parse(currentCluster).name, params.id)
                // state.appDetail = res ? dealAppDetail(res) : null
            })
            return {
                ...toRefs(state)
            }
        },
    }
</script>

<style scoped>

</style>
