<template>
    <div class="panel-section ">
        <div class="section-description">
            <div class="section-title f3 purple">Profile</div>
            <div class="mt2 f5 lh-copy dark-gray">
                Your email address is your identity on Heroku and is used to log in.
            </div>
        </div>

        <div class="panel-content">
            <div class="profile edit-first">
                <div class="ember-view">
                    <div class="ember-view">
                            <label class="hk-label db mb2">Email Address</label>
                            <div class="flex flex-column flex-row-ns items-center-ns w-100">
                                <input class="mr2 mb2 w-100 mw6 ember-text-field hk-input--read-only ember-view" type="text" readonly :value="user.email">
                            </div>
                    </div>
                    <span class="confirmable-action ember-view"></span>
                </div>
                <div class="ember-view">
                    <div class="ember-view">
                            <label class="hk-label db mb2">Name (Optional)</label>
                            <div class="flex flex-column flex-row-ns items-center-ns w-100">
                                <input class="mr2 mb2 w-100 mw6 ember-text-field hk-input--read-only ember-view" type="text" readonly :value="user.username">
                            </div>
                    </div>
                </div>
                <div class="ember-view">
                  <div class="ember-view">
                    <label class="hk-label db mb2">Balance</label>
                    <div class="flex flex-column flex-row-ns items-center-ns w-100">
                      <input class="mr2 mb2 w-100 mw6 ember-text-field hk-input--read-only ember-view" type="text" readonly :value="balance">
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AccountSettingProfile from "./AccountSettingProfile"
export default AccountSettingProfile
</script>

<style scoped>

</style>
