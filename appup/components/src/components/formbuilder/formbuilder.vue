<template>
  <div class="page-wrapper">
    <!-- Header start -->
    <!-- Header end -->

    <!-- Page content start -->
    <div class="page-content">
      <div class="container clearfix appup-form">
        <section class="block">
          <b-container class="bv-example-row">
            <b-row>
              <b-col cols="6">
                <b-form data-vv-scope="formBlock">
                  <div class="form-group">
                    <label>ADD FIELD</label>
                    <appup-helper-form v-model="form.fields"></appup-helper-form>
                  </div>

                  <b-form-group label="Inline Form">
                    <b-form-radio-group v-model="form.meta.props.inline">
                      <b-form-radio :value="false">No</b-form-radio>
                      <b-form-radio :value="true">Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <b-form-group label="Inline Labels">
                    <b-form-radio-group v-model="form.meta.props.inlineLabels">
                      <b-form-radio :value="false">No</b-form-radio>
                      <b-form-radio :value="true">Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>

                  <div class="form-group">
                    <label>ADD BUTTON</label>
                    <appup-grid
                      :columns="buttonColumns"
                      :form-json="buttonFormJson"
                      v-model="form.buttons"
                      ref="ag"
                    />
                  </div>
                  <b-row>
                    <!-- <b-col cols="6">
                      <b-button
                        variant="primary"
                        @click="validateForm($event, 'formBlock','add')"
                        type="submit"
                        align="center"
                      >SAVE</b-button>
                    </b-col>-->
                  </b-row>
                </b-form>
              </b-col>
              <hr style="width: 1px;height: inherit;background: #0000002b;border: none;" />
              <b-col cols="5">
                <center>
                  <label>FORM PREVIEW</label>
                </center>
                <br />
                <appup-form
                  :form-json="form"
                  ref="appupForm"
                  :inline="form.meta.props.inline"
                  :inline-labels="form.meta.props.inlineLabels"
                />
              </b-col>
            </b-row>
          </b-container>
        </section>
      </div>
      <div class="push"></div>
    </div>
    <!-- Page content end -->
  </div>
</template>
<script>
// Import components and libraries

import axios from "axios";
// Export components

export default {
  props: {
    value: Array
  },
 data() {
    return {
      name: null,
      description: null,
      handlers: {},
      //appup-form component entity JSON.
      form: {
        fields: [],
        buttons: [],
        meta: {
          preload: null,
          submit: null,
          workflow_params: "",
          props: {
            inline: false,
            inlineLabels: false,
            refs: ""
          }
        }
      },
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
      keysJSON:null,
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
            name: "label",
            label: "Label",
            required: true
          },
          {
            type: "text",
            name: "variant",
            label: "Variant"
          },
          {
            type: "text",
            name: "type",
            label: "Type",
            required: true
          }
        ]
      }
    };
  },
  methods: {
    validateForm: function(event, scopeForm, type) {
      event.preventDefault();
      this.$validator.validateAll(scopeForm).then(result => {
        if (result) {
          console.log(result);
        }
      });
    },
    showModal: function(){
      this.$refs.keysmodal.show();
    }
  },
   watch: {
        form: {
            handler: function(newValue) {
                console.log(newValue)
                this.$emit('input', this.form);
            },
            deep: true
        }
   }
};
</script>