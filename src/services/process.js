export function getAppProcesses() {
    return [
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '1'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '2'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '3'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '4'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '5'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '6'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '7'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '8'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '9'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '10'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '11'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '12'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '13'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '14'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:80', 'status': 1, 'id': '15'},
        {'name': 'web', 'cmd': 'python manage.py runserver 0.0.0.0:8000', 'status': 0, 'id': '16'}
    ]

}

export function getAppProcessTypes() {
    return [
        {'name': 'web'}, {'name': 'celery'}, {'name': 'cbeat'}, {'name': 'cron'}, {'name': 'sync1'}, {'name': 'sync2'}
    ]

}

