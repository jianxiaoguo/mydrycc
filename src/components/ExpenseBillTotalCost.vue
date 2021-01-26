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
                <td class="bb b--light-silver pv2 pl1 gray b">{{total_cost/100.0}}</td>
            </tr>
            <template v-for="cost in costList">
                <tr class="ember-view">
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.appName}}</td>
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.period}}</td>
                    <td class="bb b--light-silver pv2 pl1 gray">{{cost.cost/100.0}}</td>
                </tr>
            </template>

        </table>
    </div>
</template>

<script>
    import { getAppCostList } from "../services/cost";
    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted} from 'vue'

    export default {
        name: "ExpenseBillTotalCost",
        setup() {
            const state = reactive({
                costList: [],
                total_cost: 0,
            })


            onMounted(async () => {
                const data =  await getAppCostList()

                state.costList = data.map(item => {
                    return {
                        'appName': item.app.name,
                        'period': item.period,
                        'cost': item.cost
                    }
                })

                for (let index in state.costList) {
                    index = parseInt(index)
                    state.total_cost = state.total_cost + state.costList[index].cost

                }

            })

            return {
                ...toRefs(state),

            }
        }
    }
</script>

<style scoped>

</style>
