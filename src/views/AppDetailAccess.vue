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
            <main-nav :is-access-active="true" :app-detail="appDetail"/>
            AppDetailAccess
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
    import { getAppDetail } from "../services/app";

    export default {
        name: "AppDetailAccess",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select-v2': ClusterSelect,
            'nav-box-app-detail-menu': NavBoxAppDetailMenu,
            'main-nav': MainNav
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
