import { reactive, toRefs } from 'vue'
import { addAppAccesses, deleteAppAccesses } from "../services/access";
import { useRouter } from "vue-router";
import { Toast } from "vant";

export default {
    name: "AccessCollaboratorEdit",
    props: {
        appDetail: [Object, Function],
        editAccess: [Object, Function]
    },
    setup(props, context) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            username: null,
            // newUser: null
        })
        var currentCluster = localStorage.getItem('currentCluster')

        if (props.editAccess) {
            state.username = props.editAccess.username
        }

        const canelEdit = () => {
            context.emit('closeEdit')
        }
        const addPerm = () => {
            addAppAccesses(JSON.parse(currentCluster).name, params.id, state.username).then(res=>{
                if (res.status == 201) {
                    Toast.success("OK")
                    context.emit('closeEdit')
                }
            })
        }
        const deletePerm = () => {
            deleteAppAccesses(JSON.parse(currentCluster).name, params.id, state.username).then(res=>{
                if (res.status == 204) {
                    Toast.success("OK")
                    context.emit('closeEdit')
                }
            })
        }
        return {
            ...toRefs(state),
            canelEdit,
            addPerm,
            deletePerm
        }
    }
}
