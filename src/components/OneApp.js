import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onMounted , computed} from 'vue'

export default {
    name: "OneApp",
    props: {
        id: String,
        name: String,
        // lang: String,
        // baseImage: String
    },
    setup() {
        const router = useRouter()
        const state = reactive({
            apps: [],
        })

        const goToAppDetail = (id) => {
            router.push({ path: `/apps/${id}` })
        }

        const goToAppSetting = (id) => {
            router.push({ path: `/apps/${id}/setting` })
        }

        return {
            goToAppDetail,
            goToAppSetting
        }
    },
}
