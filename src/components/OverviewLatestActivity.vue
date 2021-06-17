<template>
    <div class="flex-ns items-center limit-width pv2">
        <div class="flex dark-gray mr2">Latest activity (last 15 activities)</div>
        <div class="flex-auto"></div>
        <a @click="goToActivity" class="flex items-center hk-link no-underline f6 mv1 mv0-ns ember-view">
            <span class="underline">All Activity</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml--3 nudge-down--1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#006deb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
        </a>
    </div>

    <div class="hk-hide-bb-last-row list-group limit-width ember-view">
        <div class="flex bb pv3 b--light-silver activity-item ember-view" v-for="activity in activities">
            <div class="pt1 mr3 nowrap">
                <div class="relative dib ember-view">
                    <svg style="height: 28px; width: 28px;" class="icon malibu-icon fill-dark-gray" >
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#configure-28"></use>
                    </svg>
                </div>
                <span style="width:28px; height:28px" class="ml2 gravatar-icon br-100 ember-view">
                    <img src="https://gravatar.com/avatar/9ab286614379ac593637847f1f50b006?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" alt="heroku-redis@addons.heroku.com">
                </span>
            </div>

            <div class="flex flex-column lh-copy">
                <div class="f5">
                    <span class="b">{{activity.username}}:</span>
                    <span>{{activity.content}}</span>
                </div>
                <div class="f5 gray">
<!--                    <span :title="activity.createdTime.format('yyyy.MM.dd hh:mm:ss')" class="timeago ember-view">{{activity.createdTime.format("yyyy-MM-dd at hh:mm")}}</span>-->
                    <span :title="activity.createdTime" class="timeago ember-view">{{activity.createdTime}}</span>
                    ·
                    {{activity.v}}
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import OverviewLatestActivity from "./OverviewLatestActivity"
export default OverviewLatestActivity
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
</style>
