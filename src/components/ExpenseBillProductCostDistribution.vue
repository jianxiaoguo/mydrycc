<template>
    <div class="h2 w-100 ma2 b">Product cost distribution (Last 12 months)</div>
    <div class="w-100 ma2 " style="height: 346px">
        <apexchart type="donut" height="300px" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>

    import { reactive, toRefs, onMounted} from 'vue'

    export default {
        name: "ExpenseBillProductCostDistribution",
        setup() {
            const state = reactive({
                series: [44, 55, 41, 17, 15],
                options: {
                    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                }

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
