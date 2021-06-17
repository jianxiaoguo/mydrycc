<template>
    <div class="ember-view">
        <div class="flex-ns items-center pv2">
            <div class="flex dark-gray mr2">
                <div class="mr1">Dyno formation</div>
                <span class="hk-badge tooltip-component ember-view">
                    $0.00/month
                </span>
            </div>
            <div class="flex-auto"></div>

            <a @click="goToResources" class="flex items-center hk-link no-underline f6 mv1 mv0-ns ember-view">
                <span class="underline">Configure Dynos</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ml--3 nudge-down--1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#006deb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>

            </a>
        </div>

        <div class="purple-box" v-if="processes.length > 0">
            <div class="formation-tier">
                <p>This app is using <b>Free</b> dynos</p>
            </div>
            <template v-for="process in processes">
            <div class="display-formation-list hk-hide-bb-last-row ember-view" >
                <div class="flex pa3 items-center bb b--light-silver">
                    <div class="mr3 flex-auto">
                        <div class="flex flex-row w-90">
                            <div class="mr2">{{process.name}}</div>
                            <div class="mid-gray f5 code truncate">{{process.cmd}}</div>
                        </div>
                    </div>
                    <span class="text-uppercase b f5">
                        <span class="green" v-if="process.status === 1">On</span>
                        <span class="red" v-if="process.status === 0">Off</span>
                    </span>
                </div>
            </div>
            </template>
        </div>

        <div class="mb5 ember-view" v-if="processes.length === 0">
            <div class="hk-well ember-view">
                <div class="f3 dark-gray lh-title mv1 ember-view">
                    This app has no process types yet
                </div>
                <div class="f5 gray lh-copy ember-view">
                    Add a Procfile to your app in order to define its process types
                    <a href="https://www.drycc.cc/applications/managing-app-processes" class="hk-link" target="_blank">Learn more</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import OverviewFormation from "./OverviewFormation"
export default OverviewFormation
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
</style>
