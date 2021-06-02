import axios from "../utils/axios";

export function getAppAccesses(clusterName, appId, params='') {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/perms/` + '?' + params)
    // return [
    //     {'username': 'hanlucen', 'role': 'owner'},
    //     {'username': 'lijianguo', 'role': 'collaborator'}
    // ]
}

export function dealAppAccesses(obj) {
    return obj.data.users.map(item => {
        return {
            username: item,
            // role: item.role
        }
    })
}

export function addAppAccesses(clusterName, appId, username) {
    return axios.post(`/clusters/${clusterName}/apps/${appId}/perms/`, {username: username})
}

export function deleteAppAccesses(clusterName, appId, username) {
    return axios.delete(`/clusters/${clusterName}/apps/${appId}/perms/${username}/`)
}
