<template>
    <div class="ember-view">
        <div class="dib w-100 flex-ns items-center pv2">
            <div class="flex dark-gray mr2">
                <div class="mr1">Collaborator activity</div>
<!--                <span class="info-tooltip-component ember-view">-->
<!--                    <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray cursor-pointer">-->
<!--                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#info-badge-16"></use>-->
<!--                    </svg>-->
<!--                </span>-->
            </div>

            <div class="flex-auto"></div>

            <a @click="goToAccess" class="flex items-center hk-link no-underline f6 mv1 mv0-ns ember-view">
                <span class="underline">Manage Access</span>
                   <svg xmlns="http://www.w3.org/2000/svg" class="ml--3 nudge-down--1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#006deb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>

            </a>
        </div>
        <div class="purple-box">
            <div class="ph3 pv1">
                <div class="collaborator f5 ember-view">
                    <div class="mv2 flex items-center" v-for="ca in activities">
                        <div class="avatar mr2">
                            <span style="width:28px; height:28px" class="gravatar-icon br-100 ember-view" >
                                <img src="https://gravatar.com/avatar/34a761145d3d370fa956d9a6524ecb62?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png">
                            </span>
                        </div>
                        <div class="user-info">{{ca.username}}</div>
                        <div class="flex-auto"></div>

                        <div class="flex items-center">
                            <svg style="height: 16px; width: 16px;" class="icon malibu-icon malibu-fill-gradient-gray nudge-up--1 mr1" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#deploy-16"></use>
                            </svg>
                            <div class="b mr1">{{ca.count}} </div>deploys
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCollaboratorActivities, dealCollaboratorActivities } from '../services/activity'
    import { useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted} from 'vue'

    export default {
        name: "OverviewCollaboratorActivity",
        props: {
            appDetail: [Object, Function]
        },
        setup(props) {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                activities: []
            })

            const goToAccess = () => {
                router.push({ path: `/apps/${props.appDetail.id}/access` })
            }

            onMounted(async () => {
                var currentCluster = localStorage.getItem('currentCluster')
                const data =  await getCollaboratorActivities(JSON.parse(currentCluster).name, params.id)

                state.activities = dealCollaboratorActivities(data)
            })


            return {
                ...toRefs(state),
                goToAccess
            }

        }
    }
</script>

<style scoped>
    a:hover {
        cursor: pointer;
    }
</style>
