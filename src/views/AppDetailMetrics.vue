<template>
    <nav-bar />
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
          <main-nav @click="openShowProcessTypes" :is-metrics-active="true" :app-detail="appDetail"/>
          <div class="ember-view" v-if="processTypes.length <= 0">
            <div class="mb5 ember-view" style="padding: 0px 320px;">
              <div class="f3 dark-gray lh-title mv1 ember-view"> This app has no process types yet </div>
              <div class="f5 gray lh-copy ember-view">
                Add a Procfile to your app in order to define its process types.
                <a href="https://devcenter.heroku.com/articles/procfile" class="hk-link" target="_blank">Learn more</a>
              </div>
            </div>
          </div>
          <div v-if="processTypes.length > 0">
            <div class="limit-width">
                <div class="flex flex-column metrics__charts-container">
                    <div id="process-picker" class="relative dib mb2">
                        <button @click="openShowProcessTypes" class="hk-button--secondary pr1">
                            {{currentType.name}}
                            <span class="ml4">
                                <svg t="1611910986651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1157" width="20" height="20"><path d="M721.794214 384.116381l-60.943176 60.943176-211.189225-211.189225L510.604989 172.927155z" fill="#444444" p-id="1158"></path><path d="M299.316831 383.987914l60.943176 60.943177 211.189226-211.189225L510.506056 172.798689z" fill="#444444" p-id="1159"></path><path d="M301.900488 639.593587l60.943177-60.943177 211.189225 211.189226L513.089714 850.782812z" fill="#444444" p-id="1160"></path><path d="M724.391342 639.729931l-60.943176-60.943177-211.189226 211.189226L513.202117 850.919156z" fill="#444444" p-id="1161"></path></svg>
                            </span>
                        </button>
                        <div v-if="showProcessTypes">
                            <ul class="hk-dropdown z-max">
                                <template  v-for="(pt, index) in processTypes">
                                <li><a @click="goToOtherProcessType(pt)" class="hk-dropdown-item tc" tabindex="0">{{pt.name}}</a></li>
                                <li v-if="index!==processTypes.length-1" class="hk-dropdown-divider"></li>
                                </template>
                            </ul>
                        </div>
                    </div>

                    <div class="purple-box mt2 mb4">
                        <div class="ember-view">
                            <div >

                            </div>
                            <div class="ember-view">
                                <div class="metrics__main__charts metrics__chart-sorting is-vertical">
                                    <metric-memory :metricMemory="metricMemory"/>
                                    <metric-network :metricNetworks="metricNetworks"/>
                                    <metric-cpu :metricCpus="metricCpus"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import AppDetailMetrics from  "./AppDetailMetrics"
export default AppDetailMetrics
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
    .hide-el {
        display: none;
    }
</style>
