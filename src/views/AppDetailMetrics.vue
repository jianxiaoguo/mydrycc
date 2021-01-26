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
            <main-nav :is-metrics-active="true" :app-detail="appDetail"/>
            <div class="limit-width">
                <div class="flex flex-column metrics__charts-container">
                    <div class="ember-view" v-for="(lineProcesses, index1) in showProcesses">
                        <div style="margin-top: 10px" class="metrics__process-switcher flex flex-grow-1 ember-view">
                            <div class="btn-group ember-view" v-for="(pr, index2) in lineProcesses">
                                <button :class="{'is-only-process': !pr.isActive}" class="drop-down__toggle btn btn-default metrics__process-switcher__btn " style="margin-right: 10px">
                                    <div class="metrics__process-switcher__item flex ember-view">
                                        <a @click="goToOtherProcess(index1, index2, pr)" class="metrics__process-switcher__item-link ember-view">
                                            <div>
                                                <span class="metrics__process-switcher__item-header" title="web">{{pr.name}}</span>
                                                <span class="metrics__process-switcher__item-content">
                                                    <div class="ember-view">
                                                        <svg width="15" height="17" viewBox="0 0 15 17" xmlns="http://www.w3.org/2000/svg" class="dyno-icon"><title>dyno-hobby</title><g fill="none" fill-rule="evenodd"><path d="M8.39.19l5.72 2.952c.487.251.89.907.89 1.459v6.866c0 .548-.398 1.203-.89 1.455l-5.72 2.93c-.487.25-1.288.253-1.78 0l-5.72-2.93C.403 12.673 0 12.02 0 11.467V4.6c0-.548.398-1.205.89-1.459L6.61.189c.487-.25 1.288-.253 1.78 0z" fill="#F1EEF5"></path><path d="M8.39.19l5.72 2.952c.487.251.89.907.89 1.459v6.866c0 .548-.398 1.203-.89 1.455l-5.72 2.93c-.487.25-1.288.253-1.78 0l-5.72-2.93C.403 12.673 0 12.02 0 11.467V4.6c0-.548.398-1.205.89-1.459L6.61.189c.487-.25 1.288-.253 1.78 0zm-.459.888c-.202-.104-.661-.104-.862 0L1.349 4.03C1.19 4.112 1 4.426 1 4.6v6.866c0 .174.191.486.346.565l5.72 2.93c.203.105.666.104.868 0l5.72-2.93c.156-.08.346-.39.346-.565V4.6c0-.175-.192-.49-.348-.57l-5.72-2.953z" fill="#C1B1D3"></path><path fill="#A185C0" d="M5 11h1.548V8.576h1.904V11H10V5H8.452v2.23H6.548V5H5z"></path></g></svg>
                                                    </div>
                                                    <span class="metrics__process-switcher__item-content-quantity">
                                                            1
                                                            dyno
                                                    </span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="purple-box mt2 mb4">
                        <div class="ember-view">
                            <div >

                            </div>
                            <div class="ember-view">
                                <div class="metrics__main__charts metrics__chart-sorting is-vertical">
                                    <metric-memory />
                                    <metric-response-time />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    import MetricMemory from "../components/MetricMemory.vue";
    import MetricResponseTime from "../components/MetricResponseTime.vue";
    import { getAppDetail } from "../services/app";
    import { groupArray } from "../utils/array"
    import { getAppProcesses } from "../services/process";

    export default {
        name: "AppDetailMetrics",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select-v2': ClusterSelect,
            'nav-box-app-detail-menu': NavBoxAppDetailMenu,
            'main-nav': MainNav,
            'metric-memory': MetricMemory,
            'metric-response-time': MetricResponseTime
        },
        setup() {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                appDetail: Object,
                processes: [],
                process: null,
                showProcesses: [],
            })

            const  data = getAppDetail(params.id)
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

            const processData =  getAppProcesses()

            state.processes = processData.map(item => {
                if (item.id === params.process_id)  {
                    return {
                        'id': item.id,
                        'name': item.name,
                        'cmd': item.cmd,
                        'status': item.status,
                        'isActive': true
                    }
                } else {
                    return {
                        'id': item.id,
                        'name': item.name,
                        'cmd': item.cmd,
                        'status': item.status,
                        'isActive': false
                    }
                }

            })

            if (state.processes.length > 0) {
                if (!params.process_id) {
                    router.push({ path: `/apps/${params.id}/metrics/processes/${state.processes[0].id}` })
                }
                state.showProcesses = groupArray(state.processes, 7)
                state.showProcesses[0][0].isActive = true
            }

            const goToOtherProcess = (index1, index2, pr) => {

                let ps = state.processes.map(item => {
                    if (item.id === pr.id)  {
                        return {
                            'id': item.id,
                            'name': item.name,
                            'cmd': item.cmd,
                            'status': item.status,
                            'isActive': true
                        }
                    } else {
                        return {
                            'id': item.id,
                            'name': item.name,
                            'cmd': item.cmd,
                            'status': item.status,
                            'isActive': false
                        }
                    }
                })
                router.push({ path: `/apps/${params.id}/metrics/processes/${pr.id}` })
                state.showProcesses = groupArray(ps, 7)
            }

            return {
                ...toRefs(state),
                goToOtherProcess
            }
        },
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
</style>
