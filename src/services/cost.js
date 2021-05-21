import axios from "../utils/axios";

export function getAppCostList() {
    return axios.get(`/bills/`)
    return [
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 11021, 'app': {'app_id': '1', 'name': 'zmy1'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 1024, 'app': {'app_id': '1', 'name': 'zmy2'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 14401, 'app': {'app_id': '1', 'name': 'zmy3'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 4401, 'app': {'app_id': '1', 'name': 'zmy4'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 1401, 'app': {'app_id': '1', 'name': 'zmy5'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 101, 'app': {'app_id': '1', 'name': 'zmy6'}},
    ]

}


export function getProductCostList() {
    return axios.get(`/bills_by_product/`)
    return [
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 5512, 'product': {'name': 'cpu', 'detail': 'xxxx'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 221122, 'product': {'name': 'memory', 'detail': 'xxxx'}},
        {'username': 'hanlucen', 'period': '2021-01', 'cost': 23111, 'product': {'name': 'network', 'detail': 'xxxx'}},
    ]

}


export function getProductCostStatistic() {
    return axios.get(`/bills_by_product/`)
    return [
        {'username': 'hanlucen', 'role': 'owner'},
        {'username': 'lijianguo', 'role': 'collaborator'}
    ]

}
