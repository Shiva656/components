<template>
  <div>
     test {{typeaheadItemValue}}
    <appup-typeahead
        :id="typeaheadItem.id"
        v-model="typeaheadItemValue"
        @input="onInput"
        :state="false"
        :url="typeaheadItem.url ? typeaheadItem.url : null"
        :key_value="typeaheadItem.key_value ? typeaheadItem.key_value : null"
        :key_label="typeaheadItem.key_label ? typeaheadItem.key_label : null"
        response_key="items"
        query_param_key="q"
        custom_query = true
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeaheadItem: {
        id: "80",
        type: "typeahead",
        name: "typeahead",
        label: "Multiselect with Options from url",
        url: "https://api.myjson.com/bins/d5xij?where=name LIKE",
        key_value: "name",
        key_label: "values",
        required: true
      },
      typeaheadItemValue: ""
    };
  }
};
</script>

<style>
</style>
