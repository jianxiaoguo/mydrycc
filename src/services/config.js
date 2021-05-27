import axios from "../utils/axios";

export function getAppConfig(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/config/`)
}

export function dealAppDomains(obj) {
    return obj.data.results.map(item => {
        return {
            domain: item.domain,
        }
    })
}

export function postAppDomains(clusterName, appId, params) {
    return axios.post(`/clusters/${clusterName}/apps/${appId}/config/`, params)
}
