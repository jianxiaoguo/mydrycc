<!--集群选择器-->
<template>

    <div class="context-switcher ember-view">
        <div class="flex nowrap items-center no-select cursor-hand ember-view">
            <a href="/apps" class="context-item hk-no-link-style flex items-center purple pv--3 ph1 pr2 br2 hover-bg-gray-10 ember-view">
                <span class="dib pv--1">
                    <svg style="height: 26px; width: 26px;" class="icon malibu-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M639 337v560H99V337h540m50-50H49v660h640V287zM189 177v59h50v-9h540v560h-42v50h92V177H189zM309 77v50h590v560h-22v50h72V77H309z" fill="#79589F"></path></svg>
                </span>
                <span class="ml2 dn inline-flex-l">{{currentCluster.name}}</span>
<!--                <span class="ml2 dn inline-flex-l">{{$store.state.currentCluster.name}}</span>-->
            </a>
            <button @click="openOrCloseMenu" id="menu-select-group-2" class="context-toggle hk-no-link-style flex items-center bn bg-transparent br2 pv1 ph--3 hover-bg-gray-10 nudge-left--2 nr--2">
                <span class="h2" id="menu-select-group-2">
                    <svg id="menu-select-group-2" xmlns="http://www.w3.org/2000/svg" style="height: 16px; width: 16px;" class="icon malibu-icon fill-purple" viewBox="0 0 24 24">  <polyline points="8 8.333 12 4.333 16 8.333 16 8.333"/> <polyline points="16 15.667 12 19.667 8 15.667 8 15.667"/> </svg>
                </span>
            </button>
        </div>
    </div>

    <div class="context-switcher__list overflow-y-auto no-select ember-view" :class="{'hide': !isMenuActived}">
        <div class="context-switcher-link ember-view" v-for="cluster in clusters">
            <router-link :to="{path:'/apps'}" @click="changeCluster(cluster)" class="flex items-center context-switcher__list__item f4 link dark-gray hover-purple bg-animate hover-bg-near-white db ph3 pv1 mv1 bg-lightest-purple purple ember-view">
                <svg style="height: 24px; width: 24px;" class="icon malibu-icon malibu-fill-gradient-purple mr2" >
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#personal-28"></use>
                </svg>
                <span>{{cluster.name}}</span>
            </router-link>
        </div>
    </div>

    <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray mh1-l" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M333.1 118.9l-35.3 35.4L655.5 512 297.8 869.7l35.3 35.4L726.2 512z" fill="#79589F" ></path></svg>

    <span class="flex items-center pv--3 ph1">
        <span class="inline-flex pv--2 mr--2">
            <div class="relative ember-view">
                <svg style="height: 24px; width: 24px;" class="icon malibu-icon v-mid" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M92 929h390V539H92v390z m50-340h290v290H142V589z m400 340h390V539H542v390z m50-340h290v290H592V589zM542 95v390h390V95H542z m340 340H592V145h290v290zM92 95h390v390H293.4v-50H432V145H142v124.4H92V95z" fill="#79589F" ></path></svg>
            </div>
        </span>
        <span class="ml1">
            {{ appDetail.name }}
        </span>
    </span>

</template>

<script>
import ClusterSelectAppDetail from "./ClusterSelectAppDetail"
export default ClusterSelectAppDetail
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
