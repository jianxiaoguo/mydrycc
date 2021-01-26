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
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import AccountSettingProfile from "../components/AccountSettingProfile.vue";
    import AccountSettingClose from "../components/AccountSettingClose.vue";
    import { useRouter } from 'vue-router'

    export default {
        name: "AccountSetting",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'account-setting-profile': AccountSettingProfile,
            'account-setting-close': AccountSettingClose
        },
        setup(props) {
            const router = useRouter()

            const goToAccountSetting = () => {
                router.push({ path: `/account` })
            }

            const goToAccountFunding = () => {
                router.push({ path: `/account/funding` })
            }

            return {
                // ...toRefs(state),
                goToAccountSetting,
                goToAccountFunding
            }

        }
    }
</script>

<style scoped>

</style>
