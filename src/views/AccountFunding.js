import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted } from 'vue'
import {dealAccountFundingList, getAccountFundingList} from "../services/funding";
import Pagination from "../components/Pagination.vue";
import MonthPicker from "../components/MonthPicker.vue";


export default {
    name: "AccountFunding",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
        'pagination': Pagination,
        'month-picker': MonthPicker
    },
    setup(props) {
        const router = useRouter()
        const date = new Date()
        const state = reactive({
            fundingList: [],
            selected: 0,
            cPage: 1,
            tPage: 2,
            hasNextPage: true,
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
        const changeMonth = async (y, m) => {
            state.sYear = y
            state.sMonth = m
            console.log(state.sYear, state.sMonth)
            let start =  new Date(state.sYear, state.sMonth-1, 1).getTime() / 1000
            let day = new Date(state.sYear, state.sMonth, 0).getDate()
            let stop =  new Date(state.sYear, state.sMonth-1, day).getTime() / 1000
            let section = start + ',' + stop
            console.log('vue section: ', section)
            let trade_type = state.selected;
            let res = await getAccountFundingList(trade_type, section)
            state.fundingList = []
            reqNext = res.data.next
            count = res.data.count
            let fundingdatas = res && res.status == 200 ? dealAccountFundingList(res) : []
            for (let j = 0; j < fundingdatas.length; j += perPageNum){
                state.fundingList.push(fundingdatas.slice(j, j + perPageNum))
            }
            if(count > (2 * perPageNum)){
                state.hasNextPage=true
            }
            if(count < perPageNum){
                state.isHiddenPagination = true
            }
        }


        const updatePage = async (n) => {

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
            if (reqNext && (state.cPage + 2 > state.apps.length)) {
                let res = await getAccountFundingList(null,null, reqNext.split('?')[1])
                reqNext = res.data.next
                count = res.data.count
                let appdatas = res.data && res.data.results ? dealAccountFundingList(res) : []
                for (let j = 0; j < appdatas.length; j += perPageNum){
                    state.apps.push(appdatas.slice(j, j + perPageNum))
                }
            }
        }

        const goToAccountSetting = () => {
            router.push({ path: `/account` })
        }

        const goToAccountFunding = () => {
            router.push({ path: `/account/funding` })
        }

        const selectChanged = async (selected) => {
            let start =  new Date(state.sYear, state.sMonth-1, 1).getTime() / 1000
            let day = new Date(state.sYear, state.sMonth, 0).getDate()
            let stop =  new Date(state.sYear, state.sMonth-1, day).getTime() / 1000
            let section = start + ',' + stop
            console.log('vue section: ', section)
            let trade_type = selected.target.value;
            state.selected = selected.target.value
            let res = await  getAccountFundingList(trade_type, section)
            state.fundingList = []
            reqNext = res.data.next
            count = res.data.count
            let fundingdatas = res && res.status == 200 ? dealAccountFundingList(res) : []
            for (let j = 0; j < fundingdatas.length; j += perPageNum){
                state.fundingList.push(fundingdatas.slice(j, j + perPageNum))
            }
            if(count > (2 * perPageNum)){
                state.hasNextPage=true
            }
            if(count < perPageNum){
                state.isHiddenPagination = true
            }
        }

        onMounted(async () => {
            let start =  new Date(state.sYear, state.sMonth-1, 1).getTime() / 1000
            let day = new Date(state.sYear, state.sMonth, 0).getDate()
            let stop =  new Date(state.sYear, state.sMonth-1, day).getTime() / 1000
            let section = start + ',' + stop
            console.log('vue section: ', section)
            const res = await getAccountFundingList(null, section)
            reqNext = res.data.next
            count = res.data.count
            var fundingdatas = res ? dealAccountFundingList(res) : []
            for (let j = 0; j < fundingdatas.length; j += perPageNum){
                state.fundingList.push(fundingdatas.slice(j, j + perPageNum))
            }
            if(count > (2 * perPageNum)){
                state.hasNextPage = true
            }
            if(count < perPageNum){
                state.isHiddenPagination = true
            }
        })

        return {
            ...toRefs(state),
            goToAccountSetting,
            goToAccountFunding,
            updatePage,
            changeMonth,
            selectChanged
        }

    }
}
