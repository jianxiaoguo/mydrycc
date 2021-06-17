<template>
<!--    <div class="h2 w-100 ma2 b">Total cost</div>-->
    <div class="collaborator-list limit-width ember-view">
        <table class="w-100 mb5">
            <tr class="w-100 f5">
                <th class="pl1 pr1 pv2 bb b--light-gray b">
                  Cluster name
                </th>
                <th class="pl1 pr1 pv2 bb b--light-gray b">
                    App name
                </th>
                <th class="pv2 pr1 bb b--light-gray b">
                    Period
                </th>
                <th class="pv2 pr1 bb b--light-gray b">
                    Cost
                </th>
            </tr>
            <tr class="ember-view">
<!--                <td class="bb b&#45;&#45;light-silver pv2 pl1 gray b">Total Cost</td>-->
<!--                <td class="bb b&#45;&#45;light-silver pv2 pl1 gray b">{{ sYear + '-' + sMonth }}</td>-->
<!--                <td class="bb b&#45;&#45;light-silver pv2 pl1 gray b">{{total_cost/100.0}}</td>-->
<!--                <td class="bb b&#45;&#45;light-silver pv2 pl1 gray b">{{total_cost}}</td>-->
            </tr>
            <template v-for="cost in costList[cPage-1]">
                <tr class="ember-view">
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.clusterName}}</td>
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.appName}}</td>
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.period}}</td>
<!--                    <td class="bb b&#45;&#45;light-silver pv2 pl1 gray">{{cost.cost/100.0}}</td>-->
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.cost}}</td>
                </tr>
            </template>

        </table>
        <div :style="{display: isHiddenPagination ? 'none':'block' }" class="limit-width bg-white mt4">
            <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
        </div>
    </div>
</template>

<script>
import ExpenseBillTotalCost from "./ExpenseBillTotalCost"
export default ExpenseBillTotalCost
</script>

<style scoped>

</style>
