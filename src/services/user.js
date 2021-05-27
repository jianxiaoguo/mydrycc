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
