import { reactive, ref, toRefs, onMounted} from 'vue'

export default {
    name: "MetricMemory",
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
                    id: 'metric-mem',
                    events: {
                        zoomed: function(chartContext, a ) {
                            console.log(a)
                        }
                    },
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
                    tickAmount: 4,
                    labels: {
                        formatter: (value) => {
                            return value + ' ' + 'MB'
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
            series: props.metricMemory ? props.metricMemory : [],
            // series : [
            //     {
            //         name: 'MEMORY TOTAL',
            //         data: [[1608703200000, 512], [1608703800000, 512], [1608704400000, 512], [1608705000000, 512], [1608705600000, 512], [1608706200000, 512], [1608706800000, 512], [1608707400000, 512], [1608708000000, 512], [1608708600000, 512], [1608709200000, 512], [1608709800000, 512], [1608710400000, 512], [1608711000000, 512], [1608711600000, 512], [1608712200000, 512], [1608712800000, 512], [1608713400000, 512], [1608714000000, 512], [1608714600000, 512], [1608715200000, 512], [1608715800000, 512], [1608716400000, 512], [1608717000000, 512], [1608717600000, 512], [1608718200000, 512], [1608718800000, 512], [1608719400000, 512], [1608720000000, 512], [1608720600000, 512], [1608721200000, 512], [1608721800000, 512], [1608722400000, 512], [1608723000000, 512], [1608723600000, 512], [1608724200000, 512], [1608724800000, 512], [1608725400000, 512], [1608726000000, 512], [1608726600000, 512], [1608727200000, 512], [1608727800000, 512], [1608728400000, 512], [1608729000000, 512], [1608729600000, 512], [1608730200000, 512], [1608730800000, 512], [1608731400000, 512], [1608732000000, 512], [1608732600000, 512], [1608733200000, 512], [1608733800000, 512], [1608734400000, 512], [1608735000000, 512], [1608735600000, 512], [1608736200000, 512], [1608736800000, 512], [1608737400000, 512], [1608738000000, 512], [1608738600000, 512], [1608739200000, 512], [1608739800000, 512], [1608740400000, 512], [1608741000000, 512], [1608741600000, 512], [1608742200000, 512], [1608742800000, 512], [1608743400000, 512], [1608744000000, 512], [1608744600000, 512], [1608745200000, 512], [1608745800000, 512], [1608746400000, 512], [1608747000000, 512], [1608747600000, 512], [1608748200000, 512], [1608748800000, 512], [1608749400000, 512], [1608750000000, 512], [1608750600000, 512], [1608751200000, 512], [1608751800000, 512], [1608752400000, 512], [1608753000000, 512], [1608753600000, 512], [1608754200000, 512], [1608754800000, 512], [1608755400000, 512], [1608756000000, 512], [1608756600000, 512], [1608757200000, 512], [1608757800000, 512], [1608758400000, 512], [1608759000000, 512], [1608759600000, 512], [1608760200000, 512], [1608760800000, 512], [1608761400000, 512], [1608762000000, 512], [1608762600000, 512], [1608763200000, 512], [1608763800000, 512], [1608764400000, 512], [1608765000000, 512], [1608765600000, 512], [1608766200000, 512], [1608766800000, 512], [1608767400000, 512], [1608768000000, 512], [1608768600000, 512], [1608769200000, 512], [1608769800000, 512], [1608770400000, 512], [1608771000000, 512], [1608771600000, 512], [1608772200000, 512], [1608772800000, 512], [1608773400000, 512], [1608774000000, 512], [1608774600000, 512], [1608775200000, 512], [1608775800000, 512], [1608776400000, 512], [1608777000000, 512], [1608777600000, 512], [1608778200000, 512], [1608778800000, 512], [1608779400000, 512], [1608780000000, 512], [1608780600000, 512], [1608781200000, 512], [1608781800000, 512], [1608782400000, 512], [1608783000000, 512], [1608783600000, 512], [1608784200000, 512], [1608784800000, 512], [1608785400000, 512], [1608786000000, 512], [1608786600000, 512], [1608787200000, 512], [1608787800000, 512], [1608788400000, 512], [1608789000000, 512], [1608789600000, 512], [1608790200000, 512]]
            //
            //     },
            //     {
            //     name: 'MEMORY USED',
            //     data: [[1608703230000, 233], [1608703830000, 41], [1608704430000, 145], [1608705030000, 262], [1608705600000, 422], [1608706200000, 411], [1608706800000, 205], [1608707400000, 78], [1608708000000, 331], [1608708600000, 81], [1608709200000, 502], [1608709800000, 194], [1608710400000, 31], [1608711000000, 452], [1608711600000, 368], [1608712200000, 220], [1608712800000, 509], [1608713400000, 376], [1608714000000, 169], [1608714600000, 212], [1608715200000, 460], [1608715800000, 31], [1608716400000, 184], [1608717000000, 30], [1608717600000, 210], [1608718200000, 325], [1608718800000, 355], [1608719400000, 435], [1608720000000, 109], [1608720600000, 208], [1608721200000, 399], [1608721800000, 372], [1608722400000, 215], [1608723000000, 197], [1608723600000, 82], [1608724200000, 398], [1608724800000, 126], [1608725400000, 279], [1608726000000, 396], [1608726600000, 188], [1608727200000, 445], [1608727800000, 196], [1608728400000, 503], [1608729000000, 115], [1608729600000, 280], [1608730200000, 426], [1608730800000, 373], [1608731400000, 238], [1608732000000, 419], [1608732600000, 410], [1608733200000, 202], [1608733800000, 64], [1608734400000, 48], [1608735000000, 174], [1608735600000, 35], [1608736200000, 238], [1608736800000, 272], [1608737400000, 283], [1608738000000, 445], [1608738600000, 217], [1608739200000, 228], [1608739800000, 63], [1608740400000, 259], [1608741000000, 78], [1608741600000, 260], [1608742200000, 503], [1608742800000, 427], [1608743400000, 218], [1608744000000, 249], [1608744600000, 116], [1608745200000, 129], [1608745800000, 351], [1608746400000, 422], [1608747000000, 313], [1608747600000, 135], [1608748200000, 354], [1608748800000, 121], [1608749400000, 314], [1608750000000, 325], [1608750600000, 211], [1608751200000, 500], [1608751800000, 186], [1608752400000, 331], [1608753000000, 154], [1608753600000, 485], [1608754200000, 40], [1608754800000, 292], [1608755400000, 365], [1608756000000, 336], [1608756600000, 157], [1608757200000, 51], [1608757800000, 353], [1608758400000, 229], [1608759000000, 482], [1608759600000, 449], [1608760200000, 59], [1608760800000, 36], [1608761400000, 287], [1608762000000, 94], [1608762600000, 71], [1608763200000, 95], [1608763800000, 103], [1608764400000, 387], [1608765000000, 351], [1608765600000, 500], [1608766200000, 46], [1608766800000, 185], [1608767400000, 220], [1608768000000, 291], [1608768600000, 175], [1608769200000, 511], [1608769800000, 278], [1608770400000, 375], [1608771000000, 107], [1608771600000, 20], [1608772200000, 473], [1608772800000, 209], [1608773400000, 187], [1608774000000, 428], [1608774600000, 241], [1608775200000, 369], [1608775800000, 63], [1608776400000, 419], [1608777000000, 446], [1608777600000, 165], [1608778200000, 25], [1608778800000, 24], [1608779400000, 193], [1608780000000, 413], [1608780600000, 83], [1608781200000, 99], [1608781800000, 243], [1608782400000, 15], [1608783000000, 353], [1608783600000, 165], [1608784200000, 61], [1608784800000, 312], [1608785400000, 387], [1608786000000, 231], [1608786600000, 276], [1608787200000, 473], [1608787800000, 333], [1608788400000, 181], [1608789000000, 32], [1608789600000, 377], [1608790200000, 405]]
            //
            //     },
            // ],
            latestMem: 0,
            latestPercent: 0,
            maxMem: 0,
            maxPercent: 0,
            avgMem: 0,
            avgPercent: 0,
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

        })

        return {
            ...toRefs(state),
            hideOrShowChart,
        }
    }
}