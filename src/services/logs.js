import axios from "../utils/axios";

export function getApplogs(clusterName, appId, params='') {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/logs` + '?' + params)
}

export function dealApplogs(obj) {
    return obj.data
}
