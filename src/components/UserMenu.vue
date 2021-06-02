<!--用户菜单-->
<template>
    <a class="glostick__menu-icon glostick__menu-icon--account" @click="openOrCloseMenu">
        <div class="glostick__user__avatar--container">
            <img class="glostick__user__avatar" src="https://gravatar.com/avatar/02a485fa5edb11e2b5ca38e18622eacd?s=96&amp;d=https://www.herokucdn.com/images/ninja-avatar-96x96.png" id="menu-account">
        </div>
        <div class="glostick__user__notification "></div>
    </a>
    <ul id="glostick__menu--account" class="glostick__menu glostick__menu--account" :class="{'glostick__menu--open': isMenuActived}">
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--account-details" href="/account">
                <div class="glostick__user__avatar--container">
                    <img class="glostick__account-details__avatar" src="https://gravatar.com/avatar/02a485fa5edb11e2b5ca38e18622eacd?s=96&amp;d=https://www.herokucdn.com/images/ninja-avatar-96x96.png" >
                </div>
                <div class="glostick__account-details__name">
                  {{user.username}}
                </div>
                <div class="glostick__account-details__email">
                  {{user.email}}
                </div>
            </a>
        </li>
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--settings" href="/account">Account settings</a>
        </li>

        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--docs" href="/expense-bills">Expense bills</a>
        </li>

        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--notifications" href="/notifications">Notifications</a>
        </li>

        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--signout" @click="logout">Sign out</a>
        </li>

    </ul>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {dealUser, getUser, postLogout} from "../services/user";

export default {
        name: "UserMenu",
        data() {
            return {
                isMenuActived: false
            }
        },
        methods: {
            openOrCloseMenu() {
                this.isMenuActived = !this.isMenuActived;
            }
        },
        setup() {
            const state = reactive({
                user :{
                    username: null,
                    email: null,
                }
            })
            const logout = () => {
                postLogout().then(res=>{
                    if (res.status == 200) {
                        router.push({ path: '/'})
                    }
                })
            }
            onMounted(async () => {
                const res = await getUser()
                state.user = dealUser(res)
            })

            return {
                ...toRefs(state),
                logout
            }
        },
        mounted() {
            let _this = this
            document.addEventListener('click', function (e) {
                // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
                if (e.target.id !== 'menu-account') {
                    _this.isMenuActived = false
                }
            })
        }
    }
</script>

<style scoped>
    @import "../assets/home.css";
    .glostick__menu--account {
        top: 42px
    }
</style>
