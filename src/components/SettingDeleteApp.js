import { useRouter } from "vue-router";
import { deleteApp } from "../services/app";
// import { Toast } from 'vant'

export default {
    name: "SettingDeleteApp",
    setup() {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const deleteAppBTN = () => {
            var currentCluster = localStorage.getItem('currentCluster')
            const data = deleteApp(JSON.parse(currentCluster).name, params.id)
            // if (data) {
            //   Toast("DELETE OK")
            // }
        }
        return {
            deleteAppBTN
        }
    },
}
