<template>
  <div class="row">
    <div class="col-md-3" v-for="(control,ctrlInx) in rule.controls" :key="ctrlInx">
      <div v-if="control.controlType == 'text'">
        <b-form-input type="text" :name="control.name" v-model="control.value" placeholder="Enter the text"></b-form-input>
      </div>
      <div v-if="control.controlType == 'date'">
        <appup-datetime
          type="date"
          :name="control.name"
          :config="control.custom"
          placeholder="Select a date"
          v-model="control.value"
          :id="'appupdate'+ctrlInx"
        ></appup-datetime>
      </div>
      <div v-if="control.controlType == 'number'">
        <b-form-input type="number" :name="control.name" v-model="control.value" placeholder="Enter the text"></b-form-input>
      </div>

      <div v-if="control.controlType == 'select'">
        <b-form-select :options="control.options" :name="control.name" v-model="control.value"></b-form-select>
      </div>
    </div>
    <button
      class="btn btn-xs btn-purple-outline btn-radius btn-purple-round"
      @click.prevent="delete_rule"
    >close</button>
  
  </div>
</template>
<script>
export default {
  name: "appup-section-rule",
  props: {
    /**
     * Data to be render in UI
     * @param {object} - rule
     * @label Rule
     * @category_name 1_General
     */
    rule: {
      type: Object
    },
    /**
     * Index of the rule
     * @param {} - rule_index
     * @label Rule Index
     * @category_name 1_General
     */
    rule_index: {
      type: Number
    },
     value: Array
  },
  data() {
    return {
      rule_obj: {
        rule_json: {},
        selected_key: "",
        input_val:this.value,
        selected_val: "",
        section_value:{},
      }
    };
  },

  created() {
    debugger;
    this.get_select_list();
    //if (this.rule.keys && this.rule.keys.url) this.get_select_list("keys",this.rule.keys.url);
  },
 watch: {
    value(val) {
      debugger;
      this.input_val=this.value;
      console.log("input value is "+this.input_val);
    },
    rule(val) {
      debugger;
       this.$emit("input",val);
      }
 },
  mounted() {
    //this.conditionType = this.rule.keys.keytype;
  },

  methods: {
    /**
     * Invoke on click of add rule button
     * @function add_rule - To add new section
     */
    add_rule: function() {
      debugger;
      //Invoke parent component's adding_rule function
      this.$parent.adding_rule();
    },
    /**
     * To Get the selected controls
     * @function get_select_list
     */
    async get_select_list() {
      try {
        if (this.rule.controls && this.rule.controls.length) {
          //Filter Selected and Unselected controls
          let select_type_ctrls = this.rule.controls.filter(
            item => item.controlType == "select"
          );
          let unselect_type_ctrls = this.rule.controls.filter(
            item => item.controlType != "select"
          );

          if (select_type_ctrls.length) {
            for (var i = 0; i < select_type_ctrls.length; i++) {
              if (!select_type_ctrls[i].url) continue;
              //If control type is of select then fetch data from url and map the options
              let dropdown_list = await fetch(select_type_ctrls[i].url, {
                withCredentials: true,
                credentials: "include"
              }).then(res => res.json());
              if (dropdown_list && dropdown_list.length) {
                select_type_ctrls[i].options = dropdown_list.map(obj => {
                  var new_obj = {};
                  new_obj.text = obj[select_type_ctrls[i].keytext];
                  new_obj.value = obj[select_type_ctrls[i].keyvalue];
                  return new_obj;
                });
              }
            }
          }
          this.rule.controls = [...select_type_ctrls, ...unselect_type_ctrls];
        }
      } catch (e) {}
    },
    /**
     * Invoke on click of close button
     * @function delete_rule - To delete the added section
     */
    delete_rule() {
      //Invoke parent component's delete_rule function
      this.$parent.delete_rule({ rule_index: this.rule_index });
    }
  }
};
</script>