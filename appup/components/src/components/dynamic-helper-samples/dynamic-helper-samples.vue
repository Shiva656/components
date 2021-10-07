<template>
  <b-form-select
    :class="dropdown_class"
    class="appup-dropdown"
    :options="dropdownItems"
    v-model="selected"
    @change="onSelect()"
    v-bind="$attrs"
  />
</template>
<script>
import axios from "axios";
let sampleData = require("../helper-json/components_helper_samples.json");
export default {
  props: {
    /**
     * URL to fetch data
     * @param {string} url
     * @label URL
     * @category_name 1_General
     */
    url: {
      type: String,
      required: true
    },
    /**
     * Current selected helper type
     * @param {string} helper_type
     * @label Helper Type
     * @category_name 1_General
     */
    helper_type: {
      type: String,
      required: false
    },
    /**
     * Provide class name to dropdown
     * @param {string} dropdown_class
     * @label Dropdown class
     * @category_name 4_Style
     */
    dropdown_class: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      dropdownItems: [{ text: "No samples available", value: "" }],
      selected: ""
    };
  },
  watch: {
    selected(newVal, oldVal) {
      this.selected = newVal;
    },
    url(newVal, oldVal) {
      this.fetchData();
    },
    helper_type(newVal, oldVal) {
      this.fetchData();
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onSelect: function() {
      this.$emit("on_option_selected", this.selected);
    },
    fetchData: function() {
      axios.get(this.url).then(response => {
        if (response.data.length){ this.dropdownItems = response.data;}
        else if (sampleData) {
          for (var item in sampleData) {
            if (item == this.helper_type) {
              var items = this.formObjects(sampleData[item]);
              this.dropdownItems = items;
            }
          }
        }
      });
    },
    formObjects: function(item) {
      for (var i = 0; i < item.length; i++) {
        item[i]["text"] = item[i]["label"];
        delete item[i].label;
        item[i]["value"] = item[i]["props"];
        delete item[i].props;
      }
      return item;
    }
  }
};
</script>
<style scoped>
</style>