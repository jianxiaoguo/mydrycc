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
            <main-nav :is-deploy-active="true" :app-detail="appDetail"/>
            <div class="deploy-section">
                <ul class="list-group list-group-lg">
                    <li class="deploy-github list-group-item ember-view">
                        <div class="panel-section ">
                            <div class="section-description">
                                <div class="section-title f3 purple">Deployment method</div>
                            </div>
                            <div class="panel-content">
                                <ul class="nav deploy-nav nav-pills">
                                    <li class="deploy-tab tab-heroku-git">
                                        <a @click="goToDryccGit" href="#" class="ember-view" :class="{'active': depolyType==='drycc-git'}">
                                            <svg style="height: 32px; width: 32px;" class="icon malibu-icon tab-icon malibu-fill-gradient-purple" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1156" width="200" height="200"><path d="M1004.692673 466.396616l-447.094409-447.073929c-25.743103-25.763582-67.501405-25.763582-93.264987 0l-103.873521 103.873521 78.171378 78.171378c12.533635-6.00058 26.562294-9.359266 41.389666-9.359266 53.02219 0 96.00928 42.98709 96.00928 96.00928 0 14.827372-3.358686 28.856031-9.359266 41.389666l127.97824 127.97824c12.533635-6.00058 26.562294-9.359266 41.389666-9.359266 53.02219 0 96.00928 42.98709 96.00928 96.00928s-42.98709 96.00928-96.00928 96.00928-96.00928-42.98709-96.00928-96.00928c0-14.827372 3.358686-28.856031 9.359266-41.389666l-127.97824-127.97824c-3.051489 1.454065-6.184898 2.744293-9.379746 3.870681l0 266.97461c37.273227 13.188988 63.99936 48.721433 63.99936 90.520695 0 53.02219-42.98709 96.00928-96.00928 96.00928s-96.00928-42.98709-96.00928-96.00928c0-41.799262 26.726133-77.331707 63.99936-90.520695l0-266.97461c-37.273227-13.188988-63.99936-48.721433-63.99936-90.520695 0-14.827372 3.358686-28.856031 9.359266-41.389666l-78.171378-78.171378-295.892081 295.871601c-25.743103 25.784062-25.743103 67.542365 0 93.285467l447.114889 447.073929c25.743103 25.743103 67.480925 25.743103 93.264987 0l445.00547-445.00547c25.763582-25.763582 25.763582-67.542365 0-93.285467z" p-id="1157" fill="#79589F"></path></svg>
                                            <div class="service">Drycc Git</div>
                                            <small>Use Drycc CLI</small>
                                        </a>
                                    </li>
                                    <li class="deploy-tab tab-containers">
                                        <a @click="goToDryccImage" href="#" class="ember-view" :class="{'active': depolyType==='drycc-image'}">
<!--                                            <svg style="height: 28px; width: 28px;" id="malibu-icon-svg-ember7724" class="icon malibu-icon tab-icon malibu-fill-gradient-dark-gray" data-test-icon-name="containers-28" data-test-target="malibu-icon" aria-hidden="true" role="img">-->
<!--                                                &lt;!&ndash;&ndash;&gt;  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#containers-28"></use>-->
<!--                                            </svg>-->
                                            <svg style="height: 32px; width: 32px;" class="icon malibu-icon tab-icon malibu-fill-gradient-purple" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435" width="200" height="200"><path d="M808 789.995l-21.952-32.896 65.813-38.4V323.904L654.443 208.747l19.2-32.918L890.24 301.973v438.699L808 790.016zM166.379 562.432H128v-257.75L517.333 85.334l87.766 49.344-19.2 35.648-68.544-41.13-350.976 197.418v235.819zM509.12 960L128 743.381V636.46h38.4v84.992L509.12 916.14 731.2 789.995l19.2 32.917L509.141 960z m-24.683-619.67l-84.992-49.365v-30.144l112.427-65.813 109.653 65.813v30.144l-82.24 49.366-2.752 30.165-24.661-16.448-27.435 16.427V340.33z m172.758 197.42v-98.71l-85.014-49.365V359.53l109.675-63.062 112.427 63.062v128.853l-112.427 63.083-24.661-13.718z m-257.75 246.762V658.389l24.683-16.448 84.992 49.344 87.744-49.344 24.683 13.718v128.853L509.12 850.325l-109.653-65.813z m257.75-49.344v-98.71l-27.435-16.447 27.435-13.718v-30.165l24.661 16.448 85.013-49.344 27.414 13.717v128.854l-112.427 63.061-24.661-13.696z m-257.75-148.053V458.24l112.427-63.061 109.653 63.061v128.853L509.12 650.155l-109.653-63.062z m-175.488 98.688l2.752-128.854 24.683-13.717 84.992 49.344 27.413-16.427v30.144l27.435 16.448-27.435 13.718v98.709l-27.413 13.696-112.427-63.061z m0-197.419l2.752-128.853 112.427-63.062 109.653 63.062v30.144l-84.992 49.365v95.957l-27.413 16.47-112.427-63.083z" fill="#79589F" p-id="2436"></path></svg>
                                            <div class="service">Container Registry</div>
                                            <small>Use Drycc CLI</small>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <deploy-drycc-git v-if="depolyType==='drycc-git'"/>
                    <deploy-drycc-image v-if="depolyType==='drycc-image'"/>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import AppDetailDeploy from "./AppDetailDeploy"
export default AppDetailDeploy
</script>

<style scoped>

</style>
