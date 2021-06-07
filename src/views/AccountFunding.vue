<template>
    <nav-bar />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <a href="/account" class="link near-black active ember-view">Manage Account</a>
            </template>
            <template v-slot:create-new-app>

            </template>
        </nav-box>
        <div class="main-content">
            <nav class="account-nav nav nav-tabs sub-nav ember-view">
                <div class="limit-width">
                    <div class="sub-nav-item ember-view">
                        <a href="#" @click="goToAccountSetting" class="ember-view">
                            <span class="sub-nav-item-name gray">Account</span>
                        </a>
                    </div>
                    <div class="account-application-nav sub-nav-item ember-view">
                        <a href="#" @click="goToAccountFunding" class="active ember-view">
                            <span class="sub-nav-item-name gray">Funding</span>
                        </a>
                    </div>
                </div>
            </nav>

            <div class="collaborator-list limit-width ember-view">
                <div class="w-100 flex limit-width mb5">
                    <month-picker :cYear="cYear" :cMonth="cMonth" :sYear="sYear" :sMonth="sMonth" @changeMonth="changeMonth"/>
                    <div class="ml6">
                        <span class="f3 purple b">Trade type:</span>
                        <select v-model="selected" class="hk-select b--purple ml2 purple" @change="selectChanged">
                            <option value=0 class="purple">-----------</option>
                            <option value=1 class="purple">expense</option>
                            <option value=2 class="purple">income</option>
                        </select>
                    </div>
                </div>
                <table class="w-100 mb5">
                    <tr class="w-100 f5">
                        <th class="pl1 pr1 pv2 bb b--light-gray b">
                            trade no
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            trade time
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            trade type
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            bill no
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            trade note
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            trade amount
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            balance
                        </th>
                    </tr>
                    <template v-for="funding in fundingList[cPage-1]">
                        <tr class="ember-view">
<!--                            <td class="bb b&#45;&#45;light-silver pa2 dtc w&#45;&#45;28">-->
<!--                                <span style="width: 28px; height: 28px" class="gravatar-icon br-100 ember-view">-->
<!--                                    <img src="https://gravatar.com/avatar/02a485fa5edb11e2b5ca38e18622eacd?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" alt="hanlucen@zhumengyuan.com">-->
<!--                                </span>-->
<!--                            </td>-->
<!--                            <td class="w-40 bb b&#45;&#45;light-silver pv2 pr1">{{fund.trade}}</td>-->
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.tradeNo}}</td>
<!--                            <td class="bb b&#45;&#45;light-silver pv2 pr1 gray">{{funding.tradeTime.format('yyyy-MM-dd hh:mm:ss')}}</td>-->
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.tradeTime}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray"
                                :class="{'green': funding.tradeType==='income', 'light-orange': funding.tradeType==='expend'}" >{{funding.tradeType}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.billNo}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.tradeNote}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray"
                                :class="{'green': funding.tradeType==='income', 'light-orange': funding.tradeType==='expend'}">
                                {{funding.tradeType==='income'?'+ ':'- '}}      {{funding.tradeAmount}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.balance}}</td>


                        </tr>
                    </template>
                </table>
                <div :style="{display: isHiddenPagination ? 'none':'block' }" class="limit-width bg-white mt4">
                    <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted , computed} from 'vue'
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
            const changeMonth = (y, m) => {
                state.sYear = y
                state.sMonth = m
                console.log(state.sYear, state.sMonth)
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
                if (reqNext && (state.cPage + 2 > state.apps.length)) {
                    getAccountFundingList(null,null, reqNext.split('?')[1]).then(res=>{
                        reqNext = res.data.next
                        count = res.data.count
                        let appdatas = res.data && res.data.results ? dealAccountFundingList(res) : []
                        for (let j = 0; j < appdatas.length; j += perPageNum){
                            state.apps.push(appdatas.slice(j, j + perPageNum))
                        }
                    })
                }
            }

            const goToAccountSetting = () => {
                router.push({ path: `/account` })
            }

            const goToAccountFunding = () => {
                router.push({ path: `/account/funding` })
            }
            const selectChanged = (selected) => {
                const trade_type = selected.target.value;
                getAccountFundingList(trade_type).then(res=>{
                    state.fundingList = []
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
                })
            }
            onMounted(async () => {
                const res = await getAccountFundingList()
                var fundingdatas = res ? dealAccountFundingList(res) : []
                for (let j = 0; j < fundingdatas.length; j += perPageNum){
                    state.fundingList.push(fundingdatas.slice(j, j + perPageNum))
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
                goToAccountSetting,
                goToAccountFunding,
                updatePage,
                changeMonth,
                selectChanged
            }

        }
    }
</script>

<style scoped>

</style>
