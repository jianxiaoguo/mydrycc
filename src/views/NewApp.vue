<!--app列表页-->
<template>
    <nav-bar />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box >
            <template v-slot:nav-cluster>
                <span class="link near-black center">
                    Create New App
                </span>
            </template>
            <template v-slot:create-new-app>
                <dev></dev>
            </template>
        </nav-box>
        <div class="main-content">
            <form @submit.prevent="createNewApp" class="new-app-view relative flex justify-center pv6">
                <div class="w-100 mw7">
                    <div class="f5 b dark-gray mb2">App name</div>
                    <div id="ember276" class="new-app-name mb3 ember-view">
                        <div class="flex w-100">
                            <input v-model="appName" autocomplete="off" placeholder="app-name" maxlength="30" class="ember-text-field ember-view hk-input w-100" type="text">
                        </div>
                    </div>

                    <div class="runtime-selection ember-view">
                        <div class="f5 b dark-gray mb2">Choose a cluster</div>
                        <div class="relative region-selection">
<!--                            <span class="absolute flex items-center justify-center w3 h2 z-2 nudge-down&#45;&#45;4 nudge-right&#45;&#45;5 pe-none">-->
<!--                                <div class="inline-flex ember-view">-->
<!--                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="14" viewBox="0 0 20 14">-->
<!--                                        <defs>-->
<!--                                            <linearGradient id="hwwBgYb" x1="0%" y1="0%" y2="100%">-->
<!--                                                <stop offset="0%" stop-color="#F37A65"></stop>-->
<!--                                                <stop offset="100%" stop-color="#D64242"></stop>-->
<!--                                            </linearGradient>-->
<!--                                            <linearGradient id="hwwBgYd" x1="0%" y1="0%" y2="100%">-->
<!--                                                <stop offset="0%" stop-color="#64B5F3"></stop>-->
<!--                                                <stop offset="100%" stop-color="#347EE2"></stop>-->
<!--                                            </linearGradient>-->
<!--                                            <rect id="hwwBgYa" width="20" height="13" rx="2"></rect>-->
<!--                                        </defs>-->
<!--                                        <g fill="none" fill-rule="evenodd"><mask id="hwwBgYc" fill="#fff">-->
<!--                                            <use xlink:href="#hwwBgYa"></use></mask><use fill="#FFF" xlink:href="#hwwBgYa"></use>-->
<!--                                            <path fill="url(#hwwBgYb)" d="M0 0h20v1H0V0zm0 2h20v1H0V2zm0 2h20v1H0V4zm0 2h20v1H0V6zm0 2h20v1H0V8zm0 2h20v1H0v-1zm0 2h20v1H0v-1z" mask="url(#hwwBgYc)"></path>-->
<!--                                            <path fill="url(#hwwBgYd)" d="M1.997 0A1.994 1.994 0 000 2.006v3.991A1 1 0 00.998 7h7.004C8.553 7 9 6.562 9 5.997V1.003A1 1 0 008.002 0H1.997z"></path>-->
<!--                                            <path fill="#FFF" fill-opacity=".705" d="M1 1h1v1H1V1zm2 0h1v1H3V1zm2 0h1v1H5V1zM2 3h1v1H2V3zm2 0h1v1H4V3zm2 0h1v1H6V3zm1-2h1v1H7V1zM1 5h1v1H1V5zm2 0h1v1H3V5zm2 0h1v1H5V5zm2 0h1v1H7V5z"></path>-->
<!--                                            <path fill="#000" fill-opacity=".2" fill-rule="nonzero" d="M2.994.75A2.247 2.247 0 00.75 3.003v6.994a2.25 2.25 0 002.244 2.253h14.012a2.247 2.247 0 002.244-2.253V3.003A2.25 2.25 0 0017.006.75H2.994zm0-.75h14.012A3 3 0 0120 3.003v6.994A2.997 2.997 0 0117.006 13H2.994A3 3 0 010 9.997V3.003A2.997 2.997 0 012.994 0z"></path>-->
<!--                                        </g>-->
<!--                                    </svg>-->
<!--                                </div>-->
<!--                            </span>-->
                            <select tabindex="0" v-model="selectedClusterId" class="hk-select pl6 w-100 x-select ember-view" @change="">

                                <option class="x-option ember-view" v-for="item in clusters" :value='item.name'>{{item.name}}</option>

                            </select>
                        </div>
                    </div>

                    <div class="mv4 bb b--light-silver"></div>

                    <button class="async-button default hk-button--primary create-app-button ember-view" @click="createNewApp" type="submit">    Create app
                    </button>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import { reactive, toRefs, onMounted , computed} from 'vue'
    import {getClusters, dealClusterData} from "../services/cluster";
    import { createApp } from "../services/app"
    import { Toast } from 'vant'

    export default {
        name: "AppList",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
        },
        setup() {
            const state = reactive({
                isMenuActived: false,
                clusters: [],
                selectedClusterId: '',
                appName: ''
            })

            const createNewApp = () => {
                console.log(state.selectedClusterId)
                console.log(state.appName)
                createApp(state.selectedClusterId, state.appName).then(data=>{
                    if (data.resultCode == 200) {
                        Toast('OK')
                    }
                })
            }

            onMounted(async () => {

                const  data = await getClusters()
                state.clusters = data ? dealClusterData(data) : []
                state.selectedClusterId = state.clusters[0].name
            })

            return {
                ...toRefs(state),
                createNewApp
            }
        },

        mounted() {
            let _this = this
            document.addEventListener('click', function (e) {
                // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
                if (e.target.id !== 'menu-select-group') {
                    _this.isMenuActived = false
                }

            })
        }
    }
</script>

<style scoped>
    /*@import "../assets/bashboard.css";*/
    p.center{
        text-align: center;
    }
</style>
