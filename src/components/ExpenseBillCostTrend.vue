<template>
    <div class="h2 w-100 ma2 b">Cost trend (Last 12 months)</div>
    <div class="w-100 ma2 " style="height: 346px">
        <apexchart type="bar" height="300px" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import ExpenseBillCostTrend from "./ExpenseBillCostTrend"
export default ExpenseBillCostTrend
</script>

<style scoped>

</style>
