<template>
    <li id="ember122" class="list-group-item ember-view"><div class="panel-section danger app-deletion">
        <div class="section-description">
            <div class="section-title f3 purple" role="heading" aria-level="3">
                Delete App
                <!---->    </div>

            <div class="mt2 f5 lh-copy dark-gray">
                Deleting your app and its add-ons is irreversible.
            </div>

            <!---->  </div>

        <div class="panel-content">
            <p>
<span id="ember123" class="confirmable-action ember-view">  <button @click="deleteAppBTN" class="hk-button--danger delete-app" data-ember-action="" data-ember-action-124="124">
    Delete app...
  </button>

    <!----></span>    </p>

        </div>
    </div>
    </li>
</template>

<script>
    import { useRouter } from "vue-router";
    import { deleteApp } from "../services/app";
    // import { Toast } from 'vant'

    export default {
        name: "SettingDeleteApp",
        setup() {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const deleteAppBTN = () => {
              var currentCluster = localStorage.getItem('currentCluster')
              const data = deleteApp(JSON.parse(currentCluster).name, params.id)
              // if (data) {
              //   Toast("DELETE OK")
              // }
            }
            return {
              deleteAppBTN
            }
        },
    }
</script>

<style scoped>

</style>
