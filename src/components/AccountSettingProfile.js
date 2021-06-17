import {onMounted, reactive, toRefs} from "vue";
import { getUser, dealUser } from '../services/user'
import {getAccountFundingList,dealAccountFundingList} from '../services/funding'

export default {
    name: "AccountSettingProfile",
    setup() {
        const state = reactive({
            user :{
                username: null,
                email: null
            },
            balance: null,
        })

        onMounted(async () => {
            let res = await getUser()
            state.user = dealUser(res)
            res = await getAccountFundingList(null, null, 'limit=1')
            state.balance = res.data ?  dealAccountFundingList(res)[0].balance : 0
        })
        return {
            ...toRefs(state),
        }
    }
}
