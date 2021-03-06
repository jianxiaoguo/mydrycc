<template>
    <nav-bar />
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
    import { reactive, toRefs, onMounted } from 'vue'
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
    import { getAppDetail } from "../services/app";

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
            const params = router.currentRoute.value.params
            const state = reactive({
                appDetail: Object,
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
            })
            return {
                ...toRefs(state)
            }
        },
    }
</script>

<style scoped>

</style>
