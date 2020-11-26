<template>
    <div class="app-overview-metrics">
        <div class="ember-view">
            <div class="flex-ns items-center pv2">
                <div class="flex dark-gray mr2">Metrics (last 24hrs)</div>
                <div class="flex-auto"></div>
                <a @click="goToMetrics" class="flex items-center hk-link no-underline f6 mv1 mv0-ns ember-view">
                    <span class="underline">All Metrics</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml--3 nudge-down--1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#006deb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                </a>
            </div>

            <div class="metrics__summary-row metrics__summary-row--favorite items-end ember-view">
                <div class="w-100 metrics__summary-container" >
                    <a @click="goToMetrics" class="ember-view link metrics__summary-row--favorite__link-wrapper anim-fade-in">

                        <div title="Your latest 95th percentile response time" class="metrics__summary-row__item metrics__wrapped-chart b--black-05 flex-column ember-view">
                            <div class="metrics__summary-row__label">
                                response time
                            </div>
                            <div class="metric-wrapper flex items-end">
                                <div class="metrics__summary-row__value metrics__summary-row__value--large">
                                    {{latestResponseTime}}
                                    <span class="metrics__summary-row__unit">ms</span>
                                </div>
                                <div class="flex-grow-1" title="Response time over past 24hrs">
                                    <apexchart height="60" type="line" :options="responseTimeOptions" :series="responseTimeSeries"></apexchart>
                                </div>
                            </div>
                        </div>

                        <div title="Latest web requests per second" class="metrics__summary-row__item metrics__wrapped-chart b--black-05 flex-column ember-view">
                            <div class="metrics__summary-row__label">
                                throughput
                            </div>
                            <div class="metric-wrapper flex items-end">
                                <div class="metrics__summary-row__value metrics__summary-row__value--large">
                                    {{latestThroughput}}
                                    <span class="metrics__summary-row__unit">rps</span>
                                </div>
                                <div class="flex-grow-1" title="Throughput over past 24hrs">
                                    <apexchart height="60" type="line" :options="throughputOptions" :series="throughputSeries"></apexchart>
                                </div>
                            </div>
                        </div>

                        <div title="Latest memory usage" class="metrics__summary-row__item metrics__wrapped-chart b--black-05 flex-column ember-view">
                            <div class="metrics__summary-row__label">
                                memory
                            </div>
                            <div class="metric-wrapper flex items-end">
                                <div class="metrics__summary-row__value metrics__summary-row__value--large">
                                    {{latestMemory}}
                                    <span class="metrics__summary-row__unit">%</span>
                                </div>
                                <div class="flex-grow-1" title="Memory Usage over past 24hrs">
                                    <apexchart height="60" type="line" :options="memoryOptions" :series="memorySeries"></apexchart>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted} from 'vue'
    import {getResponseTimeMetrics, getThroughputMetrics, getMemoryMetrics} from "../services/metric";

    export default {
        name: "OverviewMetrics",
        props: {
            appDetail: [Object, Function]
        },
        setup(props) {
            const router = useRouter()
            const options = {
                chart: {
                    id: '',
                    toolbar: {
                        show: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: false,
                        // datetimeUTC: false,
                    },
                    axisTicks: {
                        show: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    axisBorder: {
                        // show: false
                    },
                    // position: 'bottom',
                },
                grid: {
                    show: false
                },
                yaxis: {
                    show: false,
                    tooltip: {
                        enable: false
                    }
                },
                stroke: {
                    curve: 'stepline',
                    width: 1
                },
                tooltip: {
                    enabled: false,
                    y: {
                        formatter: function (val) {return val }
                    },
                    x: {
                        format: 'dd MMM HH:mm:ss'
                    }
                }
            }

            const state = reactive({
                responseTimeOptions: JSON.parse(JSON.stringify(options)),
                responseTimeSeries: [{name: 'response time', data:[]}],
                memoryOptions: JSON.parse(JSON.stringify(options)),
                memorySeries: [{name: 'memory', data:[]}],
                throughputOptions: JSON.parse(JSON.stringify(options)),
                throughputSeries: [{name: 'throughput', data:[]}],
                latestResponseTime: 0,
                latestThroughput: 0,
                latestMemory: 0
            })

            state.responseTimeOptions.chart.id = 'response-time-metrics'
            state.responseTimeOptions.tooltip.y.formatter = function (val) {return val + ' ms'}

            state.throughputOptions.chart.id = 'throughput-metrics'
            state.throughputOptions.tooltip.y.formatter = function (val) {return val + ' rps'}

            state.memoryOptions.chart.id = 'memory-metrics'
            state.memoryOptions.tooltip.y.formatter = function (val) {return val + ' %'}

            const goToMetrics = () => {
                router.push({ path: `/apps/${props.appDetail.id}/metrics` })
            }

            onMounted(
                async () => {
                    const m =  await getResponseTimeMetrics()
                    if (!m) {
                        return
                    }
                    const data = m.map(item => {
                            return [item.time, item.duration]
                    })
                    state.latestResponseTime = data[data.length-1][1]
                    state.responseTimeSeries = [{
                            name: 'response time',
                            data: data
                    }]

                    const m2 =  await getThroughputMetrics()
                    if (!m2) {
                        return
                    }

                    const data2 = m2.map(item => {
                        return [item.time, item.num]
                    })
                    state.latestThroughput = data2[data2.length-1][1]
                    state.throughputSeries = [
                        {
                            name: 'throughput',
                            data: data2
                        }
                    ]

                    const m3 =  await getMemoryMetrics()
                    if (!m3) {
                        return
                    }

                    const data3 = m3.map(item => {
                        return [item.time, item.percentile]
                    })
                    state.latestMemory = data3[data3.length-1][1]
                    state.memorySeries = [
                        {
                            name: 'memory',
                            data: data3
                        }
                    ]

                },

            )

            return {
                ...toRefs(state),
                goToMetrics
            }

        }
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
</style>
