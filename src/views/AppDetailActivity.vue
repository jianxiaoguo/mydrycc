<template>
    <nav-bar />
    <activity-roll-back v-if="isShowRollBack && rollBackIndex>0"
                        :activities="activities"
                        :rollBackIndex="rollBackIndex"
                        :appDetail="appDetail"
                        @closeRB="closeRollBack"
    />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <cluster-select-v2 :app-detail="appDetail"/>
            </template>
            <template v-slot:create-new-app>
                <nav-box-app-detail-menu :app-detail="appDetail"/>
            </template>
        </nav-box>
        <div class="main-content">
            <main-nav :is-activity-active="true" :app-detail="appDetail"/>
            <h5 class="limit-width">Activity Feed</h5>
            <div class="hk-hide-bb-last-row list-group limit-width ember-view">
                <div class="flex bb pv3 b--light-silver activity-item ember-view" v-for="(activity, index) in activities">
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
<!--                            <span :title="activity.createdTime.format('yyyy.MM.dd hh:mm:ss')" class="timeago ember-view">{{activity.createdTime.format("yyyy-MM-dd at hh:mm")}}</span>-->
                            <span :title="activity.createdTime" class="timeago ember-view">{{activity.createdTime}}</span>
                            ·
                            {{activity.v}}

                            <span class="confirmable-action ember-view" v-if="activity.v > 1">·
                                <a @click="openRollBack(activity.v)" href="#" class="hk-link rollback">
                                    Roll back to here
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import AppDetailActivity from "./AppDetailActivity"
export default AppDetailActivity
</script>

<style scoped>

</style>
