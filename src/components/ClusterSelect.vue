<!--集群选择器-->
<template>
    <div class="context-switcher ember-view">
        <div class="flex nowrap items-center no-select cursor-hand ember-view" @click="openOrCloseMenu">
            <button class="context-toggle flex items-center hk-no-link-style bn bg-transparent br2 pv--3 ph1 pr--4 hover-bg-gray-10" id="menu-select-group" >
                            <span class="dib pv--1">
                                <svg style="height: 26px; width: 26px;" class="icon malibu-icon " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M639 337v560H99V337h540m50-50H49v660h640V287zM189 177v59h50v-9h540v560h-42v50h92V177H189zM309 77v50h590v560h-22v50h72V77H309z" fill="#79589F"></path></svg>
                            </span>
                <span class="ml2 mr1 purple" id="menu-select-group" >{{$store.state.currentCluster.name}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" style="height: 16px; width: 16px;" id="menu-select-group"  class="icon malibu-icon fill-purple ml--1" viewBox="0 0 24 24">  <polyline points="8 8.333 12 4.333 16 8.333 16 8.333"/> <polyline points="16 15.667 12 19.667 8 15.667 8 15.667"/> </svg>
            </button>
        </div>
        <div class="context-switcher__list overflow-y-auto no-select ember-view" :class="{'hide': !isMenuActived}">
            <div class="context-switcher-link ember-view" v-for="cluster in clusters">
                <router-link :to="{path:'/apps'}" @click="changeCluster(cluster)" class="flex items-center context-switcher__list__item f4 link dark-gray hover-purple bg-animate hover-bg-near-white db ph3 pv1 mv1 bg-lightest-purple purple ember-view">
                    <svg style="height: 24px; width: 24px;" class="icon malibu-icon mr2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="32" height="32"><path d="M639 337v560H99V337h540m50-50H49v660h640V287zM189 177v59h50v-9h540v560h-42v50h92V177H189zM309 77v50h590v560h-22v50h72V77H309z" fill="#79589F"></path></svg>
                    <span>{{cluster.name}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, toRefs, onMounted , computed} from 'vue'
    import {getClusters, dealClusterData} from "../services/cluster";
    import {getCsrf} from "../services/user";
    import { useStore } from 'vuex'

    export default {
        name: "ClusterSelect",
        setup() {
            const store = useStore()
            const state = reactive({
                isMenuActived: false,
                clusters: [],
                currentCluster: localStorage.getItem('currentCluster')
            })

            const openOrCloseMenu = () => {
                state.isMenuActived = !state.isMenuActived;
            }

            const changeCluster = (cluster) => {
                localStorage.setItem('currentCluster', JSON.stringify(cluster))
                location.reload()
            }


            onMounted(async () => {
                const token =await getCsrf()
                localStorage.setItem('csrftoken', token.data.token)
                const res = await getClusters()
                state.clusters = res ? dealClusterData(res) : []
                if (state.currentCluster) {
                    store.dispatch('changeCurrentCluster', JSON.parse(state.currentCluster))
                } else {
                    store.dispatch('changeCurrentCluster', dealClusterData(res)[0])
                    localStorage.setItem('currentCluster', JSON.stringify(dealClusterData(res)[0]))
                }
            })
            return {
                ...toRefs(state),
                openOrCloseMenu,
                changeCluster
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
    .context-switcher__list {
        width: 160px;
    }
    .bg-lightest-purple {
        background: #ffffff;
    }
</style>
