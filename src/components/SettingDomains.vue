<template>
    <li id="ember103" class="list-group-item ember-view"><div class="panel-section ">
        <div class="section-description">
            <div class="section-title f3 purple" role="heading" aria-level="3">
                Domains
                <!---->    </div>

            <div class="mt2 f5 lh-copy dark-gray">
                You can add custom domains to any Heroku app, then visit <a href="https://devcenter.heroku.com/articles/custom-domains" class="hk-link" target="blank">Configuring DNS</a> to setup your DNS target.
            </div>

            <!---->  </div>

        <div class="panel-content">
            <div id="ember104" class="domains-list ember-view">
                <div class="flex items-center pv2 br--top br1 bb b--silver mb1">
                    <div class="flex-auto gray">
                        Your app can be found at <a href="https://test-zmy.herokuapp.com/" target="_blank" class="hk-link">https://test-zmy.herokuapp.com/</a>
                        <!---->
                    </div>

                    <button id="ember127" class="async-button nowrap default async-button default hk-button--primary ember-view" type="submit">    Add domain
                    </button>
                </div>

                <div class="flex justify-between pv2 mb2">
                    <div class="w-30 relative">
                        <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember128" class="icon malibu-icon fill-gray absolute z-2 ml2 mt1 nudge-down--3" data-test-icon-name="search-16" data-test-target="malibu-icon" aria-hidden="true" role="img">
                            <!---->  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-16"></use>
                        </svg>

                        <input id="domains-list-filter" placeholder="Filter domains" aria-label="Filter domains" class="hk-search-input focus-z-1 w-100" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" required="false">
                    </div>
                    <!----><!---->      <div class="flex-auto"></div>
                    <div>
                        <!---->      </div>
                </div>

                <!---->
                <div id="ember129" class="hk-well ember-view">  <div id="ember130" class="f3 dark-gray lh-title mv1 ember-view">        Custom domains will appear here

                </div><div id="ember131" class="f5 gray lh-copy ember-view">        Custom domains allow you to access your app via one or more non-Heroku domain names (for example, <code>www.yourcustomdomain.com</code>)

                </div>
                </div>
                <div id="ember132" class="bg-white pv3 justify-center flex flex ember-view"><!---->
                </div>


                <!---->
                <!----></div>

        </div>
    </div>
    </li>
</template>

<script>
    export default {
        name: "SettingDomains"
    }
</script>

<style scoped>

</style>
