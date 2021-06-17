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
                        <a href="#" @click="goToAccountSetting" class="active ember-view">
                            <span class="sub-nav-item-name gray">Account</span>
                        </a>
                    </div>
                    <div class="account-application-nav sub-nav-item ember-view">
                        <a href="#" @click="goToAccountFunding" class="ember-view">
                            <span class="sub-nav-item-name gray">Funding</span>
                        </a>
                    </div>
                </div>
            </nav>
            <ul class="list-group list-group-lg">
                <li class="list-group-item ember-view">
                    <account-setting-profile />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import AccountSetting from "./AccountSetting"
export default AccountSetting
</script>

<style scoped>

</style>
