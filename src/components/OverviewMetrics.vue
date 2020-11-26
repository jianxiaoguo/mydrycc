<template>
    <div class="app-overview-metrics">
        <div class="ember-view">
            <div class="flex-ns items-center pv2">
                <div class="flex dark-gray mr2">Metrics (last 24hrs)</div>
                <div class="flex-auto"></div>
                <a href="/apps/drycc-charts/metrics" class="flex items-center hk-link no-underline f6 mv1 mv0-ns ember-view">
                    <span class="underline">All Metrics</span>
                    <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember204" class="icon malibu-icon fill-blue ml--3 nudge-down--1" data-test-icon-name="nav-go-16" data-test-target="malibu-icon" aria-hidden="true" role="img">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-go-16"></use>
                    </svg>
                </a>
            </div>

            <div class="metrics__summary-row metrics__summary-row--favorite items-end ember-view">
                <div class="w-100 metrics__summary-container">
                    <a href="/apps/drycc-charts/metrics/web?ending=undefined-hours-ago&amp;starting=undefined-hours-ago" class="ember-view link metrics__summary-row--favorite__link-wrapper anim-fade-in">

                        <div class="metrics__summary-row__item metrics__wrapped-chart b--black-05 flex-column ember-view">
                            <div class="metrics__summary-row__label">
                                response time
                            </div>
                            <div class="metric-wrapper flex items-end">
                                <div class="metrics__summary-row__value metrics__summary-row__value--large">
                                    {{latestResponseTime}}
                                    <span class="metrics__summary-row__unit">ms</span>
                                </div>
                                <div class="flex-grow-1" >
                                    <apexchart height="60" type="line" :options="responseTimeOptions" :series="responseTimeSeries"></apexchart>
                                </div>
                            </div>
                        </div>

                        <div class="metrics__summary-row__item metrics__wrapped-chart b--black-05 flex-column ember-view">
                            <div class="metrics__summary-row__label">
                                throughput
                            </div>
                            <div class="metric-wrapper flex items-end">
                                <div class="metrics__summary-row__value metrics__summary-row__value--large">
                                    {{latestThroughput}}
                                    <span class="metrics__summary-row__unit">rps</span>
                                </div>
                                <div class="flex-grow-1">
                                    <apexchart height="60" type="line" :options="throughputOptions" :series="throughputSeries"></apexchart>
                                </div>
                            </div>
                        </div>

                        <div class="metrics__summary-row__item metrics__wrapped-chart b--black-05 flex-column ember-view">
                            <div class="metrics__summary-row__label">
                                memory
                            </div>
                            <div class="metric-wrapper flex items-end">
                                <div class="metrics__summary-row__value metrics__summary-row__value--large">
                                    {{latestMemory}}
                                    <span class="metrics__summary-row__unit">%</span>
                                </div>
                                <div class="flex-grow-1">
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
        setup() {
            const options = {
                chart: {
                    id: '',
                    toolbar: {
                        show: false
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

            onMounted(
                async () => {
                    const m =  await getResponseTimeMetrics()
                    if (!m) {
                        return
                    }
                    const data = m.map(item => {
                            return [item.time, item.duration]
                    })
                    console.log(data)
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
                ...toRefs(state)
            }

        }
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
    /*.flex-grow-1 {*/
    /*    max-width: 498px;*/
    /*}*/
</style>
