import NavBar from "../components/NavBar.vue";
import NavBox from "../components/NavBox.vue";
import {toRefs,onMounted, reactive} from "vue";
import {getMessages, dealMessages} from "../services/user";

export default {
    name: "AccountNotifications",
    components: {
        'nav-bar': NavBar,
        'nav-box': NavBox,
    },
    setup() {
        const state = reactive({
            messages: [],
            isHiddenPagination: false
        })
        onMounted(async () => {
            const res = await getMessages()
            if (res.data){
                state.isHiddenPagination = true
            }
            state.messages = res.data ? dealMessages(res) : []
        })
        return {
            ...toRefs(state),
        }

    }
}
