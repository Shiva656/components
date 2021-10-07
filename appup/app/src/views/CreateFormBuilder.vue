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
          <b-container class="bv-example-row">
            <b-row>
              <b-col cols="6">
                <b-form data-vv-scope="formBlock">
                  <b-tabs content-class="mt-3" no-fade>
                    <b-tab title="info" active>
                      <div class="form-group">
                        <label>NAME</label>
                        <b-form-input
                          placeholder="Enter name of the Helper"
                          v-model="name"
                          v-validate="'required'"
                          name="name"
                          :class="{'input': true, 'is-danger': errors.has('name') }"
                        ></b-form-input>
                        <b-form-text>Please enter the name how you would like to see this helper in your pages. Eg: MenuBar will be used as &#x3C;MenuBar&#x3E; in your pages code.</b-form-text>
                        <span
                          v-show="errors.has('formBlock.name')"
                          class="help is-danger validations-text"
                          style="color: red"
                        >{{ errors.first('formBlock.name') }}</span>
                      </div>

                      <div class="form-group">
                        <label>DESCRIPTION</label>
                        <b-form-input
                          placeholder="Enter Description of the Helper"
                          v-model="description"
                          v-validate="'required'"
                          name="description"
                          :class="{'input': true, 'is-danger': errors.has('description') }"
                        ></b-form-input>
                        <b-form-text>Please write the description of the helper, it will be helpful to know about the helper.</b-form-text>
                        <span
                          v-show="errors.has('formBlock.description')"
                          class="help is-danger validations-text"
                          style="color: red"
                        >{{ errors.first('formBlock.description') }}</span>
                      </div>
                      <div class="form-group">
                        <label>CATEGORY</label>
                        <b-form-select
                          v-model="category"
                          class="mb-3"
                          v-validate="'required'"
                          name="category"
                          :class="{'input': true, 'is-danger': errors.has('category') }"
                        >
                          <option :value="null">Please select Category</option>
                          <option
                            v-for="item in category_data"
                            :value="item.ID"
                            :text="item.NAME"
                            :key="item.ID"
                          >{{item.NAME}}</option>
                        </b-form-select>
                        <b-form-text>Assign the helper to a particular category.</b-form-text>
                        <span
                          v-show="errors.has('formBlock.category')"
                          class="help is-danger validations-text"
                          style="color: red"
                        >{{ errors.first('formBlock.category') }}</span>
                      </div>
                      <div class="form-group">
                        <label>Ref</label>
                        <b-input
                          type="text"
                          v-model="form.meta.props.refs"
                          placeholder="Enter reference for the helper"
                        ></b-input>
                        <b-form-text>Please enter reference for the helper.</b-form-text>
                      </div>
                      <div class="form-group">
                        <label>ID</label>
                        <b-input
                          type="text"
                          v-model="form.meta.props.id"
                          placeholder="Enter ID for the helper"
                        ></b-input>
                        <b-form-text>Please enter ID for the helper.</b-form-text>
                      </div>
                    </b-tab>
                    <b-tab title="fields">
                      <div class="form-group">
                        <label>ADD FIELD</label>
                        <ac-helper-form ref="helperForm" v-model="form.fields"></ac-helper-form>
                        <b-form-text>Add fields to form like text, email, dropdown...</b-form-text>
                      </div>

                      <b-form-group label="Inline Form">
                        <b-form-radio-group v-model="form.meta.props.inline">
                          <b-form-radio :value="false">No</b-form-radio>
                          <b-form-radio :value="true">Yes</b-form-radio>
                        </b-form-radio-group>
                        <b-form-text>Show fields in Inline.</b-form-text>
                      </b-form-group>

                      <b-form-group label="Inline Labels">
                        <b-form-radio-group v-model="form.meta.props.inlineLabels">
                          <b-form-radio :value="false">No</b-form-radio>
                          <b-form-radio :value="true">Yes</b-form-radio>
                        </b-form-radio-group>
                        <b-form-text>Show field and it's label in Inline.</b-form-text>
                      </b-form-group>
                      <b-form-group label="Select Form Type">
                        <b-form-select v-model="form.meta.formType" class="mb-3">
                          <option value="form">form</option>
                          <option value="form2">form-inline</option>
                        </b-form-select>
                        <b-form-text>Please select form or form-inline</b-form-text>
                      </b-form-group>
                      <div class="form-group" v-if="form.meta.formType == 'form2'">
                        <label>Sections</label>
                        <b-form-textarea
                          placeholder="Sections CSS"
                          v-model="form.meta.props.sections"
                        ></b-form-textarea>
                        <b-form-text>CSS class for sections {"sectionGroup":{"sectionName1":"col-md-4","sectionName2":"col-md-8"}}</b-form-text>
                      </div>
                      <div class="form-group" v-if="form.meta.formType == 'form2'">
                        <label>Section Classes</label>
                        <b-form-textarea
                          placeholder="Sections Classes"
                          v-model="form.meta.props.section_classes"
                        ></b-form-textarea>
                        <b-form-text>CSS class for section classes {"sectionGroup":{"sectionName1":"class1","sectionName2":"class2"}}</b-form-text>
                      </div>
                       <b-form-group label="Form Group Class">
                        <b-input
                          type="text"
                          v-model="form.meta.props.form_group_class"
                          placeholder="Enter class to form group"
                        ></b-input>
                         <b-form-text>Add class to form group</b-form-text>

                      </b-form-group>
                    </b-tab>
                    <b-tab title="Buttons">
                      <div class="form-group">
                        <label>ADD BUTTON</label>
                        <appup-grid
                          :columns="buttonColumns"
                          :form-json="buttonFormJson"
                          v-model="form.buttons"
                          ref="ag"
                        />
                        <b-form-text>Add buttons to form like save, submit...</b-form-text>
                      </div>

                      <div class="form-group">
                        <label>BUTTON DIRECTION</label>
                        <b-form-select v-model="form.meta.props.direction" class="mb-3">
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="center">Center</option>
                        </b-form-select>
                        <b-form-text>button direction like left, right, center</b-form-text>
                      </div>
                      <div class="form-group">
                        <label>BUTTON GROUP CLASS</label>
                        <b-input
                          type="text"
                          v-model="form.meta.props.button_group_class"
                          placeholder="Enter button group class"
                        ></b-input>
                        <b-form-text>Class for button group</b-form-text>
                      </div>
                    </b-tab>
                    <b-tab title="keys">
                      <div class="form-group">
                        <label>Add Keys</label>
                        <br />
                        <!-- <a href @click.prevent="showModal">Import from JSON</a> -->
                        <appup-grid :columns="columns" :form-json="formJson" v-model="items" />
                        <b-form-text>Add more key, value to form like get, post, nextUrl...</b-form-text>
                      </div>
                    </b-tab>
                    <b-tab title="Events">
                      <div class="form-group">
                        <label>PRELOAD HANDLER</label>

                        <appup-grid
                          :columns="handlersGrid.columns"
                          :form-json="handlersGrid.formJson"
                          v-model="form.meta['preload']"
                        />
                        <b-form-text>Select preload handler to load the form</b-form-text>
                      </div>
                      <div class="form-group">
                        <label>SUBMIT HANDLER</label>

                        <appup-grid
                          :columns="handlersGrid.columns"
                          :form-json="handlersGrid.formJson"
                          v-model="form.meta['submit']"
                        />
                        <b-form-text>Select submit handler to submit the form</b-form-text>
                      </div>
                      <div class="form-group">
                        <label>WORKFLOW PARAMS</label>
                        <b-form-textarea
                          placeholder="workflow params"
                          v-model="form.meta['workflow_params']"
                        ></b-form-textarea>
                        <b-form-text>Send workflow_params to handler like {"entity":"form"}</b-form-text>
                      </div>
                    </b-tab>
                  </b-tabs>
                  <b-row>
                    <b-col cols="6" v-if="$route.params.ID">
                      <b-button
                        variant="primary"
                        @click="validateForm($event, 'formBlock','edit')"
                        align="center"
                      >SAVE CHANGES</b-button>
                    </b-col>
                    <b-col cols="6" v-else>
                      <b-button
                        variant="primary"
                        @click="validateForm($event, 'formBlock','add')"
                        type="submit"
                        align="center"
                      >SAVE</b-button>
                    </b-col>
                  </b-row>
                </b-form>
                <b-modal ref="keysmodal" hide-footer>
                  <template slot="modal-title">
                    <p>Import from JSON</p>
                  </template>
                  <div class="d-block text-center">
                    <div class="form-group">
                      <label id="label">JSON</label>

                      <!--user will give here Array-of-JSONS -->
                      <b-form-textarea v-model="keysJSON" placeholder="Enter JSON..."></b-form-textarea>
                    </div>
                    <b-button class="mt-3" variant="primary" @click="importKeys">submit</b-button>
                  </div>
                </b-modal>
              </b-col>
              <hr style="width: 1px;height: inherit;background: #0000002b;border: none;" />
              <b-col cols="5">
                <center>
                  <label>FORM PREVIEW</label>
                </center>
                <br />
                <template v-if="form.meta.formType == 'form2'">
                  <appup-form2
                    :form-json="form"
                    :form-data="form_data"
                    v-model="form_data"
                    ref="appupForm2"
                    v-bind="form.meta.props"
                    class="preview-form"
                    :direction="form.meta.props.direction"
                    :form_group_class="form.meta.props.form_group_class"
                    :button_group_class="form.meta.props.button_group_class"
                  />
                </template>
                <template v-else>
                  <appup-form
                    :form-json="form"
                    :form-data="form_data"
                    v-model="form_data"
                    ref="appupForm"
                    :inline="form.meta.props.inline"
                    :inline-labels="form.meta.props.inlineLabels"
                    class="preview-form"
                    :direction="form.meta.props.direction"
                    :form_group_class="form.meta.props.form_group_class"
                    :button_group_class="form.meta.props.button_group_class"
                  />
                </template>
              </b-col>
            </b-row>
          </b-container>
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
// Import components and libraries

import AppupHeader from "./AppupHeader.vue";
import AppupFooter from "./Appupfooter.vue";
import Navbar from "./Navbar.vue";
import axios from "axios";
// Export components

export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
      name: null,
      description: null,
      handlers: {},
      form_data: {},
      //appup-form component entity JSON.
      form: {
        fields: [],
        buttons: [
          { type: "submit", id: "submit", label: "SAVE", variant: "primary" }
        ],
        meta: {
          preload: [],
          submit: [],
          workflow_params: "",
          formType: "form",
          props: {
            inline: false,
            inlineLabels: false,
            refs: "",
            id: null,
            sections: null,
            direction: null,
            form_group_class: null,
            button_group_class: null,
            section_classes: null
          }
        }
      },
      saveJson: {},
      category_data: "",
      category: null,
      editJson: {},
      /**
       * cloumns, formjson, items - To add more (key,value) to form dynamically we are using grid component.
       */
      columns: [
        { key: "key", label: "Key" },
        { key: "value", label: "Value" },
        { key: "actions", label: "" }
      ],
      formJson: {
        fields: [
          {
            type: "text",
            name: "key",
            label: "Key",
            required: true
          },
          {
            type: "text",
            name: "value",
            label: "Value"
          }
        ]
      },
      items: [],
      keysJSON: null,
      /**
       * buttonColumns, buttonFormJson, buttons - To add buttons to form dynamically - we are using grid component.
       */
      buttonColumns: [
        { key: "label", label: "Label" },
        { key: "variant", label: "Variant" },
        { key: "actions", label: "" }
      ],
      buttonFormJson: {
        fields: [
          {
            type: "text",
            name: "id",
            label: "Id",
            required: false
          },
          {
            type: "text",
            name: "label",
            label: "Label",
            required: true
          },
          {
            type: "dropdown",
            name: "variant",
            label: "Variant",
            option: [
              {
                value: "primary",
                label: "Primary"
              },
              {
                value: "secondary",
                label: "Secondary"
              },
              {
                value: "success",
                label: "Success"
              },
              {
                value: "danger",
                label: "Danger"
              },
              {
                value: "warning",
                label: "Warning"
              },
              {
                value: "info",
                label: "Info"
              },
              {
                value: "light",
                label: "Light"
              },
              {
                value: "dark",
                label: "Dark"
              },
              {
                value: "outline-primary",
                label: "Outline-Primary"
              },
              {
                value: "outline-secondary",
                label: "Outline-Secondary"
              },
              {
                value: "outline-success",
                label: "Outline-Success"
              },
              {
                value: "outline-danger",
                label: "Outline-Danger"
              },
              {
                value: "outline-warning",
                label: "Outline-Warning"
              },
              {
                value: "outline-info",
                label: "Outline-Info"
              },
              {
                value: "outline-light",
                label: "Outline-Light"
              },
              {
                value: "outline-dark",
                label: "Outline-Dark"
              },
              {
                value: "link",
                label: "Link"
              }
            ]
          },
          {
            type: "dropdown",
            name: "type",
            label: "Type",
            option: [
              {
                value: "submit",
                label: "Submit"
              },
              {
                value: "button",
                label: "Button"
              }
            ],
            required: true
          },
          {
            id: "handlerName",
            name: "handlerName",
            label: "Handler",
            type: "dropdown",
            url:
              "appdb/_db/HANDLER?fields=ID,IS_SECURE,IS_WRITABLE,NAME&where=OWNER_ID=0 or APPLICATION_ID={{appId}}&IS_SECURE=0",
            option: [
              {
                value: "",
                label: "No Handler"
              }
            ],
            key_value: "NAME",
            key_label: "NAME",
            condition: "form.type == 'button'"
          },
          {
            type: "textarea",
            name: "handlerParams",
            label: "Handler Params",
            condition: "form.type == 'button'"
          },
          {
            type: "text",
            name: "class",
            label: "Class",
            required: false
          }
        ]
      },
      handlersGrid: {
        columns: [
          {
            key: "name",
            label: "Handler name",
            sortable: true
          },
          {
            key: "params",
            label: "Handler params"
          },
          {
            key: "actions",
            label: ""
          }
        ],
        formJson: {
          fields: [
            {
              id: "name",
              name: "name",
              label: "Handler",
              type: "dropdown",
              url:
                "appdb/_db/HANDLER?fields=ID,IS_SECURE,IS_WRITABLE,NAME&where=OWNER_ID=0 or APPLICATION_ID={{appId}}&IS_SECURE=0",
              option: [
                {
                  value: "",
                  label: "No Handler"
                }
              ],
              key_value: "NAME",
              key_label: "NAME"
            },
            {
              id: "params",
              name: "params",
              label: "Handler Params",
              type: "textarea"
            }
          ]
        }
      },
      helperSamples: null,
      helperSamplesList: [
        {
          label: "Example 1",
          props: {
            fields: [
              {
                id: "first",
                type: "text",
                name: "first",
                label: "Text Field",
                required: true
              },
              {
                type: "email",
                id: "email",
                name: "email",
                label: "Email Field"
              },
              {
                id: "tags",
                type: "tags",
                name: "tags",
                loadOptions: "url",
                label: "Tag Field"
              },
              {
                id: "grid",
                type: "grid",
                name: "grid",
                columns: [
                  {
                    label: "text",
                    key: "text"
                  }
                ],
                label: "Grid Field",
                formJson: {
                  fields: [
                    {
                      id: "text",
                      type: "text",
                      name: "text",
                      label: "Text"
                    }
                  ]
                }
              }
            ],
            buttons: [
              {
                type: "submit",
                id: "submit",
                label: "submit",
                variant: "primary"
              }
            ],
            meta: {
              preload: [
                {
                  name: "Sys_form_load",
                  params: "{}"
                }
              ],
              submit: [
                {
                  name: "Sys_form_submit",
                  params: "{}"
                }
              ],
              workflow_params: "{}",
              props: {
                inline: false,
                inlineLabels: false,
                refs: "testRefs"
              }
            },
            post: "https://jsonplaceholder.typicode.com/posts"
          }
        }
      ]
    };
  },
  methods: {
    /**
     * What ever the keys added dynmically using grid(ADD KEYS) - adding into form object.
     */
    addkeys: function() {
      if (this.items) {
        this.items.map(field => {
          if (
            field.key !== "fields" &&
            field.key !== "buttons" &&
            field.key !== "meta"
          ) {
            this.form[field.key] = field.value;
          }
        });
      }
    },
    validateForm: function(event, scopeForm, type) {
      event.preventDefault();
      this.$validator.validateAll(scopeForm).then(result => {
        if (result) {
          if (type == "add") this.createForm();
          else if (type == "edit") this.saveChages();
          return;
        }
      });
    },
    /**
     * Saving form as block, the form object saving as COMPONENT_JSON in block table cloumn.
     */
    createForm: function() {
      this.saveJson["NAME"] = this.name;
      this.saveJson["TITTLE"] = this.description;
      this.addkeys();
      this.saveJson["COMPONENT_JSON"] = JSON.stringify(this.form);
      if (this.$route.params.templateID) {
        this.saveJson["REF_TYPE"] = "cms";
        this.saveJson["REF_ID"] = this.$route.params.templateID;
      }
      this.saveJson["TYPE"] = "FORM";
      this.saveJson["CATEGORY_ID"] = this.category;
      this.start("post_block_type", { savejson: this.saveJson });
    },
    saveChages: function() {
      this.editJson["ID"] = this.$route.params.ID;
      this.editJson["NAME"] = this.name;
      this.editJson["TITTLE"] = this.description;
      if (this.$route.params.templateID) {
        this.editJson["REF_TYPE"] = "cms";
        this.editJson["REF_ID"] = this.$route.params.templateID;
      }
      this.addkeys();
      this.editJson["COMPONENT_JSON"] = JSON.stringify(this.form);
      this.editJson["CATEGORY_ID"] = this.category;
      this.start("put_block_type", {
        entity: "formEdit",
        editJson: this.editJson
      });
    },
    showModal: function() {
      this.$refs.keysmodal.show();
    },
    importKeys: function() {
      let keys = {};
      if (this.keysJSON) {
        keys = JSON.parse(this.keysJSON);
      }
      if (keys) {
        for (var key in keys) {
          let obj = {};
          obj["key"] = key;
          obj["value"] = keys[key];
          this.items.push(obj);
        }
      }
      this.$refs.keysmodal.hide();
    }
  },
  created: function() {
    //To get list categories of block
    this.start("get_category", {
      entity: "formblock",
      categories: (handlerResponse, status) => {
        if (status == 200 && handlerResponse) {
          this.category_data = handlerResponse;
        }
      }
    });
    //To get data of block on ID, prepopulate block with data
    if (this.$route.params.ID) {
      this.start("get_category", {
        entity: "formEdit",
        blockData: (handlerResponse, status) => {
          if (status == 200 && handlerResponse) {
            let form = JSON.parse(handlerResponse.COMPONENT_JSON);
            this.name = handlerResponse.NAME;
            this.description = handlerResponse.TITTLE;
            this.form.fields = JSON.parse(JSON.stringify(form.fields));
            this.form.buttons = JSON.parse(JSON.stringify(form.buttons));
            this.form.meta = JSON.parse(JSON.stringify(form.meta));
            for (var key in form) {
              if (key !== "fields" && key !== "buttons" && key !== "meta") {
                let obj = {};
                obj["key"] = key;
                obj["value"] = form[key];
                this.items.push(obj);
              }
            }
            this.category = handlerResponse.CATEGORY_ID;
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
  watch: {
    helperSamples(newVal, oldVal) {
      if (newVal !== null) {
        let props = this.helperSamplesList[newVal].props;
        if (props) {
          this.form.fields = JSON.parse(JSON.stringify(props.fields));
          this.form.buttons = JSON.parse(JSON.stringify(props.buttons));
          this.form.meta = JSON.parse(JSON.stringify(props.meta));
          for (var key in props) {
            if (key !== "fields" && key !== "buttons" && key !== "meta") {
              let obj = {};
              obj["key"] = key;
              obj["value"] = props[key];
              this.items.push(obj);
            }
          }
        }
      }
    }
  }
};
</script>
<style>
.preview-form .appup-form label {
  text-transform: none !important;
}
</style>