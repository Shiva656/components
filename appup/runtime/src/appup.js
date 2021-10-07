// Default HTTP in vuejs - could not understand how to do default method. Hence, axios
import axios from 'axios'

// Notifications for alerts
import Vue from 'vue';

// Vee validate for custom validations
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)

// Handlebars
import Handlebars from 'handlebars/dist/handlebars.js';

import customRules from './custom-validations';

import appupPlugins from '@appup/plugins';

let _find = require('lodash.find');
let _filter = require('lodash.filter');

/**
 * @main
 */
const AppupCore = {

	// Routes to init the router view
	Routes: [],

	// Components array which can be referenced as blocks in other pages/blocks
	Components: {},

	// Workflow JSON
	WorkflowJSON: [],

	// UI JSON
	UIJSON: {},

	// Reference of application json
	appJSON: {},

	//Referance of app
	app: '',
	/**
	* This is the start of the Application. It takes the application json
	* 
	* @param {String} url - The Application UI JSON Path
	*/
	start: function () {

		// Get Params from URL
		let id = this.getUrlVars()["id"];
		//if(!id)
		//    id = 1014;

		// If debug param is not true or id doesn't exist then disable console.log
		if ((this.getUrlVars()["id"] == undefined) && (this.getUrlVars()["debug"] != 'true')) {
			window.console.log = function () { };
		}

		// Since data is not coming from database for the time being hardcoded to run everytime
		// Pass URL param
		this.loadCssTheme(this.getUrlVars()["t"]);

		// Send a promise back for the callee to know when the operation is completed
		return new Promise((resolve, reject) => {

			if (id) {
				// Process request from runtime which is based on '?id'
				this.download_id(id).then(response => {

					this.init(response)
					resolve()
				});
			}
			else {
				// Process internal request
				this.download_internal().then(response => {

					this.init(response)
					resolve()

				});
			}
		});

	},
	download_internal: function (callback) {
		// Set local Request URL
		let url = './apps/app.js';

		return new Promise((resolve, reject) => {

			// Single axios request to fetch local app.js
			axios.get(url).then(function (consolidatedResponse) {
				// Send response to normal execution process
				resolve(consolidatedResponse.data)
			});
		});
	},
	download_app: function (app_link) {
		let _this = this
		return new Promise((resolve, reject) => {

			// Single axios request to fetch app.js
			axios.get(app_link).then(function (consolidatedResponse) {
				// Send response to normal execution process
				_this.init(consolidatedResponse.data)
				resolve()
			});
		});
	},
	download_id: function (id, callback) {
		// app
		let appId = { 'app_id': id };

		// Promises
		let promises = [];

		// Request URL's
		let urls = [];

		// App trigger expression
		let trigger = "";

		//Table names
		let table_names = [];

		// Verifying for new/old appup
		if (window.location.host.split('.', 1)[0] === "appup") {
			trigger = "/v2/";
			table_names = ["pages", "blocks", "app_js", "app_css", "ui_application_plugin_config", "page_items", "page_templates", "applications"];
		} else {
			trigger = "/appdb/_db/";
			table_names = ["PAGES", "BLOCKS", "APP_JS", "APP_CSS", "UI_APPLICATIOIN_PLUGIN_CONFIG", "PAGE_ITEMS", "PAGE_TEMPLATE", "APPLICATION"];
		}

		urls.push({ 'key': 'pages', 'url': this.hb(trigger + table_names[0] + '?where=APPLICATION_ID={{app_id}}', appId) })
		urls.push({ 'key': 'blocks', 'url': this.hb(trigger + table_names[1] + '?where=APPLICATION_ID={{app_id}}', appId) })
		//urls.push({'key' : 'handlers', 'url' : this.hb('/appdb/_db/HANDLER?where=APPLICATION_ID={{app_id}}', appId)})
		urls.push({ 'key': 'handlers', 'url': this.hb('/app-ui/{{app_id}}/handler', appId) })

		// Get global JS and add to json
		urls.push({ 'key': 'globalJS', 'url': this.hb(trigger + table_names[2] + '?fields=ID,NAME,JS_CODE&where=APPLICATION_ID={{app_id}}', appId) })
		urls.push({ 'key': 'globalCSS', 'url': this.hb(trigger + table_names[3] + '?fields=ID,NAME,CSS_CODE&where=APPLICATION_ID={{app_id}}', appId) })

		urls.push({ 'key': 'plugins', 'url': this.hb(trigger + table_names[4] + '?fields=ID,FIELDS&where=APPLICATION_ID={{app_id}}', appId) })

		urls.push({ 'key': 'pagesItems', 'url': this.hb(trigger + table_names[5] + '?where=APPLICATION_ID={{app_id}}', appId) })

		urls.push({ 'key': 'pageTemplates', 'url': this.hb(trigger + table_names[6] + '?where=APPLICATION_ID={{app_id}}', appId) })

		urls.push({ 'key': 'cmsTemplates', 'url': this.hb('/sso/_db/{{app_id}}/CMS_PAGES', appId) })

		urls.push({ 'key': 'app', 'url': this.hb(trigger + table_names[7] + '?fields=NAME&where=ID={{app_id}}', appId) })


		// Get each URL and push it to key
		urls.forEach(url => {
			promises.push(
				axios({
					url: url.url,
					method: 'GET',
				})
			)
		});

		// Send a promise back
		return new Promise((resolve, reject) => {

			// Download 
			let response = {};

			axios.all(promises).then(axios.spread(
				function (pages, blocks, handlers, globalJS, globalCSS, plugins, pagesItems, pageTemplates, cmsTemplates, app) {
					response.pages = pages.data
					response.blocks = blocks.data
					response.handlers = handlers.data
					response.globalJS = globalJS.data
					response.globalCSS = globalCSS.data
					response.plugins = plugins.data
					response.pagesItems = pagesItems.data
					response.pageTemplates = pageTemplates.data
					response.cmsTemplates = cmsTemplates.data
					response.app = app.data

					// console.log (response)

					// Callback response
					resolve(response)
				}));
		});
	},
	init: function (json) {
		// Store application json for furture usage, like searching pages based on route/path
		if (window.location.host.split('.', 1)[0] === "appup") {
			// Need to convert capital case
			this.appJSON = Object.keys(json).reduce((n, k) => (
				n[k] = json[k].map(item => Object.fromEntries(Object.entries(item).map(([key, val]) => [
					key.toUpperCase(),
					val
				]))), n

			), {});
		} else {
			this.appJSON = json;
		}


		this.initPreload(json.globalJS);
		if (json.app) {
			if (json.app.length != 0) {
				this.app = json.app[0].NAME;
			}
		}


		// CMS PAGE ITEMS
		if (json.pagesItems) {
			let itemPages = this.getItemPages(json.pagesItems);
			json.pages = json.pages.concat(itemPages);
			// json.blocks = JSON.parse(json.pages.HELPER_JSON);
		}

		if (json.pageTemplates) {
			json.pages = json.pages.concat(json.pageTemplates)
		}

		// Init Pages
		this.initPages(json.pages)

		// Init Blocks

		this.initBlocks(json.blocks)

		// Init Handles
		this.initHandlers(json.handlers)
		// Init Globals
		this.initGlobals(json.globalJS, json.globalCSS)
		// Init App
		//init(app)
		//Init plugins
		this.initPlugins(json.plugins);

	},

	getItemPages: function (items) {
		for (let i = 0; i < items.length; i++) {
			let templateObj = this.getPageTempate(items[i].TEMPLATE_ID);
			// let template = this.getPageTempate(items[i].TEMPLATE_ID);
			if (items[i].ITEM_JSON && templateObj) {
				items[i].URL = templateObj.templateURL + items[i].URL
				items[i].TEMPLATE = this.compileItemWithTemplate(templateObj.template, JSON.parse(items[i].ITEM_JSON));
			}
		}
		return items;
	},

	compileItemWithTemplate: function (template, itemsJson) {
		var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
		var innerProps = {}
		if (this.app) {
			itemsJson["portal_app_navbar"] = "portal_" + this.app + "_navbar"
			itemsJson["app_navbar"] = this.app + "_navbar"
			itemsJson["app_footer"] = this.app + "_footer"
		}
		for (var prop in itemsJson) {
			var helpername;
			if (isHTML(itemsJson[prop])) {
				helpername = '<' + prop + '>' + '</' + prop + '>';
			} else {
				helpername = prop;
			}
			if (prop.indexOf("uc_slideout") != -1) {
				helpername = prop.replace("uc_slideout_", "");
			}
			if (helpername == "size" || helpername == "parent-route") {
				innerProps[helpername] = itemsJson[prop];
			} else {
				template = template.replace(new RegExp(helpername, "g"), itemsJson[prop]);
			}
		}
		if (Object.keys(innerProps).length > 0) {
			var propsData = this.getAppupSlideoutPage(template, "CMS_Template")
			if (propsData) {
				for (var prop in innerProps) {
					if (prop === "parent-route" && innerProps[prop] && propsData[prop]) {
						let innerattrs = innerProps[prop].split("?");
						if (innerattrs.length === 1) {
							innerattrs.push("");
						}
						let propdataattrs = propsData[prop].split("?")
						for (var i = 0; i < innerattrs.length; i++) {
							template = template.replace(new RegExp(propdataattrs[i], "g"), innerattrs[i]);
						}
					} else {
						template = template.replace(new RegExp(propsData[prop], "g"), innerProps[prop]);
					}

				}
			}

		}
		return template;
	},

	getPageTempate(templateId) {
		let templateObj = this.appJSON.cmsTemplates.find(obj => obj.ID === templateId);
		if (templateObj) {
			return { template: templateObj.TEMPLATE, templateURL: templateObj.URL };
			// return templateObj.TEMPLATE
		} else {
			return null;
		}
	},
	initPreload: function (js) {
		if (js) {
			js.find(jscript => {
				if (jscript.NAME == "Appup_Preload_Urls") {
					let script_links = eval(jscript.JS_CODE)
					for (var i = 0; i <= (script_links.length - 1); i++) {
						this.addScript(script_links[i], 'preload_js_' + [i]);
					}
				}
				if (jscript.NAME == "Appup_Preload_Data") {
					let script_data = eval(jscript.JS_CODE)
					this.addScript(script_data, 'preload_data');
				}
			});
		}
	},
	initPages: function (pages) {

		// We store each page component as Appup1, Appup2 etc.
		let componentsIndex = 0;

		// For each page
		pages.forEach(page => {

			// Init Component
			let componentName = "Appup" + componentsIndex++;
			const component = this.initComponent(componentName, page);
			let children = [];

			// Add child route if appup-slideout tag exists in template
			if (page.TEMPLATE) {
				let childRoute = this.getAppupSlideoutPage(page.TEMPLATE, componentName);
				if (childRoute) {
					children.push(childRoute);
				}
			}

			// Store it in router
			var route = {
				path: page.URL,
				name: page.NAME,
				component: component,
				meta: {
					// set page as cache
					keepAlive: (page.IS_CACHE === 'true') ? true : false,
					url: page.URL,
				},
				beforeEnter: (to, from, next) => {
					// set page name to route title
					document.title = page.NAME;
					next();
				},
				children: children
			};
			this.Routes.push(route);

		})
	},
	// Inits Page and Block and returns component
	initComponent: function (name, component) {
		try {
			// Construct Component
			let componentJSON = {}
			componentJSON.template = component.TEMPLATE

			// Form block extension - Create component template based on block COMPONENT_JSON
			if (component.TYPE == "FORM" && component.COMPONENT_JSON) {
				let formJson = JSON.parse(component.COMPONENT_JSON);
				// Add json to global object with block name property
				this.UIJSON[name] = formJson;

				let formProps = "{}";
				let componentRefName = "";
				let formType = null;
				if (formJson.meta.formType) {
					formType = formJson.meta.formType;
				}
				try {
					formProps = JSON.stringify(formJson.meta.props);
					componentRefName = formJson.meta.props.refs;
				} catch (error) {
					formProps = "{}";
				}

				let formHandlers = {
					preload: "",
					submit: ""
				};
				try {
					formHandlers.preload = JSON.stringify(formJson.meta.preload);
					formHandlers.submit = JSON.stringify(formJson.meta.submit);
				} catch (error) {
					// For single handler given as name
					formHandlers.preload = formJson.meta.preload;
					formHandlers.submit = formJson.meta.submit;
				}

				if (formType == "form2") {
					componentJSON.template = "<appup-form2 ref='" + componentRefName + "' v-bind='" + formProps + "' preload='" + formHandlers.preload + "' submit='" + formHandlers.submit + "' :workflow_params='{entity: \"" + name + "\"}'/>";
				} else {
					componentJSON.template = "<appup-form ref='" + componentRefName + "' v-bind='" + formProps + "' preload='" + formHandlers.preload + "' submit='" + formHandlers.submit + "' :workflow_params='{entity: \"" + name + "\"}'/>";
				}
				componentJSON.mounted = function () {
					window.APPUP.helpers = window.APPUP.helpers || {};
					window.APPUP.helpers[componentRefName] = this.$refs[componentRefName];
				};

				//Add custom validations to validator for field level
				let formCustomValidation;
				eval(`formCustomValidation = ${component.COMPONENT_JSON}`);
				if (formCustomValidation.fields && formCustomValidation.fields.length) {
					//Loopin form custom validation fields
					for (var i = 0; i < formCustomValidation.fields.length; i++) {

						//Check for custom validations
						if (formCustomValidation.fields[i].custom_validation) {

							let VALIDATION_RULES;
							try {
								eval(`VALIDATION_RULES = ${formCustomValidation.fields[i].custom_validation}`);
							} catch{
								VALIDATION_RULES = formCustomValidation.fields[i].custom_validation;
							}

							if (VALIDATION_RULES)
								this.addToCustomRules(VALIDATION_RULES);
						}
						//Custom validations for grid type fields
						if (formCustomValidation.fields[i].type && formCustomValidation.fields[i].type == 'grid') {
							for (var j = 0; j < formCustomValidation.fields[i].formJson.length; j++) {

								let VALIDATION_RULES_GRID;
								try {
									eval(`VALIDATION_RULES_GRID = ${formCustomValidation.fields[i].formJson[j].custom_validation}`);
								} catch{
									VALIDATION_RULES_GRID = formCustomValidation.fields[i].formJson[j].custom_validation;
								}

								if (VALIDATION_RULES_GRID)
									this.addToCustomRules(VALIDATION_RULES_GRID);
							}
						}

					}

				}

			}
			// form builder component
			else if (component.TYPE == "ac-formbuilder" && component.COMPONENT_JSON) {
				let formJson = {};
				formJson = JSON.parse(component.COMPONENT_JSON);
				this.UIJSON[name] = formJson.formdata;

				let formProps = {};
				let componentRefName = "";
				let formType = null;
				if (this.UIJSON[name].select_form_type) {
					formType = this.UIJSON[name].select_form_type;
				}

				//Add keys to formJson
				if (this.UIJSON[name].keys && this.UIJSON[name].keys.length) {
					for (var i = 0; i < this.UIJSON[name].keys.length; i++) {
						this.UIJSON[name][this.UIJSON[name].keys[i].key] = this.UIJSON[name].keys[i].value;
					}

				}
				try {
					formProps["inline"] = this.UIJSON[name].inline_form;
					formProps["inlineLabels"] = this.UIJSON[name].inline_labels;
					formProps["refs"] = this.UIJSON[name].refs;
					formProps["sections"] = this.UIJSON[name].sections;
					formProps["section_classes"] = this.UIJSON[name].section_classes;
					formProps["form_group_class"] = this.UIJSON[name].form_group_class;
					formProps["button_group_class"] = this.UIJSON[name].button_group_class;
					formProps["direction"] = this.UIJSON[name].direction;
					formProps = JSON.stringify(formProps);
					componentRefName = this.UIJSON[name].refs;
				} catch (error) {
					formProps = "{}";
				}

				let formHandlers = {
					preload: "",
					submit: ""
				};
				try {
					formHandlers.preload = JSON.stringify(this.UIJSON[name].__event__preload);
					formHandlers.submit = JSON.stringify(this.UIJSON[name].__event__submit);
				} catch (error) {
					// For single handler given as name
					formHandlers.preload = this.UIJSON[name].__event__preload;
					formHandlers.submit = this.UIJSON[name].__event__submit;
				}
				if (formType == "Form-inline") {
					componentJSON.template = "<appup-form2 ref='" + componentRefName + "' v-bind='" + formProps + "' preload='" + formHandlers.preload + "' submit='" + formHandlers.submit + "' :workflow_params='{entity: \"" + name + "\"}'/>";
				} else {
					componentJSON.template = "<appup-form ref='" + componentRefName + "' v-bind='" + formProps + "' preload='" + formHandlers.preload + "' submit='" + formHandlers.submit + "' :workflow_params='{entity: \"" + name + "\"}'/>";
				}
				componentJSON.mounted = function () {
					window.APPUP.helpers = window.APPUP.helpers || {};
					window.APPUP.helpers[componentRefName] = this.$refs[componentRefName];
				};


                
				//Add custom validations to validator for field level
				let formCustomValidationFormbuilder;
				eval(`formCustomValidationFormbuilder = ${component.COMPONENT_JSON}`);
				if (formCustomValidationFormbuilder.formdata.fields && formCustomValidationFormbuilder.formdata.fields.length) {
					//Loopin form custom validation fields
					for (var i = 0; i < formCustomValidationFormbuilder.formdata.fields.length; i++) {

						//Check for custom validations
						if (formCustomValidationFormbuilder.formdata.fields[i].custom_validation) {

							let VALIDATION_RULES_FOMRBUILDER;
							try {
								eval(`VALIDATION_RULES_FOMRBUILDER = ${formCustomValidationFormbuilder.formdata.fields[i].custom_validation}`);
							} catch{
								VALIDATION_RULES_FOMRBUILDER = formCustomValidationFormbuilder.formdata.fields[i].custom_validation;
							}

							if (VALIDATION_RULES_FOMRBUILDER)
								this.addToCustomRules(VALIDATION_RULES_FOMRBUILDER);
						}

					}

				}

			}
			// Form block helpers which are created using ac helper
			else if (component.TYPE && component.COMPONENT_JSON) {
				if (component.TYPE == "ac-form-preview") {
					console.log("from form preview");
					var formJson = (JSON.parse(component.COMPONENT_JSON)).formdata;

					this.UIJSON[name] = this.UIJSON[name] = {
						fields: formJson.fields,
						buttons: formJson.buttons
					}

					//Add keys to form
					if (formJson.keys && formJson.keys.length) {
						for (var i = 0; i < formJson.keys.length; i++) {
							this.UIJSON[name][formJson.keys[i].key] = formJson.keys[i].value;
						}

					}


					let componentJson = (JSON.parse(component.COMPONENT_JSON));
					componentJson.formdata["workflow_params"] = "{\"entity\": \"" + name + "\"}";
					component.COMPONENT_JSON = JSON.stringify(componentJson);
				}
				componentJSON.props = ["params"];
				let helper_params = "";
				if (JSON.parse(component.COMPONENT_JSON).formdata.helper_params) {
					helper_params = JSON.parse(component.COMPONENT_JSON).formdata.helper_params;
					componentJSON.template = "<ac-helper-runtime type='" + component.TYPE + "' :json='" + component.COMPONENT_JSON + "' params='" + helper_params + "'/>";
				}
				else {
					componentJSON.template = "<ac-helper-runtime type='" + component.TYPE + "' :json='" + component.COMPONENT_JSON + "' :params='params'/>";
				}
			}
			// For PAGE CMS array of helpers are pushed to blocks json
			if (component.TYPE == "CMS_TEMPLATE" && component.HELPER_JSON) {
				var helper_array = [];
				var blockObj = {};
				var helpers = JSON.parse(component.HELPER_JSON)
				for (var i = 0; i < helpers.length; i++) {
					blockObj.NAME = helpers[i].helperName;
					blockObj.TYPE = helpers[i].componentName;
					// helpers[i].componentFormJSON.formdata = helpers[i].componentJSON;
					var cJson = {}
					cJson.formdata = helpers[i].componentJSON;
					blockObj.COMPONENT_JSON = JSON.stringify(cJson)
					var clone_blockobj = { ...blockObj }
					helper_array.push(JSON.parse(JSON.stringify(clone_blockobj)))
				}
				this.appJSON.blocks = this.appJSON.blocks.concat(helper_array)
			}

			// If page is created from builder, run it using ui-renderer
			if (component.BUILDER_JSON && component.BUILDER_JSON != "null") {
				componentJSON.template = "<ui-renderer :page-json='" + component.BUILDER_JSON + "'/>"
			}

			// Add JS
			componentJSON = Object.assign(componentJSON, this.initJS(component))

			// Get templates
			// const finalComponent = Vue.component(name, componentJSON);
			const finalComponent = Vue.component(name, function (resolve, reject) {
				setTimeout(function () {
					resolve(componentJSON)
				}, 0)
			})

			// Store this in global index as they can be called using appup-include "page-name"
			this.Components[name] = finalComponent;

			// Create UI JSON
			if (component.JSON)
				this.UIJSON = Object.assign(this.UIJSON, JSON.parse(component.JSON))

			// Concatanate page handlers
			if (component.HANDLERS)
				this.WorkflowJSON.concat(component.HANDLERS)

			// Add CSS
			if (component.CSS_CODE)
				this.initCSS(component.CSS_CODE, component.NAME)
			else if (component.CSS)
				this.initCSS(component.CSS, component.NAME)

			return finalComponent
		}
		catch (err) {
			console.log("Error while initing page " + component.NAME + " Err:" + err)

		}
	},
	initJS: function (component) {
		let jsJSON = {}

		if (!component.JS_CODE) {
			// If JS_CODE key is not available, check for JS key (JS key is used for blocks)
			if (!component.JS)
				return jsJSON;
			else
				component.JS_CODE = component.JS;
		}
		// replace debugger with ""
		component.JS_CODE = component.JS_CODE.replace(/debugger/g, '');


		// Evaluate JS
		let JS
		//console.log(`JS = ${component.JS_CODE}`)
		eval(`JS = ${component.JS_CODE}`)

		if (!JS)
			return jsJSON

		//console.log('`JS found in ${page.NAME}`' )
		//console.log(JS)
		if (JS.methods)
			jsJSON.methods = JS.methods;

		if (JS.computed)
			jsJSON.computed = JS.computed;

		if (JS.watch)
			jsJSON.watch = JS.watch;

		if (JS.props)
			jsJSON.props = JS.props;

		if (JS.data) {
			jsJSON.data = JS.data;
			// try{				
			// let fields = JS.data();
			// if (fields && Object.keys(fields).length) {
			// 	for (var key in fields) {
			// 		if (typeof fields[key] === 'object') {
			// 			for (var key2 in fields[key]) {
			// 				if (key2 === 'fields') validation_fields.push(fields[key])
			// 			}
			// 		}
			// 	}
			// }
			try {
				if (JSON.stringify(JS.data()).indexOf('"fields"') === -1) {
					console.log("there is no fields object")
				} 
				else {
					let validation_fields = [];
					validation_fields = _filter(JS.data(), o => {
						if (o && o.fields) return o.fields;
					});
					if (validation_fields && validation_fields.length){
						this.check_validations_custom(validation_fields)
					}
			
				}
				//for appup-sections component custom validation
				if (JSON.stringify(JS.data()).indexOf('"controls"')) {
					let validation_fields = [];
					validation_fields = _filter(JS.data(), o => {
						if (o && o.controls) return o.controls;
					});
					let controls=validation_fields[0].controls;
					
					if (controls && controls.length){
						for (var j = 0; j < controls.length; j++) {
							
							let VALIDATION_RULES_SECTION;
							try {
								eval(`VALIDATION_RULES_SECTION = ${controls[j].custom_validation}`);
							} catch{
								VALIDATION_RULES_SECTION = controls[j].custom_validation;
							}
							if (VALIDATION_RULES_SECTION !== undefined){
								this.addToCustomRules(VALIDATION_RULES_SECTION);
							}
						}
					}
			}
			} catch (e) {
				console.log("This is from custom validations")

			}
			// }catch(e){
			// 	console.log("This is from cus")
			// }
			

		}

		if (JS.mounted)
			jsJSON.mounted = JS.mounted;

		return jsJSON
	},
	check_validations_custom: function (rules) {

		if (rules[0].fields && rules[0].fields.length) {
			//Loopin form custom validation fields
			for (var i = 0; i < rules[0].fields.length; i++) { //Check for custom validations
				if (rules[0].fields[i].custom_validation) {
					let VALIDATION_RULES;
					try {
						eval(`VALIDATION_RULES = ${rules[0].fields[i].custom_validation}`);
					} catch {
						VALIDATION_RULES = rules[0].fields[i].custom_validation;
					}
					if (VALIDATION_RULES)
						this.addToCustomRules(VALIDATION_RULES);
				}
				
				//Custom validations for section type fields
				if (rules[0].fields[i].type && rules[0].fields[i].type == 'section') {
					for (var j = 0; j < rules[0].fields[i].rule_json.controls.length; j++) {
						let VALIDATION_RULES_SECTION;
						try {
							eval(`VALIDATION_RULES_SECTION = ${rules[0].fields[i].rule_json.controls[j].custom_validation}`);
						} catch{
							VALIDATION_RULES_SECTION = rules[0].fields[i].rule_json.controls[j].custom_validation;
						}
						if (VALIDATION_RULES_SECTION)
							this.addToCustomRules(VALIDATION_RULES_SECTION);
					}
				}
			}
		}
	},
	initBlocks: function (blocks) {
		// For each block
		blocks.forEach(block => {

			// Init Component
			const component = this.initComponent(block.NAME, block);
		})
	},
	initHandlers: function (handlers) {
		// Concatanate global handlers
		handlers.forEach(handler => {
			this.WorkflowJSON = this.WorkflowJSON.concat(handler);
		});
	},
	initGlobals: function (globalJS, globalCSS) {
		if (globalCSS && globalCSS.length) {
			var cssArr = [];
			for (var i = 0; i < globalCSS.length; i++) {
				if (globalCSS[i].CSS_CODE)
					cssArr.push(globalCSS[i].CSS_CODE);
			}
			// Add style tag to DOM with global css code 
			this.initCSS(cssArr.join(''), 'global_css');
		}

		if (globalJS && globalJS.length) {
			var jsArr = [];
			for (var j = 0; j < globalJS.length; j++) {
				if (globalJS[j].NAME.indexOf("Appup_Preload_Urls") == -1 && globalJS[j].NAME.indexOf("Appup_Preload_Data") == -1) {
					if (globalJS[j].JS_CODE)
						jsArr.push(globalJS[j].JS_CODE);

					//Getting custom validation rules
					if (globalJS[j].NAME && globalJS[j].NAME == 'custom_validations') {
						var JSCODE;
						eval(`JSCODE = ${globalJS[j].JS_CODE}`)
						Window.validateJS = JSCODE;
					}
				}
			}
			//Calling customValidationRules for adding custom rules for global
			if (Window.validateJS && Window.validateJS.length)
				this.customValidationRules();
			if (jsArr.length >= 1) {
				this.addScript(jsArr.join(''), 'global_js');
			}
		}

	},
	//Adding custom validation rules and conditions for global
	customValidationRules: function () {
        
		for (var j = 0; j < Window.validateJS.length; j++) {
			let obj = {};
			obj.messages = Window.validateJS[j].messages;
			obj.name = Window.validateJS[j].name;
			obj.conditions = Window.validateJS[j].conditions;
			this.addToCustomRules(obj)
		}

		if (customRules && customRules.rules && customRules.rules.length) {
			Window.custom = customRules;
			for (var i = 0; i < Window.custom.rules.length; i++) {
				console.log(Window.custom);
				VeeValidate.Validator.extend(Window.custom.rules[i].ruleName, Window.custom.rules[i].rule);
			}
		}
	},
	//Adds custom rules to veevalidate
	addToCustomRules: function (dataJs) {
		VeeValidate.Validator.extend(dataJs.name, {
			//Returns custom message as string
			getMessage: function (field, args) {
				let MESSAGE;
				eval(`MESSAGE = ${dataJs.messages}`)
				return MESSAGE(field, args);
			},
			//Returs boolean by validating user conditions
			validate: (value, args) => {
				try {
					let VALIDATION;
					eval(`VALIDATION = ${dataJs.conditions}`)
					return VALIDATION(value, args);
				} catch (error) {
					return false;
				}
			}
		});
	},


	initApp: function () {


	},
	initPlugins: function (pluginJson) {
		var mplufginJson = [];
		console.log("Plugin json  = " + JSON.stringify(pluginJson));
		if (pluginJson) {
			for (var i = 0; i < pluginJson.length; i++) {
				var fieldsJson = pluginJson[i].FIELDS;
				var parseJson = JSON.parse(fieldsJson);
				console.log("Parse Json = " + JSON.stringify(parseJson));
				var robject = Object.create(null);
				robject['name'] = parseJson['name'];
				robject['src'] = parseJson['cdn_url'];
				if (Object.keys(parseJson).length == 2) {
					robject.prefs = {};
				}
				else {
					delete parseJson['name'];
					delete parseJson['cdn_url'];
					robject.prefs = parseJson;
				}
				mplufginJson.push(robject);
			}
			console.log(JSON.stringify(mplufginJson));
			appupPlugins.init('', mplufginJson);
		}
	},
	hb: function (template, json) {
		// Handlebars compile all the data
		var templateCompiled = Handlebars.compile(template);
		return templateCompiled(json)
	},
	// Get URL Vars
	getUrlVars: function () {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
			function (m, key, value) {
				vars[key] = value;
			});
		return vars;
	},
	// Add CSS
	initCSS: function (content, name) {
		// Return content if null
		if (content === "null") {
			return
		}
		// If Cookie present or t param exist no GLOBAL CSS added
		if (this.getUrlVars()["t"] != undefined || this.getCookie('t') != null) {
			return
		}
		// Add global CSS
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = content;
		style.id = name;
		//style.setAttribute("scoped", "");


		document.getElementsByTagName('head')[0].appendChild(style);
	},
	// Add script tag to DOM programmatically
	addScript: function (content, name) {
		var script = document.createElement('script');
		if (name.indexOf("preload_js") != -1) {
			script.setAttribute('src', content);
		} else {
			script.text = content;
		}
		script.id = name;
		document.head.appendChild(script);
	},

	/**
	 * Extracts appup-slideout tag and it's attributes from content,
	 * if exists, returns route object
	 * @param {String} content 
	 * @param {String} parentComponentName 
	 */
	getAppupSlideoutPage: function (content, parentComponentName) {
		// if no template is provided
		if (!content) {
			return null;
		}
		// Replace one or more whitespace (spaces, tabs and new lines) with space
		let template = content.replace(/\s\s+/g, " ");

		let re = /<appup-slideout([^>]+)?>(.*?)<\/appup-slideout>/;
		let match = template.match(re);
		// If appup-slideout tag along with attributes/props found
		if (match !== null && match[1]) {
			let attrStr = match[1].trim().replace(/\s\s+/g, " ");
			// Remove quotes eg: 'route="/view/:id" align="left"' -> route=/view/:id align=left
			attrStr = attrStr.replace(/"|'/g, "");
			let attrs = {}
			attrStr.split(" ").forEach((v) => {
				let splitvalue = v.split("=");
				if (splitvalue[0] == "parent-route" && parentComponentName == "CMS_Template") {
					let [attr, value, id] = splitvalue;
					attrs[attr] = value + "=" + id;
				} else {
					let [attr, value] = splitvalue;
					attrs[attr] = value;
				}

			});
			// Get slideout page using route
			if (attrs.route && parentComponentName != "CMS_Template") {
				return this.getPageComponentByRoute(attrs.route, parentComponentName + "child01");
			}
			if (parentComponentName == "CMS_Template") {
				return attrs
			}
		}
		return null;
	},

	/**
	 * Finds page using route in appJSON, returns router object
	 * @param {String} route 
	 * @param {String} componentName 
	 */
	getPageComponentByRoute: function (route, componentName) {
		let page = _find(this.appJSON.pages, ["URL", route]);
		if (page) {
			return {
				path: (page.URL.indexOf("/") === 0) ? page.URL.substr(1) : page.URL,
				component: this.initComponent(componentName, page),
				meta: {
					// Used to check if a route is slideout and toogle router-view in slideout component
					isSlideout: true
				}
			};
		} else {
			return null;
		}
	},

	/**
	 * Load CSS theme, append into head tag as link, taking id as appID
	 * @param {String} id 
	 */
	loadCssTheme: function (urlParam) {
		// Assign URL param 
		let href = urlParam
		// Decode URL
		href = decodeURIComponent(href);

		// URL params doesn't exists in URL -> read from cookie instead 
		if (href == 'undefined') {
			// Read from cookie
			href = this.getCookie('t');
			// Cookie exist
			if (href) {
				// Since cookie has old time-stamp, update cookie time-stamp too
				let arr = href.split('?ts=');
				arr[1] = Math.floor(Date.now() / 1000);
				href = arr[0] + '?ts=' + arr[1];
			}
			// Cookie doesn't exist - By default load bootstrap
			else {
				if (window.location.hostname.indexOf("500apps.io") != -1) {
					this.createCssElement('https://500apps.com/themes/fancy-topnav.css');
				} else {
					this.createCssElement('https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');
				}
				this.createCssElement('https://unpkg.com/bootstrap-vue@2.0.0-rc.19/dist/bootstrap-vue.min.css');
				//this.createCssElement('https://500apps.com/themes/trendy.css');
			}
		}

		// If URL param is empty then delete cookie
		if (href == "") {
			this.eraseCookie('t');
			// Since cookie deleted - By default load bootstrap
			if (window.location.hostname.indexOf("500apps.io") != -1) {
				this.createCssElement('https://500apps.com/themes/fancy-topnav.css');
			} else {
				this.createCssElement('https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');
			}
			this.createCssElement('https://unpkg.com/bootstrap-vue@2.0.0-rc.19/dist/bootstrap-vue.min.css');
			//this.createCssElement('https://500apps.com/themes/trendy.css');
		}

		// If URL param exists
		else if (href != undefined) {
			if (!href.includes('?ts=')) {
				// Add time-stamp
				href += '?ts=' + Math.floor(Date.now() / 1000);
			}
			// Create link element
			this.createCssElement(href);
			// Store in cookie for later use
			this.setCookie('t', href, 5);
		}
	},

	/**
	 * Create link element and append it to head taking id as appID and href either from cookie or from url
	 * @param {String} id 
	 * @param {String} href
	 */
	createCssElement: function (href) {
		// Initializing head and link element
		let head = document.getElementsByTagName('head')[0];
		let link = document.createElement('link');

		// Generating 4 digit random number
		link.id = Math.floor(1000 + Math.random() * 9000);
		link.rel = 'stylesheet';
		link.type = 'text/css';

		// Validate param
		if ((href.startsWith("http")) || (href.startsWith("https"))) {
			link.href = href;
		}
		// Add all type media to support
		link.media = 'all';
		// Append this link tag into the head 
		head.appendChild(link);
	},

	/**
	 * Set cookie with name, value and duration in days
	 * @param {String} name 
	 * @param {String} value
	 * @param {Number} days 
	 */
	setCookie: function (name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	},

	/**
	 * Get cookie with particular name
	 * @param {String} name 
	 */
	getCookie: function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},

	/**
	 * Delete cookie with particular name
	 * @param {String} name 
	 */
	eraseCookie: function (name) {
		document.cookie = name + '= ; Max-Age=-99999999; Path=/;'
	},

};

export default AppupCore;