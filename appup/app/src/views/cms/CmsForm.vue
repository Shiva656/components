<template>
  <div>
    <div class="page-wrapper">
      <!-- Header start -->
      <Navbar />
      <!-- Header end -->
      <!-- Page content start -->
      <div class="page-content">
        <div class="container clearfix">
          <div class="page-title clearfix">
            <div class="float-left">
              <button
                type="button"
                class="btn btn-outline-secondary bg-white"
                @click="$router.go(-1)"
              >
                <span class="icon-arrow-left"></span>
              </button>
              <h1>New CMS form</h1>
            </div>
          </div>
          <section class="block">
            <div class="row">
              <!-- Form start -->

              <div class="col-6">
                <!-- Static form fields start -->

                <div class="form-group appup-form">
                  <label>NAME</label>
                  <b-form-input
                    v-model="name"
                    v-validate="'required'"
                    name="name"
                    :class="{'input': true, 'is-danger': errors.has('name') }"
                  ></b-form-input>
                  <span
                    v-show="errors.has('name')"
                    class="help is-danger validations-text"
                    style="color: red"
                  >{{ errors.first('name') }}</span>
                </div>
                <div class="form-group appup-form">
                  <label class="d-block">URL</label>
                  <div role="group" class="input-group">
                    <input type="text" name="url" v-model="url" class="appup-input form-control" />
                  </div>
                </div>
                <div class="form-group appup-form">
                  <label>Item</label>
                  <b-form-input
                    v-model="item"
                    v-validate="'required'"
                    name="item"
                    :disabled="$route.params.id ? true : false"
                    :class="{'input': true, 'is-danger': errors.has('item') }"
                  ></b-form-input>
                  <!-- <b-form-text>Please enter Item</b-form-text> -->
                  <span
                    v-show="errors.has('item')"
                    class="help is-danger validations-text"
                    style="color: red"
                  >{{ errors.first('item') }}</span>
                </div>

                <!-- Static form fields end -->

                <!-- Appup form component start -->

                <appup-form
                  ref="CMSForm"
                  v-if="displayForm"
                  :form-json="formJson"
                  :form-data="formdata"
                  v-model="formdata"
                />

                <!-- Appup form component end -->

                <!-- Handlers Table start -->

                <div class="form-group appup-form">
                  <label class="d-block">Handlers List</label>
                  <div role="group" class="input-group">
                    <b-table striped hover :items="items" :fields="fields"></b-table>
                  </div>
                </div>

                <!-- Handlers Table end -->
              </div>

              <!-- Form end -->

              <!-- Helpers Tabs start -->
              <div class="col-6" v-if="helpersShow">
                <b-tabs content-class="mt-3" :lazy="true">
                  <b-tab
                    v-for="(helper,index) in helpersList"
                    :key="index"
                    :title="helper.helperName"
                  >
                    <ac-helper
                      :type="helper.componentName"
                      :form-json="helper.componentFormJSON"
                      v-model="helper.componentJSON"
                    />
                  </b-tab>
                </b-tabs>
              </div>

              <!-- Helpers Tabs end -->
            </div>

            <!-- Buttons start -->
            <div class="col-3">
              <button
                v-if="!$route.params.id"
                type="button"
                class="btn btn-primary"
                name="button"
                @click="validateForm($event,'add')"
              >Apply</button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                name="button"
                @click="validateForm($event,'edit')"
              >Update</button>
            </div>
            <!-- Buttons end -->
          </section>
        </div>
        <div class="push"></div>
      </div>
      <!-- Page content end -->
    </div>
    <!-- Appup footer start -->
    <AppupFooter />
    <!-- Appup footer end -->
  </div>
</template>
<script>
// Import components and libraries
import AppupHeader from "../AppupHeader.vue";
import AppupFooter from "../Appupfooter.vue";
import Navbar from "../Navbar.vue";
import axios from "axios";
const queryString = require("query-string");
let componentsFormJson = require("../helpers/components_form.json");
let cmsJson = require("../../../../app/src/views/helpers/appup-cms.json");
let cmsItemJson = require("../../../../app/src/views/helpers/appup-cms-item.json");
let componentsHelperSamplesJson = require("../helpers/components_helper_samples.json");
let appupFilterJson = require("../helpers/appup-filter-component.json");
let acCalendarJson = require("../helpers/ac-calendar-component.json");
let simpleFilterJson = require("../helpers/ac-simple-filter-component.json");
let collectionCardSlots = require("../helpers/collection-card-slots.json");
let acFormbuilder = require("../helpers/ac-formbuilder.json");
let acFormPreview = require("../helpers/ac-form-preview-component.json");

componentsFormJson.push(appupFilterJson);
componentsFormJson.push(simpleFilterJson);
componentsFormJson.push(acFormbuilder);
componentsFormJson.push(cmsJson);
componentsFormJson.push(cmsItemJson);

// Export components
export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
      name: "",
      url: "",
      item: "",
      formJson: {},
      formdata: "",
      template: "",
      templateId: "",
      js: "",
      css: "",
      displayForm: false,
      helpersShow: false,
      selectedComponentFormJson: "",
      selectedComponent: "",
      helpersList: [],
      items: "",

      fields: ["NAME"],
      axiosURL: ""
    };
  },
  methods: {
    // Validate form
    validateForm: function(event, type) {
      event.preventDefault();
      this.$validator.validateAll().then(result => {
        if (result) {
          if (type == "add") this.submitdata();
          else if (type == "edit") this.updatedata();
          return;
        }
      });
    },

    // Append item_ to helpers
    dataChange: function() {
      var helpersList = JSON.stringify(this.helpersList);
      for (var i = 0; i < this.formJson.fields.length; i++) {
        var name = this.formJson.fields[i].name.trim();
        // For slot changes
        helpersList = helpersList.replace(
          new RegExp(name, "g"),
          this.item + "_" + name
        );
        // For slideout
        if (name.indexOf("uc_slideout_") === -1) {
          this.formdata[name] = this.item + "_" + name;
        } else {
          // this.formdata[name] = name.replace("uc_slideout_","");
        }
      }
      helpersList = helpersList.replace(
        new RegExp(this.item + "_" + this.item + "_", "g"),
        this.item + "_"
      );
      this.helpersList = JSON.parse(helpersList);
    },
    // Submit form
    submitdata: function() {
      // Call for append item_ to helpers
      this.dataChange();
      const requestBody = {
        NAME: this.name,
        TITTLE: this.item,
        URL: this.url,
        TEMPLATE: this.template,
        APPLICATION_ID: this.$route.params.appId,
        JS_CODE: this.js,
        HELPER_JSON: JSON.stringify(this.helpersList),
        JSON: JSON.stringify(this.formJson),
        TYPE: "CMS_TEMPLATE",
        CSS_CODE: this.css,
        TEMPLATE_ID: this.templateId,
        ITEM_JSON: JSON.stringify(this.formdata)
      };
      const config = {
        headers: {
          test: "{{route.params.id}}"
        }
      };

      // Call for Insert data
      var _this = this;
      axios
        .post(
          "/appdb/_db/PAGE_ITEMS",
          queryString.stringify(requestBody),
          config
        )
        .then(result => {
          if (_this.items) {
            // Redirect to previous page
            _this.asyncData("retrieve_cms_success");
          } else {
            _this.start("retrieve_cms_success", {});
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // To store multiple handlers in asynchronous way
    asyncData: function(nextUrl) {
      // Delay for 300 sec
      function delay() {
        return new Promise(resolve => setTimeout(resolve, 300));
      }
      const config = {
        headers: {
          test: "{{route.params.id}}"
        }
      };

      // Calls asynchrous to insert multiple handlers
      let _this = this;
      async function delayedLog(item) {
        item.APPLICATION_ID = _this.$route.params.appId;
        await delay();
        axios
          .post("/appdb/_db/HANDLER", queryString.stringify(item), config)
          .then(result => {
            console.log("success");
          })
          .catch(err => {
            console.log("err", err);
          });
      }
      // To iterate handlers
      async function arrayofObjects() {
        _this.items.forEach(async item => {
          await delayedLog(item);
        });
        _this.start(nextUrl, {});
      }
      arrayofObjects();
    },

    // Update the Items data
    updatedata: function() {
      // Assgin data to object
      const requestBody = {
        ID: this.$route.params.id,
        NAME: this.name,
        TITTLE: this.item,
        URL: this.url,
        JSON: JSON.stringify(this.formJson),
        HELPER_JSON: JSON.stringify(this.helpersList),
        ITEM_JSON: JSON.stringify(this.formdata)
      };
      const config = {
        headers: {
          test: "{{route.params.id}}"
        }
      };

      // Call for update the edited data
      var _this = this;
      axios
        .put(
          "/appdb/_db/PAGE_ITEMS",
          queryString.stringify(requestBody),
          config
        )
        .then(result => {
          // Redirect to previous page
          _this.start("retrieve_cms_success", {});
        })
        .catch(err => {
          console.log(err);
        });
    },

    // It calls when modifying HELPERS, Requires for ac-helpers component
    modifyHelper: function(result, mode) {
      var response = result;
      var helperobject = {};
      var fields = {};
      for (var i = 0; i < response.length; i++) {
        // If New prop is present
        if (mode == "addprops") {
          response[i].componentFormJSON = JSON.parse(
            JSON.stringify(
              componentsFormJson.find(
                obj => obj.component === response[i].componentName
              )
            )
          );
          Object.assign(helperobject, response[i]);
        } else {
          helperobject.componentName = response[i].TYPE;
          helperobject.helperName = response[i].NAME;

          helperobject.componentJSON = JSON.parse(
            response[i].COMPONENT_JSON
          ).formdata;

          // Assign componentJSON according into componentname
          try {
            if (response[i].TYPE === "ac-form-preview") {
              helperobject.componentFormJSON = acFormPreview;
            } else {
              helperobject.componentFormJSON = JSON.parse(
                JSON.stringify(
                  componentsFormJson.find(
                    obj => obj.component === helperobject.componentName
                  )
                )
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
        // Assign empty object for TAB purpose
        helperobject.componentFormJSON.fields.unshift({ type: "hidden" });
        helperobject.componentFormJSON.fields.push({ type: "hidden" });

        // Deep copy of helperobject and push into helperslist array
        this.helpersList.push(JSON.parse(JSON.stringify(helperobject)));
      }
      if (mode === "create" || mode == "addprops") {
        return true;
      }
    },

    // Execute in EDIT mode
    routeApimethod: function() {
      var _this = this;
      // axios
      //   .get(
      //     "/appdb/_db/PAGE_ITEMS?fields=ID,NAME,TITTLE,URL,JS_CODE,JSON,ITEM_JSON,HELPER_JSON&where=ID=" +
      //       this.$route.params.id
      //   )
      //   .then(result => {
      // _this.$appupajax
      // .get2(
      //  "/appdb/_db/PAGE_ITEMS?fields=ID,NAME,TITTLE,URL,JS_CODE,JSON,ITEM_JSON,HELPER_JSON&where=ID=" +
      //     this.$route.params.id,
      //   {},
      //   { withCredentials: true, credentials: "include" }
      // )
      _this.$appupajax
        .get2(
          "/appdb/_db/PAGE_ITEMS?fields=ID,NAME,TITTLE,URL,JS_CODE,JSON,ITEM_JSON,HELPER_JSON&where=ID=" +
            this.$route.params.id,
          {},
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(_this.$appupajax.handleResponse)
        .then(result => {
          if (_this.$route.params.entity != "modifyhelpers") {
            var response = _this.removeDeletedHelpers(result.data[0]);
            _this.name = response.NAME;
            _this.item = response.TITTLE;
            _this.url = response.URL;

            // Check for New formJSON
            if (_this.formJson.fields.length > 0) {
              var responseFormJSON = JSON.parse(response.JSON);
              var previousFormdata = JSON.parse(response.ITEM_JSON);
              var formJSON = JSON.parse(JSON.stringify(_this.formJson.fields));
              var keys = [];
              for (var item in previousFormdata) {
                if (item != previousFormdata[item]) {
                  keys.push(item);
                }
              }
              // Iterate new formjson and response formjson
             
                for (var i = 0; i < responseFormJSON.fields.length; i++) {
                   for (var j = 0; j < keys.length; j++) {
                  if (keys[j] != responseFormJSON.fields[i].name) {
                    formJSON.splice(j, 1);
                  }
                  if (keys[j] == responseFormJSON.fields[i].name) {
                    responseFormJSON.fields.splice(i, 1);
                  }
                  break;
                }
              }
              // New formjson is available, then push to response formjson
              if (formJSON.length > 0) {
                // if (formJSON.length === 1) {
                //   responseFormJSON.fields.push(formJSON[0]);
                //   previousFormdata[formJSON[0].name] =
                //     _this.item + "_" + formJSON[0].name;
                // } else if (formJSON.length > 1) {

                for (var i = 0; i < formJSON.length; i++) {
                    //avoid duplicating form fields
                    var index1 = responseFormJSON.fields.findIndex(p => p.name == formJSON[i].name);
                    if(index1 == -1){
                        responseFormJSON.fields.push(formJSON[i]);
                    }

                  if (formJSON[i].name.indexOf("uc_slideout") === -1) {
                    previousFormdata[formJSON[i].name] =
                      _this.item + "_" + formJSON[i].name;
                  } else {
                    previousFormdata[formJSON[i].name] = "";
                  }
                  // }
                }
                _this.formJson = responseFormJSON;
                _this.formdata = previousFormdata;
              } else {
                _this.formJson = JSON.parse(response.JSON);
                _this.formdata = JSON.parse(response.ITEM_JSON);
              }
            } else {
              _this.formJson = JSON.parse(response.JSON);
              _this.formdata = JSON.parse(response.ITEM_JSON);
            }
            _this.displayForm = true;
            // _this.formJson = JSON.parse(response.JSON);
            // _this.formdata = JSON.parse(response.ITEM_JSON);
            // Check for new helpers
            if (_this.helpersList.length > 0) {
              var previousHelper = JSON.parse(response.HELPER_JSON);
              var helperlist = JSON.parse(JSON.stringify(_this.helpersList));
              // var newHelpers = [];

              // Iterate new helpers and response helpers
              for (var j = 0; j < previousHelper.length; j++) {
                for (var i = 0; i < helperlist.length; i++) {
                  if (
                    helperlist[i].helperName ===
                    previousHelper[j].helperName.replace(_this.item + "_", "")
                  ) {
                    helperlist.splice(i, 1);
                    break;
                  }
                }
              }

              // New Helpers is available, then push to response helperes
              if (helperlist.length > 0) {
                _this.helpersList = JSON.parse(response.HELPER_JSON);
                // _this.modifyHelper(helperlist, "edit");
                for (var i = 0; i < helperlist.length; i++) {
                  helperlist[i].helperName =
                    _this.item + "_" + helperlist[i].helperName;
                  _this.helpersList.push(helperlist[i]);
                }
              } else {
                _this.helpersList = JSON.parse(response.HELPER_JSON);
              }
            } else {
              _this.helpersList = JSON.parse(response.HELPER_JSON);
            }

            _this.helpersShow = true;
          } else {
            // New prop will be present
            _this.addProp(result.data[0]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addProp: function(itemData) {
      var helpersData = JSON.parse(itemData.HELPER_JSON);
      this.name = itemData.NAME;
      this.item = itemData.TITTLE;
      this.url = itemData.URL;
      this.formJson = JSON.parse(itemData.JSON);
      this.formdata = JSON.parse(itemData.ITEM_JSON);
      helpersData.forEach(function(v) {
        delete v.componentFormJSON;
      });
      var success = this.modifyHelper(helpersData, "addprops");
      if (success) {
        this.helpersShow = true;
        this.displayForm = true;
      }
    },
    // Delete helper in templateJSON
    removeDeletedHelpers: function(data) {
      var itemFormJSON = JSON.parse(data.JSON);
      var itemHelperlist = JSON.parse(data.HELPER_JSON);
      var formJSON = JSON.parse(JSON.stringify(this.formJson.fields));
      var helperlist = JSON.parse(JSON.stringify(this.helpersList));
      data.JSON = JSON.stringify(
        this.loopJSON(itemFormJSON.fields, formJSON, "formjson", data)
      );
      data.HELPER_JSON = JSON.stringify(
        this.loopJSON(itemHelperlist, helperlist, "helpers", data.TITTLE)
      );
      return data;
    },
    // Loop for Find delete helper
    loopJSON: function(itemJSON, templateJSON, mode, data) {
      var finalFormJSON = [];
      for (var i = 0; i < templateJSON.length; i++) {
        for (var j = 0; j < itemJSON.length; j++) {
          if (
            mode === "formjson" &&
            templateJSON[i].name === itemJSON[j].name
          ) {
            finalFormJSON.push(itemJSON[j]);
            break;
          } else if (
            mode === "helpers" &&
            data + "_" + templateJSON[i].helperName === itemJSON[j].helperName
          ) {
            finalFormJSON.push(itemJSON[j]);
            break;
          }
        }
      }
      if (mode === "formjson") {
        return { fields: finalFormJSON };
      } else {
        return finalFormJSON;
      }
    },
    // Calls for retrive helpers and handlers
    apiMethods: function() {
      var _this = this;
      // axios
      //   .get(
      //     "/appdb/_db/BLOCKS?fields=ID,NAME,TYPE,COMPONENT_JSON&where=REF_ID=" +
      //       this.$route.params.templateId +
      //       " and REF_TYPE='cms' OR APPLICATION_ID=0001"
      //   )
      //   .then(result => {
      // _this.$appupajax
      // .get2(
      //  "/appdb/_db/BLOCKS?fields=ID,NAME,TYPE,COMPONENT_JSON&where=REF_ID=" +
      //     this.$route.params.templateId +
      //     " and REF_TYPE='cms' OR APPLICATION_ID=0001",
      //   {},
      //   { withCredentials: true, credentials: "include" }
      // )
      _this.$appupajax
        .get2(
          "/appdb/_db/CMS/BLOCKS?fields=ID,NAME,TYPE,COMPONENT_JSON&where=REF_ID=" +
            this.$route.params.templateId +
            " and REF_TYPE='cms' OR APPLICATION_ID=0001",
          {},
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(_this.$appupajax.handleResponse)
        .then(result => {
          // Call to method for modifying data as format of ac-helper component
          var dataSuccess = _this.modifyHelper(result.data, "create");
          // Check in EDIT mode
          if (dataSuccess && _this.$route.params.id) {
            _this.routeApimethod();
          } else {
            _this.helpersShow = true;
          }
        })
        .catch(err => {
          console.log("err", err);
        });
      var _this = this;
      // axios
      //   .get(
      //     "/appdb/_db/HANDLER?fields=NAME,TRIGGER_NAME,CATEGORY_ID,JSON_CODE,REF_ID&where=REF_ID=" +
      //       this.$route.params.templateId +
      //       " and REF_TYPE='CMS_handler' OR APPLICATION_ID=0001"
      //   )
      //   .then(result => {

      // _this.$appupajax
      //   .get2(
      //    "/appdb/_db/HANDLER?fields=NAME,TRIGGER_NAME,CATEGORY_ID,JSON_CODE,REF_ID&where=REF_ID=" +
      //       this.$route.params.templateId +
      //       " and REF_TYPE='CMS_handler' OR APPLICATION_ID=0001",
      //     {},
      //     { withCredentials: true, credentials: "include" }
      //   )
      _this.$appupajax
        .get2(
          "/appdb/_db/HANDLER?fields=NAME,TRIGGER_NAME,CATEGORY_ID,JSON_CODE,REF_ID&where=REF_ID=" +
            this.$route.params.templateId +
            " and REF_TYPE='CMS_handler' OR APPLICATION_ID=0001",
          {},
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(_this.$appupajax.handleResponse)
        .then(result => {
          // Handlers array pushed to items array
          _this.items = result.data;
        })
        .catch(err => {
          // Do somthing
          console.log(err);
        });
    }
  },
  created() {
    if (this.$route.params.entity != "modifyhelpers") {
      // Api call for retriving PAGE(SYSTEM(CMS)) templates w.r.t TEMPLATEID
      var _self = this;
      // axios
      //   .get(
      //     "/appdb/_db/PAGE_TEMPLATE?where=ID=" +
      //       _self.$route.params.templateId +
      //       " AND OWNER_ID=0 OR APPLICATION_ID="+  _self.$route.params.appId
      //   )
      //   .then(function(response) {

      _self.$appupajax
        .get2(
          "/appdb/_db/PAGE_TEMPLATE?where=ID=" +
            _self.$route.params.templateId +
            " AND OWNER_ID=0 OR APPLICATION_ID=" +
            _self.$route.params.appId,
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(_self.$appupajax.handleResponse)
        .then(response => {
          var json = response.data;

          // Iterate over json and assgin respective variables
          for (var i = 0; i < json.length; i++) {
            if (json[i].ID === parseInt(_self.$route.params.templateId)) {
              // Assign formJSON to appup-form
              try {
                var itemJson = JSON.parse(json[i].JSON);
                if (typeof itemJson === "string") {
                  _self.formJson.fields = JSON.parse(itemJson);
                  if (typeof _self.formJson.fields === "string") {
                    _self.formJson.fields = JSON.parse(_self.formJson.fields);
                  }
                } else {
                  _self.formJson.fields = itemJson;
                }
              } catch (error) {
                _self.formJson.fields = [];
              }

              // check in CREATE/EDIT mode
              if (!_self.$route.params.id) {
                _self.displayForm = true;
                _self.templateId = json[i].ID;
                _self.js = json[i].JS_CODE;
                _self.css = json[i].CSS_CODE;
                _self.axiosURL = _self.templateId;
              }

              // API Call for retriving HANDLERS AND HEPERS
              _self.apiMethods();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.routeApimethod();
    }
  }
};
</script>
