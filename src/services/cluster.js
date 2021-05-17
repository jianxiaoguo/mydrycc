import get from '../utils/http'


export function getClusters() {
    get('/clusters').then(res => { console.log(res) })
    return [
        {'cluster_id': '1', 'name': '百科A', 'code': 'bka'},
        {'cluster_id': '2', 'name': '百科B', 'code': 'bkb'},
        {'cluster_id': '3', 'name': '诚高', 'code': 'cg'}
        ];
}
