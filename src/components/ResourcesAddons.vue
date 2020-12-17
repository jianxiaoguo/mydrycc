<template>
    <div id="ember469" class="addons-list limit-width ember-view">
        <div class="group-header u-padding-Txs u-padding-Bxxs">
            <h5>Add-ons</h5>
            <div class="get-more-addons">
                <a class="hk-button-sm--primary" href="https://elements.heroku.com/addons" target="_blank">Find more add-ons</a>
            </div>
        </div>
        <div class="addons-quick-add typeahead-component u-margin-Tn u-margin-Bs">
            <div class="ember-view">
                <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember471" class="icon malibu-icon fill-gray absolute ml2 mt1 nudge-down--3" data-test-icon-name="search-16" data-test-target="malibu-icon" aria-hidden="true" role="img">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-16"></use>
                </svg>
                <input autocomplete="off" spellcheck="false" placeholder="Quickly add add-ons from Elements" autocapitalize="false" id="addons-filter" class="hk-search-input w-100 filter tt-input ember-text-field ember-view" type="text">
            </div>
        </div>

        <div class="mv3 ember-view" v-if="addons.length<1">
            <div class="hk-well ember-view">
                <div class="f3 dark-gray lh-title mv1 ember-view"> There are no add-ons for this app </div>
                <div class="f5 gray lh-copy ember-view"> You can add add-ons to this app and they will show here.
                    <a href="https://devcenter.heroku.com/articles/managing-add-ons" class="hk-link" target="_blank">Learn more</a>
                </div>
            </div>
        </div>

        <div class="mb2 bg-white br1 shadow-outer-1 hk-hide-bb-last-row addons-table-container" role="list" v-if="addons.length>0">
            <div class="bb b--silver ph2 pv1 flex items-center " role="listitem" v-for="addon in addons">
                <div class="pa1">
                    <img role="presentation" width="28" height="28" src="https://addons.heroku.com/addons/heroku-postgresql/icons/catalog.png" id="ember532" class="dib br1 mr1 flex-shrink-0 self-start addon-icon ember-view">
                </div>

                <div class="mr4 flex dark-gray w-100 w-25-ns">
                    <div class="truncate">
                        <div class="ember-view">
                            <a href="https://addons-sso.heroku.com/apps/e3c96ed5-6500-4f3b-a872-c10b66ab998c/addons/497cc771-b481-4744-8612-f71585d23d6f" target="_blank" rel="noopener noreferrer" class="hk-link purple no-underline link dib pv1 hk-focus-ring hk-no-link-style b">
                                {{addon.kind}}
<!--                                <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember536" class="icon malibu-icon malibu-fill-gradient-purple nudge-left&#45;&#45;2 nudge-up&#45;&#45;1" data-test-icon-name="open-16" aria-labelledby="malibu-icon-ember536" data-test-target="malibu-icon" aria-hidden="false" role="img">-->
<!--                                    <title id="malibu-icon-ember536">(opens in a new tab)</title>-->
<!--                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#open-16"></use>-->
<!--                                </svg>-->
                            </a>
                        </div>
                    </div>
                </div>
                <div class="nudge-up--1 ml3 dn dib-ns flex-auto">
                    <div class="ember-view">
                        <ul class="f6 pa0 ma0 attachments-dropdown">
                            <div class="btn-group ember-view">
<!--                                <button class="drop-down__toggle link fw4 purple bn pa1 nudge-down&#45;&#45;1 bg-transparent nowrap f5 attachments-dropdown-button flex pr1" aria-expanded="false" type="button" data-ember-action="" data-ember-action-540="540">-->
<!--                                    <span>Attached as <span class="monospace">DATABASE</span></span>-->
<!--                                    <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember541" class="icon malibu-icon  fill-purple" data-test-icon-name="caret-16" data-test-target="malibu-icon" aria-hidden="true" role="img">-->
<!--                                        &lt;!&ndash;&ndash;&gt;  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#caret-16"></use>-->
<!--                                    </svg>-->
<!--                                </button>-->
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="dark-gray f5 dn dib-ns mr2 truncate"></div>
                <div class="dark-gray f5 dn dib-ns mr2 truncate"><span>{{addon.plan}}</span></div>
                <div class="dark-gray f5 dn dib-ns mr2 truncate w5 tr"><span>Free</span></div>
<!--                <div class="tc">-->
<!--                    <div class="btn-group ember-view">-->
<!--                        <button class="drop-down__toggle addon-edit-btn hk-button-sm&#45;&#45;secondary ph2 ml1 pr1" type="button" >-->
<!--                            <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember559" class="icon malibu-icon  fill-purple" data-test-icon-name="caret-16" data-test-target="malibu-icon" aria-hidden="true" role="img">-->
<!--                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#caret-16"></use>-->
<!--                            </svg>-->
<!--                        </button>-->
<!--                    </div>-->
<!--                </div>-->
            </div>

        </div>
    </div>
</template>

<script>

    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted} from 'vue'
    import { getAppAddons} from "../services/addons";

    export default {
        name: "ResourcesAddons",
        props: {
            appDetail: [Object, Function]
        },
        setup(props) {
            const router = useRouter()

            const state = reactive({
                addons: []
            })

            const goToResources = () => {
                router.push({ path: `/apps/${props.appDetail.id}/resources` })
            }

            onMounted(async () => {
                const data =  await getAppAddons()

                state.addons = data.map(item => {
                    return {
                        'name': item.name,
                        'plan': item.plan,
                        'kind': item.kind
                    }
                })
            })

            return {
                ...toRefs(state),
                goToResources
            }

        }
    }
</script>

<style scoped>

</style>
