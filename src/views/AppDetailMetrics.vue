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
            <main-nav @click="openShowProcessTypes" :is-metrics-active="true" :app-detail="appDetail"/>
            <div class="limit-width">
                <div class="flex flex-column metrics__charts-container">
                    <div id="process-picker" class="relative dib mb2">
                        <button @click="openShowProcessTypes" class="hk-button--secondary pr1">
                            {{currentType.name}}
                            <span class="ml4">
                                <svg t="1611910986651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1157" width="20" height="20"><path d="M721.794214 384.116381l-60.943176 60.943176-211.189225-211.189225L510.604989 172.927155z" fill="#444444" p-id="1158"></path><path d="M299.316831 383.987914l60.943176 60.943177 211.189226-211.189225L510.506056 172.798689z" fill="#444444" p-id="1159"></path><path d="M301.900488 639.593587l60.943177-60.943177 211.189225 211.189226L513.089714 850.782812z" fill="#444444" p-id="1160"></path><path d="M724.391342 639.729931l-60.943176-60.943177-211.189226 211.189226L513.202117 850.919156z" fill="#444444" p-id="1161"></path></svg>
                            </span>
                        </button>
                        <div v-if="showProcessTypes">
                            <ul class="hk-dropdown z-max">
                                <template  v-for="(pt, index) in processTypes">
                                <li><a @click="goToOtherProcessType(pt)" class="hk-dropdown-item tc" tabindex="0">{{pt.name}}</a></li>
                                <li v-if="index!==processTypes.length-1" class="hk-dropdown-divider"></li>
                                </template>
                            </ul>
                        </div>
                    </div>

                    <div class="purple-box mt2 mb4">
                        <div class="ember-view">
                            <div >

                            </div>
                            <div class="ember-view">
                                <div class="metrics__main__charts metrics__chart-sorting is-vertical">
                                    <metric-memory :metricMemory="metricMemory"/>
                                    <metric-network :metricNetworks="metricNetworks"/>
                                    <metric-cpu :metricCpus="metricCpus"/>
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
    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted, onBeforeMount, onUpdated } from 'vue'
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import ClusterSelect from "../components/ClusterSelectAppDetail.vue";
    import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
    import MainNav from "../components/MainNav.vue";
    import MetricMemory from "../components/MetricMemory.vue";
    import MetricNetwork from "../components/MetricNetwork.vue";
    import MetricCpu from "../components/MetricCpu.vue";
    import { getAppDetail, dealAppDetail } from "../services/app";
    import { dealProcessTypes } from "../services/process";
    import { getMetric, dealMetricCpus, dealMetricMemory, dealMetricNetworks } from "../services/metric";

    export default {
        name: "AppDetailMetrics",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select-v2': ClusterSelect,
            'nav-box-app-detail-menu': NavBoxAppDetailMenu,
            'main-nav': MainNav,
            'metric-memory': MetricMemory,
            'metric-network': MetricNetwork,
            'metric-cpu': MetricCpu
        },
        setup() {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                appDetail: Object,
                processTypes: [],
                showProcessTypes: false,
                currentType: Object,
                metricCpus : [],
                metricMemory : [],
                metricNetworks : []
            })
            const currentCluster = localStorage.getItem('currentCluster')
            const fetchMetric = () =>{
                getMetric(JSON.parse(currentCluster).name, params.id, state.currentType.name).then(res=>{
                  state.metricCpus = res.data ? dealMetricCpus(res) : []
                  state.metricMemory = res.data ? dealMetricMemory(res) : []
                  state.metricNetworks = res.data ? dealMetricNetworks(res) : []
                })
            }
            onBeforeMount( () => {
              getAppDetail(JSON.parse(currentCluster).name, params.id).then(res => {
                state.appDetail = res.data ? dealAppDetail(res) : null
                // const processData =  getAppProcessTypes(JSON.parse(currentCluster).name, params.id)
                state.processTypes = res.data ? dealProcessTypes(res) : []
                if (state.processTypes.length > 0) {
                  if (!params.processType) {
                    state.currentType = state.processTypes[0]
                    router.push({path: `/apps/${params.id}/metrics/processes/${state.currentType.name}`})
                  } else {
                    const l = state.processTypes.filter(item => {
                      if (item.name.includes(params.processType)) {
                        return item
                      }
                    })
                    console.log(l)
                    if (l.length > 0) {
                      state.currentType = l[0]
                    } else {
                      state.currentType = state.processTypes[0]
                    }
                  }
                }
                console.log("onBeforeMount")
                fetchMetric()

              })
            })
            const goToOtherProcessType = (pt) => {
                router.push({ path: `/apps/${params.id}/metrics/processes/${pt.name}` })
                state.currentType = pt
                state.showProcessTypes = false
                fetchMetric()
            }
            onMounted( async () => {
                document.addEventListener('click', function (e) {
                    const d = document.getElementById('process-picker')
                    // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
                    if (!d.contains(e.target)) {
                        state.showProcessTypes = false
                    }
                })
                document.addEventListener('click', function (e) {
                    // state.showProcessTypes = true
                    // console.log(state.showProcessTypes)
                })
            })

            const openShowProcessTypes = () => {
                state.showProcessTypes = !state.showProcessTypes
            }


            return {
                ...toRefs(state),
                goToOtherProcessType,
                openShowProcessTypes
            }
        },
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
    .hide-el {
        display: none;
    }
</style>
