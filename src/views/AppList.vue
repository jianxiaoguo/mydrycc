<!--app列表页-->
<template>
    <nav-bar />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <cluster-select />
            </template>
            <template v-slot:create-new-app>
                <div>
                    <div class="btn-group ember-view" @click="">
                        <button @click="goToNewApp" class="drop-down__toggle hk-button--secondary pr1" style="color: #79589f;">
                            Create New App
                        </button>
                    </div>
                </div>
            </template>
        </nav-box>
        <div class="main-content">
            <div class="mv3 limit-width">
                <div class="flex">
                    <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray absolute z-2 ml2 mt1 nudge-down--3">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-16"></use>
                    </svg>
                    <input placeholder="Filter apps" class="hk-search-input focus-z-1" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" size="32">
                </div>
            </div>


            <div class="app-list hk-hide-bb-last-row">
                <div class="apps-list-item flex flex-column flex-auto b--light-silver bg-white pv2 ph4 bb hover-bg-near-white ember-view" v-for="item in apps">
                    <one-app v-bind="item"/>
                </div>
                <div class="limit-width bg-white mt4">
                    <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
                </div>
                <!--此标签和page互斥-->
                <div class="bg-white pv3 bt justify-center flex ember-view"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import ClusterSelect from "../components/ClusterSelect.vue";
    import OneApp from "../components/OneApp.vue";
    import Pagination from "../components/Pagination.vue";
    import { reactive, toRefs, onMounted , computed} from 'vue'
    import { getAPPList } from "../services/app";
    import { useRoute, useRouter } from 'vue-router'

    export default {
        name: "AppList",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select': ClusterSelect,
            'one-app': OneApp,
            'pagination': Pagination
        },
        setup() {
            const router = useRouter()
            const state = reactive({
                apps: [],
                cPage: 1,
                tPage: 2,
                hasNextPage: true
            })

            const goToNewApp = () => {
                router.push({ path: '/new-app'})
            }

            const updatePage = (n) => {

                console.log(n)
                state.cPage = n
                state.tPage = Math.min(30, n+1)
                if (state.tPage>=30){
                    state.hasNextPage = false
                }
                else{
                    state.hasNextPage = true
                }
            }

            onMounted(async () => {

                const  data = await getAPPList({})
                if (!data) {
                    state.apps = []
                    return
                }

                state.apps = data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        lang: item.lang,
                        baseImage: item.base_image
                    }
                })
            })

            return {
                ...toRefs(state),
                goToNewApp,
                updatePage
            }
        },
    }
</script>

<style scoped>
    /*@import "../assets/bashboard.css";*/
    .pr1 {
        padding-right: 15px;
    }
</style>
