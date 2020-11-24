<template>
    <div class="page-wrap gradient-primary">
        <div class="container">
            <h1 class="logo"><a href="https://www.heroku.com" title="Heroku">Heroku</a></h1>
            <div class="content">
                <div class="panel" id="login">
                    <h2 class="h3">{{ t('logInToYourAccount') }}</h2>
                    <form action="/login" method="post" role="form">
                        <div class="form-group">
                            <label for="email">{{ t('username') }}</label>
                            <div class="input-icon icon-username"></div>
                            <input autofocus="true" class="form-control" id="email" name="email" :placeholder="usernamePlaceholder" type="email" />
                        </div>
                        <div class="form-group">
                            <label for="password">{{ t('password') }}</label>
                            <div class="input-icon icon-password"></div>
                            <input autocomplete="off" class="form-control password" id="password" name="password" :placeholder="passwordPlaceholder" type="password" />
                        </div>
                        <button class="btn btn-primary btn-lg btn-block" name="commit" type="submit" value="Log In">{{ t('login') }}</button>
                    </form>
                    <span class="panel-footer">{{t('newToDrycc')}}</span>
                </div>
<!--                <a href="/account/password/reset" style="margin-left: 25px">Forgot your password?</a>-->
            </div>
        </div>
    </div>
</template>

<script>
    import { useI18n } from 'vue-i18n'

    export default {
        name: "Login",
        setup () {
            const { t } = useI18n()
            const usernamePlaceholder = t('username')
            const passwordPlaceholder = t('password')
            return { t, usernamePlaceholder, passwordPlaceholder }
        },
    }
</script>

<style scoped>
    @import "../assets/8/purple.css";
    .gradient-primary {
        height: 100vh;
    }
</style>
