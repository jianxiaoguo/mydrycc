<template>
    <div class="sortable-item ember-view">
        <div class="metrics__wrapped-chart b--black-05 flex-column bb ember-view">
            <div class="metrics__chart w-100 ember-view">
                <div class="w-100">
                    <header class="metrics__chart__header ember-view">
                        <div class="flex flex-auto items-center flex-wrap items-start pl3 pv3 f5">
                            <button @click="hideOrShowChart" class="bg-transparent hk-focus-ring--blue:focus cursor-hand br1 ba0 b--none pa--1" title="Hide event metrics" type="button" >
                                <span class="clip">Hide event metrics</span>
                                <svg :class="{'rot90': !isHide}" style="height: 16px; width: 16px;" class="icon malibu-icon  mr1 pointer nudge-up--2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4935" width="16" height="16"><path d="M333.1 118.9l-35.3 35.4L655.5 512 297.8 869.7l35.3 35.4L726.2 512z" fill="" p-id="4936"></path></svg>
                            </button>

                            <div class="flex flex-row">
                                <div class="f5 b dark-gray pointer ">Network Usage</div>
                                <span title="" class="ml1 tooltip-component ember-view">
                                    <svg style="height: 14px; width: 14px;" class="icon malibu-icon metrics__chart__devcenter-link malibu-fill-gradient-dark-gray pointer nudge-right--1" data-test-icon-name="info-badge-16" data-test-target="malibu-icon" aria-hidden="true" role="img">
                                <!---->  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#info-badge-16"></use>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div class="ember-view">
                            <div class="metrics__summary-row">
                                <div class="metrics__summary-row__item ember-view">
                                    <span title="" class="tooltip-component ember-view" >
                                        <div class="ph3">
                                            <div class="metrics__summary-row__label">LATEST</div>
                                            <div class="metrics__summary-row__values">
                                                <div class="metrics__summary-row__value metrics__summary-row__value--default metrics__summary-row__value--primary metrics__summary-row__value">
                                                    {{latest}}<span class="metrics__summary-row__unit">ms</span>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div class="metrics__summary-row__item ember-view">
                                    <span title="" class="tooltip-component ember-view" data-original-title="The maximum amount of memory used in this time period.">
                                        <div class="ph3">
                                            <div class="metrics__summary-row__label">MAX</div>
                                            <div class="metrics__summary-row__values">
                                                <div class="metrics__summary-row__value metrics__summary-row__value--default metrics__summary-row__value--primary metrics__summary-row__value">
                                                    {{max}}<span class="metrics__summary-row__unit">ms</span>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div class="metrics__summary-row__item ember-view">
                                    <span title="" class="tooltip-component ember-view" data-original-title="The average amount of memory used in this time period.">
                                        <div class="ph3">
                                            <div class="metrics__summary-row__label">AVERAGE</div>
                                            <div class="metrics__summary-row__values">
                                                <div class="metrics__summary-row__value metrics__summary-row__value--default metrics__summary-row__value--primary metrics__summary-row__value">
                                                    {{average}}<span class="metrics__summary-row__unit">ms</span>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="w-100 flex metrics__chart__wrapper" :class="{'absolute': isHide}" :style="hideStyle">
                        <div class="flex flex-grow-1 metrics__chart__graphs">
                            <apexchart id="mem-chart" class="flex-grow-1 metrics__chart__image" height="170" type="line" :options="options" :series="series"></apexchart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, toRefs, onMounted} from 'vue'

    export default {
        name: "MetricNetwork",
        props: {
            appDetail: [Object, Function]
        },
        setup(props) {
            const state = reactive({
                options: {
                    noData: {
                        text: 'Loading...'
                    },
                    chart: {
                        id: 'metric-response-time',
                        tooltip: {
                            enabled: true
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            // show: false,
                            datetimeUTC: false,
                        },
                        tooltip: {
                            enabled: false
                        },
                        position: 'bottom',
                    },
                    yaxis: {
                        // tickAmount: 4,
                        labels: {
                            formatter: (value) => {
                                return value + ' ' + 'ms'
                            }
                        }

                    },
                    stroke: {
                        curve: 'stepline',
                        width: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {return val }
                        },
                        x: {
                            format: 'dd MMM HH:mm:ss'
                        }
                    },
                },
                series : [
                    {
                        name: 'BITS TOTAL',
                        data:[[1609209900000, 482], [1609210500000, 464], [1609211100000, 320], [1609211700000, 806], [1609212300000, 396], [1609212900000, 398], [1609213500000, 581], [1609214100000, 936], [1609214700000, 231], [1609215300000, 23], [1609215900000, 292], [1609216500000, 803], [1609217100000, 434], [1609217700000, 129], [1609218300000, 921], [1609218900000, 390], [1609219500000, 843], [1609220100000, 969], [1609220700000, 416], [1609221300000, 26], [1609221900000, 56], [1609222500000, 793], [1609223100000, 152], [1609223700000, 774], [1609224300000, 500], [1609224900000, 22], [1609225500000, 33], [1609226100000, 73], [1609226700000, 882], [1609227300000, 103], [1609227900000, 848], [1609228500000, 443], [1609229100000, 496], [1609229700000, 375], [1609230300000, 63], [1609230900000, 58], [1609231500000, 626], [1609232100000, 499], [1609232700000, 603], [1609233300000, 471], [1609233900000, 777], [1609234500000, 416], [1609235100000, 896], [1609235700000, 778], [1609236300000, 501], [1609236900000, 444], [1609237500000, 87], [1609238100000, 231], [1609238700000, 475], [1609239300000, 769], [1609239900000, 498], [1609240500000, 473], [1609241100000, 139], [1609241700000, 313], [1609242300000, 424], [1609242900000, 903], [1609243500000, 369], [1609244100000, 416], [1609244700000, 891], [1609245300000, 155], [1609245900000, 52], [1609246500000, 659], [1609247100000, 585], [1609247700000, 16], [1609248300000, 770], [1609248900000, 517], [1609249500000, 477], [1609250100000, 522], [1609250700000, 907], [1609251300000, 864], [1609251900000, 53], [1609252500000, 124], [1609253100000, 89], [1609253700000, 193], [1609254300000, 893], [1609254900000, 339], [1609255500000, 327], [1609256100000, 878], [1609256700000, 765], [1609257300000, 779], [1609257900000, 571], [1609258500000, 692], [1609259100000, 409], [1609259700000, 86], [1609260300000, 541], [1609260900000, 697], [1609261500000, 58], [1609262100000, 239], [1609262700000, 795], [1609263300000, 271], [1609263900000, 840], [1609264500000, 41], [1609265100000, 118], [1609265700000, 859], [1609266300000, 835], [1609266900000, 760], [1609267500000, 659], [1609268100000, 314], [1609268700000, 176], [1609269300000, 500], [1609269900000, 565], [1609270500000, 993], [1609271100000, 920], [1609271700000, 787], [1609272300000, 364], [1609272900000, 786], [1609273500000, 521], [1609274100000, 191], [1609274700000, 543], [1609275300000, 509], [1609275900000, 238], [1609276500000, 86], [1609277100000, 957], [1609277700000, 625], [1609278300000, 143], [1609278900000, 621], [1609279500000, 983], [1609280100000, 820], [1609280700000, 272], [1609281300000, 752], [1609281900000, 513], [1609282500000, 78], [1609283100000, 93], [1609283700000, 566], [1609284300000, 105], [1609284900000, 621], [1609285500000, 920], [1609286100000, 690], [1609286700000, 512], [1609287300000, 765], [1609287900000, 21], [1609288500000, 738], [1609289100000, 778], [1609289700000, 487], [1609290300000, 130], [1609290900000, 825], [1609291500000, 824], [1609292100000, 661], [1609292700000, 668], [1609293300000, 778], [1609293900000, 424], [1609294500000, 629], [1609295100000, 637], [1609295700000, 105], [1609296300000, 824]]

                    },
                    {
                        name: 'BITS RECEIVED',
                        data:[[1609209900000, 910], [1609210500000, 719], [1609211100000, 607], [1609211700000, 279], [1609212300000, 884], [1609212900000, 263], [1609213500000, 748], [1609214100000, 220], [1609214700000, 176], [1609215300000, 998], [1609215900000, 520], [1609216500000, 378], [1609217100000, 878], [1609217700000, 879], [1609218300000, 33], [1609218900000, 832], [1609219500000, 514], [1609220100000, 247], [1609220700000, 584], [1609221300000, 799], [1609221900000, 147], [1609222500000, 16], [1609223100000, 582], [1609223700000, 657], [1609224300000, 429], [1609224900000, 560], [1609225500000, 23], [1609226100000, 603], [1609226700000, 950], [1609227300000, 315], [1609227900000, 980], [1609228500000, 803], [1609229100000, 241], [1609229700000, 314], [1609230300000, 984], [1609230900000, 712], [1609231500000, 89], [1609232100000, 700], [1609232700000, 776], [1609233300000, 885], [1609233900000, 928], [1609234500000, 413], [1609235100000, 798], [1609235700000, 390], [1609236300000, 405], [1609236900000, 563], [1609237500000, 968], [1609238100000, 861], [1609238700000, 886], [1609239300000, 519], [1609239900000, 82], [1609240500000, 525], [1609241100000, 602], [1609241700000, 957], [1609242300000, 694], [1609242900000, 818], [1609243500000, 172], [1609244100000, 160], [1609244700000, 191], [1609245300000, 485], [1609245900000, 773], [1609246500000, 168], [1609247100000, 264], [1609247700000, 370], [1609248300000, 571], [1609248900000, 46], [1609249500000, 697], [1609250100000, 13], [1609250700000, 943], [1609251300000, 936], [1609251900000, 119], [1609252500000, 648], [1609253100000, 441], [1609253700000, 267], [1609254300000, 877], [1609254900000, 995], [1609255500000, 892], [1609256100000, 634], [1609256700000, 698], [1609257300000, 672], [1609257900000, 255], [1609258500000, 296], [1609259100000, 426], [1609259700000, 734], [1609260300000, 931], [1609260900000, 718], [1609261500000, 604], [1609262100000, 589], [1609262700000, 636], [1609263300000, 559], [1609263900000, 384], [1609264500000, 960], [1609265100000, 344], [1609265700000, 816], [1609266300000, 88], [1609266900000, 113], [1609267500000, 473], [1609268100000, 612], [1609268700000, 674], [1609269300000, 513], [1609269900000, 695], [1609270500000, 867], [1609271100000, 826], [1609271700000, 128], [1609272300000, 54], [1609272900000, 905], [1609273500000, 127], [1609274100000, 195], [1609274700000, 749], [1609275300000, 727], [1609275900000, 198], [1609276500000, 635], [1609277100000, 806], [1609277700000, 970], [1609278300000, 215], [1609278900000, 726], [1609279500000, 675], [1609280100000, 377], [1609280700000, 795], [1609281300000, 550], [1609281900000, 748], [1609282500000, 448], [1609283100000, 251], [1609283700000, 355], [1609284300000, 115], [1609284900000, 266], [1609285500000, 905], [1609286100000, 972], [1609286700000, 344], [1609287300000, 264], [1609287900000, 180], [1609288500000, 287], [1609289100000, 253], [1609289700000, 836], [1609290300000, 216], [1609290900000, 68], [1609291500000, 30], [1609292100000, 666], [1609292700000, 827], [1609293300000, 308], [1609293900000, 359], [1609294500000, 471], [1609295100000, 719], [1609295700000, 262], [1609296300000, 521]]

                    },
                    {
                        name: 'BITS SENT',
                        data: [[1609209900000, 485], [1609210500000, 818], [1609211100000, 17], [1609211700000, 427], [1609212300000, 294], [1609212900000, 142], [1609213500000, 180], [1609214100000, 992], [1609214700000, 844], [1609215300000, 556], [1609215900000, 932], [1609216500000, 194], [1609217100000, 68], [1609217700000, 16], [1609218300000, 526], [1609218900000, 107], [1609219500000, 576], [1609220100000, 645], [1609220700000, 548], [1609221300000, 931], [1609221900000, 317], [1609222500000, 608], [1609223100000, 306], [1609223700000, 92], [1609224300000, 560], [1609224900000, 229], [1609225500000, 691], [1609226100000, 227], [1609226700000, 248], [1609227300000, 892], [1609227900000, 513], [1609228500000, 91], [1609229100000, 286], [1609229700000, 94], [1609230300000, 351], [1609230900000, 582], [1609231500000, 309], [1609232100000, 569], [1609232700000, 510], [1609233300000, 171], [1609233900000, 62], [1609234500000, 675], [1609235100000, 311], [1609235700000, 598], [1609236300000, 326], [1609236900000, 204], [1609237500000, 208], [1609238100000, 703], [1609238700000, 168], [1609239300000, 597], [1609239900000, 313], [1609240500000, 29], [1609241100000, 223], [1609241700000, 42], [1609242300000, 55], [1609242900000, 612], [1609243500000, 834], [1609244100000, 271], [1609244700000, 399], [1609245300000, 908], [1609245900000, 975], [1609246500000, 420], [1609247100000, 880], [1609247700000, 410], [1609248300000, 66], [1609248900000, 620], [1609249500000, 767], [1609250100000, 948], [1609250700000, 975], [1609251300000, 362], [1609251900000, 331], [1609252500000, 46], [1609253100000, 414], [1609253700000, 724], [1609254300000, 743], [1609254900000, 424], [1609255500000, 662], [1609256100000, 162], [1609256700000, 684], [1609257300000, 900], [1609257900000, 200], [1609258500000, 519], [1609259100000, 54], [1609259700000, 513], [1609260300000, 302], [1609260900000, 628], [1609261500000, 44], [1609262100000, 370], [1609262700000, 572], [1609263300000, 173], [1609263900000, 142], [1609264500000, 491], [1609265100000, 483], [1609265700000, 339], [1609266300000, 510], [1609266900000, 169], [1609267500000, 742], [1609268100000, 200], [1609268700000, 39], [1609269300000, 890], [1609269900000, 104], [1609270500000, 796], [1609271100000, 557], [1609271700000, 970], [1609272300000, 199], [1609272900000, 881], [1609273500000, 729], [1609274100000, 817], [1609274700000, 192], [1609275300000, 281], [1609275900000, 157], [1609276500000, 852], [1609277100000, 778], [1609277700000, 424], [1609278300000, 475], [1609278900000, 565], [1609279500000, 847], [1609280100000, 139], [1609280700000, 927], [1609281300000, 379], [1609281900000, 697], [1609282500000, 975], [1609283100000, 358], [1609283700000, 282], [1609284300000, 504], [1609284900000, 758], [1609285500000, 471], [1609286100000, 629], [1609286700000, 724], [1609287300000, 889], [1609287900000, 532], [1609288500000, 209], [1609289100000, 443], [1609289700000, 114], [1609290300000, 487], [1609290900000, 549], [1609291500000, 319], [1609292100000, 899], [1609292700000, 515], [1609293300000, 522], [1609293900000, 867], [1609294500000, 477], [1609295100000, 73], [1609295700000, 23], [1609296300000, 607]]

                    }
                ],
                latest: 0,
                max: 0,
                average: 0,
                isHide: false,
                hideStyle: Object
            })

            const hideOrShowChart = () => {
                state.isHide = !state.isHide
                if (state.isHide) {
                    state.hideStyle = {
                        top: '-9999px',
                        left: '-999px',
                        visibility: 'hidden'
                    }
                } else {
                    state.hideStyle = null
                }

            }

            onMounted(async () => {
                //
            })

            return {
                ...toRefs(state),
                hideOrShowChart
            }
        }
    }
</script>

<style scoped>

</style>
