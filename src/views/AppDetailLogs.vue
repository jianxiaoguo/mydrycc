<template>
  <nav-bar />
  <div class="build-view limit-width">
    <div class="flex justify-between">

      <div class="page-breadcrumb">
        Application Logs
      </div><div id="ember838" class="actions-button formation-filter-drop-down btn-group ember-view">  <button class="drop-down__toggle btn btn-default pr1" aria-expanded="false" type="button" data-ember-action="" data-ember-action-840="840">
      All Processes

      <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember841" class="icon malibu-icon  fill-gray" data-test-icon-name="caret-16" data-test-target="malibu-icon" aria-hidden="true" role="img">
        <!---->  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#caret-16"></use>
      </svg>

    </button>

      <!----></div>  </div>

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
import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted } from 'vue'
import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import {getApplogs,dealApplogs} from "../services/logs";

export default {
  name: "AppDetailLogs",
  components: {
    'nav-bar': NavBar,
    'nav-box': NavBox,
  },
  setup() {
    const router = useRouter()
    const params = router.currentRoute.value.params
    const state = reactive({
      appLogs: [],
    })
    const saveLogs = () => {
      const blob = new Blob([state.appLogs], { type: "application/octet-stream" });
      const elink = document.createElement("a");
      elink.download = "logs.txt";
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    }
    onMounted(async () => {
      var currentCluster = localStorage.getItem('currentCluster')
      const data = await getApplogs(JSON.parse(currentCluster).name, params.id)
      state.appLogs = data.data ? dealApplogs(data) : []
    })

    return {
      ...toRefs(state),
      saveLogs
    }
  },
}
</script>

<style scoped>

</style>
