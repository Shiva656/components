import Vue from 'vue';
import App from './App.vue'

let _forEach = require('lodash.foreach');

Vue.config.productionTip = false

import router from './router'

// Loading
import Loading from './loading'

// Workflow JSON for Nodes
var WorkflowJSON = [];

// Download the JSON, init and add the routes
import AppupCore from './appup'
AppupCore.start('1014').then(() => {
  CoreData();
});
window.loadNextApp = function (app_link) {
  AppupCore.download_app(app_link).then(() => {
    CoreData();
  });
}
function CoreData() {
  // Append the routers
  router.addRoutes(AppupCore.Routes)

  // Set the workflow handlers an the UI JSON
  WorkflowJSON = window.WorkflowJSON = AppupCore.WorkflowJSON;
  window.WorkflowJSON = WorkflowJSON;
  window.UIJSON = AppupCore.UIJSON
  window.appJSON = AppupCore.appJSON;

  // set global object for data communication
  window.APPUP = window.APPUP || {};

  createVueInstance(router, App, window.appJSON);

  // Setup loading - not working as of now
  Loading.initRouter(router);
  Loading.initAjax();
}
Vue.component("appup-dynamic", () => import(/* webpackChunkName: "appup-dynamic" */'./components/Dynamic'));

// Register Components
import Appup from '@appup/components'
_forEach(Appup, function (value, key) {
  console.log("Key " + key)
  Vue.component(key, value);
});
console.log(Appup)


console.log(appupform)
// Import components CSS
// import 'components/dist/components.css';

import AppupHttp from '@appup/appup-components-dynamic/plugins/appup-http';
Vue.use(AppupHttp)

// Add v1, v2 components
// import 'appup-components/dist/appup-components.css';
import Appup2 from "@appup/appup-components-dynamic"
console.log("appup2 object is", Appup2);
for (let compKey in Appup2) {
  // Register components
  console.log(compKey)
  Vue.component(compKey, Appup2[compKey]);
}

// Bug: this.$route is undefined when appup-slideout component is refrenced from components package
// So adding it inside runtime components
// import Slideout from './components/slideout/Slideout.vue';
// Vue.component("appup-slideout", Slideout);
Vue.component("appup-slideout", () => import(/* webpackChunkName: "appup-slideout" */'./components/slideout/Slideout.vue'));

// Helper runtime component, which renders helpers in runtime
// Static loading as it is being used frequently
import acHelperRuntime from './components/ac-helper-runtime.vue';
Vue.component("ac-helper-runtime", acHelperRuntime);
Vue.component("ac-form-container", () => import(/* webpackChunkName: "ac-form-container" */'./components/formcontainer/Formcontainer.vue'));
Vue.component("ac-twilio", () => import(/* webpackChunkName: "ac-twilio" */'./components/twilio/twilio.vue'));
Vue.component("appup-ringcentral", () => import(/* webpackChunkName: "appup-ringcentral" */'./components/ringcentral/rcdialer.vue'));
Vue.component("appup-onsip", () => import(/* webpackChunkName: "appup-onsip" */'./components/onsipdialer/onsipdialer'));

// libraries
Vue.component("FullCalendar", () => import(/* webpackChunkName: "FullCalendar" */'./components/plugins/fullcalendar.vue'));
// Vue.component("Notifications", () => import(/* webpackChunkName: "Notifications" */'./components/plugins/vuenotifications.vue'));
Vue.component("codemirror", () => import(/* webpackChunkName: "codemirror" */'./components/plugins/codemirror.vue'));
Vue.component("appup-timeago", () => import(/* webpackChunkName: "appup-timeago" */'./components/plugins/vuetimeago.vue'));
Vue.component("ui-renderer", () => import(/* webpackChunkName: "ui-renderer" */'./components/ui-renderer.vue'));
Vue.component("ac-buildly", () => import(/* webpackChunkName: "ac-buildly" */'@appup/ac-buildly'));


import Notifications from 'vue-notification'
Vue.use(Notifications)

// Libraries
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

//Quill-editor css
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// Mixin for workflow and events
import appupform from "@appup/components/src/components/form/index"
// console.log(Appup['appup-form'])
Vue.mixin(appupform.mixins[1])
Vue.mixin(appupform.mixins[2])
Vue.mixin(appupform.mixins[3])

// Register Modal Dialogs; this will create a global AppupModalInstance. Do it after the mixin.
const template = `<appup-modal></appup-modal>`
window.modalData = {}
window.modalData.title = "Hello there"
var vm = new Vue({
  template: template,
  propsData: window.modalData,
  data: window.modalData,
  router: router
})
vm.$mount('#modals');

// Save this vue instance as we will use this for modals to avoid reregistration again
window.Vue = Vue

function createVueInstance(router, App, appJSON) {

  new Vue({
    router,
    render: h => h(App),
    mounted() {
      this.app_loaded()
    },
    data: {
      loader: false,
      appupLoaderImgSrc: "https://cdn.500apps.io/images/icons/infinity-loading.png"
    },
    methods: {
      app_loaded() {
        var handlers = appJSON.handlers;
        console.log(handlers)

        handlers.forEach(workflow => {
          if (workflow.triggerName == "app_loaded") {
            this._start(workflow.id);
          }
        });
      }
    },
  }).$mount('#app')

}
