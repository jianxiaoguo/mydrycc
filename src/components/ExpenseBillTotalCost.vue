<template>
    <div class="h2 w-100 ma2 b">Total cost</div>
    <div class="collaborator-list limit-width ember-view">
        <table class="w-100 mb5">
            <tr class="w-100 f5">
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
                <td class="bb b--light-silver pv2 pl1 gray b">Total Cost</td>
                <td class="bb b--light-silver pv2 pl1 gray b">2021-01</td>
<!--                <td class="bb b&#45;&#45;light-silver pv2 pl1 gray b">{{total_cost/100.0}}</td>-->
                <td class="bb b--light-silver pv2 pl1 gray b">{{total_cost}}</td>
            </tr>
            <template v-for="cost in costList">
                <tr class="ember-view">
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.appName}}</td>
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.period}}</td>
<!--                    <td class="bb b&#45;&#45;light-silver pv2 pl1 gray">{{cost.cost/100.0}}</td>-->
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.cost}}</td>
                </tr>
            </template>

        </table>
        <div class="limit-width bg-white mt4">
            <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
        </div>
    </div>
</template>

<script>
import { dealAppCostList, getAppCostList } from "../services/cost";
    import Pagination from "./Pagination.vue";
    import { reactive, toRefs, onMounted} from 'vue'

    export default {
        name: "ExpenseBillTotalCost",
        components: {
            'pagination': Pagination
        },
        setup() {
            const state = reactive({
                costList: [],
                total_cost: 0,
                cPage: 1,
                tPage: 2,
                hasNextPage: true
            })

            const updatePage = (n) => {

                console.log(n)
                state.cPage = n
                state.tPage = Math.min(30, n+1)
                if (state.tPage>=30){
                    state.hasNextPage = false
                }
                else{
                    state.hasNextPage = true
                }
            }

            onMounted(async () => {
                const res =  await getAppCostList()

                state.costList = res ? dealAppCostList(res) : []

                for (let index in state.costList) {
                    index = parseInt(index)
                    state.total_cost = state.total_cost + state.costList[index].cost

                }

            })

            return {
                ...toRefs(state),
                updatePage

            }
        }
    }
</script>

<style scoped>

</style>
