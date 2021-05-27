import axios from "../utils/axios";

export function getApplogs(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/logs`)
}

export function dealApplogs(obj) {
    return obj.data
}
