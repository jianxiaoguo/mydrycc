import axios from "../utils/axios";

export function getCollaboratorActivities(clusterName, appId, params='') {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/releases/count/` + '?' + params)
    // return [
    //     {'username': 'hanlucen', 'count': 23},
    //     {'username': 'lijianguo', 'count': 36},
    // ]
}

export function dealCollaboratorActivities(obj) {
    return obj.data.map(item => {
        return {
            username: item.username,
            count: item.count,
        }
    })
}

export function getAppActivities(clusterName, appId, params='limit=15') {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/releases/` + '?' + params)
    // return [
    //     {'content': 'Enable Logplex1', 'username': 'lijianguo', 'v': 'v14', 'created_time': 1606799772},
    //     {'content': 'Initial release2', 'username': 'hanlucen', 'v': 'v13', 'created_time': 1606793792},
    //     {'content': 'Enable Logplex3', 'username': 'lijianguo', 'v': 'v12', 'created_time': 1606799772},
    //     {'content': 'Initial release4', 'username': 'hanlucen', 'v': 'v11', 'created_time': 1606793792},
    //     {'content': 'Enable Logplex5', 'username': 'lijianguo', 'v': 'v10', 'created_time': 1606799772},
    //     {'content': 'Initial release6', 'username': 'hanlucen', 'v': 'v9', 'created_time': 1606793792},
    //     {'content': 'Enable Logplex7', 'username': 'lijianguo', 'v': 'v8', 'created_time': 1606799772},
    //     {'content': 'Initial release8', 'username': 'hanlucen', 'v': 'v7', 'created_time': 1606793792},
    //     {'content': 'Enable Logplex9', 'username': 'lijianguo', 'v': 'v6', 'created_time': 1606799772},
    //     {'content': 'Initial release10', 'username': 'hanlucen', 'v': 'v5', 'created_time': 1606793792},
    //     {'content': 'Enable Logplex11', 'username': 'lijianguo', 'v': 'v4', 'created_time': 1606799772},
    //     {'content': 'Initial release12', 'username': 'hanlucen', 'v': 'v3', 'created_time': 1606793792},
    //     {'content': 'Enable Logplex', 'username': 'lijianguo', 'v': 'v2', 'created_time': 1606799772},
    //     {'content': 'Initial release', 'username': 'hanlucen', 'v': 'v1', 'created_time': 1606793792},
    // ]
}

export function dealAppActivities(obj) {
    return obj.data.results.map(item => {
        return {
            content: item.summary,
            username: item.owner,
            v: item.version,
            created_time: item.created
        }
    })
}


export function postAppActivitieRollback(clusterName, appId, version) {
    return axios.post(`/clusters/${clusterName}/apps/${appId}/releases/rollback/`, {'version': version})
}
