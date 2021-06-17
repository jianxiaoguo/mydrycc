<template>
    <div class="h2 w-100 ma2 b">Product cost distribution (Last 12 months)</div>
    <div class="w-100 ma2 " style="height: 346px">
        <apexchart type="donut" height="300px" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import ExpenseBillProductCostDistribution from "./ExpenseBillProductCostDistribution"
export default ExpenseBillProductCostDistribution
</script>

<style scoped>

</style>
