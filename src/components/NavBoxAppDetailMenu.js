import { reactive, toRefs} from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: "NavBoxAppDetailMenu",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const state = reactive({
            isMenuActived: false,
        })

        const openOrCloseMenu = () => {
            state.isMenuActived = !state.isMenuActived
        }
        const goToLogs = () => {
            router.push({ path: `/apps/${props.appDetail.id}/logs` })
        }
        return {
            ...toRefs(state),
            openOrCloseMenu,
            goToLogs
        }
    },

    mounted() {
        let _this = this
        document.addEventListener('click', function (e) {
            // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
            if (e.target.id !== 'nav-box-app-detail-menu') {
                _this.isMenuActived = false
            }

        })
    }
}
