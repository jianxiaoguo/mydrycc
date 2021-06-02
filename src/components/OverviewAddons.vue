<template>
    <div class="add-ons ember-view">
        <div class="flex-ns items-center pv2">
            <div class="flex dark-gray mr2">
                <div class="mr1">Installed add-ons</div>
                <span class="hk-badge tooltip-component ember-view">￥0.00/month</span>
            </div>
            <div class="flex-auto"></div>

            <a @click="goToResources" class="flex items-center hk-link no-underline f6 mv1 mv0-ns ember-view">
                <span class="underline">Configure Add-ons</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ml--3 nudge-down--1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#006deb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>

            </a>
        </div>

        <ul class="addons-grid list pl0 flex mb5 bg-lightest-silver shadow-outer-1 br1 overflow-hidden" v-if="addons.length > 0">
            <li class="addon ph3 pv2 flex b--silver bg-white" v-for="addon in addons">
                <a href="" class="mt1" target="_blank" rel="noopener noreferrer">
                    <div class="relative">
                        <img width="32" height="32" src="https://addons.heroku.com/addons/heroku-postgresql/icons/catalog.png" class="addon-icon ember-view">
                    </div>
                </a>
                <p class="ma0 pl2 pv--2">
                    <div class="ember-view">
                        <a target="_blank" rel="noopener noreferrer" class="hk-link purple no-underline ">
                            {{addon.kind}}
                            <svg style="height: 16px; width: 16px;" class="icon malibu-icon malibu-fill-gradient-purple nudge-left--2 nudge-up--1" >
<!--                                <title id="malibu-icon-ember410">(opens in a new tab)</title>-->
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#open-16"></use>
                            </svg>

                        </a>
                        <span class="f5 gray nudge-up-1">
                            {{addon.plan}}
                        </span>
                    </div>
                    <span class="f5 gray db">
                        <div class="dark-gray mb--1  pt--1">{{addon.name}}</div>
                    </span>
                </p>
            </li>
        </ul>


        <div class="mb5 ember-view" v-if="addons.length === 0">
            <div class="hk-well ember-view">
                <div class="f3 dark-gray lh-title mv1 ember-view">
                    There are no add-ons for this app
                </div>
                <div class="f5 gray lh-copy ember-view">
                    You can add add-ons to this app and they will show here.
                    <a href="https://www.drycc.cc/applications/managing-app-resources" class="hk-link" target="_blank">Learn more</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted} from 'vue'
    import { getAppAddons, dealAppAddons } from "../services/addons";

    export default {
        name: "OverviewAddons",
        props: {
            appDetail: [Object, Function]
        },
        setup(props) {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                addons: []
            })

            const goToResources = () => {
                router.push({ path: `/apps/${props.appDetail.id}/resources` })
            }

            onMounted(async () => {
                var currentCluster = localStorage.getItem('currentCluster')
                const res =  await getAppAddons(JSON.parse(currentCluster).name, params.id)

                state.addons = dealAppAddons(res)
            })

            return {
                ...toRefs(state),
                goToResources
            }

        }
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
</style>
