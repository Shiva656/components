// Appup Components 
import Avatar from './components/avatar';
import Alert from './components/alert';
import Modal from './components/modal';
import Header from './components/header';
import Card from './components/card';
import Workflow from './components/workflow';
import Table2 from './components/table2/vuetable2/Vuetable.vue';
import Table2Pagination from './components/table2/vuetable2/VuetablePaginationBootstrap4.vue'

// Designer component
import appupDesigner from "./components/ui-builder/designer.vue";

// Form Input Components
import Radio from './components/inputs/radio';
import Checkbox from './components/inputs/checkbox';
import Textarea from './components/inputs/textarea';
import DropdownSelect from './components/inputs/dropdown';
import Section from './components/inputs/section';
import MergeFields from './components/inputs/merge-fields';

// Multiselect fields
import Multiselect from './components/inputs/multiselect';
import Tags from './components/inputs/tags';
import Typeahead from './components/inputs/multiselect/typeahead.vue';

import Datetime from './components/inputs/datetime';
import Audioplayer from './components/inputs/audioplayer';
import Copycode from './components/inputs/copy-code';
import File from './components/inputs/file';
import Quilljs from './components/inputs/quilljs';
import Tinymce from './components/inputs/tinymce';
import Calendar from './components/calendar';
import Chart from './components/chart';
import Upload from './components/upload';


// Form itself
import Form from './components/form';
import Formbuilder from './components/formbuilder';
import cms from './components/cms'
import cmsItem from './components/cms-item'
import dynamicHelperSamples from './components/dynamic-helper-samples'

// Filter componet
import Filter from './components/filter/filter.vue';

import Grid from './components/grid/grid.vue';

//ac-helper-form component
import HelperForm from './components/ac-helper-form/ac-helper-form.vue'
import AcHelperForm from './components/appup-helper-form/appup-helper-form.vue'
import Helper from './components/helper/helper.vue';
import CustomFieldsBuilder from './components/custom-fields/custom-fields-builder.vue';
import HelperRenderer from './components/helper/helper-renderer.vue';
import SimpleFilter from './components/simple-filter/SimpleFilter.vue'
//500apps
import AppsLauncher from './components/apps-launcher/AppsLauncher.vue'
import UserProfile from './components/500-components/user_profile/UserProfile.vue'
import ChangePassword from './components/500-components/change_password/ChangePassword.vue'
import InviteUser from "./components/500-components/invite_user/InviteUser.vue"
import ActivityMeter from "./components/500-components/activity_mater/ActivityMeter.vue"

import OnboardMeter from "./components/onboard-meter/"
// Plugins
import Plugins from './components/plugins'

import form2 from './components/form2/form2.vue'

// This is a wrapper for a library. Customers using it will 
const Appup = {
	'appup-card': Card,
	// header is used in appup app
	'appup-header': Header,
	'appup-avatar': Avatar,
	// Used in form.vue
	'appup-alert': Alert,
	// Form Input Components
	'appup-radio': Radio,
	'appup-checkbox': Checkbox,
	'appup-select': DropdownSelect,
	'appup-textarea': Textarea,
	'appup-datetime': Datetime,
	'appup-audioplayer': Audioplayer,
	'appup-copycode':Copycode,
	'appup-section': Section,
	'appup-merge-fields': MergeFields,
	// Need to test file
	'appup-file': File,
	'appup-multiselect': Multiselect,
	'appup-tags': Tags,
	'appup-typeahead': Typeahead,
	'appup-workflow': Workflow,
	'appup-form': Form,
	'appup-formbuilder': Formbuilder,
	'appup-cms': cms,
	'appup-cms-item': cmsItem,
	'appup-helper-samples': dynamicHelperSamples,
	'appup-modal': Modal,
	'appup-table': Table2,
	'appup-pagination': Table2Pagination,
	'appup-calendar': Calendar,
	'appup-chart': Chart,
	'appup-upload': Upload,
	'appup-quilljs': Quilljs,
	'appup-tinymce': Tinymce,
	'appup-filter': Filter,
	'appup-grid': Grid,
	'appup-helper-form': AcHelperForm,

	'ac-helper-form': HelperForm,
	'ac-helper': Helper,
	'appup-custom-fields-builder': CustomFieldsBuilder,
	'ac-helper-renderer': HelperRenderer,
	'ac-simple-filter': SimpleFilter,

	//500apps
	'apps-launcher': AppsLauncher,
	'apps-profile': UserProfile,
	'apps-security': ChangePassword,
	'apps-invite': InviteUser,
	'apps-meter': ActivityMeter,
	'apps-onboard-meter': OnboardMeter,

	// Plugins
	'appup-plugin': Plugins,
	'appup-form2': form2,

	//Designer
	'appup-designer': appupDesigner
};

export default Appup;
