<template>
  <div class="page-wrapper">
    <!-- Header start -->
    <Navbar />
    <!-- Header end -->

    <!-- Page content start -->
    <div class="page-content">
      <div class="container clearfix appup-form">
        <div class="page-title clearfix">
          <div class="float-left">
            <button
              type="button"
              class="btn btn-outline-secondary bg-white"
              @click="$router.go(-1)"
            >
              <span class="icon-arrow-left"></span>
            </button>
            <template v-if="$route.params.ID">
              <h1>Edit Helper</h1>
            </template>
            <template v-else>
              <h1>New Helper</h1>
            </template>
          </div>
          <div class="form-group float-right" v-if="helperSamplesList.length > 0">
            <label for="helper_samples_select">Samples</label>
            <select class="form-control" id="helper_samples_select" v-model="helperSamples">
              <option :value="null">Select a sample</option>
              <option
                v-for="(item,index) in helperSamplesList"
                :value="index"
                :text="item.label"
                :key="index"
              >{{item.label}}</option>
            </select>
          </div>
        </div>

        <section class="block">
          <div class="row appup-form">
            <div class="col-md-12">
              <div class="form-group">
                <label for="component_select_field">Name</label>
                <input type="text" v-model="name" @keyup="setRef()" class="form-control col-md-6" />
                <label for="component_select_field">description</label>
                <input type="text" v-model="description" class="form-control col-md-6" />
              </div>
              <template v-if="selectedComponent == 'ac-card-collection'">
                <div v-for="(slot,slotKey) in slotTemplates" :key="slotKey">
                  <div class="form-group col-md-6">
                    <label>Select {{slotKey}} Slot Template</label>
                    <b-form-select
                      :options="slot"
                      v-model="slotTemplateSelected[slotKey].value"
                      @change.native="setPropsForm($event, slotKey)"
                    ></b-form-select>
                  </div>

                  <form @input="compileToSlotTemplate(slotKey)">
                    <template v-for="(value,key) in getSlotTemplateProps(slotKey)">
                      <b-form-group :key="key" class="col-md-6">
                        <label>{{key}}</label>
                        <b-form-input
                          v-model="slotTemplateSelected[slotKey].props[key]"
                          :name="key"
                        ></b-form-input>
                      </b-form-group>
                    </template>
                  </form>
                </div>
              </template>
              <ac-helper
                :type="selectedComponent"
                :form-json="selectedComponentFormJson"
                v-model="formData"
              />
              <div class="form-group">
                <label for="component_select_field">Assign to a category</label>
                <select
                  class="form-control col-md-6"
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
            </div>
            <div class="form-group">
              <div class="col-md-3" v-if="$route.params.ID">
                <b-button variant="primary" @click="saveChages" align="center">SAVE CHANGES</b-button>
              </div>
              <div class="col-md-3" v-else>
                <b-button variant="primary" @click="createComponent" align="center">SAVE</b-button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="push"></div>
    </div>
    <!-- Page content end -->

    <!-- Appup footer start -->
    <AppupFooter />
    <!-- Appup footer end -->
  </div>
</template>

<script>
import AppupHeader from "../AppupHeader.vue";
import AppupFooter from "../Appupfooter.vue";
import Navbar from "../Navbar.vue";
import Handlebars from "handlebars/dist/handlebars.js";

let componentsFormJson = require("./components_form.json");
let cmsJson = require("../../../../app/src/views/helpers/appup-cms.json");
let cmsItemJson = require("../../../../app/src/views/helpers/appup-cms-item.json");
let componentsHelperSamplesJson = require("./components_helper_samples.json");
let appupFilterJson = require("./appup-filter-component.json");
let acCalendarJson = require("./ac-calendar-component.json");
let simpleFilterJson = require("./ac-simple-filter-component.json");
let collectionCardSlots = require("./collection-card-slots.json");
let acFormbuilder = require("./ac-formbuilder.json");
let acFormPreview = require("./ac-form-preview-component.json")

componentsFormJson.push(appupFilterJson);
componentsFormJson.push(simpleFilterJson);
componentsFormJson.push(acFormbuilder);
componentsFormJson.push(cmsJson);
componentsFormJson.push(cmsItemJson);



export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
      selectedComponent: "",
      selectedComponentFormJson: {},
      category_data: "",
      category: null,
      name: "",
      description: "",
      saveJson: {},
      formData: "",
      editJson: {},
      helperSamples: null,
      slotTemplates: {
        header: [
          {
            text: "Header 1",
            value: "header_1",
            props: {
              content: "{{item.title}}"
            },
            template: '<div class="card-header">{{content}}</div>'
          }
        ],
        body: [
          {
            text: "Body 1",
            value: "body_1",
            props: {
              content: "{{item.body}}"
            },
            template: '<div class="card-body">{{content}}</div>'
          }
        ],
        footer: [
          {
            text: "Footer 1",
            value: "footer_1",
            props: {
              content: "{{item}}"
            },
            template: '<div class="card-footer">{{content}}</div>'
          }
        ]
      },
      slotTemplateSelected: {
        header: {
          props: {}
        },
        footer: {
          props: {}
        },
        body: {
          props: {}
        }
      }
    };
  },

  created() {
    console.log("ac helper created");
    this.selectedComponentFormJson = {};
    this.selectedComponent = this.$route.params.component;
    this.selectedComponentFormJson = JSON.parse(
      JSON.stringify(
        componentsFormJson.find(obj => obj.component === this.selectedComponent)
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
    if(this.selectedComponentFormJson.component == "ac-form-preview"){
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
    //to get categories realted to block
    this.start("get_category", {
      entity: "formblock",
      categories: (handlerResponse, status) => {
        if (status == 200 && handlerResponse) {
          this.category_data = handlerResponse;
        }
      }
    });

    if(this.selectedComponent == "ac-card-collection"){
      this.formData = Object.assign({}, {
        "__slot__card_header": null,
        "__slot__card_footer": null,
        "__slot__card_body": null
      }) 
    }

    //block data to edit
    if (this.$route.params.ID) {
      var self = this;
      this.start("get_category", {
        entity: "formEdit",
        blockData: (handlerResponse, status) => {
          if (status == 200 && handlerResponse) {
            console.log("handlerresponse", handlerResponse);
            var parse_data = JSON.parse(handlerResponse.COMPONENT_JSON);
            self.name = handlerResponse.NAME;
            self.description = handlerResponse.TITTLE;
            self.selectedComponent = handlerResponse.TYPE;
            self.category = handlerResponse.CATEGORY_ID;
            if (handlerResponse.TYPE == "ac-card-collection") {
              this.formData = parse_data["formdata"];
              this.slotTemplateSelected = parse_data["slotTemplateSelected"];
            } else {
              self.formData = parse_data.formdata;
            }
            // To support backward compatibility
            if (typeof parse_data.formdata.button_options === "string") {
              self.formData.button_options = JSON.parse(
                parse_data.formdata.button_options
              );
            }
          }
        }
      });
    }
    //to get handlers for form submit and preload
    this.start("get_category", {
      entity: "getHandlers",
      handlers: (handlerResponse, status) => {
        if (status == 200 && handlerResponse) {
          this.handlers = handlerResponse;
        }
      }
    });
  },
  methods: {
    createComponent: function() {
      console.log(this.formData);
      console.log("this is from createdform from" + this.name);
      this.saveJson["NAME"] = this.name;
      this.saveJson["TITTLE"] = this.description;
      if (this.selectedComponent == "ac-card-collection") {
        let compJson = {};
        compJson["formdata"] = this.formData;
        compJson["slotTemplateSelected"] = this.slotTemplateSelected;
        this.saveJson["COMPONENT_JSON"] = JSON.stringify(compJson);
      } else {
        this.saveJson["COMPONENT_JSON"] = JSON.stringify({
          formdata: this.formData
        });
      }
      this.saveJson["TYPE"] = this.selectedComponent;
      this.saveJson["CATEGORY_ID"] = this.category;
      this.start("post_block_type", { savejson: this.saveJson });
    },
    saveChages: function() {
      this.editJson["ID"] = this.$route.params.ID;
      this.editJson["NAME"] = this.name;
      this.editJson["TITTLE"] = this.description;
      if (this.selectedComponent == "ac-card-collection") {
        let compJson = {};
        compJson["formdata"] = this.formData;
        compJson["slotTemplateSelected"] = this.slotTemplateSelected;
        this.editJson["COMPONENT_JSON"] = JSON.stringify(compJson);
      } else {
        this.editJson["COMPONENT_JSON"] = JSON.stringify({
          formdata: this.formData
        });
      }
      this.editJson["CATEGORY_ID"] = this.category;
      this.start("put_block_type", {
        entity: "formEdit",
        editJson: this.editJson
      });
    },
    setRef() {
      console.log("say hello ", this.name.replace(/[^a-zA-Z0-9_$]/g, ""));
      if (!this.$route.params.ID)
        document.getElementById("input_refs_field").value = this.name.replace(
          /[^a-zA-Z0-9_$]/g,
          ""
        );
    },
    compileToSlotTemplate(slotKey) {
      var template = Handlebars.compile(
        this.getPropsTemplate(slotKey, this.slotTemplateSelected[slotKey].value)
      );
      debugger;
      this.formData["__slot__card_" + slotKey] = template(
        this.slotTemplateSelected[slotKey].props
      );
    },
    setPropsForm(e, slotKey) {
      let selectedValue = e.target.value;
      let template = this.slotTemplates[slotKey].find(
        item => item.value === selectedValue
      );
      this.slotTemplateSelected[slotKey].props = template.props;

      this.compileToSlotTemplate(slotKey);
    },
    getPropsTemplate(slotKey, selected) {
      var propsTemplateDetails = this.slotTemplates[slotKey].find(
        item => item.value === selected
      );
      if (propsTemplateDetails) {
        return propsTemplateDetails.template;
      } else {
        return "";
      }
    },
    getSlotTemplateProps(slotType) {
      if (slotType === "body") {
        return this.bodySlotTemplateProps;
      } else if (slotType === "footer") {
        return this.footerSlotTemplateProps;
      } else {
        return this.headerSlotTemplateProps;
      }
    }
  },

  computed: {
    helperSamplesList() {
      if (
        typeof componentsHelperSamplesJson[this.selectedComponent] !=
        "undefined"
      ) {
        return componentsHelperSamplesJson[this.selectedComponent];
      } else {
        return [];
      }
    },
    headerSlotTemplateProps() {
      let template = this.slotTemplates.header.find(
        item => item.value === this.slotTemplateSelected.header.value
      );
      if (template) {
        return template.props;
      } else {
        return {};
      }
    },
    footerSlotTemplateProps() {
      let template = this.slotTemplates.footer.find(
        item => item.value === this.slotTemplateSelected.footer.value
      );
      if (template) {
        return template.props;
      } else {
        return {};
      }
    },
    bodySlotTemplateProps() {
      let template = this.slotTemplates.body.find(
        item => item.value === this.slotTemplateSelected.body.value
      );
      if (template) {
        return template.props;
      } else {
        return {};
      }
    }
  },

  watch: {
    helperSamples(newVal, oldVal) {
      if (newVal !== null) {
        let props =
          componentsHelperSamplesJson[this.selectedComponent][
            this.helperSamples
          ].props;
        if (this.selectedComponent == "ac-card-collection") {
         this.slotTemplateSelected =
            componentsHelperSamplesJson[this.selectedComponent][
              this.helperSamples
            ].slotTemplateSelected;
        }
        if (props) {
          this.formData = JSON.parse(JSON.stringify(props));
        }
      }
    }
  }
};
</script>
<style>
.w-250 .navbar {
   z-index: 0 !important;
}
</style>
