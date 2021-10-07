export default {
    // Appup Components

    'appup-avatar': () => import(/* webpackChunkName: "appup-avatar" */'./components/avatar'),
    'appup-alert': () => import(/* webpackChunkName: "appup-alert" */'./components/alert'),
    'appup-modal': () => import(/* webpackChunkName: "appup-modal" */'./components/modal'),
    'appup-header': () => import(/* webpackChunkName: "appup-header" */'./components/header'),
    'appup-card': () => import(/* webpackChunkName: "appup-card" */'./components/card'),
    'appup-workflow': () => import(/* webpackChunkName: "appup-workflow" */'./components/workflow'),
    'appup-table': () => import(/* webpackChunkName: "appup-table" */'./components/table2/vuetable2/Vuetable.vue'),
    'appup-pagination': () => import(/* webpackChunkName: "appup-pagination" */'./components/table2/vuetable2/VuetablePaginationBootstrap4.vue'),

    
    // Designer component
    'appup-designer': () => import(/* webpackChunkName: "appup-designer" */'./components/ui-builder/designer.vue'),
    
    // Form Input Components
    'appup-radio': () => import(/* webpackChunkName: "appup-radio" */'./components/inputs/radio'),
    'appup-checkbox': () => import(/* webpackChunkName: "appup-checkbox" */'./components/inputs/checkbox'),
    'appup-textarea': () => import(/* webpackChunkName: "appup-textarea" */'./components/inputs/textarea'),
    'appup-select': () => import(/* webpackChunkName: "appup-select" */'./components/inputs/dropdown'),
	  'appup-section': () => import(/* webpackChunkName: "appup-section" */'./components/inputs/section'),
		'appup-merge-fields': () => import( /* webpackChunkName: "appup-merge-fields" */ './components/inputs/merge-fields'),
   
    // Multiselect fields
    'appup-multiselect': () => import(/* webpackChunkName: "appup-multiselect" */'./components/inputs/multiselect'),
    'appup-tags': () => import(/* webpackChunkName: "appup-tags" */'./components/inputs/tags'),
    'appup-typeahead': () => import(/* webpackChunkName: "appup-tags" */'./components/inputs/multiselect/typeahead.vue'),
    'appup-datetime': () => import(/* webpackChunkName: "appup-datetime" */'./components/inputs/datetime'),
    'appup-audioplayer': () => import(/* webpackChunkName: "appup-audioplayer" */'./components/inputs/audioplayer'),
    'appup-copycode': () => import(/* webpackChunkName: "appup-copycode" */'./components/inputs/copy-code'),
    'appup-file': () => import(/* webpackChunkName: "appup-file" */'./components/inputs/file'),
    'appup-quilljs': () => import(/* webpackChunkName: "appup-quilljs" */'./components/inputs/quilljs'),
    'appup-tinymce': () => import(/* webpackChunkName: "appup-tinymce" */'./components/inputs/tinymce'),
    'appup-calendar': () => import(/* webpackChunkName: "appup-calendar" */'./components/calendar'),
    'appup-chart': () => import(/* webpackChunkName: "appup-chart" */'./components/chart'),
    'appup-upload': () => import(/* webpackChunkName: "appup-upload" */'./components/upload'),

    // Form itself
    'appup-form': () => import(/* webpackChunkName: "appup-form" */'./components/form'),
    'appup-formbuilder': () => import(/* webpackChunkName: "appup-formbuilder" */'./components/formbuilder'),
    'appup-cms': () => import(/* webpackChunkName: "appup-cms" */'./components/cms'),
    'appup-cms-item': () => import(/* webpackChunkName: "appup-cms-item */'./components/cms-item'),
    'appup-helper-samples': () => import(/* webpackChunkName: "appup-helper-samples" */'./components/dynamic-helper-samples'),

    // Filter componet
    'appup-filter': () => import(/* webpackChunkName: "appup-filter" */'./components/filter/filter.vue'),
    'appup-grid': () => import(/* webpackChunkName: "appup-grid" */'./components/grid/grid.vue'),

    //ac-helper-form component
    'ac-helper-form': () => import(/* webpackChunkName: "ac-helper-form" */'./components/ac-helper-form/ac-helper-form.vue'),
    'appup-helper-form': () => import(/* webpackChunkName: "appup-helper-form" */'./components/appup-helper-form/appup-helper-form.vue'),
    'ac-helper': () => import(/* webpackChunkName: "ac-helper" */'./components/helper/helper.vue'),
    'appup-custom-fields-builder': () => import(/* webpackChunkName: "appup-custom-fields-builder" */'./components/custom-fields/custom-fields-builder.vue'),
    'ac-helper-renderer': () => import(/* webpackChunkName: "ac-helper-renderer" */'./components/helper/helper-renderer.vue'),
    'ac-simple-filter': () => import(/* webpackChunkName: "ac-simple-filter" */'./components/simple-filter/SimpleFilter.vue'),
    
    //500apps
    'apps-launcher': () => import(/* webpackChunkName: "apps-launcher" */'./components/apps-launcher/AppsLauncher.vue'),
    'apps-profile': () => import(/* webpackChunkName: "apps-profile" */'./components/500-components/user_profile/UserProfile.vue'),
    'apps-security': () => import(/* webpackChunkName: "apps-security" */'./components/500-components/change_password/ChangePassword.vue'),
    'apps-invite': () => import(/* webpackChunkName: "apps-invite" */'./components/500-components/invite_user/InviteUser.vue'),
    'apps-meter': () => import(/* webpackChunkName: "apps-meter" */'./components/500-components/activity_mater/ActivityMeter.vue'),

    'apps-onboard-meter': () => import(/* webpackChunkName: "apps-onboard-meter" */'./components/onboard-meter/'),
    'appup-plugin': () => import(/* webpackChunkName: "appup-plugin" */'./components/plugins'),
    'appup-form2': () => import(/* webpackChunkName: "appup-form2" */'./components/form2/form2.vue'),
};