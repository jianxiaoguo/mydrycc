import { reactive, toRefs, onMounted , computed} from 'vue'

export default {
    name: "MonthPicker",
    props: {
        cYear: Number,
        cMonth: Number,
        sYear: Number,
        sMonth: Number,
        changeMonth: Function
    },
    setup(props, context) {
        const state = reactive({
            showPicker: false,
            cy: props.cYear,
            cm: props.cMonth,
            sy: props.sYear,
            sm: props.sMonth,
            y: props.sYear,
            m: props.sMonth,
            enabledList: [0,0,0,0,0,0,0,0,0,0,0,0]
        })

        const isSelected = (y, m) => {
            return y === state.cy && m === state.cm;

        }

        const isEnabled = (y, m) => {
            if (y > state.cy) {
                return false
            } else if (y === state.cy){
                return m <= state.cm
            } else {
                if (state.cy-y === 1) {
                    return true
                } else if (state.cy-y === 2) {
                    return m > state.cm
                } else {
                    return false
                }
            }
        }

        const updateEnabledList = () => {

            for (let index in state.enabledList) {
                index = parseInt(index)

                if (state.y === state.sy && index+1 === state.sm) {
                    state.enabledList[index] = 2
                } else if (isEnabled(state.y, index + 1)) {
                    state.enabledList[index] = 1
                } else {
                    state.enabledList[index] = 0
                }

            }

        }

        updateEnabledList()


        const addY = () => {
            state.y = state.y + 1
            updateEnabledList()

        }

        const reduceY = () => {
            state.y = state.y - 1
            updateEnabledList()

        }

        const openPicker = () => {
            state.showPicker = true
        }

        const changeMonth = (m) => {
            if (!isEnabled(state.y, m)) {
                return
            }
            state.sy = state.y
            state.sm = m
            state.showPicker = false
            updateEnabledList()
            context.emit('changeMonth', state.sy, state.sm)
        }

        onMounted(async () => {
            let _this = this
            document.addEventListener('click', function (e) {
                const d = document.getElementById('month-picker')
                // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
                // if (!d.contains(e.target)) {
                //     state.showPicker = false
                // }

            })
        })

        return {
            ...toRefs(state),
            openPicker,
            isSelected,
            addY,
            reduceY,
            isEnabled,
            changeMonth
        }

    }

}
