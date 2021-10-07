{
    "pages": [{
        "ID": 6246,
        "NAME": "CurrentLocation",
        "TITTLE": null,
        "URL": "/currentlocation",
        "DESCRIPTION": null,
        "TEMPLATE": " \u003cdiv\u003e\n        \u003ch6\u003eGeoApplication through our.appup.com. Click on Show location to get your cordinates\u003c/h6\u003e\u003cbr\u003e\n        \u003cbutton  @click.prevent\u003d\"start(\u0027GeoHandler\u0027,{})\"\u003e Show Location \u003c/button\u003e\n\u003c/div\u003e",
        "APPLICATION_ID": 2621,
        "CATEGORY_ID": 4980,
        "JS_CODE": "null",
        "BUILDER_JSON": null,
        "TYPE": null,
        "CSS_CODE": "null",
        "JSON": "null",
        "OWNER_ID": 541,
        "CATEGORY_NAME": "GeoPage",
        "IS_CACHE": "true",
        "IS_WRITABLE": 1,
        "IS_SECURE": 0
    }, {
        "ID": 6363,
        "NAME": "WatchLocation",
        "TITTLE": null,
        "URL": "/watch_location",
        "DESCRIPTION": null,
        "TEMPLATE": " \u003cdiv\u003e\n        \u003ch6\u003eGeoApplication through our.appup.com. Click on Watch your location\u003c/h6\u003e\u003cbr\u003e\n        \u003cbutton  @click.prevent\u003d\"start(\u0027GeoWatcher\u0027,{})\"\u003e Watch my location \u003c/button\u003e\n\u003c/div\u003e",
        "APPLICATION_ID": 2621,
        "CATEGORY_ID": 4980,
        "JS_CODE": "null",
        "BUILDER_JSON": null,
        "TYPE": null,
        "CSS_CODE": "null",
        "JSON": "null",
        "OWNER_ID": 541,
        "CATEGORY_NAME": "GeoPage",
        "IS_CACHE": "false",
        "IS_WRITABLE": 1,
        "IS_SECURE": 0
    }, {
        "ID": 6366,
        "NAME": "Plugin ",
        "TITTLE": null,
        "URL": "/plugin",
        "DESCRIPTION": null,
        "TEMPLATE": "\u003cdiv\u003e\n    \u003cappup-plugin \u003e\u003c/appup-plugin\u003e\n\u003c/div\u003e",
        "APPLICATION_ID": 2621,
        "CATEGORY_ID": 4980,
        "JS_CODE": "null",
        "BUILDER_JSON": null,
        "TYPE": null,
        "CSS_CODE": "null",
        "JSON": "null",
        "OWNER_ID": 541,
        "CATEGORY_NAME": "GeoPage",
        "IS_CACHE": "false",
        "IS_WRITABLE": 1,
        "IS_SECURE": 0
    }],
    "blocks": [],
    "globalJs": [],
    "globalCss": [],
    "handlers": [{
        "id": "GeoHandler",
        "triggerName": "GeoTrigger",
        "workflow": [{
            "id": "1",
            "type": "start",
            "next": {
                "success": "PBXF56TINHDfq"
            }
        }, {
            "id": "PBXF56TINHDfq",
            "type": "get_current_position",
            "next": {
                "failure": "PBXTWLZUqlSuC",
                "success": "PBXM2edhIhMAS"
            },
            "nodename": "GetCurrentPosition",
            "latitude": "lat",
            "longitude": "long"
        }, {
            "id": "PBXTWLZUqlSuC",
            "type": "alert",
            "next": {
                "success": "hangup"
            },
            "nodename": "Alert",
            "title": "Alert",
            "message": "Geolocation not supported"
        }, {
            "id": "PBXh0b4KP0w1U",
            "type": "alert",
            "next": {
                "success": "hangup"
            },
            "nodename": "Alert",
            "title": "Alert",
            "message": "Geolocation Success"
        }, {
            "id": "PBXM2edhIhMAS",
            "type": "js",
            "next": {
                "success": "PBXh0b4KP0w1U"
            },
            "nodename": "JS code",
            "code": "function(data,ui){\r\nalert(\"Iam in next node\");\r\nalert(data.lat)\r\nalert(data.long);\r\nconsole.log(data);\r\nconsole.log(ui);\r\n}"
        }]
    }, {
        "id": "GeoWatcher",
        "triggerName": null,
        "workflow": [{
            "id": "1",
            "type": "start",
            "next": {
                "success": "PBXFWIZv8PymZ"
            }
        }, {
            "id": "PBXoiNDEPg8Us",
            "type": "watch_position",
            "next": {
                "failure": "hangup",
                "success": "PBXyfKQcbDVuT"
            },
            "nodename": "WatchPosition",
            "handler": "demo",
            "enableHighAccuracy": "true"
        }, {
            "id": "PBXyfKQcbDVuT",
            "type": "alert",
            "next": {
                "success": "hangup"
            },
            "nodename": "Alert",
            "title": "success",
            "message": "position chnge\r\n"
        }, {
            "id": "PBXFWIZv8PymZ",
            "type": "alert",
            "next": {
                "success": "PBXoiNDEPg8Us"
            },
            "nodename": "Alert",
            "title": "Geo",
            "message": "inside watcher"
        }]
    }, {
        "id": "Hello",
        "triggerName": null,
        "workflow": [{
            "id": "1",
            "type": "start",
            "next": {
                "success": "PBX4qdACRdafS"
            }
        }, {
            "id": "PBX4qdACRdafS",
            "type": "alert",
            "next": {
                "success": "hangup"
            },
            "nodename": "Alert",
            "title": "Message",
            "message": "Hello"
        }]
    }, {
        "id": "Hello World",
        "triggerName": null,
        "workflow": [{
            "id": "1",
            "type": "start",
            "next": {
                "success": "PBXzcgtwbfSku"
            }
        }, {
            "id": "PBXzcgtwbfSku",
            "type": "alert",
            "next": {
                "success": "hangup"
            },
            "nodename": "Alert",
            "title": "Message",
            "message": "Hello World"
        }]
    }],
    "plugins": [
        {
            "ID": 23,
            "APPLICATION_ID": 2621,
            "CONFIG_NAME": "TestHello",
            "PLUGIN_ID": 2,
            "OWNER_ID": 541,
            "FIELDS": "{\"event_sayHello\":\"Hello\",\"event_sayHelloWorld\":\"Hello World\"}",
            "IS_WRITABLE": 1,
            "IS_SECURE": 0
        }
    ]
}