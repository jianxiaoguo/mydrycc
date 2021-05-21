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
            <main-nav :is-resources-active="true" :app-detail="appDetail"/>
            <resources-dyno :app-detail="appDetail"/>
            <resources-addons :app-detail="appDetail"/>
            <div class="app-resource-total-line-item limit-width">
                <small class="line-item-label"> Estimated Monthly Cost </small>
                <div class="line-item-values"><span class="line-item-original-value ">￥0.00</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted , computed} from 'vue'
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import ClusterSelect from "../components/ClusterSelectAppDetail.vue";
    import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
    import MainNav from "../components/MainNav.vue";
    import { getAppDetail, dealAppDetail } from "../services/app";
    import ResourcesDyno from "../components/ResourcesDyno.vue";
    import ResourcesAddons from "../components/ResourcesAddons.vue";

    export default {
        name: "AppDetailResources",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select-v2': ClusterSelect,
            'nav-box-app-detail-menu': NavBoxAppDetailMenu,
            'main-nav': MainNav,
            'resources-dyno': ResourcesDyno,
            'resources-addons': ResourcesAddons
        },
        setup() {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                appDetail: Object
            })

            onMounted(async () => {
                var currentCluster = localStorage.getItem('currentCluster')
                const data = await getAppDetail(JSON.parse(currentCluster).name, params.id)
                state.appDetail = data.data ? dealAppDetail(data) : null
            })

            return {
                ...toRefs(state)
            }
        },
    }
</script>

<style scoped>

</style>
