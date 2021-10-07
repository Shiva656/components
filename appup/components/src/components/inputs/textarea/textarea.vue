<template>
  <b-form-textarea 
        :id=id
        class="appup-textarea"
        v-model="text"
        :state=state
        :placeholder=placeholder
        :rows="rows"
        :max-rows="max-rows"
        @input="onChange"/>
</template>
<script>
/**
 * Appup Textarea
 *
 * TODOs:
 *
 * Rows & MaxRows to be expected from user
 */
export default {
  name: "appup-textarea",
  components: {},
  props: {
    /**
     * Id of input elements.
     */
    id: {
      type: String,
      required: false
    },

    /**
     * Validation state of the component
     */
    state: {
      type: Boolean,
      required: false,
      default: null
    },

    /**
     * Placeholder if needed
     */
    placeholder: {
      type: String,
      required: false,
      default: ""
    },

    /**
     * Value for v-model binding. Not to be binded directly
     */
    value: {
      required: false
    },
    rows: {
      type: String,
      required: false
    },
    "max-rows": {
      type: String,
      required: false
    }
  },
  watch: {
    value: function(newVal) {
      console.log(newVal);
    }
  },
  data: function() {
    return {
      text: this.value
    };
  },
  computed: {},
  methods: {
    onChange(text) {
      this.$emit("input", text);
    }
  }
};
</script>
