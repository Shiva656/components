import Vue from 'vue';
import App from './App.vue';
import router from './router';
let _forEach = require('lodash.foreach');

import { AjaxRequests } from "@/mixins/ajaxRequests";
import { Workflow } from "@/mixins/workflow";
// Register components global
import Appup from './dynamic-appup-component';
_forEach(Appup, function (value, key) {
  Vue.component(key, value);
});

// Add v1, v2 components
import AppupHttp from '@appup/appup-components-dynamic/plugins/appup-http';
Vue.use(AppupHttp)

import Appup2 from "@appup/appup-components-dynamic"
console.log("appup2 object is", Appup2);
for (let compKey in Appup2) {
  // Register components
  Vue.component(compKey, Appup2[compKey]);
}

// import '@appup/appup-components/dist/appup-components.css';
// import * as Appup2 from '@appup/appup-components';
// for (let compKey in Appup2) {
//   Vue.component(Appup2[compKey].name, Appup2[compKey]);
//   if (compKey === "AppupHttp") {
//     Vue.use(Appup2[compKey]);
//   }
// }

/**
 * Forked from https://github.com/egoist/vue-timeago
 * TODO: this need to go in appup-components.js
 */
import AppupTimeago from 'vue-timeago';
// import vueTimeagoEnUs from 'vue-timeago/locales/en-US.json';
Vue.use(AppupTimeago, {
  name: 'appup-timeago'
});

//Quill-editor css
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import VueKonva from 'vue-konva'

Vue.use(VueKonva);

/**
 * Register bootstrap vue components globally
 * Note: This will not include in component library
 */
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

/**
 * To test forms for development
 */
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Include the ui.json
import UIJSON from './workflows/ui.json';
import workflow from './workflows/workflow.json';

// Append all into workflow json
var WorkflowJSON = [];
WorkflowJSON = WorkflowJSON.concat(workflow);

window.WorkflowJSON = WorkflowJSON;
window.UIJSON = UIJSON;
window.APPUP = {};


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
