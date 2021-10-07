import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'vue-awesome/icons'
 
/* Register component with one of 2 methods */
 
import Icon from 'vue-awesome/components/Icon'
 
// globally (in your main .js file)
Vue.component('icon', Icon)

// Codemirror
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
// import FullCalendar from "vue-full-calendar";
import VueCookies from "vue-cookies";
// import VueSlideoutPanel from 'vue2-slideout-panel'

// import "fullcalendar/dist/fullcalendar.min.css";

Vue.component("FullCalendar", () => import(/* webpackChunkName: "FullCalendar" */'./components/fullcalendar.vue'));

// Register all next version components


// Add v1, v2 components
import AppupHttp from '@appup/appup-components-dynamic/plugins/appup-http';
Vue.use(AppupHttp)

import Appup2 from "@appup/appup-components-dynamic"
console.log("appup2 object is", Appup2);
for (let compKey in Appup2) {
  // Register components
  Vue.component(compKey, Appup2[compKey]);
}

// Vue.use(FullCalendar);
Vue.use(VueCookies);
// Vue.use(VueSlideoutPanel);
Vue.use(VueCodemirror, /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

// Bootstrap
//import '@/styles/scss/fonts/fonts.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-vue/dist/bootstrap-vue.css';

//import 'bootstrap/scss/bootstrap.scss';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

