import { reactive, toRefs } from 'vue'
import { deleteAppDomains } from "../services/domain";
import { useRouter } from "vue-router";
import { Toast } from "vant";

export default {
    name: "SettingDomainDelete",
    props: {
        domain: [Object, Function],
        appDetail: [Object, Function],
        editAccess: [Object, Function]
    },
    setup(props, context) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            domain: props.domain,
        })
        var currentCluster = localStorage.getItem('currentCluster')

        const canelDelete = () => {
            context.emit('closeDelete', { hasDomainDeleted: false })
        }
        const deleteAppDomain = () => {
            deleteAppDomains(JSON.parse(currentCluster).name, params.id, state.domain.domain).then(res=>{
                if (res.status == 204) {
                    Toast.success("OK")
                    context.emit('closeDelete', { hasDomainDeleted: true })
                }
            })
        }
        return {
            ...toRefs(state),
            canelDelete,
            deleteAppDomain
        }
    }
}
