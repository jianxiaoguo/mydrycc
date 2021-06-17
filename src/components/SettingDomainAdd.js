import { reactive, toRefs } from 'vue'
import { addAppDomains, deleteAppDomains } from "../services/domain";
import { useRouter } from "vue-router";
import { Toast } from "vant";

export default {
    name: "SettingDomainAdd",
    props: {
        appDetail: [Object, Function],
        editAccess: [Object, Function]
    },
    setup(props, context) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            domain: null,
        })
        var currentCluster = localStorage.getItem('currentCluster')

        // if (props.editAccess) {
        //     state.username = props.editAccess.username
        // }

        const canelEdit = () => {
            context.emit('closeEdit')
        }
        const addAppDomain = () => {
            addAppDomains(JSON.parse(currentCluster).name, params.id, state.domain).then(res=>{
                if (res.status == 201) {
                    Toast("OK")
                }
            })
        }
        const deleteAppDomain = () => {
            deleteAppDomains(JSON.parse(currentCluster).name, params.id, state.domain).then(res=>{
                if (res.status == 204) {
                    Toast("OK")
                }
            })
        }
        return {
            ...toRefs(state),
            canelEdit,
            addAppDomain,
            deleteAppDomain
        }
    }
}
