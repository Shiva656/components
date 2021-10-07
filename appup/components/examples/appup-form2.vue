<template>
  <div>
    <!-- <appup-form2 :form-json="BillingExample" v-model="modelf"></appup-form2> -->
    <!-- <appup-form2
          preload="pre_load_entity"
          submit="submit"
          :workflow_params="{entity:'BillingExample'}"
          v-model="form"
    />-->
    <!-- <appup-form2 :form-json="tt" v-model="modelf"></appup-form2> -->
    <b-row>
      <b-col cols="5">
        <center>
          <h4>With Handlers</h4>
        </center>
        <br />
        <appup-form2
          preload="pre_load_entity_form2"
          submit="submit"
          :workflow_params="{entity:'form'}"
          :section_classes="section_classes"
        
        />
        <br />
        {{form}}
      </b-col>
      <b-col cols="1"></b-col>
      <b-col cols="6">
        <center>
          <h4>With formjson</h4>
        </center>
        <br />
        <appup-form2 :form-json="testtt" v-model="modelf" :sections="sections" :section_classes="section_classes" ></appup-form2>
        <br />
        {{modelf}}
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: {
        "first":{
          "1":"col-md-4",
          "2": "col-md-8"
        },
        "third":{
          "1":"col-md-4",
          "2": "col-md-8"
        }
      },
      section_classes: {
        "first":{
          "1":"test1",
          "2": "test2"
        },
        "third":{
          "1":"test3"
  
        }
      },
      tt: {
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
        ]
      },
      fieldsUrl:
        "http://www.json-generator.com/api/json/get/cfargDMsAy?indent=2",
      test1: {
        fields: [
          [
            [
              [
                {
                  type: "text",
                  name: "1",
                  label: "1",
                  required: true,
                  container: "second",
                  "container-name": "second-tab1",
                  "container-active": true,
                  computation: "'dfdsf'+form['2']"
                },
                {
                  type: "text",
                  name: "2",
                  label: "2",
                  required: true
                },
                {
                  type: "text",
                  name: "3",
                  label: "3",
                  required: true
                }
              ],
              [
                {
                  type: "text",
                  name: "4",
                  label: "4",
                  required: true,
                  container: "second",
                  "container-name": "second-tab2",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "5",
                  label: "5",
                  placeholder: "5",
                  required: true,
                  container: "second",
                  "container-name": "second-tab3",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "11",
                  label: "11",
                  required: true,
                  container: "testTABGrou",
                  "container-name": "tab1",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "12",
                  label: "12",
                  required: true,
                  container: "testTABGrou",
                  "container-name": "tab2",
                  "container-active": true
                }
              ]
            ]
          ],
          [
            [
              [
                {
                  type: "html",
                  html: "<h4>First Section</h4>",
                  class: "col-md-12",
                  container: "first",
                  "container-name": "first-tab1",
                  "container-active": true
                },
                {
                  type: "text",
                  name: "sec11",
                  label: "sec11",
                  placeholder: "sec11",
                  required: true,
                  computation: "form.sec12"
                },
                {
                  type: "text",
                  name: "sec12",
                  label: "sec12",
                  placeholder: "sec12",
                  required: true
                }
              ],
              [
                {
                  type: "text",
                  name: "sec21",
                  label: "sec21",
                  placeholder: "sec21",
                  required: true,
                  value: "testt",
                  container: "first",
                  "container-name": "first-tab2",
                  "container-active": true
                }
              ]
            ],
            [
              [
                {
                  type: "html",
                  html: "<h4>Second Section</h4>",
                  class: "col-md-12",
                  container: "third",
                  "container-name": "third-tab1",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "sec21",
                  label: "sec21",
                  placeholder: "sec21",
                  required: true,
                  value: "testt",
                  container: "third",
                  "container-name": "third-tab1",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "sec22",
                  label: "sec22",
                  placeholder: "sec22",
                  required: true,
                  value: "testt",
                  container: "third",
                  "container-name": "third-tab2",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "sec23",
                  label: "sec23",
                  placeholder: "sec23",
                  required: true,
                  value: "testt",
                  container: "third",
                  "container-name": "third-tab2",
                  "container-active": true
                }
              ],
              [
                {
                  type: "text",
                  name: "sec24",
                  label: "sec24",
                  placeholder: "sec24",
                  required: true,
                  value: "testt",
                  container: "third",
                  "container-name": "third-tab2",
                  "container-active": true
                }
              ]
            ],
            [
              [
                {
                  type: "html",
                  html: "<h4>Third Section</h4>",
                  class: "col-md-12"
                },
                {
                  type: "text",
                  name: "sec31",
                  label: "sec31",
                  placeholder: "sec31",
                  required: true,
                  value: "testt"
                }
              ]
            ]
          ],
          [
            [
              [
                {
                  type: "text",
                  name: "firstName",
                  label: "First Name",
                  placeholder: "Enter First Name",
                  required: true,
                  container: "fourth",
                  "container-name": "fourth-tab1"
                },
                {
                  type: "text",
                  name: "lastName",
                  label: "Last Name",
                  placeholder: "Enter Last Name",
                  required: true,
                  value: "linga"
                }
              ],
              [
                {
                  type: "text",
                  name: "FullName",
                  label: "Full Name",
                  required: true,
                  computation: "form.firstName+' '+form.lastName",
                  container: "fourth",
                  "container-name": "fourth-tab2",
                  "container-active": true
                }
              ]
            ]
          ]
        ],
        buttons: [
          {
            label: "Continue",
            variant: "primary",
            type: "submit",
            function: "onSubmit"
          }
        ]
      },
      test2: {
        fields: [
          [
            {
              id: 5,
              type: "form2",
              name: "company-form2",
              label: "Company Details--form2",
              fieldsUrl:
                "http://www.json-generator.com/api/json/get/cfitSxsrIi?indent=2",
              container: "formType",
              "container-name": "appup-form2",
              "container-active": true
            }
          ],
          [
            {
              id: 5,
              type: "form",
              name: "company-form",
              label: "Company Details-form",
              fieldsUrl: "http://www.mocky.io/v2/5ce7b9713500009317cf60a7",
              container: "formType",
              "container-name": "appup-form"
            }
          ],
          [
            {
              type: "text",
              name: "firstField",
              label: "First Row",
              required: true,
              value: "default value",
              container: "second",
              "container-name": "second-tab1",
              "container-active": true
            }
          ],
          [
            {
              type: "password",
              name: "password",
              label: "Password",
              placeholder: "Enter Password",
              required: true,
              minLength: 2,
              maxLength: 10,
              container: "second",
              "container-name": "second-tab2",
              "container-active": true
            },
            {
              type: "textarea",
              name: "textarea",
              label: "Textarea",
              placeholder: "Pick Textarea",
              required: true
            }
          ],

          [
            {
              type: "text",
              name: "firstName",
              label: "First Name",
              placeholder: "Enter First Name",
              required: true,
              container: "first",
              "container-name": "first-tab1"
            },
            {
              type: "text",
              name: "lastName",
              label: "Last Name",
              placeholder: "Enter Last Name",
              required: true,
              condition: "this.form.firstName",
              value: "linga"
            },
            {
              type: "text",
              name: "FullName",
              label: "Full Name",
              required: true,
              computation: "form.firstName+' '+form.lastName"
            }
          ],
          [
            {
              type: "email",
              name: "email",
              label: "Email",
              placeholder: "Enter Email",
              required: true,
              container: "first",
              "container-name": "first-tab2",
              "container-active": true
            },
            {
              type: "number",
              name: "Phnumber",
              label: "Phone Number",
              placeholder: "Enter Phone Number",
              required: true,
              min: 10
            }
          ],
          [
            {
              type: "multiselect",
              name: "multiselect",
              label: "Multiselect",
              option: [
                {
                  value: null,
                  label: "Please select an option"
                },
                {
                  value: "js",
                  label: "Javascript"
                },
                {
                  value: "java",
                  label: "Java"
                },
                {
                  value: "ruby",
                  label: "Ruby"
                },
                {
                  value: "php",
                  label: "PHP",
                  disabled: true
                }
              ],
              required: true
            },
            {
              type: "multiselect",
              name: "multiselectDynamic",
              label: "Multiselect with Options from url",
              url: "https://www.mocky.io/v2/5b507e3a3600003b14dd0e66",
              key_value: "value",
              key_label: "label",
              required: true
            }
          ],
          [
            {
              type: "text",
              name: "lastField",
              label: "Last Row",
              required: true,
              condition: "this.form.firstName"
            }
          ],
          [
            {
              type: "dropdown",
              name: "select",
              label: "Sample Select",
              option: [
                {
                  value: null,
                  label: "Please select an option"
                },
                {
                  value: "one",
                  label: "one"
                },
                {
                  value: "two",
                  label: "two"
                },
                {
                  value: "three",
                  label: "three"
                }
              ],
              required: true,
              container: "second",
              "container-name": "second-tab1",
              "container-active": true
            },
            {
              type: "dropdown",
              name: "dropdownDynamic",
              label: "Dropdown with Options from url",
              url: "https://jsonplaceholder.typicode.com/posts",
              key_value: "id",
              key_label: "title",
              required: true
            }
          ]
        ],
        buttons: [
          {
            label: "Continue",
            variant: "primary",
            type: "submit",
            function: "onSubmit"
          }
        ]
      },
      modelf: {},
      form: {},
      oldJson: {
        fields: [
          {
            id: 1,
            type: "text",
            name: "id",
            label: "ID",
            sectionGroup: "first",
            sectionName: "1",
            rowIndex: "1"
          },
          {
            type: "swatches",
            name: "swatches",
            description: "Ac swatches",
            label: "Sample swatches",
            colors: ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5"],
            color: "",
            sectionGroup: "first",
            sectionName: "1",
            rowIndex: "2"
          },
          {
            type: "date-range",
            name: "date-range",
            description: "Ac Date range picker",
            label: "Sample swatches",
            opens: "center",
            startDate: "2019-05-01",
            endDate: "2019-05-15",
            minDate: "2016-09-02",
            maxDate: "2019-10-02",
            dateRange: {
              startDate: "2019-05-01",
              endDate: "2019-05-10"
            },
            localeData: {
              firstDay: 1,
              format: "DD-MM-YYYY"
            },
            show_ranges: true,
            singleDatePicker: false,
            timePicker: true,
            timePicker24Hour: true,
            showDropdowns: true,
            autoApply: false,
            showWeekNumbers: true,
            sectionGroup: "second",
            sectionName: "1"
          },
          {
            id: 50,
            type: "dropdown",
            name: "select",
            label: "Sample Select",
            option: [
              {
                value: null,
                label: "Please select an option"
              },
              {
                value: "one",
                label: "one"
              },
              {
                value: "two",
                label: "two"
              },
              {
                value: "three",
                label: "three"
              }
            ],
            required: true,
            sectionGroup: "second",
            sectionName: "1",
            rowIndex: "1"
          },
          {
            id: "section_field",
            name: "section",
            label: "section",
            description: null,
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
            ],
            sectionGroup: "second",
            sectionName: "2",
            rowIndex: "2"
          },
          {
            id: 110,
            type: "checkbox",
            name: "checkbox",
            label: "Checkbox",
            option: [
              {
                label: "Orange",
                value: "orange"
              },
              {
                label: "Apple",
                value: "apple",
                checked: true
              },
              {
                label: "Pineapple",
                value: "pineapple"
              },
              {
                label: "Grape",
                value: "grape",
                disabled: true
              }
            ],
            required: true,
            sectionGroup: "second",
            sectionName: "2",
            rowIndex: "2"
          },
          {
            id: 60,
            type: "dropdown",
            name: "dropdownDynamic",
            label: "Dropdown with Options from url",
            url: "https://jsonplaceholder.typicode.com/posts",
            key_value: "id",
            key_label: "title",
            required: true,
            sectionGroup: "second",
            sectionName: "1",
            rowIndex: "2"
          },
          {
            id: 2,
            type: "text",
            name: "name",
            label: "Name",
            placeholder: "Enter Name",
            required: true,
            container: "settings",
            "container-name": "Template",
            "container-active": "true",
            sectionGroup: "second",
            sectionName: "2",
            rowIndex: "2"
          },
          {
            id: 3,
            type: "text",
            name: "username",
            label: "User Name",
            container: "settings",
            "container-name": "Template2",
            sectionGroup: "third",
            sectionName: "1",
            rowIndex: "1"
          },
          {
            id: 4,
            type: "text",
            name: "email",
            label: "Email",
            required: true,
            sectionGroup: "third",
            sectionName: "1",
            rowIndex: "1"
          },
          {
            id: 5,
            type: "form",
            name: "company",
            label: "Company Details",
            fieldsUrl: "http://www.mocky.io/v2/5ce7b9713500009317cf60a7",
            sectionGroup: "third",
            sectionName: "1",
            rowIndex: "1"
          },
          {
            id: 5,
            type: "form",
            name: "company",
            label: "Company Details",
            fieldsUrl: "http://www.mocky.io/v2/5ce7b9713500009317cf60a7"
          }
        ]
      },
      testtt: {
        fields: [
           {
            type:"designer",
            name: "appup-designer-buildly",
            src: "https://builder-buildly.appup.com",
            height: 800,
            width: 800,
            sectionName: "1",
            rowIndex: "1"
          },
          {
            id: 1,
            type: "text",
            name: "id",
            label: "ID",
            sectionGroup: "first",
            sectionName: "1",
            rowIndex: "1"
          },
          {
            type: "swatches",
            name: "swatches",
            description: "Ac swatches",
            label: "Sample swatches",
            colors: ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5"],
            color: "",
            sectionGroup: "first",
            sectionName: "2",
            rowIndex: "2"
          },
          {
            id: 1,
            type: "text",
            name: "id",
            label: "ID",
            sectionGroup: "third",
            sectionName: "1"
          },
          {
            id: 1,
            type: "text",
            name: "id",
            label: "ID",
            sectionGroup: "third",
            sectionName: "1"
          },
          {
            id: 1,
            type: "text",
            name: "id",
            label: "ID",
            sectionGroup: "third",
            sectionName: "2"
          }
        ]
      }
    };
  },
  watch: {}
};
</script>
