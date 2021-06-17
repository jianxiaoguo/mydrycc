import { dealProductCostList, getProductCostList } from "../services/cost";
import { reactive, toRefs, onMounted} from 'vue'
import {dealExpenseBillList, getExpenseBillList} from "../services/expense-bills";

export default {
    name: "ExpenseBIllProductCost",
    setup() {
        const state = reactive({
            costList: [],
        })

        onMounted(async () => {
            const res =  await getProductCostList()

            state.costList = res ? dealProductCostList(res) : []

        })

        return {
            ...toRefs(state),

        }
    }
}
