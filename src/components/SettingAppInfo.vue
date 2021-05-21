<template>
    <li id="ember82" class="list-group-item ember-view">
        <div class="panel-section ">
            <div class="section-description">
                <div class="section-title f3 purple" role="heading" aria-level="3">
                    App Information
                </div>
            </div>

            <div class="panel-content">
<!--                <div class="mb4">-->
<!--                    <div class="ember-view">-->
<!--                        <hk-inline-edit id="app-rename-input" class="ember-view">-->
<!--                            <form role="form">-->
<!--                                <label class="hk-label db mb2" for="ember84">App Name</label>-->
<!--                                <div class="flex flex-column flex-row-ns items-center-ns w-100">-->
<!--                                    <input autocomplete="off" id="ember84" class="mr2 mb2 w-100 mw6 ember-text-field hk-input ember-view" type="text">-->
<!--                                    <div class="flex items-center mb2 clip" data-test-target="hk-inline-buttons">-->
<!--                                        <button disabled="" class="mr1 async-button default hk-button&#45;&#45;disabled-primary ember-view" type="submit">    Save-->
<!--                                        </button>-->
<!--                                        <button class="async-button default hk-button&#45;&#45;secondary ember-view" type="cancel">    Cancel-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </form>-->
<!--                        </hk-inline-edit>-->
<!--                    </div>-->
<!--                </div>-->
                <div>
                    <div class="ember-view">
                        <div class="w-100 flex mb2 items-center">
                            <div class="w-20 hk-label mv1">App Name</div>
                            <div class="w-80 flex items-center">
                                {{ appDetail.name }}
                            </div>
                        </div>


                        <div class="w-100 flex mb2 items-center">
                            <div class="w-20 hk-label mv1">Region</div>
                            <div class="w-80 flex items-center">
                                <div id="ember88" class="mr2 inline-flex ember-view">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="14" viewBox="0 0 20 14"><defs><linearGradient id="hwwBgYb" x1="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="#F37A65"></stop><stop offset="100%" stop-color="#D64242"></stop></linearGradient><linearGradient id="hwwBgYd" x1="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="#64B5F3"></stop><stop offset="100%" stop-color="#347EE2"></stop></linearGradient><rect id="hwwBgYa" width="20" height="13" rx="2"></rect></defs><g fill="none" fill-rule="evenodd"><mask id="hwwBgYc" fill="#fff"><use xlink:href="#hwwBgYa"></use></mask><use fill="#FFF" xlink:href="#hwwBgYa"></use><path fill="url(#hwwBgYb)" d="M0 0h20v1H0V0zm0 2h20v1H0V2zm0 2h20v1H0V4zm0 2h20v1H0V6zm0 2h20v1H0V8zm0 2h20v1H0v-1zm0 2h20v1H0v-1z" mask="url(#hwwBgYc)"></path><path fill="url(#hwwBgYd)" d="M1.997 0A1.994 1.994 0 000 2.006v3.991A1 1 0 00.998 7h7.004C8.553 7 9 6.562 9 5.997V1.003A1 1 0 008.002 0H1.997z"></path><path fill="#FFF" fill-opacity=".705" d="M1 1h1v1H1V1zm2 0h1v1H3V1zm2 0h1v1H5V1zM2 3h1v1H2V3zm2 0h1v1H4V3zm2 0h1v1H6V3zm1-2h1v1H7V1zM1 5h1v1H1V5zm2 0h1v1H3V5zm2 0h1v1H5V5zm2 0h1v1H7V5z"></path><path fill="#000" fill-opacity=".2" fill-rule="nonzero" d="M2.994.75A2.247 2.247 0 00.75 3.003v6.994a2.25 2.25 0 002.244 2.253h14.012a2.247 2.247 0 002.244-2.253V3.003A2.25 2.25 0 0017.006.75H2.994zm0-.75h14.012A3 3 0 0120 3.003v6.994A2.997 2.997 0 0117.006 13H2.994A3 3 0 010 9.997V3.003A2.997 2.997 0 012.994 0z"></path></g></svg>
                                </div>
                                    United States
                            </div>
                        </div>

                        <div class="w-100 flex mb2 items-center">
                            <div class="w-20 hk-label mv1">Stack</div>
                            <div class="w-80 flex items-center">
                                {{appDetail.baseImage}}
                            </div>
                        </div>

<!--                        <div class="w-100 flex mb2 items-top">-->
<!--                            <div class="w-20 hk-label mv1">Stack</div>-->
<!--                            <div class="w-80 flex flex-column">-->
<!--                                <div class="flex items-center">-->
<!--                                    <div class="orange">heroku-18</div>-->
<!--                                    <button id="ember89" class="ml2 async-button default hk-button-sm&#45;&#45;warning ember-view" type="submit">    Upgrade Stack-->
<!--                                    </button>-->
<!--                                    <div class="flex-auto"></div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->

                        <div class="w-100 flex mb2 items-center">
                            <div class="w-20 hk-label mv1">Framework</div>
                            <div>
                                <span class="gray">No framework detected</span>
                            </div>
                        </div>

                        <div class="w-100 flex mb2 items-center">
                            <div class="w-20 hk-label mv1">Slug size</div>
                            <div>
                                <span class="gray">No slug detected</span>
                            </div>
                        </div>

                        <div class="w-100 flex mb2 items-center">
                            <div class="w-20 hk-label mv1">Drycc git URL</div>
                            <div><code>https://git.heroku.com/test-zmy.git</code></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "SettingAppInfo",
        props: {
            appDetail: [Object, Function]
        },
    }
</script>

<style scoped>

</style>
