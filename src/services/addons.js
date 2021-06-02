import axios from "../utils/axios";

export function getAppAddons(clusterName, appId, params='') {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/resources/` + '?' + params)
    // return [
        // {'plan': 'memcached:custom', 'kind': 'memcached', 'name': 'memcached-name'},
        // {'plan': 'postgres:custom', 'kind': 'postgres', 'name': 'postgres-name'},
        // {'plan': 'redis:custom', 'kind': 'redis', 'name': 'redis-name'},
        // {'plan': 'rabbitmq:custom', 'kind': 'rabbitmq', 'name': 'rabbitmq-name'},
    // ]
}

export function dealAppAddons(obj) {
    return obj.data.results.map(item => {
        return {
            plan: item.plan,
            kind: item.plan.split("：")[0],
            name: item.name,
        }
    })
}
