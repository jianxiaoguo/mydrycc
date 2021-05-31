<template>
    <li id="ember107" class="list-group-item ember-view"><div class="panel-section ">
        <div class="section-description">
            <div class="section-title f3 purple" role="heading" aria-level="3">
                Transfer Ownership
                <!---->    </div>

            <div class="mt2 f5 lh-copy dark-gray">
                Transfer this app to your personal account or a team you are a member of. <a href="https://devcenter.heroku.com/articles/transferring-apps" class="hk-link" target="blank">Learn more</a>
            </div>

            <!---->  </div>

      <div class="panel-content">
        <div id="ember108" class="ember-view">
          <div class="w-100 w-60-ns">
            <div class="f5 b mb2 dark-gray">Choose app owner</div>
            <div class="flex mb3">
              <input placeholder="username" class="hk-input flex-auto pl6 ember-text-field ember-view" required
                     type="text" v-model="username">
              <!--                    <div class="flex items-center w3 h3 justify-center overflow-hidden bg-near-white br1 br&#45;&#45;left bl bt bb b&#45;&#45;light-gray shadow-outer-3">-->
              <!--          <span style="width:32px; height:32px" id="ember109" class="gravatar-icon br-100 w-100 br&#45;&#45;bottom br&#45;&#45;top br&#45;&#45;left br&#45;&#45;right ember-view" data-original-title="" title=""><img src="https://gravatar.com/avatar/02a485fa5edb11e2b5ca38e18622eacd?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" alt="hanlucen@zhumengyuan.com">-->
              <!--</span>-->
              <!--                    </div>-->
              <!--                    <div id="app-transfer-select-list" class="ember-view ember-basic-dropdown-trigger  ember-power-select-trigger hk-select br&#45;&#45;right flex w-100" role="button" tabindex="0" data-ebd-id="ember111-trigger" aria-owns="ember-basic-dropdown-content-ember111">-->
              <!--          <span class="ember-power-select-selected-item">-->
              <!--        han lucen (hanlucen@zhumengyuan.com)-->
              <!--      </span>-->
              <!--                        &lt;!&ndash;&ndash;&gt;<span class="ember-power-select-status-icon"></span>-->
              <!--                    </div>-->
              <div id="ember-basic-dropdown-content-ember111" class="ember-basic-dropdown-content-placeholder"
                   style="display: none;"></div>


            </div>
            <!--                <button id="ember117" class="async-button default hk-button&#45;&#45;disabled-primary ember-view" type="button" @click="transferOwnership">    Transfer app...</button>-->
            <button :class="{'hk-button--disabled-primary':!username}" id="ember117" :disabled="!username"
                    class="async-button default hk-button--success ember-view" type="submit " @click="transferOwnership"> Transfer app...
            </button>
          </div>

                <!----></div>

        </div>
    </div>
    </li>
</template>

<script>
import {useRouter} from "vue-router";
import {reactive, toRefs} from "vue";
import {updateApp} from "../services/app";
import {Toast} from "vant";

export default {
    name: "SettingTransferOwnership",
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            username: null
        })
        const transferOwnership = () => {
            var currentCluster = localStorage.getItem('currentCluster')
            updateApp(JSON.parse(currentCluster).name, params.id, state.username).then(data => {
              if (data.resultCode == 200) {
                Toast("OK")
              } else {
                Toast(data.data)
              }
            })
        }
        return {
            ...toRefs(state),
            transferOwnership,
        }
    },
}
</script>

<style scoped>
button[disabled]{
  cursor: not-allowed;
}
</style>
