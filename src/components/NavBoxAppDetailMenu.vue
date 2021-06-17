<template>
    <div>
        <div class="flex items-center">
            <button class="nudge-up--1 cursor-pointer b--0 bg-transparent b--transparent pa1 ember-view">
                <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#favorite-option-16"></use>
                </svg>
            </button>
            <a href="https://drycc-charts.herokuapp.com/" title="Open Application" target="_blank" class="hk-button--secondary ml3 open-app-button purple">
                Open app
            </a>
            <div class="inline-flex relative ember-view" >
                <button @click="openOrCloseMenu" id="nav-box-app-detail-menu" class="pr1 pop-over-toggle hk-button--secondary hk-button--secondary ml2">
                    More
                    <svg xmlns="http://www.w3.org/2000/svg" id="nav-box-app-detail-menu" style="height: 16px; width: 16px;" class="icon malibu-icon fill-purple mh--3" viewBox="0 0 24 24">  <polyline points="8 8.333 12 4.333 16 8.333 16 8.333"/> <polyline points="16 15.667 12 19.667 8 15.667 8 15.667"/> </svg>

                </button>
                <div class="undefined hk-dropdown--right z-5" :class="{'hide': !isMenuActived}">
                    <li>
                        <a @click="goToLogs" href="#" class="hk-dropdown-item ember-view">
                            <svg style="height: 16px; width: 16px;" class="icon malibu-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logs-16"></use>
                            </svg>
                                View logs
                        </a>
                    </li>
<!--                    <li>-->
<!--                        <a href="/apps/drycc-charts/webhooks"  class="hk-dropdown-item ember-view">-->
<!--                            <svg style="height: 16px; width: 16px;"  class="icon malibu-icon">-->
<!--                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#webhooks-16"></use>-->
<!--                            </svg>-->
<!--                                View webhooks-->
<!--                        </a>-->
<!--                    </li>-->
                    <li class="hk-dropdown-divider"></li>
                    <li>
                        <a href="" class="hk-dropdown-item">
                            <svg style="height: 16px; width: 16px;" class="icon malibu-icon" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#console-16"></use>
                            </svg>
                            Run consol
                        </a>
                    </li>
<!--                    <li>-->
<!--                        <a href="" class="hk-dropdown-item" >-->
<!--                            <svg style="height: 16px; width: 16px;"  class="icon malibu-icon" >-->
<!--                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#check-16"></use>-->
<!--                            </svg>-->
<!--                            Production check-->
<!--                        </a>-->
<!--                    </li>-->
                    <li class="hk-dropdown-divider"></li>
                    <li>
                        <a href="" class="hk-dropdown-item">
                            <svg style="height: 16px; width: 16px;" class="icon malibu-icon" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#restart-16"></use>
                            </svg>
                                Restart all dynos
                        </a>
                    </li>
                </div>

            </div>
            <div class="ember-view">
                <span class="confirmable-action ember-view"></span>
            </div>
        </div>
    </div>
</template>

<script>
import NavBoxAppDetailMenu from "./NavBoxAppDetailMenu"
export default NavBoxAppDetailMenu
</script>

<style scoped>

</style>
