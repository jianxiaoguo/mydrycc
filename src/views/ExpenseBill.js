import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import MonthPicker from "../components/MonthPicker.vue";
// import ExpenseBillCostTrend from "../components/ExpenseBillCostTrend.vue";
// import ExpenseBillProductCostDistribution from "../components/ExpenseBillProductCostDistribution.vue";
import ExpenseBillTotalCost from "../components/ExpenseBillTotalCost.vue";
import ExpenseBIllProductCost from "../components/ExpenseBIllProductCost.vue";
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted, computed} from 'vue'

export default {
    name: "ExpenseBill",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'month-picker': MonthPicker,
        // 'expense-bill-cost-trend': ExpenseBillCostTrend,
        // 'expense-bill-product-cost-distribution': ExpenseBillProductCostDistribution,
        'expense-bill-total-cost': ExpenseBillTotalCost,
        'expense-bill-product-cost': ExpenseBIllProductCost
    },
    setup() {
        const router = useRouter()
        const date = new Date()
        const state = reactive({
            cYear: date.getFullYear(),
            cMonth: date.getMonth() + 1,
            sYear: date.getFullYear(),
            sMonth: date.getMonth() + 1
        })

        const changeMonth = (y, m) => {
            state.sYear = y
            state.sMonth = m
            console.log(state.sYear, state.sMonth)
        }

        const goToExpenseBills = () => {
            router.push({ path: `/expense-bills` })
        }

        const goToExpenseBillsDetails = () => {
            router.push({ path: `/expense-bills/details` })
        }

        return {
            ...toRefs(state),
            goToExpenseBills,
            goToExpenseBillsDetails,
            changeMonth
        }

    }
}
