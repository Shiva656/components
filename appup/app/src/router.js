import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import Dashboard from './views/Dashboard'
import Card from './views/Card'
import Card2 from './views/Card2'
import List from './views/List'
import CmsForm from './views/cms/CmsForm'
import CmsList from './views/cms/CmsList'
import CreatePageCms from './views/UserCms/CreatePageCms'
import UserCmsForm from './views/UserCms/UserCmsForm'
import UserCmsList from './views/UserCms/UserCmsList'
import UserCmsEditForm from './views/UserCms/UserCmsEditForm'



import Login from './views/Login'
import Signup from './views/Signup'
import Signup2 from './views/Signup2'
import Verifyemail from './views/Verifyemail'
import Forgotpassword from './views/Forgotpassword'
import App from './views/App'
import Cloud from './views/Cloud'
import Developers from './views/Developers'
import Header from './views/AppupHeader'
import Navbar from './views/Navbar'
import Editform from './views/Editform'
import Createform from './views/Createform'
import PluginEditform from './views/PluginEditform'
import Stage from './views/Stage'
import TriggersList from './views/TriggersList'
import PluginsList from './views/PluginsList'
import Publishform from './views/Publishform'
import PageHandler from './views/PageHandler'
import PageHandlerForm from './views/PageHandlerForm'
import BlockHandler from './views/BlockHandler'
import CreatePublishForm from './views/CreatePublishForm'
import AppForm from './views/AppForm'
import WorkFlowList from './views/WorkFlowList'
import PluginsOverview from './views/PluginsOverview'
import Cloudform from './views/Cloudform'
import CreateCloudform from './views/CreateCloudform'
import AddPluginDatabase from './views/AddPluginDatabase'
import AddPluginCode from './views/AddPluginCode'
import CreateBlock from './views/CreateBlock'
import CloudSettings from './views/CloudSettings'
import PluginInstall from './views/PluginInstall'
import EditWorkflows from './views/EditWorkflows'
import FilterList from './views/FilterList'
import CreateWorkflow from './views/CreateWorkflow'
import PluginConfig from './views/PluginConfig'
import PluginConfigEdit from './views/PluginConfigEdit'
import PageList from './views/PageList'
import BlockList from './views/BlockList'
import HandlerList from './views/HandlerList'
import CreatePage from './views/CreatePage'
import EditApp from './views/EditApp'
import CreateHandler from './views/CreateHandler'
import CategoryList from './views/CategoryList'
import EditCmsForm from './views/cms/EditCmsForm'
import CreateTrigger from './views/CreateTrigger'
import CreateFilter from './views/CreateFilter'
import AppjsList from './views/AppjsList'
import AppcssList from './views/AppcssList'
import AppthemeList from './views/AppthemeList'
import Workflow from './views/Workflow'
import MarketplaceServices from './views/MarketplaceServices'
import CreateApp from './views/CreateApp'
import CreateownApp from './views/CreateownApp'
import TriggerEvents from './views/TriggerEvents'
import LoggingList from './views/LoggingList'
import Calendar from './views/Calendar'
import UploadTest from './views/UploadTest'
import ShareApp from './views/ShareApp'
import UserCloud from './views/UserCloud'
import ShareSelectCloud from './views/ShareSelectCloud'
import ApplicationProperties from './views/ApplicationProperties'
import TriggerCron from './views/TriggerCron'
import Cnametext from './views/Cnametext'
import MarketplaceApp from './views/MarketplaceApp'
import CloudProperties from './views/CloudProperties'
import CreateCloudProp from './views/CreateCloudProp.vue'
import Themeeditor from './views/Themeeditor'
import FrontendPluginConfig from './views/FrontendPluginConfig'
import FrontendPluginEditform from './views/FrontendPluginEditform'
import MobilesPluginList from './views/MobilesPluginList'
import BootstrapVue from 'bootstrap-vue'
import PublishDetails from './views/PublishDetails.vue'
import HelperExtentions from './views/HelperExtentions.vue'
import PageExtentions from './views/PageExtentions.vue'
import CreateFormBuilder from './views/CreateFormBuilder.vue'
import HelpersList from './views/HelpersList.vue'
import AppVersion from './views/AppVersion.vue'
import cardBuilder from './views/cardBuilder.vue'
import CodeEditor from './views/CodeEditor.vue'
import editorList from './views/editorList.vue'
import SwaggerParams from './views/SwaggerParams'
Vue.use(BootstrapVue);

import AcHelperPage from './views/helpers/AcHelperPage.vue'

let _forEach = require('lodash.foreach');

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { fieldsBagName: 'fields' });

import Notifications from 'vue-notification'
Vue.use(Notifications)

// Include the ui.json
import UIJSON from './workflows/ui.json'

// Include all the workflows
import preload from './workflows/conf/preload.json';
import submit from './workflows/conf/submit.json';
import login from './workflows/conf/login_workflow.json';
import preferences from './workflows/conf/preferences.json';
import grid from './workflows/conf/grid.json';
import test from './workflows/conf/test_workflow.json';
import modal from './workflows/conf/modal.json';

// Append all into workflow json
var WorkflowJSON = [];
WorkflowJSON = WorkflowJSON.concat(preload).concat(submit).concat(login).concat(preferences).concat(test).concat(grid).concat(modal)

window.WorkflowJSON = WorkflowJSON;
window.UIJSON = UIJSON;

Vue.use(Router)

// Register Components
import Appup from "@appup/components"
_forEach(Appup, function (value, key) {
  console.log("Key " + key)
  Vue.component(key, value);
});

// Add v1, v2 components
// import 'appup-components/dist/appup-components.css';
// import * as Appup2 from 'appup-components';
// for (let compKey in Appup2) {
//   Vue.component(Appup2[compKey].name, Appup2[compKey]);
// }

import Appup2 from "@appup/appup-components-dynamic"
console.log("appup2 object is", Appup2);
for (let compKey in Appup2) {
  // Register components
  Vue.component(compKey, Appup2[compKey]);
}

//Quill-editor css
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";


// Mixin for workflow and events
console.log(Appup['appup-form'])
Vue.mixin(Appup['appup-form'].mixins[1])
Vue.mixin(Appup['appup-form'].mixins[2])

// Register Modal Dialogs; this will create a global AppupModalInstance. Do it after the mixin.
const template = `<appup-modal></appup-modal>`
window.modalData = {}
window.modalData.title = "Hello there"
var vm = new Vue({
  template: template,
  propsData: window.modalData,
  data: window.modalData
})
vm.$mount('#modals');

// Save this vue instance as we will use this for modals to avoid reregistration again
window.Vue = Vue

// End of Modal Dialog

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home/prefences/:entity',
      component: Settings
    },
    // Form which can be preload from route as entity. Use this for default forms.
    {
      path: '/f/:entity',
      component: Appup['appup-form'],
      props: {
        submit: "post",
        preload: "pre_load"
      }
    },
    // Edit form which preloads from url based on entity id
    {
      path: '/e/:entity/:id',
      component: Appup['appup-form'],
      props: {
        submit: "put",
        preload: "pre_load_edit"
      }
    },
    {
      path: '/app/cmslist/:cloudId/:appId/:entity/:ID',
      component: CmsList
    },
    {
      path: '/app/usercmslist/:cloudId/:appId/:entity/:ID',
      component: CmsList
    },
    {
      path: '/app/create/:cloudId/:appId/:entity',
      component: Createform
    },
    {
      path: '/home/cloud/create/:entity/:id',
      component: Publishform
    },
    {
      path: '/Upload-test',
      component: UploadTest
    },
    {
      path: '/home/create/new/:entity/:cloudId/:appId',
      component: Createform
    },
    {
      path: '/create/cmsform/:cloudId/:appId/:templateId',
      component: CmsForm
    },
    {
      path: '/create/usercmsform/:cloudId/:appId/:templateId',
      component: CmsForm
    },
    {
      path: '/create/:cloudId/:appId/:entity',
      component: Createform
    },
    {
      path: '/create/filters/:cloudId/:appId/:entity',
      component: CreateFilter
    },
    {
      path: '/create/triggers/:cloudId/:appId/:entity',
      component: CreateTrigger
    },
    {
      path: '/create/page/:cloudId/:appId/:entity',
      component: CreatePage
    },
    {
      path: '/appcms/:type/template/:cloudId/:appId/:entity',
      component: CreatePageCms
    },
    {
      path: '/appcms/:type/:cloudId/:appId/:entity/:iswritable/:id',
      component: CreatePageCms
    },
    {
        path: '/cmsitemsedit/:cloudId/:appId/:entity/:templateId/:id',
        component: CmsForm
    },
    {
      path: '/usercmsedit/:cloudId/:appId/:entity/:templateId/:id',
      component: CmsForm
  },
    {
      path: '/create/new/:cloudId/:appId/:entity/:templateId*',
      component: CreateHandler
    },
    {
      path: '/create/stage/:cloudId/:appId/:entity',
      component: CreatePublishForm
    },
    {
      path: '/create/:entity',
      component: Createform
    },
    {
      path: '/home/create/:entity',
      component: CreateCloudform
    },
    {
      path: '/home/:entity/:id',
      component: Createform
    },
    {
      path: '/app/pages/create/:cloudId/:appId/:entity/:id',
      component: PageHandlerForm
    },
    {
      path: '/app/blocks/create/:cloudId/:appId/:entity/:id',
      component: PageHandlerForm
    },
    {
      path: '/new/:entity/:cloudName/:id',
      component: AppForm
    },
    {
      path: '/edit/:entity/:id',
      component: Editform
    },
    {
      path: '/home/edit/:entity/:cloudName/:id',
      component: EditApp
    },
    {
      path: '/home/edit/:entity/:id',
      component: Cloudform
    },
    {
      path: '/edit/:cloudId/:appId/:entity/:id',
      component: Editform
    },
    {
      path: '/editcmshandler/:cloudId/:appId/:entity/:id/:templateId',
      component: Editform
    },
    {
      path: '/app/edit/:cloudId/:id/:entity',
      component: Editform
    },
    {
      path: '/edit/plugin/:cloudId/:appId/:entity/:id',
      component: PluginEditform
    },
    {
      path: '/edit/workflow/:cloudId/:appId/:entity/:id',
      component: EditWorkflows
    },
    {
      path: '/edit/filter/:cloudId/:appId/:entity/:id',
      component: Editform
    },
    {
      path: '/create/workflow/:cloudId/:appId/:entity',
      component: CreateWorkflow
    },
    {
      path: 'app/edit/:cloudId/:appId/:entity/:id',
      component: Editform
    },
    // Custom forms or custom route where we want to hide the entity in the route. pass as param.
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/signup/2',
      component: Signup2
    },
    {
      path: '/verify-email',
      component: Verifyemail
    },
    {
      path: '/forgot-password',
      component: Forgotpassword
    },
    {
      path: '/:entity/:appId/new',
      component: App
    },
    {
      path: '/:entity/new',
      component: Cloud
    },
    {
      path: '/cloud/:cloudId',
      component: Settings
    },
    {
      path: '/dashboard/:entity',
      component: Dashboard
    },
    {
      path: '/app/:cloudId/:appId/:entity',
      component: Card
    },
    {
      path: '/app2/:cloudId/:appId/:entity',
      component: Card2
    },
    {
      path: '/app3/:cloudId/:appId/:entity',
      component: List
    },
    {
      path: '/app/pages/:cloudId/:appId/:entity/:id',
      component: PageHandler
    },
    {
      path: '/app/blocks/:cloudId/:appId/:entity/:id',
      component: BlockHandler
    },
    {
      path: '/home/cloud/:entity/:id',
      component: Stage
    },
    {
      path: '/list/:entity',
      component: Card
    },
    {
      path: '/home/:entity',
      component: Dashboard
    },
    {
      path: '/app/dev/:cloudId/:appId/:entity',
      component: Developers
    },
    {
      path: '/header',
      component: Header
    },
    {
      path: '/navbar',
      component: Navbar
    },
    {
      path: '/app/triggerlist/:cloudId/:appId/:entity',
      component: TriggersList
    },
    {
      path: '/app/filterlist/:cloudId/:appId/:entity',
      component: FilterList
    },
    {
      path: '/app/plugin/:cloudId/:appId/:entity',
      component: PluginsList
    },
    {
      path: '/app/pluginlist/:cloudId/:appId/:entity',
      component: PluginInstall
    },
    {
      path: '/app/pluginlist/:cloudId/:appId/:entity/:type',
      component: PluginInstall
    },
    {
      path: '/app/plugin/config/:cloudId/:appId/:entity',
      component: PluginConfig
    },
    {
      path: '/edit/plugin/:pluginId/config/:cloudId/:appId/:entity/:id',
      component: PluginConfigEdit
    },
    {
      path: '/app/workflowlist/:cloudId/:appId/:entity',
      component: WorkFlowList
    },
    {
      path: '/app/pagelist/:cloudId/:appId/:entity',
      component: PageList
    },
    {
      path: '/app/handlerlist/:cloudId/:appId/:entity',
      component: HandlerList
    },
    {
      path: '/app/categorylist/:cloudId/:appId/:entity',
      component: CategoryList
    },
    {
      path: '/app/appjslist/:cloudId/:appId/:entity',
      component: AppjsList
    },
    {
      path: '/app/appcsslist/:cloudId/:appId/:entity',
      component: AppcssList
    },
    {
      path: '/app/appthemelist/:cloudId/:appId/:entity',
      component: AppthemeList
    },
    {
      path: '/app/blocklist/:cloudId/:appId/:entity',
      component: BlockList
    },
    {
      path: '/app/pluginoverview/:cloudId/:appId/:entity',
      component: PluginsOverview
    },
    {
      path: '/create-plugin/:appId/:cloudId/:entity',
      component: AddPluginDatabase
    },
    {
      path: '/addplugin-code',
      component: AddPluginCode
    },
    {
      path: '/create-block/:cloudId/:appId/:entity',
      component: CreateBlock
    },
    {
      path: '/cloud-settings',
      component: CloudSettings
    },
    {
      path: '/create/workflowlist/:cloudId/:appId/:entity',
      component: Workflow
    },
    {
      path: '/create/workflowlist/:cloudId/:appId/:entity/:type',
      component: Workflow
    },
    {
      path: '/edit/workflow/go/:cloudId/:appId/:entity/:id',
      component: EditWorkflows
    },
    {
      path: '/marketplace/:entity',
      component: MarketplaceServices
    },
    {
      path: '/dashboard/app/createapp/:cloudName/:id',
      component: CreateApp
    },
    {
      path: '/trigger/:entity/:cloudId/:appId/events',
      component: TriggerEvents
    },
    {
      path: '/trigger/:entity/:cloudId/:appId/triggers',
      component: TriggerCron
    },
    {
      path: '/app/logging/:cloudId/:appId/:entity',
      component: LoggingList
    },
    {
      path: '/calendar-test',
      component: Calendar
    },
    {
      path: '/home/share/:entity/:cloudName/:id',
      component: ShareApp
    },
    {
      path: '/home/user/:cloudId/:appId/:entity',
      component: UserCloud
    },
    {
      path: '/app/copy/:cloudId/:appId/:entity/:id',
      component: UserCloud
    },
    {
      path: '/shareapp/cloud/share/:entity',
      component: ShareSelectCloud
    },
    {
      path: '/application/:cloudId/:appId/:entity',
      component: ApplicationProperties
    },
    {
      path: '/edit/properties/:cloudId/:appId/:entity/:id',
      component: Editform
    },
    {
      path: '/home/prefences/settings/:entity',
      component: Createform
    },
    {
      path: '/marketplaceapp/:entity/:ID',
      component: UserCloud
    },
    {
      path: '/oauth/:entity',
      component: Dashboard
    },
    {
      path: '/cname/:entity/:parententity/:id',
      component: Cnametext
    },
    {
      path: '/theme-editor/:appId/:id?',
      component: Themeeditor
    },
    {
      path: '/create/app/:cloudName/:cloudId/:entity',
      component: CreateownApp
    },
    {
      path: '/marketplaceapp/app/:cloudId/:entity',
      component: MarketplaceApp
    },
    {
      path: '/marketplaceapp/app/:cloudId/:entity/:type/:id',
      component: MarketplaceApp
    },
    {
      path: '/editType/:cloudId/:appId/:entity/:type/:id',
      component: Editform
    },
    {
      path: '/cloudprop/:cloudId/:entity',
      component: CloudProperties
    },
    {
      path: '/create-cloud-prop/:cloudId/:appId/:entity',
      component: CreateCloudProp
    },
    {
      path: '/edit-cloud-prop/:cloudId/:entity/:id',
      component: Editform
    },
    {
      path: '/editworkflowType/workflow/:cloudId/:appId/:entity/:type/:id',
      component: EditWorkflows
    },
    {
      path: '/edit/plugin/:pluginId/config/:cloudId/:appId/:entity/:type/:id',
      component: PluginConfigEdit
    },
    {
      path: '/editType/filter/:cloudId/:appId/:entity/:type/:id',
      component: Editform
    },
    {
      path: '/edittype/plugin/:pluginId/config/:cloudId/:appId/:entity/:type/:id',
      component: PluginConfigEdit
    },
    {
      path: '/publishdetail/publish/:clusterID',
      component: PublishDetails
    },
    {
      path: '/helper/:cloudId/:appId/extentions',
      component: HelperExtentions
    },
    {
      path: '/:entity/:cloudId/:appId/extentions',
      component: PageExtentions
    },
    {
      path: '/helper/:cloudId/:appId/form/:templateID*',
      component: CreateFormBuilder
    },
    {
      path: '/helper/:cloudId/:appId/formEdit/:ID/:templateID*',
      component: CreateFormBuilder
    },
    {
      path: '/helper/:cloudId/:appId/ac-helper/:component',
      component: AcHelperPage
    },
    {
      path: '/helper/:cloudId/:appId/ac-helper/:component/:ID',
      component: AcHelperPage
    },
    {
      path:'/app/mobileplugin/config/:cloudId/:appId/:entity',
      component:FrontendPluginConfig
    },
    {
      path:'/app/mobilepluginslist/:cloudId/:appId/:entity',
      component:MobilesPluginList
    },
    {
      path: '/edit/mobileplugin/:cloudId/:appId/:entity/:id',
      component: FrontendPluginEditform
    },
    {
      path: '/app/helperslist/:cloudId/:appId/:entity',
      component: HelpersList
    },
    {
      path: '/home/:entity/:cloudId/:appId',
      component: AppVersion
    },
    {
      path: '/cmsHelper/:cloudId/:appId/cmsCardBuilder/:templateID',
      component: cardBuilder
    },
    {
      path: '/helper/:cloudId/:appId/cardBuilder',
      component: cardBuilder
    },
    {
      path: '/helper/:cloudId/:appId/cardBuilder/:ID',
      component: cardBuilder
    },
    {
      path: '/cmsHelper/:cloudId/:appId/cmsCardBuilder/:ID/:templateID',
      component: cardBuilder
    },
    {
      path: '/app/codeeditor/:cloudId/:appId/:entity',
      component: CodeEditor
    },
    {
      path: '/edit/editor/:cloudId/:appId/:entity/:ID',
      component: CodeEditor
    },
    {
      path: '/app/editorlist/:cloudId/:appId/:entity',
      component: editorList
    },
    {
      path: '/params/:entity/:cloudId/:appId/:trigId/:wfId',
      component: SwaggerParams
    },
    {
      path: '/add/:entity/:cloudId/:appId/:trigId/:wfId',
      component: CreateHandler
    },
    {
      path: '/edit/:entity/param/:cloudId/:appId/:trigId/:wfId/:id',
      component: Editform
    }
  ]
})