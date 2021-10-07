<template>
  <div class="row">
    <div class="col-md-6" style="z-index: 1;">
      <appup-form :form-json="formJson" :form-data="value" @input="set_data" />
    </div>
 <template v-if="presetValue">
    <div class="col-md-6">
      <!-- <component v-bind:is="type" v-bind="formDataParsed"></component> -->
      <helper-renderer :type="type" :props="formDataParsed" />
    </div>
    </template>
  </div>
</template>

<script>
import helperRenderer from "./helper-renderer.vue";

export default {
  components: {
    helperRenderer
  },
  props: ["value", "type", "formJson","presetValue"],
  data() {
    return {
      formData: {},
      formDataParsed: {},
      
    };
  },
  created: function(){
    this.presetValue= true
  },
  watch: {
    formData: {
      handler(val) {
        let formDataParsed = JSON.parse(JSON.stringify(this.formData));
        for (var key in formDataParsed) {
          if (
            typeof formDataParsed[key] == "string" &&
            (formDataParsed[key].indexOf("{") === 0 ||
              formDataParsed[key].indexOf("[") === 0)
          ) {
            // catch parse error when mustache syntax given
            try {
              formDataParsed[key] = JSON.parse(formDataParsed[key]);
            } catch (error) {
              console.log(error);
            }
          }
        }
        this.formDataParsed = formDataParsed;
      },
      deep: true
    }
  },
  methods: {
    set_data(form) {
      this.formData = JSON.parse(JSON.stringify(form));
      this.$emit("input", this.formData);
    }
  }
};
</script>

