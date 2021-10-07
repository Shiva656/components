<template>
  <div>
    <!--user can add fields here -->
    <appup-grid ref="appupGrid" :columns="columns" :form-json="formJson" v-model="gridJson" />
  </div>
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
          key: "label",
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
      formJson: {},
      userJSON: "",
      userURL: "",
      usertype: "",
      authtoken: "",
      gridJson: []
    };
  },
  created() {
    this.formJson = formjson;
    let test = this.formJson.fields.length;
    this.formJson.fields[test - 1].formJson = this.formJson;
    this.gridJson = this.value;
  },
  methods: {
    //to show modal on click load from JSON or DB
    showJsonModel: function(type) {
      this.usertype = type;
      this.$refs["my-modal"].show();
    },

    //method for load from DB will do axios call and append the response data to appup-grid data
    loadFromDB: function(type) {
      if (type == "DB") {
        console.log("this is from DB" + this.userURL);
        // let config = {
        //   headers: {
        //     token: this.authtoken
        //   }
        // };
        var self = this;
        // axios
        //   .get(this.userURL, config)
        //   .then(function(response) {
        self.$appupajax.get2(self.userURL, {}, {}, {token: self.authtoken, withCredentials: true, credentials: "include" })
        // self.$appupajax
        //   .get2(
        //     self.userURL,
        //     {},
        //     {
        //       token: self.authtoken,
        //       withCredentials: true,
        //       credentials: "include"
        //     }
        //   )
          .then(self.$appupajax.handleResponse)
          .then(response => {
            console.log(response);
            self.$refs.appupGrid.addData(
              response.data[0].all_form_fields["fields:"]
            );
            this.$refs["my-modal"].hide();
          })
          .catch(function(error) {
            // handle error
            console.log(error);
            this.$refs["my-modal"].hide();
          })
          .finally(function() {
            // always executed
          });
      } else {
        console.log("check load type");
      }
    },

    //user will give the formJson(Array-of-JSONS) it will append to appup-grid data.
    loadFromJSON: function(type) {
      if (type == "JSON") {
        var json_parse = JSON.parse(this.userJSON);
        console.log(this.$refs.appupGrid);
        this.$refs.appupGrid.addData(json_parse);
        this.$refs["my-modal"].hide();
      } else {
        console.log("check load type");
      }
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.gridJson = this.value;
    },
    gridJson(val) {
      /**
       * In formJson fields like checkbox,dropdown,..etc have prop option for that used grid component.
       * Result of grid will be array-of-jsons in string format so parsing the array-of-jsons
       *
       */
      val.map(field => {
        if (field["option"] && typeof field.option == "string") {
          field["option"] = JSON.parse(field["option"]);
        } else if (field["formJson"]) {
          field["formJson"]["fields"] = field["formJson"];
        } else if (field["config"] && typeof field.config == "string") {
          field["config"] = JSON.parse(field["config"]);
        } else if (field["collection"] && typeof field.collection == "string") {
          field["collection"] = JSON.parse(field["collection"]);
        } else if (field["options"] && typeof field.options == "string") {
          field["options"] = JSON.parse(field["options"]);
        } else if (field["dualValues"] && typeof field.dualValues == "string") {
          field["dualValues"] = JSON.parse(field["dualValues"]);
        } else if (field["dropdown"] && typeof field.dropdown == "string") {
          field["dropdown"] = JSON.parse(field["dropdown"]);
        }

        return field;
      });
      this.$emit("input", val);
    }
  }
};
</script>

<style>
#label {
  display: flex;
}
</style>

