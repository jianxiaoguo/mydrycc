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
            <main-nav :is-settings-active="true" :app-detail="appDetail"/>
            <ul class="list-group list-group-lg">
                <setting-app-info :app-detail="appDetail"/>
                <setting-config-vars />
<!--                <setting-buildpacks />-->
                <setting-domains />
                <setting-transfer-ownership />
                <setting-maintenance-mode />
                <setting-delete-app />
            </ul>
        </div>
    </div>
</template>

<script>
import AppDetailSettings from  "./AppDetailSettings"
export default AppDetailSettings
</script>

<style scoped>

</style>
