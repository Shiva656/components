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
              <h1>{{type}} Page</h1>
            </div>
          </div>

          <section class="block">
            <div class="row">
              <div class="col-6">
                <!-- Appup form component start -->
                <template v-if="$route.params.type == 'add'">
                  <appup-form preload="pre_load_page_cms" submit="post_cms_page" />
                  <b-table hover :items="items"></b-table>
                </template>
                <template v-else>
                  <appup-form preload="pre_load_edit" submit="put" />
                </template>
                <!-- Appup form component end -->
              </div>
              <div class="col-1" style="border-left: 1px solid #d5c9c9; height: auto;"></div>
              <div class="col-5">
                <h3>Helpers List</h3>
                <template v-if="$route.params.type != 'add'">
                  <b-button variant="outline-primary" @click="showModal()">+</b-button>
                  <!-- <b-dropdown text="Form Helpers" class="m-md-2">
                    <b-dropdown-item
                      :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/form/${$route.params.id}`"
                    >Form</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/cmsHelper/${$route.params.cloudId}/${$route.params.appId}/cmsCardBuilder/${$route.params.id}`"
                    >Collection card builder</b-dropdown-item>
                  </b-dropdown>-->
                  <b-modal
                    ref="my-modal"
                    no-close-on-esc
                    no-close-on-backdrop
                    size="lg"
                    title="Helpers"
                  >
                    <template slot="modal-footer">
                      <b-button variant="primary" @click="saveBlock()">Save</b-button>
                    </template>
                    <div class="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        v-model="name"
                        class="form-control"
                        placeholder="helper name"
                      />
                    </div>
                    <div class="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        v-model="description"
                        class="form-control"
                        placeholder="description of the helper"
                      />
                    </div>
                    <div class="form-group">
                      <label>Select component</label>
                      <select
                        class="form-control"
                        v-model="helperName"
                        @change="helperdetails($event)"
                      >
                        <option :value="null">Select a helper</option>
                        <option
                          v-for="(item,index) in componentsFormJson"
                          :value="item.component"
                          :text="item.label"
                          :key="index"
                        >{{item.component}}</option>
                      </select>
                    </div>
                    <div class="form-group col-md-4 float-right" v-if="helperName">
                      <label>Select Sample</label>
                      <appup-helper-samples
                        :key="helperName"
                        :url="helper_sample_url"
                        @on_option_selected="on_sample_selection"
                        :helper_type="helperName"
                      ></appup-helper-samples>
                    </div>
                    <div class="form-group">
                      <ac-helper
                        v-if="isModalShown"
                        :key="selectedComponent"
                        :type="selectedComponent"
                        :form-json="selectedComponentFormJson"
                        v-model="formData"
                      />
                    </div>
                    <div class="form-group">
                      <label for="component_select_field">Assign to a category</label>
                      <select
                        class="form-control col-md-3"
                        id="component_select_field"
                        v-model="category"
                      >
                        <option :value="null">Please select Category</option>
                        <option
                          v-for="item in category_data"
                          :value="item.ID"
                          :text="item.NAME"
                          :key="item.ID"
                        >{{item.NAME}}</option>
                      </select>
                    </div>
                  </b-modal>
                </template>

                <div>
                  <ac-collection-table
                    :url="url"
                    ref="helpersListref"
                    :dropdown="dropdown"
                    :method="method"
                    :columns="columns"
                    @dropdown_click="onDropdownClick"
                    :dropdown_options="dropdownOptions"
                    :dropdown_button_options="dropdownButtonOptions"
                  ></ac-collection-table>
                </div>
                <h3>Handlers List</h3>
                <template v-if="$route.params.type != 'add'">
                  <b-button
                    variant="outline-primary"
                    :href="`#/create/new/${$route.params.cloudId}/${$route.params.appId}/handler/${$route.params.id}`"
                  >+</b-button>
                </template>
                <div>
                  <ac-collection-table
                    :url="handlerurl"
                    ref="handlersListref"
                    :dropdown="dropdown"
                    :method="method"
                    :columns="helpercolumns"
                    @dropdown_click="onHandlerDropdownClick"
                    :dropdown_options="dropdownOptions"
                    :dropdown_button_options="dropdownButtonOptions"
                  ></ac-collection-table>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="push"></div>
      </div>
      <!-- Page content end -->
    </div>

    <b-modal ref="delete-modal" no-close-on-esc no-close-on-backdrop hide-footer title="Delete">
      <div class="d-block text-center">
        <h3>Are you sure you want to delete?</h3>
      </div>
      <div class="delete-modal-footer">
        <b-button variant="outline-danger" @click="hideDeleteModal">No</b-button>
        <b-button variant="outline-warning" @click="deleteEntities">Yes</b-button>
      </div>
    </b-modal>

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
let componentsFormJson = require("../helpers/components_form.json");
let cmsJson = require("../../../../app/src/views/helpers/appup-cms.json");
let cmsItemJson = require("../../../../app/src/views/helpers/appup-cms-item.json");
let componentsHelperSamplesJson = require("../helpers/components_helper_samples.json");
let appupFilterJson = require("../helpers/appup-filter-component.json");
let acCalendarJson = require("../helpers/ac-calendar-component.json");
let simpleFilterJson = require("../helpers/ac-simple-filter-component.json");
let collectionCardSlots = require("../helpers/collection-card-slots.json");
let acFormPreview = require("../helpers/ac-form-preview-component.json");
let twilioJson = require("../helpers/ac-twilio-component.json");

componentsFormJson.push(appupFilterJson);
componentsFormJson.push(simpleFilterJson);
componentsFormJson.push(cmsJson);
componentsFormJson.push(cmsItemJson);
componentsFormJson.push(twilioJson);
// Export components

export default {
  data() {
    return {
      selectedComponent: "",
      selectedComponentFormJson: {},
      saveJson: {},
      formData: "",
      editJson: {},
      helperSamples: null,
      helper_sample_url:"https://api.myjson.com/bins/1ew3ls",
      name: "",
      description: "",
      category: null,
      helperName: "",
      isModalShown: false,
      componentsFormJson: componentsFormJson,
      columns: [
        { key: "NAME", label: "Helper Name" },
        { key: "TYPE", label: "Component Name" }
      ],
      helpercolumns: [{ key: "NAME", label: "Handler Name" }],
      url: "/appdb/_db/BLOCKS?where=REF_ID=",
      handlerurl: "/appdb/_db/HANDLER?where=REF_ID=",
      fields: ["NAME", "TYPE"],
      dropdownOptions: [
        {
          label: "Edit",
          type: "edit",
          icon: "fas fa-pencil-alt",
          handler: ""
        },
        {
          label: "Delete",
          type: "delete",
          icon: "fas fa-trash-alt",
          handler: ""
        }
      ],
      editMode: false,
      editId: "",
      method: "GET",
      dropdown: true,
      dropdownButtonOptions: {
        icon: "fal fa-ellipsis-h",
        variant: "bg-transparent p-0",
        size: "lg",
        right: true
      },
      deleteItem: "",
      mode: "",
      items: "",
      handlerItems: ""
    };
  },
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  created() {
    this.url = this.url + this.$route.params.id + " and REF_TYPE='cms'";
    this.handlerurl =
      this.handlerurl + this.$route.params.id + " and REF_TYPE='CMS_handler'";
    this.start("get_category", {
      entity: "formblock",
      categories: (handlerResponse, status) => {
        if (status == 200 && handlerResponse) {
          this.category_data = handlerResponse;
        }
      }
    });
    this.getHelpersList();
  },
  mounted() {
    if (Window.helpertemplate) {
      window.UIJSON.pages.fields[3].value = Window.helpertemplate;
      console.log("this is testing");
    }
  },
  watch: {
    helperName: {
      handler: function(newValue) {
        this.helperName = newValue;
        var event = {
          target: {
            value: newValue
          }
        };
        this.helperdetails(event);
      },
      deep: true
    },
    items: {
      handler: function(newValue) {
        this.items = newValue;
        this.$refs.helpersListref.data = newValue;
      },
      deep: true
    },
    handlerItems: {
      handler: function(newValue) {
        this.items = newValue;
        this.$refs.handlersListref.data = newValue;
      },
      deep: true
    }
  },
  methods: {
    showModal() {
      this.emptyData();
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    on_sample_selection: function(prop_values) {
      if (typeof prop_values == "string") {
        debugger;
        prop_values = JSON.parse(prop_values).formdata;
      }
      this.formData = prop_values;
    },
    emptyData: function() {
      this.formData = "";
      this.name = "";
      this.description = "";
      this.category = "";
      this.helperName = "";
      this.selectedComponent = "";
      this.selectedComponentFormJson = "";
      this.helper_sample_url="helper_sample_url";
      this.editMode = false;
    },
    onDropdownClick: function(data) {
      if (data.type == "edit") {
        this.openModal(data.item);
      } else {
        this.deleteItem = data;
        this.mode = "helpers";
        this.showDeleteModal();
      }
    },
    onHandlerDropdownClick: function(data) {
      if (data.type == "edit") {
        window.location.href = `#/editcmshandler/${this.$route.params.cloudId}/${this.$route.params.appId}/handler/${data.item.ID}/${this.$route.params.id}`;
      } else {
        this.deleteItem = data;
        this.mode = "handlers";
        this.showDeleteModal();
      }
    },
    showDeleteModal: function(item, type) {
      this.$refs["delete-modal"].show();
    },
    hideDeleteModal() {
      this.$refs["delete-modal"].hide();
    },
    deleteEntities: function() {
      var data = this.deleteItem;
      if (this.mode == "helpers") {
        var url = "/appdb/_db/BLOCKS" + "/" + data.item.ID;
        this.deleteHelper(data.item, url, "helper");
      } else {
        var url = "/appdb/_db/HANDLER" + "/" + data.item.ID;
        this.deleteHelper(data.item, url, "handler");
      }
    },
    openModal: function(data) {
      this.showModal();
      this.helperName = "";
      this.name = data.NAME;
      this.description = data.TITTLE;
      this.selectedComponent = data.TYPE;
      this.helperName = data.TYPE;
      this.category = data.CATEGORY_ID;
      var parsedData = JSON.parse(data.COMPONENT_JSON);
      this.formData = parsedData.formdata;
      this.editMode = true;
      this.editId = data.ID;
      //console.log("data is",data);
    },
    deleteHelper: function(data, url, entity) {
      var _self = this;
      axios.delete(url).then(function(response) {
        _self.hideDeleteModal();
        if (entity == "helper") {
          _self.getHelpersList();
        } else {
          _self.getHandlersList();
        }
      });
    },
    getHelpersList: function() {
      var _self = this;
      // axios
      //   .get(
      //     "/appdb/_db/BLOCKS?where=REF_ID=" +
      //       this.$route.params.id +
      //       " and REF_TYPE='cms'"
      //   )
      //   .then(function(response) {

      _self.$appupajax
        .get2(
          "/appdb/_db/BLOCKS?where=REF_ID=" +
            this.$route.params.id +
            " and REF_TYPE='cms'",
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(_self.$appupajax.handleResponse)
        .then(response => {
          _self.items = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    getHandlersList: function() {
      var _self = this;
      // axios
      //   .get(
      //     "/appdb/_db/HANDLER?where=REF_ID=" +
      //       this.$route.params.id +
      //       " and REF_TYPE='CMS_handler'"
      //   )
      //   .then(function(response) {

      _self.$appupajax
        .get2(
          "/appdb/_db/HANDLER?where=REF_ID=" +
            this.$route.params.id +
            " and REF_TYPE='CMS_handler'",
          {},
          { withCredentials: true, credentials: "include" }
        )
        .then(_self.$appupajax.handleResponse)
        .then(response => {
          _self.handlerItems = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    helperdetails: function(event) {
      this.selectedComponentFormJson = {};
      this.selectedComponent = event.target.value;
      this.selectedComponentFormJson = JSON.parse(
        JSON.stringify(
          componentsFormJson.find(
            obj => obj.component === this.selectedComponent
          )
        )
      );
      if (this.selectedComponentFormJson.component == "ac-calendar") {
        this.selectedComponentFormJson = acCalendarJson;
      }
      if (this.selectedComponentFormJson.component == "ac-collection-card") {
        this.selectedComponentFormJson.fields = [
          ...this.selectedComponentFormJson.fields,
          ...collectionCardSlots
        ];
      }
      if (this.selectedComponentFormJson.component == "ac-form-preview") {
        this.selectedComponentFormJson = acFormPreview;
      }
      this.selectedComponentFormJson.fields = this.selectedComponentFormJson.fields.filter(
        item => item.type !== "hidden"
      );
      this.selectedComponentFormJson.fields.unshift({
        type: "hidden"
      });
      this.selectedComponentFormJson.fields.push({
        type: "hidden"
      });
      this.sampleHelpersData();
      this.isModalShown = true;
    },
    sampleHelpersData: function(){
      this.helper_sample_url=`https://qa.appup.com/appdb/_db/BLOCKS?fields=ID,NAME%20as%20text%20,COMPONENT_JSON%20as%20value,TYPE&where=APPLICATION_ID=${this.$route.params.appId}%20AND%20TYPE=%22${this.helperName}%22`
    },
    saveBlock: function() {
      console.log(this.formData);
      console.log("this is from createdform from" + this.name);
      this.saveJson["NAME"] = this.name;
      this.saveJson["TITTLE"] = this.description;
      this.saveJson["COMPONENT_JSON"] = JSON.stringify({
        formdata: this.formData
      });
      this.saveJson["TYPE"] = this.selectedComponent;
      this.saveJson["REF_TYPE"] = "cms";
      this.saveJson["REF_ID"] = this.$route.params.id;
      this.saveJson["CATEGORY_ID"] = this.category;
      if (this.editMode == false) {
        this.start("post_block_helpers", {
          savejson: this.saveJson,
          getData: responseData => {
            this.getHelpersList();
          }
        });
      } else {
        this.saveJson["ID"] = this.editId;
        this.start("put_block_helpers", {
          id: this.editId,
          editJson: this.saveJson,
          getData: responseData => {
            this.getHelpersList();
          }
        });
      }
      this.hideModal();
    }
  }
};
</script>
