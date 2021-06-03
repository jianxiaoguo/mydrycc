import axios from "../utils/axios";

export function getMetric(clusterName, appId, containerType){
    var url = `/clusters/${clusterName}/apps/${appId}/metrics/${containerType}/`
    return axios.get(url)
}

export function dealMetricCpus(res){
    return res.data.cpus
}
export function dealMetricMemory(res){
    return res.data.memory
}
export function dealMetricNetworks(res){
    return res.data.networks
}

export function getResponseTimeMetrics() {
    return [
        {'time': 1606179600000, duration: 34},
        {'time': 1606183200000, duration: 134},
        {'time': 1606186800000, duration: 354},
        {'time': 1606190400000, duration: 347},
        {'time': 1606194000000, duration: 1134},
        {'time': 1606197600000, duration: 334},
        {'time': 1606201200000, duration: 341},

        {'time': 1606204800000, duration: 341},
        {'time': 1606208400000, duration: 41},
        {'time': 1606212000000, duration: 341},

        {'time': 1606215600000, duration: 34},
        {'time': 1606219200000, duration: 534},
        {'time': 1606222800000, duration: 134},
        {'time': 1606226400000, duration: 234},
        {'time': 1606230000000, duration: 434},
        {'time': 1606233600000, duration: 834},
        {'time': 1606237200000, duration: 314},
        {'time': 1606240800000, duration: 341},
        {'time': 1606244400000, duration: 134},
        {'time': 1606248000000, duration: 134},
        {'time': 1606251600000, duration: 314},
        {'time': 1606255200000, duration: 134},
        {'time': 1606258800000, duration: 334},
        {'time': 1606262400000, duration: 341}
        ]
}


export function getThroughputMetrics() {
    return [
        {'time': 1606179600000, num: 12},
        {'time': 1606183200000, num: 1134},
        {'time': 1606186800000, num: 54},
        {'time': 1606190400000, num: 47},
        {'time': 1606194000000, num: 134},
        {'time': 1606197600000, num: 4334},
        {'time': 1606201200000, num: 41},
        {'time': 1606204800000, num: 41},
        {'time': 1606208400000, num: 4},
        {'time': 1606212000000, num: 41},
        {'time': 1606215600000, num: 34},
        {'time': 1606219200000, num: 54},
        {'time': 1606222800000, num: 134},
        {'time': 1606226400000, num: 34},
        {'time': 1606230000000, num: 44},
        {'time': 1606233600000, num: 84},
        {'time': 1606237200000, num: 314},
        {'time': 1606240800000, num: 3141},
        {'time': 1606244400000, num: 14},
        {'time': 1606248000000, num: 14},
        {'time': 1606251600000, num: 314},
        {'time': 1606255200000, num: 134},
        {'time': 1606258800000, num: 34},
        {'time': 1606262400000, num: 31}
    ]
}


export function getMemoryMetrics() {
    return [
        {'time': 1606179600000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606183200000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606186800000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606190400000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606194000000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606197600000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606201200000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606204800000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606208400000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606212000000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606215600000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606219200000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606222800000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606226400000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606230000000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606233600000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606237200000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606240800000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606244400000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606248000000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606251600000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606255200000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606258800000, percentile: Math.floor(Math.random() * 100)},
        {'time': 1606262400000, percentile: Math.floor(Math.random() * 100)}
    ]
}
