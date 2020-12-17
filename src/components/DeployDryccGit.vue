<template>
    <li id="deploy-heroku-git" class="deploy-heroku-git list-group-item ember-view">
        <div class="panel-section ">
            <div class="section-description">
                <div class="section-title f3 purple" role="heading" aria-level="3">
                    Deploy using Heroku Git
                    <!---->    </div>

                <div class="mt2 f5 lh-copy dark-gray">
                    Use git in the command line or a GUI tool to deploy this app.
                </div>

                <!---->  </div>

            <div class="panel-content">
                <h4>Install the Heroku CLI</h4>
                <p>Download and install the <a href="https://devcenter.heroku.com/articles/heroku-command-line" class="hk-link">Heroku CLI</a>.</p>

                <p>If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.</p>

                <pre>$ heroku login</pre>

                <h4>Create a new Git repository</h4>
                <p>Initialize a git repository in a new or existing directory</p>

                <pre>$ cd my-project/
$ git init
$ heroku git:remote -a drycc-charts</pre>

                <h4>Deploy your application</h4>
                <p>Commit your code to the repository and deploy it to Heroku using Git.</p>

                <pre>$ git add .
$ git commit -am "make it better"
$ git push heroku master</pre>

                <div id="ember7725" class="mt3 hk-message hk-message--info ember-view" role="alert"><!-- hk-messages are for hard coded copy only and uses {{{three brackets}}} so that we can include links in the title and or message -->

                    <!----><div class="flex items-center">
                        <div class="mr2">
                            <svg style="height: 28px; width: 28px;" id="malibu-icon-svg-ember7726" class="icon malibu-icon " data-test-icon-name="git-branch-28" aria-labelledby="malibu-icon-ember7726" data-test-target="malibu-icon" aria-hidden="false" role="img">
                                <title id="malibu-icon-ember7726">info</title>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#git-branch-28"></use>
                            </svg>

                        </div>
                        <div class="flex-auto flex flex-column tl">
                            <div class="flex-auto"></div>
                            <!---->      <div class="lh-copy">You can now change your main deploy branch from "master" to "main" for both manual and automatic deploys, please follow the instructions <a href="https://help.heroku.com/O0EXQZTA/how-do-i-switch-branches-from-master-to-main" class="hk-link" target="_blank" rel="noopener noreferrer">here</a>.</div>
                            <div class="flex-auto"></div>
                        </div>
                        <!----><!----></div>
                </div>

                <hr>
                <h4>Existing Git repository</h4>
                <p>For existing repositories, simply add the <code>heroku</code> remote</p>
                <pre>$ heroku git:remote -a drycc-charts</pre>

            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "DeployDryccGit"
    }
</script>

<style scoped>

</style>
