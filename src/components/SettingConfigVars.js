import { useRouter } from 'vue-router'
import { reactive, toRefs, onMounted } from 'vue'
import { getAppConfig, dealAppConfig, postAppConfigs } from "../services/config";
import {Toast} from "vant";

export default {
    name: "SettingConfigVars",
    props: {
        appDetail: [Object, Function]
    },
    setup(props) {
        const router = useRouter()
        const params = router.currentRoute.value.params
        const state = reactive({
            showConfigVars: false,
            dealtConfigs: [],
            isCommit: false,
            configVar: null,
            newKey: null,
            newValue: null,
        })

        const showDetail = () => {
            var currentCluster = localStorage.getItem('currentCluster')
            getAppConfig(JSON.parse(currentCluster).name, params.id).then(res=>{
                if (res.status == 200) {
                    state.dealtConfigs = dealAppConfig(res)
                    state.showConfigVars = true
                }
            })
        }

        const couldEdit = (config) => {
            config.isReadOnly = false
            state.isCommit = true
        }

        const deleteConfig = (index) => {
            state.dealtConfigs.splice(index,1)
            state.isCommit = true
        }

        const addConfig = () => {
            var hasKey = false
            state.dealtConfigs.forEach(item=> {
                if (item.name == state.newKey) {
                    hasKey = true
                }
            })
            if (!hasKey){
                state.dealtConfigs.push({
                    'name': state.newKey,
                    'value': state.newValue,
                    'isReadOnly': true
                })
            } else {
                Toast.fail("This key already exists.")
            }
            state.newKey = null
            state.newValue = null
            state.isCommit = true
        }

        const closeDetail = () => {
            state.showConfigVars = false
        }

        const updateCondigs = () => {
            var newConfigs = {}
            state.dealtConfigs.forEach(item=> {
                newConfigs[item.name] = item.value
            })
            var currentCluster = localStorage.getItem('currentCluster')
            postAppConfigs(JSON.parse(currentCluster).name, params.id, newConfigs).then(res=>{
                if (res.status == 200) {
                    Toast.success("OK")
                } else if (res.status == 409){
                    Toast.fail(res.data)
                }
            })
        }

        onMounted(async () => {
        })

        return {
            ...toRefs(state),
            showDetail,
            closeDetail,
            updateCondigs,
            couldEdit,
            deleteConfig,
            addConfig
        }
    }
}
