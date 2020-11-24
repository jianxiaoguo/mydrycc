<!--导航栏菜单组件-->
<template>
    <a role="button" class="glostick__menu-icon" @click="openOrCloseMenu">
        <div class="icon-navigator-toggle" id="menu-nav"></div>
    </a>
    <ul id="glostick__menu--navigator" class="glostick__menu glostick__menu--navigator" :class="{'glostick__menu--open': isMenuActived}">
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--dashboard" href="/">Dashboard</a>
        </li>
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--databases" href="https://data.heroku.com">Data</a>
        </li>
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--dataclips" href="https://dataclips.heroku.com">Dataclips</a>
        </li>
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--elements" href="https://elements.heroku.com">Elements</a>
        </li>
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--docs" href="https://devcenter.heroku.com">Documentation</a>
        </li>
        <li class="glostick__menu__listitem">
            <a class="glostick__menu__item glostick__menu__item--support" href="https://help.heroku.com">Support</a>
        </li>

    </ul>
</template>

<script>
    export default {
        name: "NavMenu",
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
        mounted() {
            let _this = this
            document.addEventListener('click', function (e) {
                // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
                if (e.target.id !== 'menu-nav') {
                    _this.isMenuActived = false
                }

            })
        }
    }
</script>

<style scoped>
    @import "../assets/home.css";
    .glostick__menu--navigator {
        top: 42px
    }
</style>
