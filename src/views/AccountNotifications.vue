<template>
    <nav-bar />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
              <div>
                <a id="ember1601" href="/notifications" class="link near-black active ember-view">Notifications</a>
              </div>
            </template>
            <template v-slot:create-new-app>
              <div>
<!--                <button disabled="" id="ember1603" class="async-button default hk-button&#45;&#45;disabled-secondary ember-view" type="submit">    Mark all as read-->
<!--                </button>-->
              </div>
            </template>
        </nav-box>
    </div>
  <div class="main-panel bg-lightest-silver relative">
    <div class="main-content">
      <div :style="{display: isHiddenPagination ? 'none':'block' }"  class="list-group notification-list limit-width">
        <p> You have no notifications at this time. </p>
      </div>

      <main-nav :is-access-active="true" :app-detail="appDetail"/>
      <div class="collaborator-list limit-width ember-view">
        <table class="w-100 mb5">
          <tr class="w-100 f5">
            <th class="pl1 pr1 pv2 bb b--light-gray b" colspan="2">Message</th>
            <th class="pv2 pr1 bb b--light-gray b">Sender</th>
            <th class="pv2 pr1 bb b--light-gray b">Created</th>
          </tr>
          <tr class="w-100 f5">
          </tr>
          <template v-for="message in messages">
            <tr class="collaborator-item ember-view">
              <td class="w-40 bb b--light-silver pv2 pr1">{{message.body}}</td>
              <td class="bb b--light-silver tc ph2"> </td>
              <td class="w-40 bb b--light-silver pv2 pr1">{{message.sender}}</td>
              <td class="w-40 bb b--light-silver pv2 pr1">{{message.created}}</td>

            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import {toRefs,onMounted, reactive} from "vue";
    import {getMessages, dealMessages} from "../services/user";

    export default {
        name: "AccountNotifications",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
        },
        setup() {
            const state = reactive({
              messages: [],
              isVisible: "hidden"
            })
            onMounted(async () => {
                const res = await getMessages()
                if (!res.data){
                  state.isVisible = "none"
                }
                state.messages = res.data ? dealMessages(res) : []
            })
            return {
                ...toRefs(state),
            }

        }
    }
</script>

<style scoped>

</style>
