<template>
  <div>
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
            <ac-collection-table
              :url="handler_url"
              ref="handlerItemListref"
              :method="handler_url_method"
              :columns="handlerColumns"
            ></ac-collection-table>
          </div>
        </div>

        <!-- Handlers Table end -->
      </div>

      <!-- Form end -->

      <!-- Helpers Tabs start -->
      <div class="col-6" v-if="helpersShow">
        <b-tabs content-class="mt-3" :lazy="true">
          <b-tab v-for="(helper,index) in helpersList" :key="index" :title="helper.helperName">
            <ac-helper
              :type="helper.componentName"
              :form-json="helper.componentFormJSON"
              v-model="helper.componentJSON"
              :presetValue="false"
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
    <!-- Buttons ends -->
  </div>
</template>
<script>
import axios from "axios";
import componentsFormJson from "../helper-json/cms_components_form.json";
let appupFilterJson = require("../helper-json/appup-filter-component.json");
let cmsJson = require("../helper-json/appup-cms.json");
let cmsItemJson = require("../helper-json/appup-cms-item.json");
let acCalendarJson = require("../helper-json/ac-calendar-component.json");
let simpleFilterJson = require("../helper-json/ac-simple-filter-component.json");
let collectionCardSlots = require("../helper-json/collection-card-slots.json");
let acFormPreview = require("../helper-json/ac-form-preview-component.json");
let acFormbuilder = require("../helper-json/ac-formbuilder.json");

componentsFormJson.push(appupFilterJson);
componentsFormJson.push(simpleFilterJson);
componentsFormJson.push(cmsJson);
componentsFormJson.push(cmsItemJson);
componentsFormJson.push(acFormbuilder);

export default {
  props: {
    handler_url: {
      type: String,
      required: false
    },
    handler_url_method: {
      type: String,
      required: false
    },
    page_template_url: {
      type: String,
      required: false
    },
    page_item_url: {
      type: String,
      required: false
    },
    blocks_url: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      handlerColumns: [{ key: "NAME", label: "Handler Name" }],
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
      helpersShow: true,
      selectedComponentFormJson: "",
      selectedComponent: "",
      helpersList: [],
      items: "",

      fields: ["NAME"],
      axiosURL: ""
    };
  },
  created() {
    // Api call for retriving PAGE(SYSTEM(CMS)) templates w.r.t TEMPLATEID
    var _self = this;
    // axios
    //   .get(this.page_template_url)
    //   .then(function(response) {
    _self.$appupajax
      .get2(
        this.page_template_url,
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
      this.$emit("save_event", { data_object: requestBody });
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

      this.$emit("update_event", { data_object: requestBody });
    },

    // It calls when modifying HELPERS, Requires for ac-helpers component
    modifyHelper: function(result, mode) {
      var response = result;
      var helperobject = {};
      var fields = {};
      for (var i = 0; i < response.length; i++) {
        helperobject.componentName = response[i].TYPE;
        helperobject.helperName = response[i].NAME;

        helperobject.componentJSON = JSON.parse(
          response[i].COMPONENT_JSON
        ).formdata;

        // Assign componentJSON according into componentname
        try {
          helperobject.componentFormJSON = JSON.parse(
            JSON.stringify(
              componentsFormJson.find(
                obj => obj.component === helperobject.componentName
              )
            )
          );
        } catch (error) {
          console.log(error);
        }

        // Assign empty object for TAB purpose
        helperobject.componentFormJSON.fields.unshift({ type: "hidden" });
        helperobject.componentFormJSON.fields.push({ type: "hidden" });

        // Deep copy of helperobject and push into helperslist array
        this.helpersList.push(JSON.parse(JSON.stringify(helperobject)));
      }
      if (mode === "create") {
        return true;
      }
    },

    // Execute in EDIT mode
    routeApimethod: function() {
      var _this = this;
      // axios
      //   .get(this.page_item_url)
      //   .then(result => {
      // _this.$appupajax
      //   .get2(
      //     this.page_item_url,
      //     {},
      //     { withCredentials: true, credentials: "include" }
      //   )
        _this.$appupajax.get2(_this.page_item_url, {}, {}, {withCredentials: true, credentials: "include" })
        .then(_this.$appupajax.handleResponse)
        .then(result => {
          var response = _this.removeDeletedHelpers(result.data[0]);
          _this.name = response.NAME;
          _this.item = response.TITTLE;
          _this.url = response.URL;

          // Check for New formJSON
          if (_this.formJson.fields.length > 0) {
            var responseFormJSON = JSON.parse(response.JSON);
            var previousFormdata = JSON.parse(response.ITEM_JSON);
            var formJSON = JSON.parse(JSON.stringify(_this.formJson.fields));

            // Iterate new formjson and response formjson
            for (var i = 0; i < responseFormJSON.fields.length; i++) {
              for (var j = 0; j < formJSON.length; j++) {
                if (formJSON[j].name === responseFormJSON.fields[i].name) {
                  formJSON.splice(j, 1);
                  break;
                }
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
                responseFormJSON.fields.push(formJSON[i]);
                if (formJSON[i].name.indexOf("uc_slideout") === -1) {
                  previousFormdata[formJSON[i].name] =
                    _this.item + "_" + formJSON[0].name;
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeDeletedHelpers: function(data) {
      var templateJSON = this.formJson.fields;
      var itemJSON = JSON.parse(data.JSON).fields;
      //fining out the deleted helpers list from template
      if (this.formJson.fields) {
        for (var key = 0; key < templateJSON.length; key++) {
          for (var item = 0; item < itemJSON.length; item++) {
            if (templateJSON[key].name === itemJSON[item].name) {
              itemJSON.splice(item, 1);
              break;
            }
          }
        }
        //assigning template formfields json to item json
        data.JSON = JSON.stringify(this.formJson);
      }

      //fining out the item helper names
      var helperKeys = [];
      if (itemJSON) {
        data.ITEM_JSON = JSON.parse(data.ITEM_JSON);
        for (var key in itemJSON) {
          for (var item in data.ITEM_JSON) {
            if (itemJSON[key].name == item) {
              helperKeys.push(data.ITEM_JSON[item]);
              delete data.ITEM_JSON[item];
            }
          }
        }
        data.ITEM_JSON = JSON.stringify(data.ITEM_JSON);
      }

      //find the helper keys in helper_json of item and remove
      if (helperKeys) {
        data.HELPER_JSON = JSON.parse(data.HELPER_JSON);
        for (var key in data.HELPER_JSON) {
          for (var item in helperKeys) {
            if (data.HELPER_JSON[key].helperName == helperKeys[item]) {
              data.HELPER_JSON.splice(key, 1);
            }
          }
        }
        data.HELPER_JSON = JSON.stringify(data.HELPER_JSON);
      }

      return data;
    },

    // Calls for retrive helpers and handlers
    apiMethods: function() {
      var _this = this;
      // axios
      //   .get(this.blocks_url)
      //   .then(result => {
      // _this.$appupajax
      //   .get2(
      //     this.blocks_url,
      //     {},
      //     { withCredentials: true, credentials: "include" }
      //   )
        _this.$appupajax.get2(_this.blocks_url, {}, {}, {withCredentials: true, credentials: "include" })
        .then(_this.$appupajax.handleResponse)
        .then(result => {
          // Call to method for modifying data as format of ac-helper component
          var dataSuccess = _this.modifyHelper(result.data, "create");

          // Check in EDIT mode
          if (dataSuccess && this.$route.params.id) {
            _this.routeApimethod();
          } else {
            _this.helpersShow = true;
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>