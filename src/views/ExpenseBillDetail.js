import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import Pagination from "../components/Pagination.vue";
import MonthPicker from "../components/MonthPicker.vue";
import { dealExpenseBillList, getExpenseBillList } from "../services/expense-bills";
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted} from 'vue'


export default {
    name: "ExpenseBillDetail",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'pagination': Pagination,
        'month-picker': MonthPicker
    },
    setup() {
        const router = useRouter()
        const date = new Date()
        const state = reactive({
            bills: [],
            selected: 0,
            cPage: 1,
            tPage: 2,
            hasNextPage: false,
            isHiddenPagination: false,
            cYear: date.getFullYear(),
            cMonth: date.getMonth() + 1,
            sYear: date.getFullYear(),
            sMonth: date.getMonth() + 1
        })
        const perPageNum = 15
        const totalPageNum = 30
        var count = 0
        var reqNext = ''
        const changeMonth = (y, m) => {
            state.sYear = y
            state.sMonth = m
            console.log(state.sYear, state.sMonth)
            const resource_type = state.selected
            let start =  new Date(state.sYear, state.sMonth-1, 1).getTime() / 1000
            let day = new Date(state.sYear, state.sMonth, 0).getDate()
            let stop =  new Date(state.sYear, state.sMonth-1, day).getTime() / 1000
            let section = start + ',' + stop
            console.log('vue section: ', section)
            state.bills = []
            getExpenseBillList(resource_type, section).then(res=>{
                reqNext = res.data.next
                count = res.data.count
                let billdatas = res.data && res.data.results ? dealExpenseBillList(res) : []
                for (let j = 0; j < billdatas.length; j += perPageNum){
                    state.bills.push(billdatas.slice(j, j + perPageNum))
                }
                if(count > (2 * perPageNum)){
                    state.hasNextPage=true
                }
                if(count < perPageNum){
                    state.isHiddenPagination = true
                }
            })
        }

        const updatePage = (n) => {
            console.log(n)
            if (n < 1) {
                return;
            }
            state.cPage = n
            if ((state.tPage < totalPageNum) && (n * perPageNum < count)){
                state.tPage = Math.min(totalPageNum, n+1)
                state.hasNextPage=true
            }else {
                state.hasNextPage=false
            }
            if (reqNext && (state.cPage + 2 > state.bills.length)) {
                getExpenseBillList(null,null, reqNext.split('?')[1]).then(res=>{
                    reqNext = res.data.next
                    count = res.data.count
                    let billdatas = res.data && res.data.results ? dealExpenseBillList(res) : []
                    for (let j = 0; j < billdatas.length; j += perPageNum){
                        state.bills.push(billdatas.slice(j, j + perPageNum))
                    }
                })
            }
        }

        const goToExpenseBills = () => {
            router.push({ path: `/expense-bills` })
        }

        const goToExpenseBillDetails = () => {
            router.push({ path: `/expense-bills/details` })
        }
        const selectChanged = (selected) => {
            const resource_type = selected.target.value;
            state.selected = selected.target.value
            let start =  new Date(state.sYear, state.sMonth-1, 1).getTime() / 1000
            let day = new Date(state.sYear, state.sMonth, 0).getDate()
            let stop =  new Date(state.sYear, state.sMonth-1, day).getTime() / 1000
            let section = start + ',' + stop
            console.log('vue section: ', section)
            state.bills = []
            getExpenseBillList(resource_type, section).then(res=>{
                reqNext = res.data.next
                count = res.data.count
                let billdatas = res.data && res.data.results ? dealExpenseBillList(res) : []
                for (let j = 0; j < billdatas.length; j += perPageNum){
                    state.bills.push(billdatas.slice(j, j + perPageNum))
                }
                if(count > (2 * perPageNum)){
                    state.hasNextPage=true
                }
                if(count < perPageNum){
                    state.isHiddenPagination = true
                }
            })
        }
        onMounted(async () => {
            let start =  new Date(state.sYear, state.sMonth-1, 1).getTime() / 1000
            let day = new Date(state.sYear, state.sMonth, 0).getDate()
            let stop =  new Date(state.sYear, state.sMonth-1, day).getTime() / 1000
            let section = start + ',' + stop
            console.log('vue section: ', section)
            const res = await getExpenseBillList(null, section)
            reqNext = res.data.next
            count = res.data.count
            var billdatas = res ? dealExpenseBillList(res) : []
            for (let j = 0; j < billdatas.length; j += perPageNum){
                state.bills.push(billdatas.slice(j, j + perPageNum))
            }
            if(count > (2 * perPageNum)){
                state.hasNextPage=true
            }
            if(count < perPageNum){
                state.isHiddenPagination = true
            }

        })


        return {
            ...toRefs(state),
            goToExpenseBills,
            goToExpenseBillDetails,
            updatePage,
            changeMonth,
            selectChanged
        }

    }
}
