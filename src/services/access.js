import axios from "../utils/axios";

export function getAppAccesses(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/perms/`)
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
