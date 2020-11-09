<template>
    <div class="top-nav flex flex-column justify-center">
        <div class="limit-width flex items-center flex-wrap">
            <div class="flex-auto f4">
                <nav class="crumb-trail flex items-center flex-auto f3 lh-copy near-black nudge-left--5 pv--3 ember-view">
                    <div id="ember27" class="context-switcher ember-view">
                        <div class="flex nowrap items-center no-select cursor-hand ember-view" @click="openOrCloseSelectGroupMenu">
                            <button class="context-toggle flex items-center hk-no-link-style bn bg-transparent br2 pv--3 ph1 pr--4 hover-bg-gray-10" id="menu-select-group" >
                                <span class="dib pv--1">
                                    <svg style="height: 26px; width: 26px;" id="menu-select-group" class="icon malibu-icon malibu-fill-gradient-purple" data-test-icon-name="personal-28" data-test-target="malibu-icon" aria-hidden="true" role="img">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#personal-28"></use>
                                    </svg>
                                </span>
                                <span class="ml2 mr1 purple" id="menu-select-group" >BKA</span>
                                <svg xmlns="http://www.w3.org/2000/svg" style="height: 16px; width: 16px;" id="menu-select-group"  class="icon malibu-icon fill-purple ml--1" viewBox="0 0 24 24">  <polyline points="8 8.333 12 4.333 16 8.333 16 8.333"/> <polyline points="16 15.667 12 19.667 8 15.667 8 15.667"/> </svg>
                            </button>
                        </div>
                        <div class="context-switcher__list overflow-y-auto no-select ember-view" :class="{'hide': !$store.state.isSelectGroupMenuActived}">
                            <div class="context-switcher-link ember-view">
                                <a href="/apps" class="flex items-center context-switcher__list__item f4 link dark-gray hover-purple bg-animate hover-bg-near-white db ph3 pv1 mv1 bg-lightest-purple purple ember-view">
                                    <svg style="height: 24px; width: 24px;" class="icon malibu-icon malibu-fill-gradient-purple mr2" >
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#personal-28"></use>
                                    </svg>
                                    <span>BKA</span>
                                </a>
                            </div>
                            <div class="context-switcher-link ember-view">
                                <a href="/apps" class="flex items-center context-switcher__list__item f4 link dark-gray hover-purple bg-animate hover-bg-near-white db ph3 pv1 mv1 bg-lightest-purple purple ember-view">
                                    <svg style="height: 24px; width: 24px;" class="icon malibu-icon malibu-fill-gradient-purple mr2" >
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#personal-28"></use>
                                    </svg>
                                    <span>BKB</span>
                                </a>
                            </div>
                            <div class="context-switcher-link ember-view">
                                <a href="/apps" class="flex items-center context-switcher__list__item f4 link dark-gray hover-purple bg-animate hover-bg-near-white db ph3 pv1 mv1 bg-lightest-purple purple ember-view">
                                    <svg style="height: 24px; width: 24px;" id="malibu-icon-svg-ember54" class="icon malibu-icon malibu-fill-gradient-purple mr2" >
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#personal-28"></use>
                                    </svg>
                                    <span>CG</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <div id="menu-new" class="btn-group ember-view" @click="openOrCloseNewMenu">
                    <button id="menu-new" class="drop-down__toggle hk-button--secondary pr1" style="color: #79589f;">
                            New
                        <svg id="menu-new" xmlns="http://www.w3.org/2000/svg" style="height: 16px; width: 16px;" class="icon malibu-icon ml--2 mr1 fill-purple" viewBox="0 0 24 24"> <polyline points="8 8.333 12 4.333 16 8.333 16 8.333"/> <polyline points="16 15.667 12 19.667 8 15.667 8 15.667"/> </svg>
                    </button>
                    <ul role="list" class="drop-down__menu dropdown-menu-right" :class="{'hide': !$store.state.isNewMenuActived}">
                        <li>
                            <a href="/new-app?org=personal-apps" class="hk-dropdown-item new-app ember-view">
                                <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#app-16"></use>
                                </svg>
                                    Create new app
                            </a>
                        </li>
<!--                        <li class="hk-dropdown-divider"></li>-->
<!--                        <li>-->
<!--                            <a href="/pipelines/new?org=personal-apps" id="ember62" class="hk-dropdown-item new-pipeline ember-view">-->
<!--                                <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray">-->
<!--                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pipeline-16"></use>-->
<!--                                </svg>-->
<!--                                    Create new pipeline-->
<!--                                </a>-->
<!--                        </li>-->
                    </ul>
                </div>
            </div>
        </div>
        <div class="limit-width flex items-center flex-wrap"></div>
    </div>
</template>

<script>
    export default {
        name: "SubNav",
        methods: {
            openOrCloseSelectGroupMenu() {
                if (! this.$store.state.isSelectGroupMenuActived) {
                    this.$store.commit('closeAllMenu')
                    this.$store.dispatch('setIsSelectGroupMenuActived', true)
                } else {
                    this.$store.dispatch('setIsSelectGroupMenuActived', false)
                }
            },
            openOrCloseNewMenu() {
                if (! this.$store.state.isNewMenuActived) {
                    this.$store.commit('closeAllMenu')
                    this.$store.dispatch('setIsNewMenuActived', true)
                } else {
                    this.$store.dispatch('setIsNewMenuActived', false)
                }
            }
        }
    }
</script>

<style scoped>
    @import "../assets/bashboard.css";
    .context-switcher__list {
        width: 160px;
    }
</style>

