import axios from "../utils/axios";

export function getUser() {
    return axios.get(`/auth/whoami/`)
}

export function dealUser(obj) {
    return {
        username: obj.data.username,
        email: obj.data.email,
    }
}

export function postLogout() {
    return axios.post(`/disconnect/drycc/`)
}

export function getMessages(params='') {
    return axios.get(`/messages/` + '?' + params)
}

export function dealMessages(res) {
    return res.data.results.map(item => {
        return {
            body: item.body,
            sender: item.sender,
            created: item.created,
        }
    })
}
