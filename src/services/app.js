export function getAPPList(params) {
    return [
        {"name": "zmy1", "lang":"python", "base_image": "heroku-18", "id": "1"},
        {"name": "zmy2", "lang":"Java", "base_image": "heroku-18", "id": "2"},
        {"name": "zmy3", "lang":"Go", "base_image": "heroku-18", "id": "3"},
        {"name": "zmy4", "lang":"python", "base_image": "heroku-20", "id": "4"},
        {"name": "zmy5", "lang":"python", "base_image": "heroku-18", "id": "5"},
        {"name": "zmy6", "lang":"Vue", "base_image": "heroku-18", "id": "6"}
    ];
}

export function getAppDetail(id) {
    return {"name": "zmy1", "lang":"python", "base_image": "heroku-18", "id": "1"}
}
