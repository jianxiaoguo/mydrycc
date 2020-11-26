export function getAppAddons() {
    return [
        {'plan': 'memcached:custom', 'kind': 'memcached', 'name': 'memcached-name'},
        {'plan': 'postgres:custom', 'kind': 'postgres', 'name': 'postgres-name'},
        {'plan': 'redis:custom', 'kind': 'redis', 'name': 'redis-name'},
        {'plan': 'rabbitmq:custom', 'kind': 'rabbitmq', 'name': 'rabbitmq-name'},
    ]
}
