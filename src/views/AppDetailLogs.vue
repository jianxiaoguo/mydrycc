<template>
  <nav-bar />
  <div class="main-panel bg-lightest-silver relative">
    <nav-box>
      <template v-slot:nav-cluster>
        <a href="/account" class="link near-black active ember-view">Application Logs</a>
      </template>
      <template v-slot:create-new-app>
      </template>
    </nav-box>
  </div>

  <div class="build-view limit-width">
    <div class="flex justify-between">
      <div id="ember838" class="actions-button formation-filter-drop-down btn-group ember-view">
      </div>
    </div>
    <div id="ember842" class="build-stream build-stream-full ember-view"><div class="build-stream-output">
      <!---->
      <template v-for="log in logs">
        <pre class="build-stream-line"><span class="log-color log-color--blue">{{ log }}</span></pre>
      </template>

    </div>

      <footer class="build-stream-footer">
<!--        <label>-->
<!--          <input id="ember843" class="ember-checkbox ember-view" type="checkbox"> Autoscroll with output-->
<!--        </label>-->
        <a class="hk-link" @click="saveLogs" href="#" data-ember-action="" data-ember-action-844="844">Save</a>
      </footer>
    </div>
  </div>
</template>

<script>
import AppDetailLogs from  "./AppDetailLogs"
export default AppDetailLogs
</script>

<style scoped>

</style>
