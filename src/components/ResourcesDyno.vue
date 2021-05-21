<template>
    <div class="ember-view">

        <div class="formation-section limit-width" v-if="processes.length<1">
            <div class="group-header u-padding-Bxxs"><h5> Dynos </h5></div>
            <div class="ember-view">
                <div class="mb5 hk-well ember-view">
                    <div class="f3 dark-gray lh-title mv1 ember-view"> This app has no process types yet </div>
                    <div class="f5 gray lh-copy ember-view">
                        Add a Procfile to your app in order to define its process types.
                        <a href="https://devcenter.heroku.com/articles/procfile" class="hk-link" target="_blank">Learn more</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="formation-section limit-width" v-if="processes.length>0">
            <div class="group-header u-padding-Bxxs">
                <h5>
                    <span class="dyno-tier-name">Hobby dynos</span>
                    <a class="btn btn-default btn-xs" href="#">
                        Change Dyno Type
                    </a>
                </h5>
            </div>
            <div class="purple-box formations-list" v-for="pro in processes">
                <ul class="list-group formation-list">
                    <li class="list-group-item formations-list-item use-toggle ember-view">
                        <div class="process">
                            <div class="process-details">
                                <span class="name u-margin-Rs">{{pro.name}}</span>
                                <code class="command" title="/bin/sh -c /bin/boot">
                                    {{pro.cmd}}
                                </code>
                            </div>
                            <div class="flex items-center">
                                <div class="u-margin-Rs toggle-switch ember-view" :class="{disabled: pro.disabled}">
                                    <input id="checker-ember953" :disabled="pro.disabled" class="cmn-toggle cmn-toggle-round-flat ember-checkbox ember-view" :checked="pro.status" @click="editProcessStatus(pro)" type="checkbox">
                                    <label for="checker-ember953"></label>
                                </div>
                                <div class="u-margin-Ls actions ember-view">
                                    <button v-if="pro.disabled" @click="editProcess(pro)" style="width: 38px; height: 24px" class="bg-transparent hk-focus-ring--blue:focus cursor-hand br1 ba0 b--none pa--1 btn btn-default btn-xs actions__edit flex items-center justify-center" title="Edit  dyno formation" type="button" data-ember-action="" data-ember-action-956="956">
                                        <span class="clip">Edit  dyno formation</span>
                                        <svg style="height: 16px; width: 16px;" class="icon malibu-icon nudge-down--1 malibu-fill-gradient-purple" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8316" width="16" height="16"><path d="M862.72 306.346667l60.16-60.16c20.053333-20.053333 20.053333-52.48 0-72.533334l-72.533333-72.533333c-20.053333-20.053333-52.48-20.053333-72.533334 0l-60.16 60.16 145.066667 145.066667zM669.44 209.493333L158.293333 720.64l-72.106666 217.173333 217.173333-72.106666L814.506667 354.56z" fill="#79589F" ></path></svg>
                                    </button>
                                    <button @click="confirmEditProcess(pro)" v-if="!pro.disabled" class="actions__confirm btn btn-primary btn-xs async-button default ember-view" type="submit">Confirm</button>
                                    <a @click="closeEditProcess(pro)" v-if="!pro.disabled"  href="#" class="btn btn-default btn-xs u-margin-Ls">Cancel</a>

                                </div>
                                <div class="usage">
                                    <span>$7.00</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted} from 'vue'
    import { getAppAddons, dealAppAddons } from "../services/addons";
    import { getAppProcesses, dealAppProcesses } from "../services/process";

    export default {
        name: "ResourcesDyno",
        props: {
            appDetail: [Object, Function]
        },
        setup(props) {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                addons: [],
                processes: []
            })

            const goToResources = () => {
                router.push({ path: `/apps/${props.appDetail.id}/resources` })
            }

            const editProcess = (pro) => {
                pro.disabled = false
            }

            const closeEditProcess = (pro) => {
                pro.disabled = true
            }

            const editProcessStatus = (pro) => {
                if (!pro.disabled) {
                    if (pro.status === 0) {
                        pro.status = 1
                    } else {
                        pro.status = 0
                    }
                }
                console.log(pro.status)

            }

            const confirmEditProcess = (pro) => {
                pro.disabled = true
            }

            onMounted(async () => {
                var currentCluster = localStorage.getItem('currentCluster')
                const data =  await getAppAddons(JSON.parse(currentCluster).name, params.id)

                state.addons = dealAppAddons(data)
                const processData =  await getAppProcesses("drycc-a", "py3django3")
                state.processes = dealAppProcesses(processData)
                console.log(state.processes)
            })

            return {
                ...toRefs(state),
                goToResources,
                editProcess,
                closeEditProcess,
                confirmEditProcess,
                editProcessStatus
            }

        }
    }
</script>

<style scoped>

</style>
