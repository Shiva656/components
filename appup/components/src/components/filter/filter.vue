<template>
  <appup-toggle :clickAwayNoClose="convertBoolean(toggle)" class="dropdown" ref="appupToggle">
    <!-- Use this slot for Filter Button content -->
    <slot name="filterButton">
      <button class="btn btn-primary">
        <i class="fal fa-filter"></i> Filter
      </button>
    </slot>
    <appup-target
      class="dropdown-menu p-0 border-0"
      :class="direction == 'right'? `dropdown-menu-right ${filterWidth}`:`dropdown-menu-left ${filterWidth}`"
    >
      <div class="card">
        <div class="card-header">
          <!-- Use this slot for filter header-->
          <slot name="header">
            <h6 class="mb-0">Filter</h6>
            <!-- <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
            </button>-->
          </slot>
        </div>
        <div :class="`card-body overflow-auto ${filterHeight}`">
          <b-card
            v-if="filterJson && filterJson.fields"
            no-body
            v-for="(field, field_index) in filterJson.fields"
            :key="field['filter-label'] + field_index"
            class="appup-filter-collapse-state-manage mb-2"
          >
            <b-card-header v-b-toggle="field['filter-label'] + field_index">
              <div class="d-flex justify-content-between align-items-center">
                <div>{{field['filter-label']}}</div>
              </div>
            </b-card-header>
            <b-card-body class="p-0">
              <b-collapse :id="field['filter-label'] + field_index">
                <appup-form
                  class="cust-design p-2"
                  :form-json="filteredFields[field_index].formJson"
                  :form-data="formData"
                  v-model="formData"
                  inlineClass="col-md-4"
                  ref="appupForm"
                >
                  <template
                    v-for="(clearSlot,index) in filteredFields[field_index].clearSlotFields"
                  >
                    <template :slot="`${clearSlot.name}`">
                      <div class="d-flex align-items-center justify-content-end pr-3 pl-3">
                        <b-link
                          v-b-tooltip.hover
                          title="Clear"
                          @click="clearFields(clearSlot.name)"
                          class="float-right filterminus"
                          :key="index+'cl'"
                        >
                          <i class="fal fa-minus-circle"></i>
                        </b-link>
                      </div>
                    </template>
                    <template
                      :slot="`${getSlotName(clearSlot.name, field_index)}-after`"
                      v-if="index > 0"
                    >
                      <div
                        :class="['delete-slot-icon pr-3 pl-3', {
                                        'd-inline float-right': index === filteredFields[field_index].clearSlotFields.length - 1,
                                        'd-flex justify-content-end mb-3': index !== filteredFields[field_index].clearSlotFields.length - 1
                                      }]"
                      >
                        <b-link
                          @click="deleteFields(clearSlot.name, field_index)"
                          v-b-tooltip.hover
                          title="Delete"
                          :key="index+'dl'"
                          class="filterdel"
                        >
                          <i class="fal fa-trash-alt"></i>
                        </b-link>
                      </div>
                    </template>
                  </template>
                  <template v-for="(addSlot,index) in filteredFields[field_index].addSlotFields">
                    <template :slot="`${addSlot.name}-after`">
                      <b-link
                        v-b-tooltip.hover
                        title="Add Condition"
                        @click="addFields(addSlot.name, field_index)"
                        :key="index+'ad'"
                        class="filterplus ml-3"
                      >
                        <i class="fal fa-plus"></i>
                      </b-link>
                    </template>
                  </template>
                </appup-form>
              </b-collapse>
            </b-card-body>
          </b-card>
        </div>

        <div class="card-footer">
          <!-- Use this slot for filter footer-->
          <slot name="footer">
            <div class="row">
              <div class="col-md-4 px-1">
                <button
                  v-if="showButtons.clear"
                  type="submit"
                  class="btn btn-link text-decoration-none"
                  @click="clearFilter"
                >Clear All</button>
              </div>
              <div class="col-md-8 text-right d-flex justify-content-end">
                <button
                  v-if="showButtons.apply"
                  type="submit"
                  class="btn btn-outline-secondary mr-2"
                  @click="onSave('apply')"
                >Apply</button>
                <button
                  v-if="showButtons.save"
                  type="submit"
                  class="btn btn-primary mr-1"
                  @click="onSave('save')"
                >Save</button>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </appup-target>
  </appup-toggle>
</template>

<script>
import AppupToggle from "./toggle.js";
import AppupTarget from "./target.js";
import filterTransformation from "./transform.js";
let _merge = require("lodash.merge");
import Vue from "vue";

export default {
  components: {
    AppupToggle,
    AppupTarget
  },
  props: {
    /**
     * Id for the filter
     * @label Id
     * @category_name 1_General
     */
    id: {
      type: String,
      required: false
    },
    /**
     * filterJson is an object with fields array with filter-type,filter-name, field-json.
     * @label Filter JSON
     * @category_name 1_General
     */
    filterJson: {
      type: Object,
      required: true
    },
    /**
     * To prefill the selected filters.
     * @label Filter Data
     * @category_name 1_General
     */
    filterData: {
      type: Object
    },
    /**
     * Specify filter width provide class name
     * @label Filter Width
     * @category_name 3_Advanced
     */
    filterWidth: {
      type: String,
      default: "filter-wd"
    },
    /**
     * Specify filter height provide class name
     * @label Filter Height
     * @category_name 3_Advanced
     */
    filterHeight: {
      type: String,
      default: ""
    },
    /**
     * Config is an object for DB App, Ex: {"data":{"fields":"", "tables":[], join:[]}}
     * @label Config
     * @category_name 3_Advanced
     */
    config: {
      type: Object,
      default: {
        data: {}
      }
    },
    /**
     * Show Buttons is an object with three props. prop(button) with value as true, respective button will be visible.
     * Ex: {"apply": true,"save":true,"clear":true}
     * @label Show Buttons
     * @category_name 3_Advanced
     */
    showButtons: {
      type: Object,
      default: {
        apply: true,
        save: true,
        clear: true
      }
    },
    /**
     * onApplyClose if it is true filters dropdown will close on click Apply button.
     * @label On-Apply-Close
     * @category_name 1_General
     */
    onApplyClose: {
      type: Boolean,
      default: false
    },
    /**
     * onSaveClose if it is true filters dropdown will close on click Save button.
     * @label On-Save-Close
     * @category_name 1_General
     */

    onSaveClose: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "left"
    },
    toggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {},
      formJson: {},
      clearSlotFields: null,
      addSlotFields: null,
      conditionCount: 0,
      filteredFields: []
    };
  },
  created() {
    this.toFormJsonData();
  },
  watch: {
    // When prop value provided dynamically
    filterJson() {
      this.toFormJsonData();
    },
    filterData(val) {
      this.setFormData(val)
    }
  },
  methods: {
    setFormData(filterData) {
      if(this.filterJson.fields){
        const completedFilterData = { ...filterData };
        this.filterJson.fields.forEach(field => {
            if (!completedFilterData[field['filter-name']]) {
                completedFilterData[field['filter-name']] = {}
            }
        });

        this.formData = filterTransformation.deserializeFilterData(completedFilterData);
      }
    },

    getSlotName(clearSlotName, fieldIndex) {
          const field = this.filteredFields[fieldIndex];
          const name = clearSlotName.replace('_cond_', '');

          const formField = field.formJson.fields.find(
              field => field.name !== clearSlotName && field.name.includes(name)
          );

          return formField.name
    },

    toFormJsonData() {
      if(this.filterJson.fields){
        this.filterJson.fields.forEach((field, index) => {
            let toFormJsonData = filterTransformation.toFormJson(
                { fields: [field] },
                this.id ,
                index
            );
            this.filteredFields.push(toFormJsonData);

            this.formJson = toFormJsonData.formJson;
            this.clearSlotFields = toFormJsonData.clearSlotFields;
            this.addSlotFields = toFormJsonData.addSlotFields;
            this.conditionCount = {...this.conditionCount, ...toFormJsonData.conditionCount};
        });
      }
        this.setFormData(this.filterData)
    },

    convertBoolean(value) {
      if (typeof value == "string") return JSON.parse(value);
      else return value;
    },
    clearFilter() {
        const keys = Object.keys(this.formData)
            .filter(key => /^(_field_)/.test(key))
            .map(key => key.replace(/^(_field_)/, ''));

        const obj = {}
        keys.forEach(key => {
            obj[key] = {}
        })

        this.formData = filterTransformation.deserializeFilterData(obj);

       if (this.config && this.config.data.filters) {
           delete this.config.data.filters;
       }
      //Event will be fired whenever click on the clear filters
      this.$emit("clear");
    },
    onSave(eventType) {
        const formData = { ...this.formData };
        const keys = Object.keys(this.formData)
            .filter(key => /^(_field_)/.test(key))
            .map(key => key.replace(/^(_field_)/, ''));

        keys.forEach(key => {
            const hasValueReg = new RegExp(`^(_value_|_cond_)(.)*(${key})`);
            const index = Object.keys(this.formData).findIndex(formKey => hasValueReg.test(formKey));
            if (index < 0) {
                delete formData[`_field_${key}`]
            }
        });

      let filterOutput = filterTransformation.serializeFilterData(
        formData,
        this.conditionCount
      );
      this.$emit(
        eventType,
        filterOutput,
        this.convertToDbFilterConfig(filterOutput)
      );
      if (
        eventType == "apply" &&
        this.onApplyClose &&
        !(this.onApplyClose && this.onApplyClose == "false")
      )
        this.$refs.appupToggle.toggle();
      if (
        eventType == "save" &&
        this.onSaveClose &&
        !(this.onSaveClose && this.onSaveClose == "false")
      )
        this.$refs.appupToggle.toggle();

      if (this.convertBoolean(this.toggle)) {
        this.$refs.appupToggle.toggle();
      }
    },
    convertToDbFilterConfig(formData) {
      let filters = [];
      if (Object.keys(formData).length > 0) {
        for (var key in formData) {
          if (formData.hasOwnProperty(key)) {
            let conditionJson = {};
            conditionJson["field_name"] = key;
            conditionJson["operator"] = formData[key].condition;
            conditionJson["value1"] = formData[key].value;
            if (formData[key].value_2) {
              conditionJson["value2"] = formData[key].value_2;
            }
            if (formData[key].cdata) {
              conditionJson = _merge(conditionJson, formData[key].cdata);
            }
            filters.push(conditionJson);
          }
        }
      }
      return { ...this.config.data, ...{ filters: filters } };
    },
    clearFields(cond_name) {
      console.log("clear fields clicked", name);
      let filter_name = cond_name.replace("_cond_", "");
      if (this.formData.hasOwnProperty(cond_name))
        this.formData[cond_name] = "";
      if (this.formData.hasOwnProperty("_value_" + filter_name))
        this.formData["_value_" + filter_name] = "";
      if (this.formData.hasOwnProperty("_value_2_" + filter_name))
        this.formData["_value_2_" + filter_name] = "";
    },

    deleteFields(cond_name, field_index) {
      debugger;
      if (!this.filteredFields[field_index]) return;
      let filter_name = cond_name.replace("_cond_", "");
      const filtered = this.filteredFields[field_index].formJson.fields.filter(field => {
        return (
          field.name != cond_name &&
          field.name != "_value_" + filter_name &&
          field.name != "_value_2_" + filter_name
        );
      });

      const newFormJson = {
          ...this.filteredFields[field_index].formJson,
          fields: filtered
      };

      const newClearSlots = this.filteredFields[field_index].clearSlotFields.filter(slot => slot.name !== cond_name)

      this.updateFilteredField(field_index, { formJson: newFormJson, clearSlotFields: newClearSlots });

        // delete this.formData[cond_name];
      // delete this.formData["_value_" + filter_name];
      // delete this.formData["_value_2_" + filter_name];
      delete this.clearFields[filter_name];
    },

    addFields(filter_hidden_name, field_index) {
      if (!this.filteredFields[field_index]) return;
      let filter_name = filter_hidden_name.replace("_hidden_", "");
      let condtionIndex = this.filteredFields[field_index].formJson.fields.findIndex(
        field => field.name === filter_hidden_name
      );
      let filterFieldConfigData = this.filteredFields[field_index].filtersConfigData[filter_name];
      let new_fields = [...this.filteredFields[field_index].formJson.fields];
      this.conditionCount[filter_name] = this.conditionCount[filter_name] + 1;

      filterFieldConfigData.forEach(element => {
        new_fields.splice(condtionIndex, 0, {
            ...element,
            name: element.name + "_" + this.conditionCount[filter_name]
        });
        condtionIndex = condtionIndex + 1;
      });

      const newClearSlotFields = [
          ...this.filteredFields[field_index].clearSlotFields,
          { name: "_cond_" + filter_name + "_" + this.conditionCount[filter_name] }
      ];

      const newFormJson = {
          ...this.filteredFields[field_index].formJson,
          fields: new_fields
      };

      const changes = {
          formJson: newFormJson,
          clearSlotFields: newClearSlotFields
      };

      if(this.formData["_cdata_"+filter_name]){        
        Vue.set(this.formData, `_cdata_${filter_name}_${this.conditionCount[filter_name]}`, this.formData[`_cdata_${filter_name}`])
      }
      this.updateFilteredField(field_index, changes)
    },

    updateFilteredField(field_index, changes) {
        this.filteredFields.splice(field_index, 1, {
            ...this.filteredFields[field_index],
            ...changes
        });
    }
  },
  mounted() {
    if (this.convertBoolean(this.toggle)) {
      this.$refs.appupToggle.toggle();
    }
    if (!this.filterWidth) {
      this.filterWidth = "filter-wd";
    }
  }
};
</script>

<style>
.appup-filter-collapse-state-manage .card-header > div::after {
  content: "-";
}
.appup-filter-collapse-state-manage .card-header.collapsed > div::after {
  content: "+";
}
.delete-slot-icon {
  margin-top: 1px;
}
.delete-slot-icon + div {
  display: none;
}
.cust-design .appup-checkbox {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 9px;
  border-radius: 0.25rem;
  margin-bottom: 15px;
}
.cust-design .appup-checkbox:hover {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.cust-design fieldset#fgroup_undefined {
  padding-left: 1rem;
  padding-right: 1rem;
}
.multiselect__tag-icon:after {
  content: "\D7";
  color: #343a40;
  font-size: 103%;
  position: relative;
  top: -3px;
}
.cust-deign .appup-select {
  margin-bottom: 15px;
}
.filter-wd {
  width: 300px;
}
</style>
