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
import ExpenseBill from  "./ExpenseBill"
export default ExpenseBill
</script>

<style scoped>

</style>
