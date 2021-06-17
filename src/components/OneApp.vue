<!--单个app显示-->
<template>
    <a @click="goToAppDetail(id)" class="ember-view link cursor-hand dark-gray">
        <div class="flex items-baseline limit-width">
            <div class="relative w3 mr1 ember-view">
                <svg style="height: 28px; width: 28px;" class="icon malibu-icon v-mid malibu-fill-gradient-purple o-60" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M92 929h390V539H92v390z m50-340h290v290H142V589z m400 340h390V539H542v390z m50-340h290v290H592V589zM542 95v390h390V95H542z m340 340H592V145h290v290zM92 95h390v390H293.4v-50H432V145H142v124.4H92V95z" fill="#79589F" ></path></svg>
            </div>
            <span class="f3 near-black"> {{name}} </span>
            <div class="flex-auto"></div>
            <ol class="f5 flex list mv0 pa0 items-center">
                <li class="mr1 db-l dn">
                    <a href="/apps/zmy/settings" class="link dark-gray flex ember-view">
                        <span class="mr1 nudge-up--2 o-80">
                            <svg style="height: 16px; width: 16px;" class="icon malibu-icon malibu-fill-gradient-dark-gray">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#language-python-16"></use>
                            </svg>
                        </span>
                            {{lang}}
                    </a>
                </li>
                <li><span class="gray db-l dn">•</span></li>
                <li class="mh1 items-center flex-l dn">
<!--                    <a href="/apps/zmy/settings" class="link dark-gray ember-view">-->
<!--                        {{baseImage}}-->
<!--                    </a>-->
                </li>
                <li><span class="gray db-l dn">•</span></li>
<!--                <li class="mh1 db-l dn">-->
<!--                    <a href="/apps/zmy/settings" class="link dark-gray ember-view">-->
<!--                        Europe-->
<!--                    </a>-->
<!--                </li>-->

                <li class="ml2 flex items-center">
                    <button class="nudge-up--1 cursor-pointer b--0 bg-transparent b--transparent pa1 ember-view">
                        <svg style="height: 16px; width: 16px;" class="icon malibu-icon fill-gray">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#favorite-option-16"></use>
                        </svg>
                    </button>
                </li>
            </ol>
        </div>
    </a>
</template>

<script>
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
</script>

<style scoped>
    /*@import "../assets/bashboard.css";*/
</style>
