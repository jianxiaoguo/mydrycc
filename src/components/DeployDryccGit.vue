<template>
    <li id="deploy-drycc-git" class="deploy-drycc-git list-group-item ember-view">
        <div class="panel-section ">
            <div class="section-description">
                <div class="section-title f3 purple" role="heading" aria-level="3">
                    Deploy using Drycc Git
                    <!---->    </div>

                <div class="mt2 f5 lh-copy dark-gray">
                    Use git in the command line or a Drycc cli tool to deploy this app.<br><a href="https://www.drycc.cc/applications/using-buildpacks/" class="hk-link">Learn more</a>
                </div>

                <!---->  </div>

            <div class="panel-content">
                <h4>Install the Drycc CLI</h4>
                <p>Download and install the <a href="https://www.drycc.cc/users/cli/" class="hk-link">Drycc CLI</a>.</p>

                <p>If you haven already, log in to your Drycc account.</p>

                <pre>$ drycc login drycc.production.com</pre>

                <h4>Create an Application</h4>
                <p>Use drycc create to create an application on the controller.</p>
                <pre>$ drycc create example-dockerfile-http</pre>

                <h4>Generate an SSH Key</h4>
                <p>If you do not already have an SSH key or would like to create a new key for Drycc Workflow, generate a new key using.</p>
                <pre>$ ssh-keygen -f ~/.ssh/id_drycc -t rsa</pre>

                <h4>Add SSH Key</h4>
                <p>For application deploys via git push, Drycc Workflow identifies users via SSH keys. SSH keys are pushed to the platform and must be unique to each user.</p>
                <pre>$ drycc keys:add ~/.ssh/id_drycc.pub</pre>

                <h4>Push to Deploy</h4>
                <p>Commit your code to the repository and deploy it to Drycc using Git.</p>

                <pre>$ git add .
$ git commit -am "make it better"
$ git push drycc master</pre>

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
