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
