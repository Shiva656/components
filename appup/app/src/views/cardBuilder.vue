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
                    v-show="errors.has('name')"
                    class="help is-danger validations-text"
                    style="color: red"
                  >{{ errors.first('name') }}</span>
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
                  <span
                    v-show="errors.has('description')"
                    class="help is-danger validations-text"
                    style="color: red"
                  >{{ errors.first('description') }}</span>
                </div>

                <!-- Header slot selection -->
                <div v-for="(slot,slotKey) in slotTemplates" :key="slotKey">
                  <div class="form-group">
                    <label>Select {{slotKey}} Slot Template</label>
                    <b-form-select
                      :options="slot"
                      v-model="slotTemplateSelected[slotKey].value"
                      @change.native="setPropsForm($event, slotKey)"
                    ></b-form-select>
                  </div>

                  <form @input="compileToSlotTemplate(slotKey)">
                    <template v-for="(value,key) in getSlotTemplateProps(slotKey)">
                      <b-form-group :key="key">
                        <label>{{key}}</label>
                        <b-form-input
                          v-model="slotTemplateSelected[slotKey].props[key]"
                          :name="key"
                        ></b-form-input>
                      </b-form-group>
                    </template>
                  </form>
                </div>

                <br />
                <!-- Render appup form from card component json -->
                <appup-form
                  :form-json="cardComponentJson"
                  :form-data="formData"
                  v-model="formData"
                />
                <div class="form-group">
                  <label>ASSIGN TO A CATEGORY</label>
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
                  <span
                    v-show="errors.has('category')"
                    class="help is-danger validations-text"
                    style="color: red"
                  >{{ errors.first('category') }}</span>
                </div>
                <b-row>
                  <b-col cols="6" v-if="$route.params.ID">
                    <b-button
                      variant="primary"
                      @click="validateForm($event,'edit')"
                      align="center"
                    >SAVE CHANGES</b-button>
                  </b-col>
                  <b-col cols="6" v-else>
                    <b-button
                      variant="primary"
                      @click="validateForm($event,'add')"
                      type="submit"
                      align="center"
                    >SAVE</b-button>
                  </b-col>
                </b-row>
              </b-col>
              <hr style="width: 1px;height: inherit;background: #0000002b;border: none;" />
              <b-col cols="5">
                <center>
                  <label>PREVIEW</label>
                </center>
                <br />

                <ac-helper-renderer type="ac-card-collection" :props="formData" />
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
import AppupHeader from "./AppupHeader.vue";
import AppupFooter from "./Appupfooter.vue";
import Navbar from "./Navbar.vue";
import axios from "axios";
import Handlebars from "handlebars/dist/handlebars.js";
export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
      formData: {
        "__slot__card_header": null,
        "__slot__card_footer": null,
        "__slot__card_body": null
      },
      cardComponentJson: {
        component: "ac-card-collection",
        description: null,
        fields: [
          {
            type: "hidden",
             name: "first"
          },
          {
            type: "html",
            html: "<h3> <u>General Props</u></h3>",
            container: "settings",
            "container-name": "props",
            "tab-order": "a",
            "container-active": "true"
          },
          {
            id: "show_dropdown_field",
            name: "show_dropdown",
            label: "Show Dropdown",
            description:
              "If Show Dropdown is true then only dropdown will be shown",
            container: "settings",
            "container-name": "props",
            "tab-order": "a",
            "container-active": "true",
            "category-name": "1_General",
            type: "radio",
            option: [
              {
                label: "Yes",
                value: true
              },
              {
                label: "No",
                value: false
              }
            ]
          },
          {
            id: "dropdown_options_field",
            name: "dropdown_options",
            label: "Dropdown Options",
            description: "Options for dropdown menu for each card",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "1_General",
            type: "grid",
            columns: [
              {
                key: "label",
                label: "label"
              },
              {
                key: "type",
                label: "type"
              },
              {
                key: "icon",
                label: "icon"
              },
              {
                key: "handler",
                label: "handler"
              },
              {
                key: "handler_params",
                label: "handler_params"
              },
              {
                key: "actions",
                label: ""
              }
            ],
            formJson: {
              fields: [
                {
                  type: "text",
                  name: "label",
                  label: "label"
                },
                {
                  type: "text",
                  name: "type",
                  label: "type"
                },
                {
                  type: "text",
                  name: "icon",
                  label: "icon"
                },
                {
                  id: "name",
                  name: "handler",
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
                  type: "text",
                  name: "handler_params",
                  label: "handler_params"
                }
              ]
            }
          },
          {
            id: "dropdown_button_options_field",
            name: "dropdown_button_options",
            label: "Dropdown Button Options",
            description: "Dropdown click button option like ellipsis",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "1_General",
            type: "form",
            formJson: {
              fields: [
                {
                  id: "icon_field",
                  name: "icon",
                  label: "icon",
                  type: "text"
                },
                {
                  id: "variant_field",
                  name: "variant",
                  label: "variant",
                  type: "text"
                },
                {
                  id: "size_field",
                  name: "size",
                  label: "size",
                  type: "text"
                },
                {
                  id: "right_field",
                  name: "right",
                  label: "right",
                  type: "radio",
                  option: [
                    {
                      label: "Yes",
                      value: true
                    },
                    {
                      label: "No",
                      value: false
                    }
                  ]
                }
              ]
            }
          },
          {
            id: "handler_params_field",
            name: "handler_params",
            label: "Handler Params",
            description: "Provide params to handler",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "1_General",
            type: "text"
          },
          {
            id: "url_field",
            name: "url",
            label: "url",
            description: "Fetch data with given url",
            container: "settings",
            "container-name": "props",
            "tab-order": "a",
            "category-name": "1_General",
            type: "text"
          },
          {
            id: "method_field",
            name: "method",
            label: "method",
            description: "Fetch data with given Method",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "1_General",
            type: "text"
          },
          {
            id: "params_field",
            name: "params",
            label: "params",
            description: "Fetch data with given parameters",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "1_General",
            type: "textarea"
          },
          {
            id: "ac_cursor_field",
            name: "ac_cursor",
            label: "ac_cursor",
            description: "Object for generating url query params params",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "1_General",
            type: "textarea"
          },
          {
            type: "html",
            html: "<h3> <u>Advanced Props</u></h3>",
            container: "settings",
            "container-name": "props",
            "tab-order": "a"
          },
          {
            id: "show_searchbar_field",
            name: "show_searchbar",
            label: "Show Searchbar",
            description:
              "To display searchbar, Whenever true show searchbar above the collection.",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "radio",
            option: [
              {
                label: "Yes",
                value: true
              },
              {
                label: "No",
                value: false
              }
            ]
          },
          {
            id: "search_key_field",
            name: "search_key",
            label: "Search Key",
            description:
              "Search Key to perform search action, based on what key search should be performed.",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "show_pagination_field",
            name: "show_pagination",
            label: "Show Pagination",
            description:
              "Whenever true, show pagination buttons below the collection.",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "radio",
            option: [
              {
                label: "Yes",
                value: true
              },
              {
                label: "No",
                value: false
              }
            ]
          },
          {
            id: "limit_field",
            name: "limit",
            label: "Limit",
            description:
              "When pagination is true displays the data based on limit.",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "number"
          },
          {
            id: "total_count_field",
            name: "total_count",
            label: "Total Count",
            description:
              "When pagination is true to divide the data in pages based on total count(data length)",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "number"
          },
          {
            id: "limit_key_field",
            name: "limit_key",
            label: "Limit Key",
            description:
              "Key to apply limit which support url Eg. limit , _limit etc",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "offset_key_field",
            name: "offset_key",
            label: "Offset Key",
            description:
              "Key to apply offset which support url Eg. offset , _start etc",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "load_more_type_field",
            name: "load_more_type",
            label: "Load More Type",
            description: "Type of loading more information",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "show_loadmore_field",
            name: "show_loadmore",
            label: "Show Load More",
            description: "If it is true show load more option",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "radio",
            option: [
              {
                label: "Yes",
                value: true
              },
              {
                label: "No",
                value: false
              }
            ]
          },
          {
            id: "stg_data_count_field",
            name: "stg_data_count",
            label: "Total Count",
            description:
              "When Show Load More is true give totalcount of data for loading with limit",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "number"
          },
          {
            id: "limit_field",
            name: "limit",
            label: "Limit",
            description:
              "When Show Load More is true displays the data based on limit",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "number"
          },
          {
            id: "limit_key_field",
            name: "limit_key",
            label: "Limit Key",
            description:
              "When Show Load More is true limit should append for which key in url",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "offset_key_field",
            name: "offset_key",
            label: "Offset Key",
            description:
              "When Show Load More is true offset should append for which key in url",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "filter_key_field",
            name: "filter_key",
            label: "filter_key",
            description: "Data will be filtered by this key",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "filter_value_field",
            name: "filter_value",
            label: "filter_value",
            description: "Filter data by value of filter_key",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "fetch_count_field",
            name: "fetch_count",
            label: "fetch_count",
            description: "Count for the API calls",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "sort_key_field",
            name: "sort_key",
            label: "sort_key",
            description: "This key will be used in each object to sort data",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            id: "response_key_field",
            name: "response_key",
            label: "response_key",
            description: "This key will be used in response to set data",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "3_Advanced",
            type: "text"
          },
          {
            type: "html",
            html: "<h3> <u>Style Props</u></h3>",
            container: "settings",
            "container-name": "props",
            "tab-order": "a"
          },
          {
            id: "no_of_columns_field",
            name: "no_of_columns",
            label: "No of Columns",
            description:
              "To show how many columns for each row, by default it is 3.",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "4_Style",
            type: "number"
          },
          {
            id: "responsive_class_field",
            name: "responsive_class",
            label: "Responsive Class",
            description:
              "Bootstrap class to change UI look Eg. col-12 col-md-12",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "4_Style",
            type: "text"
          },
          {
            id: "main_class_field",
            name: "main_class",
            label: "Main Class",
            description:
              "User defined class, It will add main div of this helper",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "4_Style",
            type: "text"
          },
          {
            id: "body_class_field",
            name: "body_class",
            label: "Body Class",
            description: "User defined class, It will add to card body",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "4_Style",
            type: "text"
          },
          {
            id: "loading_image_field",
            name: "loading_image",
            label: "Loading Image",
            description: "Image to show while loading data",
            container: "settings",
            "container-name": "props",
            "tab-order": "a",
            "category-name": "4_Style",
            type: "text"
          },
          {
            id: "max_height_field",
            name: "max_height",
            label: "Maximum Height",
            description: "Max height of component",
            container: "settings",
            "tab-order": "a",
            "container-name": "props",
            "category-name": "4_Style",
            type: "text"
          },
          {
            id: "refs_field",
            name: "refs",
            label: "refs",
            description: "Component reference",
            type: "text",
            container: "settings",
            "container-name": "props",
            "tab-order": "a"
          },
          {
            id: "__slot__header_field",
            name: "__slot__header",
            label: "header slot",
            description: "Use this slot for header",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__slot__body_field",
            name: "__slot__body",
            label: "body slot",
            description:
              "Use this slot for body, If this slot is used then card-header, card-body, card-footer slots will be ignored.",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__slot__card_header_field",
            name: "__slot__card_header",
            label: "card_header slot",
            description: "Use this slot for each card header",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__slot__card_body_field",
            name: "__slot__card_body",
            label: "card_body slot",
            description: "Use this slot for each card body",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__slot__card_footer_field",
            name: "__slot__card_footer",
            label: "card_footer slot",
            description: "Use this slot for each card footer",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__slot__empty_state_field",
            name: "__slot__empty_state",
            label: "empty_state slot",
            description:
              "Use this slot to show empty state. Whenever data is empty, this slot will be shown.",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__slot__footer_field",
            name: "__slot__footer",
            label: "footer slot",
            description: "Use this slot for footer",
            type: "textarea",
            container: "settings",
            "container-name": "slots",
            "tab-order": "b"
          },
          {
            id: "__event__dropdown_click_field",
            type: "grid",
            label: "dropdown_click event",
            name: "__event__dropdown_click",
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
            },
            container: "settings",
            "container-name": "events",
            "tab-order": "c"
          },
          {
            id: "__event__click_field",
            type: "grid",
            label: "click event",
            name: "__event__click",
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
            },
            container: "settings",
            "container-name": "events",
            "tab-order": "c"
          },
          {
            id: "preload_field",
            name: "preload",
            label: "preload",
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
          }
        ]
      },
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
      },
      name: null,
      description: null,
      saveJson: {},
      editJson: {},
      category_data: "",
      category: null,
      helperSamples: null,
      helperSamplesList: [
        {
          label: "Example 1",
          props: {
            "__slot__card-header":
              '<div class="card-header">{{item.id}} - {{item.email}}</div>',
            "__slot__card-footer":
              '<div class="card-footer">{{item.postId}}</div>',
            "__slot__card-body":
              '<div class="card-body">{{item.name}}<img src="https://cdn.pixabay.com/photo/2018/08/03/14/50/flamingo-3582047_960_720.jpg" /></div>',
            dropdown_options: [
              {
                label: "Edit",
                type: "edit",
                icon: "fas fa-pencil-alt",
                handler_params: '{"key":"value"}'
              },
              {
                label: "Delete",
                type: "delete",
                icon: "fas fa-trash-alt"
              }
            ],
            url: "https://jsonplaceholder.typicode.com/posts/1/comments",
            show_dropdown: true,
            dropdown_button_options: {
              icon: " fas fa-ellipsis-v",
              variant: "outline-secondary",
              size: "sm"
            },
            __slot__body: "",
            __event__click: [
              {
                name: "test12",
                params: "{}"
              }
            ],
            method: "GET",
            params: "",
            responsive_class: "",
            loading_image:
              "https://cmswebsites.s3.us-west-1.amazonaws.com/Dual%20Ring-0.9s-200px.gif",
            show_searchbar: true,
            refs: "cardBuilderRef",
            ac_cursor: "{}",
            sort_key: "name",
            show_pagination: true,
            limit: "5",
            total_count: "40",
            limit_key: "_limit",
            offset_key: "_start",
            __slot__header:
              '<header class="border p-2 mb-2">Ac collection header</header>',
            __slot__footer:
              '<footer class="border p-2 mt-2">ac collection footer</footer>'
          },
          slotTemplateSelected: {
            header: {
              props: {
                content: "{{item.title}}"
              },
              value: "header_1"
            },
            footer: {
              props: {
                content: "{{item.postId}}"
              },
              value: "footer_1"
            },
            body: {
              props: {
                content: "{{item.name}}",
                imge:
                  "https://cdn.pixabay.com/photo/2018/08/03/14/50/flamingo-3582047_960_720.jpg"
              },
              value: "body_1"
            }
          }
        }
      ]
    };
  },
  created: function() {
    console.log("from created");
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
            let compJson = JSON.parse(handlerResponse.COMPONENT_JSON);
            this.formData = compJson["formdata"];
            this.slotTemplateSelected = compJson["slotTemplateSelected"];
            this.name = handlerResponse.NAME;
            this.description = handlerResponse.TITTLE;
            this.category = handlerResponse.CATEGORY_ID;
          }
        }
      });
    }
  },
  computed: {
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
  methods: {
    getSlotTemplateProps(slotType) {
      if (slotType === "body") {
        return this.bodySlotTemplateProps;
      } else if (slotType === "footer") {
        return this.footerSlotTemplateProps;
      } else {
        return this.headerSlotTemplateProps;
      }
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
    compileToSlotTemplate(slotKey) {
      var template = Handlebars.compile(
        this.getPropsTemplate(slotKey, this.slotTemplateSelected[slotKey].value)
      );
      this.formData["__slot__card-" + slotKey] = template(
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
    validateForm: function(event, type) {
      event.preventDefault();
      this.$validator.validateAll().then(result => {
        if (result) {
          if (type == "add") this.createForm();
          else if (type == "edit") this.saveChages();
          return;
        }
      });
    },
    createForm: function() {
      this.saveJson["NAME"] = this.name;
      this.saveJson["TITTLE"] = this.description;
      let compJson = {};
      compJson["formdata"] = this.formData;
      compJson["slotTemplateSelected"] = this.slotTemplateSelected;
      if(this.$route.params.templateID){
        this.saveJson["REF_TYPE"] = "cms";
        this.saveJson["REF_ID"] = this.$route.params.templateID;
      }
      this.saveJson["COMPONENT_JSON"] = JSON.stringify(compJson);
      this.saveJson["TYPE"] = "ac-card-collection";
      this.saveJson["CATEGORY_ID"] = this.category;
      this.start("post_block_type", { savejson: this.saveJson });
    },
    saveChages: function() {
      this.editJson["ID"] = this.$route.params.ID;
      this.editJson["NAME"] = this.name;
      this.editJson["TITTLE"] = this.description;
      let compJson = {};
      compJson["formdata"] = this.formData;
      compJson["slotTemplateSelected"] = this.slotTemplateSelected;
      if(this.$route.params.templateID){
        this.editJson["REF_TYPE"] = "cms";
        this.editJson["REF_ID"] = this.$route.params.templateID;
      }
      this.editJson["COMPONENT_JSON"] = JSON.stringify(compJson);
      this.editJson["CATEGORY_ID"] = this.category;
      this.start("put_block_type", {
        entity: "formEdit",
        editJson: this.editJson
      });
    }
  },
  watch: {
    helperSamples(newVal, oldVal) {
      if (newVal !== null) {
        let props = this.helperSamplesList[newVal].props;
        let slotTemplate = this.helperSamplesList[newVal].slotTemplateSelected;
        if (props) {
          this.formData = JSON.parse(JSON.stringify(props));
          this.slotTemplateSelected = slotTemplate;
        }
      }
    }
  }
};
</script>

<style>
</style>
