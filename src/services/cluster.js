import axios from '../utils/axios'


export function getClusters(params='') {
    return axios.get('/clusters' + '?' + params)
}


export function dealClusterData(obj) {
    return obj.data.results.map(item => {
        return {
            name: item.name,
            code: item.name,
            ingress: item.ingress
        }
    })
}
