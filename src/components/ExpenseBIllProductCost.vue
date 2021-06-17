<template>
    <div class="h2 w-100 ma2 b">Product cost summary</div>
    <div class="collaborator-list limit-width ember-view">
        <table class="w-100 mb5">
            <tr class="w-100 f5">
                <th class="pl1 pr1 pv2 bb b--light-gray b">
                    Period
                </th>
                <th class="pv2 pr1 bb b--light-gray b">
                    Product
                </th>
<!--                <th class="pv2 pr1 bb b&#45;&#45;light-gray b">-->
<!--                    Product Detail-->
<!--                </th>-->
                <th class="pv2 pr1 bb b--light-gray b">
                    Cost
                </th>
            </tr>
            <template v-for="cost in costList">
                <tr class="ember-view">
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.period}}</td>
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.productName}}</td>
<!--                    <td class="bb b&#45;&#45;light-silver pv2 pl1 gray">{{cost.productDetail}}</td>-->
<!--                    <td class="bb b&#45;&#45;light-silver pv2 pl1 gray">{{cost.cost/100.0}}</td>-->
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.cost}}</td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script>
import ExpenseBIllProductCost from "./ExpenseBIllProductCost"
export default ExpenseBIllProductCost
</script>

<style scoped>

</style>
