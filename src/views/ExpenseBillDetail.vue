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
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import { useRouter } from 'vue-router'

    export default {
        name: "ExpenseBillDetail",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
        },
        setup() {
            const router = useRouter()

            const goToExpenseBills = () => {
                router.push({ path: `/expense-bills` })
            }

            const goToExpenseBillDetails = () => {
                router.push({ path: `/expense-bills/details` })
            }

            return {
                // ...toRefs(state),
                goToExpenseBills,
                goToExpenseBillDetails
            }

        }
    }
</script>

<style scoped>

</style>
