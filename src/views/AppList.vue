<!--app列表页-->
<template>
    <nav-bar />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <cluster-select />
            </template>
            <template v-slot:create-new-app>
                <div>
                    <div class="btn-group ember-view" @click="">
                        <button @click="goToNewApp" class="drop-down__toggle hk-button--secondary pr1" style="color: #79589f;">
                            Create New App
                        </button>
                    </div>
                </div>
            </template>
        </nav-box>
        <div class="main-content">
            <div class="mv3 limit-width">
                <div class="flex">
                    <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray absolute z-2 ml2 mt1 nudge-down--3">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-16"></use>
                    </svg>
                    <input placeholder="Filter apps" class="hk-search-input focus-z-1" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" size="32">
                </div>
            </div>
            <div class="app-list hk-hide-bb-last-row">
                <div class="apps-list-item flex flex-column flex-auto b--light-silver bg-white pv2 ph4 bb hover-bg-near-white ember-view" v-for="item in apps[cPage-1]">
                    <one-app v-bind="item"/>
                </div>
                <div :style="{display: isHiddenPagination ? 'none':'block' }" class="limit-width bg-white mt4">
                    <pagination :cPage="cPage" :tPage="tPage" :hasNext="hasNextPage" @updatePage="updatePage"/>
                </div>
                <div class="bg-white pv3 bt justify-center flex ember-view"></div>
            </div>
        </div>
    </div>
</template>

<script>
import AppList from  "./AppList"
export default AppList
</script>

<style scoped>
    /*@import "../assets/bashboard.css";*/
    .pr1 {
        padding-right: 15px;
    }
</style>
