import axios from "../utils/axios";

export function getAppConfig(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/config/`)
}

export function dealAppConfig(obj) {
    var appConfigs = []
    for (var key in obj.data.values) {
        appConfigs.push({"name": key, "value": obj.data.values[key]})
    }
    console.log("js appConfigs value: ", appConfigs)
    return appConfigs.map(item => {
        return {
            'name': item.name,
            'value': item.value,
            'isReadOnly': true
        }
    })

    // return obj.data.values
}

export function postAppConfigs(clusterName, appId, params) {
    return axios.post(`/clusters/${clusterName}/apps/${appId}/config/`, params)
}