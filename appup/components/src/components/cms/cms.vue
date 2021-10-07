<template>
  <div>
    <div class="row">
      <div class="col-6">
        <component :is="form_helper"></component>
      </div>
      <div class="col-1" style="border-left: 1px solid rgb(213, 201, 201); height: auto;"></div>
      <div class="col-5">
        <h3>Helpers List</h3>
        <template v-if="$route.params.type != 'add'">
          <b-button variant="outline-primary" @click="showModal()">+</b-button>
        </template>
        <ac-collection-table
          :url="helper_url"
          ref="helpersListref"
          dropdown="true"
          :method="helper_url_method"
          :columns="helperColumns"
          @dropdown_click="onHelperDropdownClick"
          :dropdown_options="dropdownOptions"
          :dropdown_button_options="dropdownButtonOptions"
        ></ac-collection-table>
        <b-modal ref="my_modal" size="lg" title="Helpers">
          <template slot="modal-footer">
            <template v-if="helper_mode">
              <b-button variant="primary" @click="saveBlock()">Save</b-button>
            </template>
            <template v-else>
              <b-button variant="primary" @click="updateBlock()">Update</b-button>
            </template>
          </template>
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="name" class="form-control" placeholder="helper name" />
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
            <select class="form-control" v-model="helperName" @change="helperdetails($event)">
              <option :value="null">Select a sample</option>
              <option
                v-for="(item,index) in componentsFormJson"
                :value="item.component"
                :text="item.label"
                :key="index"
              >{{item.component}}</option>
            </select>
          </div>
          <div class="form-group">
            <ac-helper
              v-if="isModalShown"
              :type="selectedComponent"
              :form-json="selectedComponentFormJson"
              v-model="formData"
              :presetValue="false"
            />
          </div>
        </b-modal>
        <h3>Handlers List</h3>
        <template v-if="$route.params.type != 'add'">
          <b-button variant="outline-primary" @click="addHandler()">+</b-button>
        </template>
        <ac-collection-table
          :url="handler_url"
          ref="handlerListref"
          dropdown="true"
          :method="handler_url_method"
          :columns="handlerColumns"
          @dropdown_click="onHandlerDropdownClick"
          :dropdown_options="dropdownOptions"
          :dropdown_button_options="dropdownButtonOptions"
        ></ac-collection-table>
      </div>
    </div>
  </div>
</template>
<script>
import componentsFormJson from "../helper-json/cms_components_form.json";
let appupFilterJson = require("../helper-json/appup-filter-component.json");
let cmsJson = require("../helper-json/appup-cms.json");
let cmsItemJson = require("../helper-json/appup-cms-item.json");
let acCalendarJson = require("../helper-json/ac-calendar-component.json");
let simpleFilterJson = require("../helper-json/ac-simple-filter-component.json");
let collectionCardSlots = require("../helper-json/collection-card-slots.json");
let acFormPreview = require("../helper-json/ac-form-preview-component.json");

componentsFormJson.push(appupFilterJson);
componentsFormJson.push(simpleFilterJson);
componentsFormJson.push(cmsJson);
componentsFormJson.push(cmsItemJson);
export default {
  props: {
    form_helper: {
      type: String,
      required: false
    },
    handler_url: {
      type: String,
      required: false
    },
    handler_url_method: {
      type: String,
      required: false
    },
    helper_url: {
      type: String,
      required: false
    },
    helper_url_method: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isModalShown: false,
      selectedComponentFormJson: "",
      selectedComponent: "",
      componentsFormJson: componentsFormJson,
      name: "",
      description: "",
      formData: "",
      dropdownButtonOptions: {
        icon: "fal fa-ellipsis-h",
        variant: "bg-transparent p-0",
        size: "lg",
        right: true
      },
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
      helperColumns: [
        { key: "NAME", label: "Helper Name" },
        { key: "TYPE", label: "Component Name" }
      ],
      helper_mode:true,
      handlerColumns: [{ key: "NAME", label: "Handler Name" }],
      editMode: false,
      editId: ""
    };
  },
  methods: {
    showModal() {
      this.helper_mode=true;
      this.emptyData();
      this.$refs["my_modal"].show();
    },
    addHandler: function() {
      this.$emit("Add_Handler", { params: this.$route.params });
    },
    saveBlock: function() {
      var saveJson = {};
      saveJson["NAME"] = this.name;
      saveJson["TITTLE"] = this.description;
      saveJson["COMPONENT_JSON"] = JSON.stringify({
        formdata: this.formData
      });
      saveJson["TYPE"] = this.selectedComponent;
      saveJson["REF_TYPE"] = "cms";
      this.$emit("save_helper", {
        helper_data: saveJson,
        params: this.$route.params
      });
    },
    updateBlock: function() {
      var saveJson = {};
      saveJson["NAME"] = this.name;
      saveJson["TITTLE"] = this.description;
      saveJson["COMPONENT_JSON"] = JSON.stringify({
        formdata: this.formData
      });
      saveJson["TYPE"] = this.selectedComponent;
      saveJson["REF_TYPE"] = "cms";
      saveJson["ID"] = this.editId;
      this.$emit("edit_helper", {
        helper_data: saveJson,
        params: this.$route.params
      });
    },
    onHelperDropdownClick: function(data) {
      if (data.type == "edit") {
        this.openModal(data.item);
      }
      if (data.type == "delete") {
        this.$emit("delete_helper", { data: data.item });
      }
    },
    openModal: function(data) {
      this.showModal();
      this.name = data.NAME;
      this.description = data.TITTLE;
      this.selectedComponent = data.TYPE;
      this.helperName = data.TYPE;
      this.category = data.CATEGORY_ID;
      var parsedData = JSON.parse(data.COMPONENT_JSON);
      this.formData = parsedData.formdata;
      this.helper_mode=false;
      this.editMode = true;
      this.editId = data.ID;
      var event = {
        target: {
          value: data.TYPE
        }
      };
      this.helperdetails(event);
    },
    emptyData: function() {
      this.formData = "";
      this.name = "";
      this.description = "";
      this.category = "";
      this.helperName = "";
      this.selectedComponent = "";
      this.selectedComponentFormJson = "";
      this.editMode = false;
    },
    onHandlerDropdownClick: function(data) {
      if (data.type == "edit") {
        this.$emit("edit_handler", { data: data.item });
      }
      if (data.type == "delete") {
        this.$emit("delete_handler", { data: data.item });
      }
    },
    helperData: function(newValue) {
      this.$children[1].actual_data.push(newValue);
      return "success";
    },
    helperdetails: function(event) {
      this.selectedComponentFormJson = {};
      this.selectedComponent = event.target.value;
      this.selectedComponentFormJson = JSON.parse(
        JSON.stringify(
          this.componentsFormJson.find(
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
      this.isModalShown = true;
    }
  }
};
</script>
<style scoped>
</style>