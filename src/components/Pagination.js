import { reactive, toRefs, watch} from 'vue'

export default {
    name: "Pagination",
    props: {
        cPage: Number,
        tPage: Number,
        hasNext: Boolean,
        updatePage: Function
    },
    setup(props, context) {
        const state = reactive({
            pageList: []
        })

        const updatePageList = () => {
            state.pageList = Array.from({length:props.tPage}, (v,k) => k+1)

            let index = state.pageList.indexOf(props.cPage, 0)
            state.pageList =  state.pageList.slice(
                Math.max(0, Math.min(props.tPage, index + 2)-(props.hasNext?5:6)),
                Math.min(props.tPage, index + 2)
            )
        }

        updatePageList()

        watch(
            () => [props.cPage, props.tPage, props.hasNext],
            ([nc, nt, nhn], [oc, ot, ohn]) => {
                if (nc !== oc || nt !== ot || nhn !== ohn) {
                    updatePageList()
                }
            }
        )

        const addPage = () => {
            if (!props.hasNext&&props.cPage===props.tPage) {
                return
            }
            context.emit('updatePage', props.cPage+1)
        }

        const reducePage = () => {
            if (props.cPage===1) {
                return
            }
            context.emit('updatePage', props.cPage-1)

        }

        const changePage = (n) => {
            context.emit('updatePage', n)
        }

        return {
            ...toRefs(state),
            changePage,
            reducePage,
            addPage
        }

    }
}
