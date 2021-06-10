<template>
    <div class="panel-section ">
        <div class="section-description">
            <div class="section-title f3 purple">Profile</div>
            <div class="mt2 f5 lh-copy dark-gray">
                Your email address is your identity on Heroku and is used to log in.
            </div>
        </div>

        <div class="panel-content">
            <div class="profile edit-first">
                <div class="ember-view">
                    <div class="ember-view">
                            <label class="hk-label db mb2">Email Address</label>
                            <div class="flex flex-column flex-row-ns items-center-ns w-100">
                                <input class="mr2 mb2 w-100 mw6 ember-text-field hk-input--read-only ember-view" type="text" readonly :value="user.email">
                            </div>
                    </div>
                    <span class="confirmable-action ember-view"></span>
                </div>
                <div class="ember-view">
                    <div class="ember-view">
                            <label class="hk-label db mb2">Name (Optional)</label>
                            <div class="flex flex-column flex-row-ns items-center-ns w-100">
                                <input class="mr2 mb2 w-100 mw6 ember-text-field hk-input--read-only ember-view" type="text" readonly :value="user.username">
                            </div>
                    </div>
                </div>
                <div class="ember-view">
                  <div class="ember-view">
                    <label class="hk-label db mb2">Balance</label>
                    <div class="flex flex-column flex-row-ns items-center-ns w-100">
                      <input class="mr2 mb2 w-100 mw6 ember-text-field hk-input--read-only ember-view" type="text" readonly :value="balance">
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from "vue";
    import { getUser, dealUser } from '../services/user'
    import {getAccountFundingList,dealAccountFundingList} from '../services/funding'

    export default {
        name: "AccountSettingProfile",
        setup() {
            const state = reactive({
                user :{
                    username: null,
                    email: null
                },
                balance: null,
             })

            onMounted(async () => {
                let res = await getUser()
                state.user = dealUser(res)
                res = await getAccountFundingList(null, null, 'limit=1')
                state.balance = res.data ?  dealAccountFundingList(res)[0].balance : 0
            })
            return {
                ...toRefs(state),
            }
        }
    }
</script>

<style scoped>

</style>
