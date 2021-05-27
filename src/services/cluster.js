import axios from '../utils/axios'


export function getClusters() {
    return axios.get('/clusters')
}
export function getCsrf() {
    return axios.get('/auth/csrf/')
}


export function dealClusterData(obj) {
    return obj.data.results.map(item => {
        return {
            // clusterId: item.uuid,
            name: item.name,
            code: item.name,
            ingress: item.ingress
        }
    })
}
