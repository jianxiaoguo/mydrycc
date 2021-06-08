import axios from "../utils/axios";

export function getAPPList(clusterName, params = 'limit=45&offset=0') {
    return axios.get(`/clusters/${clusterName}/apps/` + '?' + params)

    // return [
    //     {"name": "zmy1", "lang":"python", "base_image": "heroku-18", "id": "1"},
    //     {"name": "zmy2", "lang":"Java", "base_image": "heroku-18", "id": "2"},
    //     {"name": "zmy3", "lang":"Go", "base_image": "heroku-18", "id": "3"},
    //     {"name": "zmy4", "lang":"python", "base_image": "heroku-20", "id": "4"},
    //     {"name": "zmy5", "lang":"python", "base_image": "heroku-18", "id": "5"},
    //     {"name": "zmy6", "lang":"Vue", "base_image": "heroku-18", "id": "6"}
    // ];
}

export function dealAPPList(obj) {
    return obj.data.results.map(item => {
        return {
            id: item.id,
            name: item.id,
        }
    })
}


export function getAppDetail(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/`)

    // return {"name": "zmy1", "lang":"python", "base_image": "heroku-18", "id": "1"}
}

export function dealAppDetail(obj) {
    return {
        id: obj.data.id,
        name: obj.data.id,
        owner: obj.data.owner,
        created: obj.data.created,
        updated: obj.data.updated
    }
}

export function deleteApp(clusterName, appId) {
    return axios.delete(`/clusters/${clusterName}/apps/${appId}/`)
}

export function createApp(clusterName, appId) {
    return axios.post(`/clusters/${clusterName}/apps/`, {id: appId})
}

export function updateApp(clusterName, appId, owner) {
    // Transfer Ownership
    return axios.post(`/clusters/${clusterName}/apps/${appId}`, {owner: owner})
}
