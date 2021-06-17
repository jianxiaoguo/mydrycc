<template>
    <li id="ember7772" class="list-group-item ember-view"><div class="panel-section ">
        <div class="section-description">
            <div class="section-title f3 purple" role="heading" aria-level="3">
                Deploy your Docker-based app
                <!---->    </div>

            <div class="mt2 f5 lh-copy dark-gray">
                Drycc Container Registry allows you to deploy your Docker-based app to Drycc. <br><a href="https://www.drycc.cc/applications/using-docker-images/" class="hk-link">Learn more</a>
            </div>

            <!---->  </div>

        <div class="panel-content">
            <h4>Install the Drycc CLI</h4>
            <p>Download and install the <a href="https://www.drycc.cc/users/cli/" class="hk-link">Drycc CLI</a>.</p>

            <p>If you haven't already, log in to your drycc account and follow the prompts to create a new SSH public key.</p>

            <pre>$ drycc login drycc.production.com</pre>

            <h4>Create an Application</h4>
            <p>Use drycc create to create an application on the controller..</p>
            <pre>$ drycc create example-dockerfile-http --no-remote</pre>

            <h4>Deploy the Application</h4>
            <p>Use drycc pull to deploy your application from DockerHub or a public registry.</p>
            <pre>$ drycc pull [image] -a example-dockerfile-http</pre>

        </div>
    </div>
    </li>
</template>

<script>
import DeployDryccImage from "./DeployDryccImage"
export default DeployDryccImage
</script>

<style scoped>

</style>
