import axios from "../utils/axios";

export function getAppProcesses(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/`)

    // return new Promise((resolve, reject) => {
    //     let res = axios.get(`/clusters/${clusterName}/apps/${appId}/`)
    //     var procfile_structures = [];
    //     res.then(function (value) {
    //         for (var i in value.procfile_structure) {
    //             procfile_structures.push({"name": i, "cmd": value.procfile_structure[i], 'status': 1})
    //         }
    //         console.log("js getAppProcesses value: ", value)
    //         resolve(procfile_structures);
    //     }, function (err) {
    //         reject(err);
    //     })
    // });

    // return [
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '1'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '2'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '3'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '4'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '5'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '6'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '7'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '8'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '9'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '10'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '11'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '12'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '13'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '14'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '15'},
    //     {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:8000', 'status': 0, 'id': '16'}
    // ]
}

export function dealAppProcesses(obj) {
    var appProcesses = []
    for (let key in obj.data.procfile_structure) {
        var statue = 0
        if (obj.data.structure[key] > 0) {
            statue = 1
        }
        appProcesses.push({"name": key, "cmd": obj.data.procfile_structure[key], 'status': statue})
    }
    console.log("js appProcesses value: ", appProcesses)
    return appProcesses.map(item => {
        return {
            'name': item.name,
            'cmd': item.cmd,
            'status': item.status
        }
    })
}

export function getAppProcessTypes(clusterName, appId) {
    return axios.get(`/clusters/${clusterName}/apps/${appId}/`)
    // return [
    //     {'name': 'web'}, {'name': 'celery'}, {'name': 'cbeat'}, {'name': 'cron'}, {'name': 'sync1'}, {'name': 'sync2'}
    // ]
}

export function dealProcessTypes(obj) {
    var appProcessTypes = []
    for (let i in obj.data.procfile_structure) {
        appProcessTypes.push({"name": i})
    }
    console.log("js appProcessTypes value: ", appProcessTypes)
    return appProcessTypes
}
