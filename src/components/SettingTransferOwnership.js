import {useRouter} from "vue-router";
import {reactive, toRefs} from "vue";
import {updateApp} from "../services/app";
import {Toast} from "vant";

export default {
    name: "SettingTransferOwnership",
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            username: null
        })
        const transferOwnership = () => {
            var currentCluster = localStorage.getItem('currentCluster')
            updateApp(JSON.parse(currentCluster).name, params.id, state.username).then(res => {
                if (res.status == 200) {
                    Toast("OK")
                } else {
                    Toast(res.data)
                }
            })
        }
        return {
            ...toRefs(state),
            transferOwnership,
        }
    },
}
