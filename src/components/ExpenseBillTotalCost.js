import { dealAppCostList, getAppCostList } from "../services/cost";
import Pagination from "./Pagination.vue";
import { reactive, toRefs, onMounted} from 'vue'

export default {
    name: "ExpenseBillTotalCost",
    components: {
        'pagination': Pagination
    },
    setup(props) {
        const state = reactive({
            costList: [],
            total_cost: 0,
            cPage: 1,
            tPage: 2,
            hasNextPage: false,
            isHiddenPagination: true,
            sYear: props.sYear,
            sMonth: props.sMonth
        })
        const perPageNum = 15
        const totalPageNum = 30
        var count = 0
        var reqNext = ''
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
                getAppCostList(null, reqNext.split('?')[1]).then(res=>{
                    reqNext = res.data.next
                    count = res.data.count
                    let billDatas = res.data && res.data.results ? dealAppCostList(res) : []
                    for (let j = 0; j < billDatas.length; j += perPageNum){
                        state.costList.push(billDatas.slice(j, j + perPageNum))
                    }
                })
            }
        }

        onMounted(async () => {
            // let y = state.sYear
            // let m = state.sMonth
            // console.log("y", y)
            // console.log("m", m)
            // let start =  new Date(y, m-1, 1).getTime() / 1000
            // let day = new Date(y, m, 0).getDate()
            // let stop =  new Date(y, m-1, day).getTime() / 1000
            // let section = start + ',' + stop
            const res =  await getAppCostList()

            let costDatas = res ? dealAppCostList(res) : []
            reqNext = res.data.next
            count = res.data.count
            for (let j = 0; j < costDatas.length; j += perPageNum){
                state.costList.push(costDatas.slice(j, j + perPageNum))
            }
            if(count > (2 * perPageNum)){
                state.hasNextPage=true
            }
            if(count > perPageNum){
                state.isHiddenPagination = false
            }
            // for (let index in state.costList) {
            //     index = parseInt(index)
            //     state.total_cost = state.total_cost + state.costList[index].cost
            // }

        })

        return {
            ...toRefs(state),
            updatePage

        }
    }
}
