<template>
    <div class="h2 w-100 ma2 b">Cost trend (Last 12 months)</div>
    <div class="w-100 ma2 " style="height: 346px">
        <apexchart type="bar" height="300px" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>

    import { reactive, toRefs, onMounted} from 'vue'

    export default {
        name: "ExpenseBillCostTrend",
        setup() {
            const state = reactive({
                series: [{
                    name: 'PRODUCT A',
                    data: [44, 55, 41, 67, 22, 43]
                }, {
                    name: 'PRODUCT B',
                    data: [13, 23, 20, 8, 13, 27]
                }, {
                    name: 'PRODUCT C',
                    data: [11, 17, 15, 15, 21, 14]
                }, {
                    name: 'PRODUCT D',
                    data: [21, 7, 25, 13, 22, 8]
                }],
                options: {
                    chart: {
                        type: 'bar',
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: false
                        },
                        tooltip: {
                            enabled: false
                        },
                    },
                    xaxis: {
                        type: 'category',
                        categories: ['2020-08', '2020-09', '2020-10', '2020-11', '2020-12', '2021-1'
                        ],
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40
                    },
                    fill: {
                        opacity: 1
                    }
                },
            })

            onMounted(async () => {
                //
            })

            return {
                ...toRefs(state),
            }
        }

    }
</script>

<style scoped>

</style>
