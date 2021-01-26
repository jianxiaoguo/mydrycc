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
                    <template v-for="funding in fundingList">
                        <tr class="ember-view">
<!--                            <td class="bb b&#45;&#45;light-silver pa2 dtc w&#45;&#45;28">-->
<!--                                <span style="width: 28px; height: 28px" class="gravatar-icon br-100 ember-view">-->
<!--                                    <img src="https://gravatar.com/avatar/02a485fa5edb11e2b5ca38e18622eacd?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" alt="hanlucen@zhumengyuan.com">-->
<!--                                </span>-->
<!--                            </td>-->
<!--                            <td class="w-40 bb b&#45;&#45;light-silver pv2 pr1">{{fund.trade}}</td>-->
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.tradeNo}}</td>
                            <td class="bb b--light-silver pv2 pr1 gray">{{funding.tradeTime.format('yyyy-MM-dd hh:mm:ss')}}</td>
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
            </div>

        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted , computed} from 'vue'
    import { getAccountFundingList} from "../services/funding";

    export default {
        name: "AccountFunding",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
        },
        setup(props) {
            const router = useRouter()
            const state = reactive({
                fundingList: []
            })

            const goToAccountSetting = () => {
                router.push({ path: `/account` })
            }

            const goToAccountFunding = () => {
                router.push({ path: `/account/funding` })
            }

            onMounted(async () => {

                const data = await getAccountFundingList()
                if (data) {
                    state.fundingList = data.map(item => {
                        return {
                            'tradeNo': item.trade_no,
                            'tradeTime': new Date(item.trade_time*1000),
                            'tradeType': item.trade_type,
                            'billNo': item.bill_no,
                            'tradeNote': item.trade_note,
                            'tradeAmount': item.trade_amount,
                            'balance': item.balance
                        }

                    })
                }


            })

            return {
                ...toRefs(state),
                goToAccountSetting,
                goToAccountFunding
            }

        }
    }
</script>

<style scoped>

</style>
