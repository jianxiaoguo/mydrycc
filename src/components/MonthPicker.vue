<template>
    <div class="flex">
        <div class="ma1 f3 w4 purple b">Period:</div>
        <div id='month-picker' class="relative dib flex-column">
            <button @click="openPicker" class="hk-button--secondary pr1 flex">
                <label class="f3 w4">{{sy}}-{{sm}}</label>
                <span class="ml3">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M768 224a32 32 0 0 1 0-64h32a96 96 0 0 1 96 96v544a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V256a96 96 0 0 1 96-96h32a32 32 0 0 1 0 64h-32a32 32 0 0 0-32 32v544a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V256a32 32 0 0 0-32-32z" p-id="1691" fill="#a997bf"></path><path d="M320 128a32 32 0 0 1 64 0v96a32 32 0 0 1-64 0z m320 0a32 32 0 0 1 64 0v96a32 32 0 0 1-64 0z m-192 96a32 32 0 0 1 0-64h128a32 32 0 0 1 0 64z m-64 352a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z m0-160a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z m0 320a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z" fill="#79589f"></path></svg>
            </span>
            </button>
            <div class="hk-dropdown max-z" :class="{'picker-hide': !showPicker}">
                <div class="w-100 h3 flex justify-between">
                    <span @click="reduceY" class="h2 w2 ma2 cursor-pointer light-purple">
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M752.486469 1023.90327a27.374713 27.374713 0 0 1-19.346088-8.028627l-483.652178-483.652178a27.374713 27.374713 0 0 1 0-38.692174l483.652178-483.652179a27.471444 27.471444 0 1 1 38.692175 38.692174l-464.306092 464.306092 464.306092 464.306091a27.471444 27.471444 0 0 1-19.346087 46.817531z" fill="#a997bf"></path></svg>
                    </span>
                    <div class="f3 ma2 mb3 tc b light-purple cannotselect">{{y}}</div>
                    <span @click="addY" class="h2 w2 ma2 cursor-pointer light-purple" >
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M296.727273 978.385455a34.909091 34.909091 0 0 1-24.669091-59.624728l405.876363-405.829818-405.876363-405.876364a34.909091 34.909091 0 1 1 49.384727-49.384727l430.545455 430.545455a34.909091 34.909091 0 0 1 0 49.338182L321.396364 968.145455a34.816 34.816 0 0 1-24.669091 10.24z" fill="#a997bf"></path></svg>
                    </span>
                </div>
                <table>
                    <tr class="w-100 f3">
                        <td class="pl2 pr1 pv2 ">
                            <div @click="changeMonth(1)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[0]===0, 'bg-lightest-silver': !enabledList[0]===0,
                                 'gray-30': enabledList[0]===0, 'bg-light-purple': enabledList[0]===2,
                                 'light-purple': enabledList[0]===1, 'cursor-pointer': enabledList[0]===1||enabledList[0]===2,
                                 'white': enabledList[0]===2
                                 }">1月</div>
                        </td>
                        <td class="pl1 pv2 pr1">
                            <div @click="changeMonth(2)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[1]===0, 'bg-lightest-silver': !enabledList[1]===0,
                                 'gray-30': enabledList[1]===0, 'bg-light-purple': enabledList[1]===2,
                                 'light-purple': enabledList[1]===1, 'cursor-pointer': enabledList[1]===1||enabledList[1]===2,
                                 'white': enabledList[1]===2
                                 }">2月</div>
                        </td>
                        <td class="pl1 pv2 pr2">
                            <div @click="changeMonth(3)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[2]===0, 'bg-lightest-silver': !enabledList[2]===0,
                                 'gray-30': enabledList[2]===0, 'bg-light-purple': enabledList[2]===2,
                                 'light-purple': enabledList[2]===1, 'cursor-pointer': enabledList[2]===1||enabledList[2]===2,
                                 'white': enabledList[2]===2
                                 }">3月</div>
                        </td>
                    </tr>
                    <tr class="w-100 f3">
                        <td class="pl2 pr1 pv2">
                            <div @click="changeMonth(4)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[3]===0, 'bg-lightest-silver': !enabledList[3]===0,
                                 'gray-30': enabledList[3]===0, 'bg-light-purple': enabledList[3]===2,
                                 'light-purple': enabledList[3]===1, 'cursor-pointer': enabledList[3]===1||enabledList[3]===2,
                                 'white': enabledList[3]===2
                                 }">4月</div>
                        </td>
                        <td class="pv2 pr1 pl1">
                            <div @click="changeMonth(5)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[4]===0, 'bg-lightest-silver': !enabledList[4]===0,
                                 'gray-30': enabledList[4]===0, 'bg-light-purple': enabledList[4]===2,
                                 'light-purple': enabledList[4]===1, 'cursor-pointer': enabledList[4]===1||enabledList[4]===2,
                                 'white': enabledList[4]===2
                                 }">5月</div>
                        </td>
                        <td class="pv2 pr1 pl1">
                            <div @click="changeMonth(6)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[5]===0, 'bg-lightest-silver': !enabledList[5]===0,
                                 'gray-30': enabledList[5]===0, 'bg-light-purple': enabledList[5]===2,
                                 'light-purple': enabledList[5]===1, 'cursor-pointer': enabledList[5]===1||enabledList[5]===2,
                                 'white': enabledList[5]===2
                                 }">6月</div>
                        </td>
                    </tr>
                    <tr class="w-100 f3">
                        <td class="pl2 pr1 pv2 ">
                            <div @click="changeMonth(7)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[6]===0, 'bg-lightest-silver': !enabledList[6]===0,
                                 'gray-30': enabledList[6]===0, 'bg-light-purple': enabledList[6]===2,
                                 'light-purple': enabledList[6]===1, 'cursor-pointer': enabledList[6]===1||enabledList[6]===2,
                                 'white': enabledList[6]===2
                                 }">7月</div>
                        </td>
                        <td class="pv2 pr1 pl1">
                            <div @click="changeMonth(8)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[7]===0, 'bg-lightest-silver': !enabledList[7]===0,
                                 'gray-30': enabledList[7]===0, 'bg-light-purple': enabledList[7]===2,
                                 'light-purple': enabledList[7]===1, 'cursor-pointer': enabledList[7]===1||enabledList[7]===2,
                                 'white': enabledList[7]===2
                                 }">8月</div>
                        </td>
                        <td class="pv2 pr1 pl1">
                            <div @click="changeMonth(9)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[8]===0, 'bg-lightest-silver': !enabledList[8]===0,
                                 'gray-30': enabledList[8]===0, 'bg-light-purple': enabledList[8]===2,
                                 'light-purple': enabledList[8]===1, 'cursor-pointer': enabledList[8]===1||enabledList[8]===2,
                                 'white': enabledList[8]===2
                                 }">9月</div>
                        </td>
                    </tr>
                    <tr class="w-100 f3">
                        <td class="pl2 pr1 pv2 ">
                            <div @click="changeMonth(10)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[9]===0, 'bg-lightest-silver': !enabledList[9]===0,
                                 'gray-30': enabledList[9]===0, 'bg-light-purple': enabledList[9]===2,
                                 'light-purple': enabledList[9]===1, 'cursor-pointer': enabledList[9]===1||enabledList[9]===2,
                                 'white': enabledList[9]===2
                                 }">10月</div>
                        </td>
                        <td class="pv2 pr1 pl1">
                            <div @click="changeMonth(11)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[10]===0, 'bg-lightest-silver': !enabledList[10]===0,
                                 'gray-30': enabledList[10]===0, 'bg-light-purple': enabledList[10]===2,
                                 'light-purple': enabledList[10]===1, 'cursor-pointer': enabledList[10]===1||enabledList[10]===2,
                                 'white': enabledList[10]===2
                                 }">11月</div>
                        </td>
                        <td class="pv2 pr1 pl1">
                            <div @click="changeMonth(12)" class="cannotselect w4 tc pa1"
                                 :class="{'cursor-not-allowed': enabledList[11]===0, 'bg-lightest-silver': !enabledList[11]===0,
                                 'gray-30': enabledList[11]===0, 'bg-light-purple': enabledList[11]===2,
                                 'light-purple': enabledList[11]===1, 'cursor-pointer': enabledList[11]===1||enabledList[11]===2,
                                 'white': enabledList[11]===2
                                 }">12月</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

    </div>

</template>

<script>
import MonthPicker from "./MonthPicker"
export default MonthPicker
</script>

<style scoped>
    .picker-hide {
        display: none
    }
    .max-z {
        z-index: 9999
    }
    .cannotselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
