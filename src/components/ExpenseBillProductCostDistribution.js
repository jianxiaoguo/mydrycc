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
