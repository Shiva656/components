<template>
    <appup-grid :columns="columns" :form-json="formJson" v-model="value" ref="ag"/>
</template>

<script>
import axios from "axios";

//importing form-json which is having all fields types and props input for appup-grid component.
import formjson from "./form.json";

export default {
  props: {
    /**
     * result of appup-grid(array-of-jsons)
     */
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      /**
       * when user add a field using appup-grid or load from json or db -- will show label and type of the field.
       */
      columns: [
        {
          key: "name",
          label: "Label",
          class: "text-center"
        },
        {
          key: "type",
          label: "Type",
          class: "text-center"
        },
        {
          key: "actions",
          label: ""
        }
      ],
      formJson: {}
    };
  },
  created() {
    this.formJson = formjson;
  },
  watch: {
    value(val) {
      /**
       * In formJson fields like checkbox,dropdown,..etc have prop option for that used grid component.
       * Result of grid will be array-of-jsons in string format so parsing the array-of-jsons
       *  
       */
      val.map(field => {
        if (field["option"] && (typeof field.option == "string")){
          field["option"] = JSON.parse(field["option"]);
        }
        return field;
      });
      this.$emit("input", val);
    }
  }
};
</script>

<style>

</style>
