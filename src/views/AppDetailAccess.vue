<template>
    <nav-bar />
    <access-collaborator-edit v-if="isShowEdit"
                        :editAccess="editAccess"
                        :appDetail="appDetail"
                        @closeEdit="closeEdit"
    />
    <div class="main-panel bg-lightest-silver relative">
        <nav-box>
            <template v-slot:nav-cluster>
                <cluster-select-v2 :app-detail="appDetail"/>
            </template>
            <template v-slot:create-new-app>
                <nav-box-app-detail-menu />
            </template>
        </nav-box>
        <div class="main-content">
            <main-nav :is-access-active="true" :app-detail="appDetail"/>
            <div class="collaborator-list limit-width ember-view">
                <table class="w-100 mb5">
                    <tr class="w-100 f5">
                        <th class="pl1 pr1 pv2 bb b--light-gray b" colspan="2">
                            Collaborators
                        </th>
<!--                        <th class="pv2 pr1 bb b&#45;&#45;light-gray b">-->
<!--                            Role-->
<!--                        </th>-->
                        <th class="pv2 bb b--light-gray b tr" style="width:138px;">
                            <button class="hk-button--secondary" @click="showEdit(null)">Add collaborator</button>
                        </th>
                    </tr>
                    <template v-for="access in accesses">
                        <tr class="collaborator-item ember-view">
<!--                            <td class="bb b&#45;&#45;light-silver pa2 dtc w&#45;&#45;28">-->
<!--                                <span style="width: 28px; height: 28px" class="gravatar-icon br-100 ember-view">-->
<!--                                    <img src="https://gravatar.com/avatar/02a485fa5edb11e2b5ca38e18622eacd?s=96&amp;d=https://dashboard.heroku.com%2Fimages%2Fstatic%2Fninja-avatar-48x48.png" alt="hanlucen@zhumengyuan.com">-->
<!--                                </span>-->
<!--                            </td>-->
                            <td class="w-40 bb b--light-silver pv2 pr1">{{access.username}}</td>
<!--                            <td class="bb b&#45;&#45;light-silver pv2 pr1">{{access.role}}</td>-->

                            <td class="bb b--light-silver tc ph2">
                                <button @click="showEdit(access)" v-if="access.role!=='owner'" class="bg-transparent hk-focus-ring--blue:focus cursor-hand br1 ba0 b--none pa--1 mr3" title="Edit" type="button">
                                    <span class="clip">Edit</span>
                                    <svg style="height: 20px; width: 20px;" class="icon malibu-icon malibu-fill-gradient-purple" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8316" width="16" height="16"><path d="M862.72 306.346667l60.16-60.16c20.053333-20.053333 20.053333-52.48 0-72.533334l-72.533333-72.533333c-20.053333-20.053333-52.48-20.053333-72.533334 0l-60.16 60.16 145.066667 145.066667zM669.44 209.493333L158.293333 720.64l-72.106666 217.173333 217.173333-72.106666L814.506667 354.56z" fill="#79589F" ></path></svg>

                                </button>
                            </td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, toRefs, onMounted , computed} from 'vue'
    import NavBar from "../components/NavBar.vue";
    import NavBox from "../components/NavBox.vue";
    import ClusterSelect from "../components/ClusterSelectAppDetail.vue";
    import NavBoxAppDetailMenu from "../components/NavBoxAppDetailMenu.vue"
    import MainNav from "../components/MainNav.vue";
    import AccessCollaboratorEdit from "../components/AccessCollaboratorEdit.vue";
    import { getAppDetail, dealAppDetail } from "../services/app";
    import { getAppAccesses, dealAppAccesses } from "../services/access"

    export default {
        name: "AppDetailAccess",
        components: {
            'nav-bar': NavBar,
            'nav-box': NavBox,
            'cluster-select-v2': ClusterSelect,
            'nav-box-app-detail-menu': NavBoxAppDetailMenu,
            'main-nav': MainNav,
            'access-collaborator-edit': AccessCollaboratorEdit
        },
        setup() {
            const router = useRouter()
            const params = router.currentRoute.value.params
            const state = reactive({
                appDetail: Object,
                accesses: [],
                isShowEdit: false,
                editAccess: null
            })

            const showEdit = (access) => {
                if (access) {
                    state.editAccess = access
                }
                state.isShowEdit = true
            }

            const closeEdit = () => {
                state.editAccess = null
                state.isShowEdit = false
            }

            onMounted(async () => {
                console.log("getAppDetail params")
                console.log(params)
                console.log(params.id)
                var currentCluster = localStorage.getItem('currentCluster')
                const data = await getAppDetail(JSON.parse(currentCluster).name, params.id)
                state.appDetail = data.data ? dealAppDetail(data) : null
                const accessData = await getAppAccesses(JSON.parse(currentCluster).name, params.id)
                state.accesses = accessData ? dealAppAccesses(accessData) : null
            })

            return {
                ...toRefs(state),
                showEdit,
                closeEdit
            }
        },
    }
</script>

<style scoped>

</style>
