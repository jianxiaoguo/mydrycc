import axios from "../utils/axios";

export function getAppDomains(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/domains/`)
}``

export function dealAppDomains(obj) {
    return obj.data.results.map(item => {
        return {
            domain: item.domain,
        }
    })
}

export function addAppDomains(clusterName, appId, domain) {
    return axios.post(`/clusters/${clusterName}/apps/${appId}/domains/`, {domain: domain})
}

export function deleteAppDomains(clusterName, appId, domain) {
    return axios.delete(`/clusters/${clusterName}/apps/${appId}/domains/${domain}/`)
}
