<template>
    <div class="pv2 w-100 flex justify-end">
        <div @click="reducePage" class="br--left bl bb bt br2 h3 w3 db pa1 b--light-gray cannotselect"
             :class="cPage===1?['bg-light-silver', 'fill-light-gray', 'cursor-not-allowed']:['cursor-pointer', 'fill-light-purple']">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M752.486469 1023.90327a27.374713 27.374713 0 0 1-19.346088-8.028627l-483.652178-483.652178a27.374713 27.374713 0 0 1 0-38.692174l483.652178-483.652179a27.471444 27.471444 0 1 1 38.692175 38.692174l-464.306092 464.306092 464.306092 464.306091a27.471444 27.471444 0 0 1-19.346087 46.817531z" ></path></svg>
        </div>
        <template v-for="page in pageList">
            <div @click="changePage(page)" class="bl bb bt h3 w3 db tc b--light-gray pa1 f2 gray-70 "
                 :class="page===cPage?['bg-light-purple','white', 'cursor-not-allowed']:['cursor-pointer']">{{page}}</div>
        </template>
        <div v-if="hasNext" class="bl bb bt h3 w3 db tc b--light-gray pa1 f2 gray-70 cursor-not-allowed">...</div>
        <div @click="addPage" class="br--right ba br2 h3 w3 db pa1 b--light-gray cannorselect"
             :class="!hasNext&&cPage===tPage?['bg-light-silver', 'fill-light-gray', 'cursor-not-allowed']:['cursor-pointer', 'fill-light-purple']">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M296.727273 978.385455a34.909091 34.909091 0 0 1-24.669091-59.624728l405.876363-405.829818-405.876363-405.876364a34.909091 34.909091 0 1 1 49.384727-49.384727l430.545455 430.545455a34.909091 34.909091 0 0 1 0 49.338182L321.396364 968.145455a34.816 34.816 0 0 1-24.669091 10.24z" fill="#a997bf"></path></svg>
        </div>
    </div>
</template>

<script>
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
</script>

<style scoped>

</style>
