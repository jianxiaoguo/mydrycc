import axios from "../utils/axios";

export function getAppCostList(section=null, params) {
    var url = `/bills_by_app/`
    if(section){
        url = url + '?' + section
    }
    if(params){
        url = url + '?' + params
    }
    return axios.get(url)
    // return [
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 11021, 'app': {'app_id': '1', 'name': 'zmy1'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 1024, 'app': {'app_id': '1', 'name': 'zmy2'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 14401, 'app': {'app_id': '1', 'name': 'zmy3'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 4401, 'app': {'app_id': '1', 'name': 'zmy4'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 1401, 'app': {'app_id': '1', 'name': 'zmy5'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 101, 'app': {'app_id': '1', 'name': 'zmy6'}},
    // ]

}

export function dealAppCostList(obj) {
    return obj.data.results.map(item => {
        return {
            'clusterName': item.cluster_name,
            'appName': item.app_id,
            'period': item.created,
            'cost': item.sum_total_price
        }
    })
}



export function getProductCostList(section=null) {
    var url = `/bills_by_product/`
    if(section){
        url = url + '?' + section
    }
    return axios.get(url)
    // return [
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 5512, 'product': {'name': 'cpu', 'detail': 'xxxx'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 221122, 'product': {'name': 'memory', 'detail': 'xxxx'}},
    //     {'username': 'hanlucen', 'period': '2021-01', 'cost': 23111, 'product': {'name': 'network', 'detail': 'xxxx'}},
    // ]

}

export function dealProductCostList(obj) {
    var resource_types = {1:'Cpu',2:'Memory',3:'Volume',4:'Network'}
    return obj.data.results.map(item => {
        var resource_type = resource_types[item.resource_type]
        return {
            'productName': resource_type,
            // 'productDetail': item.product.detail,
            'period': item.created,
            'cost': item.sum_total_price
        }
    })
}


export function getProductCostStatistic(section=null) {
    var url = `/bills_by_product/`
    if(section){
        url = url + '?' + section
    }
    return axios.get(url)
    // return [
    //     {'username': 'hanlucen', 'role': 'owner'},
    //     {'username': 'lijianguo', 'role': 'collaborator'}
    // ]

}
