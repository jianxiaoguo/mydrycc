<template>
    <li id="ember7772" class="list-group-item ember-view"><div class="panel-section ">
        <div class="section-description">
            <div class="section-title f3 purple" role="heading" aria-level="3">
                Deploy your Docker-based app
                <!---->    </div>

            <div class="mt2 f5 lh-copy dark-gray">
                Heroku Container Registry allows you to deploy your Docker-based app to Heroku. <br><a href="https://devcenter.heroku.com/articles/container-registry-and-runtime" class="hk-link">Learn more</a>
            </div>

            <!---->  </div>

        <div class="panel-content">
            <h4>Install the Heroku CLI</h4>
            <p>Download and install the <a href="https://devcenter.heroku.com/articles/heroku-command-line" class="hk-link">Heroku CLI</a>.</p>

            <p>If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.</p>

            <pre>$ heroku login</pre>

            <h4>Log in to Container Registry</h4>
            <p>You must have Docker set up locally to continue. You should see output when you run this command.</p>
            <pre>$ docker ps</pre>

            <p>Now you can sign into Container Registry.</p>
            <pre>$ heroku container:login</pre>

            <h4>Push your Docker-based app</h4>
            <p>Build the Dockerfile in the current directory and push the Docker image.</p>
            <pre>$ heroku container:push web</pre>

            <h4>Deploy the changes</h4>
            <p>Release the newly pushed images to deploy your app.</p>
            <pre>$ heroku container:release web</pre>

        </div>
    </div>
    </li>
</template>

<script>
    export default {
        name: "DeployDryccImage"
    }
</script>

<style scoped>

</style>
