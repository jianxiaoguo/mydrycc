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
                        <a href="#" @click="goToExpenseBills" class="active ember-view">
                            <span class="sub-nav-item-name gray">Overview</span>
                        </a>
                    </div>
                    <div class="account-application-nav sub-nav-item ember-view">
                        <a href="#" @click="goToExpenseBillsDetails" class="ember-view">
                            <span class="sub-nav-item-name gray">Details</span>
                        </a>
                    </div>

                </div>
            </nav>

            <div class="w-100 flex limit-width">
                <month-picker :cYear="cYear" :cMonth="cMonth" :sYear="sYear" :sMonth="sMonth" @changeMonth="changeMonth"/>
                <div class="ml6">
                  <span class="f3 purple b">Cluster:</span>
                  <select class="hk-select b--purple ml2 purple">
                    <option class="purple">------</option>
                    <option class="purple">cluster 1</option>
                    <option class="purple">cluster 2</option></select>
                </div>
                <div class="ml6">
                    <span class="f3 purple b">App:</span>
                    <select class="hk-select b--purple ml2 purple">
                        <option class="purple">-------</option>
                        <option class="purple">Lorem ipsum</option>
                        <option class="purple">Dolor ist sda ssqawa aasaqgvaaa 66y1</option></select>
                </div>
            </div>
<!--            <div class="w-100 ma2 limit-width flex" style="height: 400px">-->
<!--                <div class="w-60 ma2 flex-column">-->
<!--                    <expense-bill-cost-trend />-->
<!--                </div>-->
<!--                <div class="w-40 ma2 flex-column">-->
<!--                    <expense-bill-product-cost-distribution />-->
<!--                </div>-->
<!--            </div>-->

            <div class="w-100 mt4 ml2 mb2 mr2 limit-width">
                <div class="w-100 ma2 flex-column">
                    <expense-bill-total-cost :sYear="sYear" :sMonth="sMonth"/>
                </div>
            </div>

            <div class="w-100 mt4 ml2 mb2 mr2 flex limit-width" >
                <div class="w-100 ma2 flex-column">
                    <expense-bill-product-cost />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
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
</script>

<style scoped>

</style>
