let _forEach = require('lodash.foreach');

import Appup from './appup-components';

let examplesRoutes = [];

// Global components/wrappers
examplesRoutes.push({
    path: "timeago",
    component: (resolve) => require(['../examples/appup-timeago.vue'], resolve)
});

_forEach(Appup, function (value, key) {
    examplesRoutes.push({
        path: key.replace("appup-", ""),
        component: (resolve) => require(['../examples/' + key + '.vue'], resolve)
    });
});

export default examplesRoutes;
