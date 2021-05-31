<template>
    <nav-bar />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <a href="/expense" class="link near-black active ember-view">Expense Bill</a>
            </template>
            <template v-slot:create-new-app>

            </template>
        </nav-box>
        <div class="main-content">
            <nav class="account-nav nav nav-tabs sub-nav ember-view">
                <div class="limit-width">
                    <div class="sub-nav-item ember-view">
                        <a href="#" @click="goToExpenseBills" class="ember-view">
                            <span class="sub-nav-item-name gray">Overview</span>
                        </a>
                    </div>
                    <div class="account-application-nav sub-nav-item ember-view">
                        <a href="#" @click="goToExpenseBillsDetails" class="active ember-view">
                            <span class="sub-nav-item-name gray">Details</span>
                        </a>
                    </div>
                </div>
            </nav>

            <div class="collaborator-list limit-width ember-view">
                <div class="w-100 flex limit-width mb5">
                    <month-picker :cYear="cYear" :cMonth="cMonth" :sYear="sYear" :sMonth="sMonth" @changeMonth="changeMonth"/>
                    <div class="ml6 flex">
                        <div class="ma1 f3 w4 purple b">Product:</div>
                        <select v-model="selected" class="hk-select ml2 b--purple purple" @change="selectChanged">
                            <option value=0 class="purple">-----------</option>
                            <option value=1 class="purple">Cpu</option>
                            <option value=2 class="purple">Memory</option>
                            <option value=3 class="purple">Volume</option>
                            <option value=4 class="purple">Network</option>
                        </select>
                    </div>
                </div>
                <table class="w-100 mb5">
                    <tr class="w-100 f5">
                        <th class="pl1 pr1 pv2 bb b--light-gray b">
                            Period
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            App
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            Product
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            Product Detail
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            Cost time
                        </th>
                        <th class="pv2 pr1 bb b--light-gray b">
                            cost
                        </th>
                    </tr>
                    <template v-for="bill in bills">
                        <tr class="ember-view">
                            <td class="bb b--light-silver pv2 pr1 gray">{{bill.period}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{bill.appName}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{bill.productName}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{bill.productDetail}}</td>
<!--                            <td class="bb b&#45;&#45;light-silver pv2 pr1 gray">{{bill.start.format('yyyy-MM-dd hh:mm:ss')}} ~ {{bill.end.format('yyyy-MM-dd hh:mm:ss')}}</td>-->
                            <td class="bb b--light-silver pv2 pr1 gray">{{bill.start}} ~ {{bill.end}}</td>
<!--                            <td class="bb b&#45;&#45;light-silver pv2 pr1 gray">{{bill.cost===0?0.00:bill.cost/100.0}}</td>-->
                            <td class="bb b--light-silver pv2 pr1 gray">{{bill.cost===0?0.00:bill.cost}}</td>


                        </tr>
                    </template>
                </table>
                <div class="limit-width bg-white mt4">
                    <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
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
                hasNextPage: true,
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

            const goToExpenseBills = () => {
                router.push({ path: `/expense-bills` })
            }

            const goToExpenseBillDetails = () => {
                router.push({ path: `/expense-bills/details` })
            }
            const selectChanged = (selected) => {
                const resource_type = selected.target.value;
                getExpenseBillList(resource_type).then(data=>{
                    state.bills = data && data.status == 200 ? dealExpenseBillList(data) : []
                })

            }
            onMounted(async () => {

                const data = await getExpenseBillList()
                state.bills = data ? dealExpenseBillList(data) : []
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
</script>

<style scoped>

</style>
