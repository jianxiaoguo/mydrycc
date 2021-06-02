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
                <div class="apps-list-item flex flex-column flex-auto b--light-silver bg-white pv2 ph4 bb hover-bg-near-white ember-view" v-for="item in apps[cPage-1]">
                    <one-app v-bind="item"/>
                </div>
                <div :style="{visibility: isHiddenPagination ? 'hidden':'visible' }" class="limit-width bg-white mt4">
                    <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
                </div>
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
    import { reactive, toRefs, onMounted } from 'vue'
    import { getAPPList, dealAPPList } from "../services/app";
    import { useRouter } from 'vue-router'

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
                hasNextPage: false,
                isHiddenPagination: false,
            })
            const perPageNum = 15
            const totalPageNum = 30
            var count = 0
            var reqNext = ''
            const goToNewApp = () => {
                router.push({ path: '/new-app'})
            }

            const updatePage = (n) => {
                if (n < 1) {
                    return;
                }
                state.cPage = n
                if ((state.tPage < totalPageNum) && (n * perPageNum < count)){
                    state.tPage = Math.min(totalPageNum, n+1)
                    state.hasNextPage=true
                }else {
                    state.hasNextPage=false
                }
                // 显示当前页后的两个页码，提前掉两页接口取数据
                if (reqNext && (state.cPage + 2 > state.apps.length)) {
                    var currentCluster = localStorage.getItem('currentCluster')
                    getAPPList(JSON.parse(currentCluster).name, reqNext.split('?')[1]).then(res=>{
                        reqNext = res.data.next
                        count = res.data.count
                        var appdatas = res.data && res.data.results ? dealAPPList(res) : []
                        for (let j = 0; j < appdatas.length; j += perPageNum){
                          state.apps.push(appdatas.slice(j, j + perPageNum))
                        }
                    })
                }
            }

            onMounted(async () => {
                var currentCluster = localStorage.getItem('currentCluster')
                const res = await getAPPList(JSON.parse(currentCluster).name)
                reqNext = res.data.next
                count = res.data.count
                var appdatas = res.data && res.data.results ? dealAPPList(res) : []
                for (let j = 0; j < appdatas.length; j += perPageNum){
                    state.apps.push(appdatas.slice(j, j + perPageNum))
                }
                if(count > (2 * perPageNum)){
                    state.hasNextPage=true
                }
                if(count < perPageNum){
                    state.isHiddenPagination = true
                }
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
