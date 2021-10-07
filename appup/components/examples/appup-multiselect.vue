<template>
  <div>
    <h6>Multiselect with manual options</h6>
    <appup-multiselect
      :id="item.id"
      :options="item.option"
      v-model="itemValue"
      @input="onInput"
      :state="false"
      :url="item.url ? item.url : null"
      :key_value="item.key_value ? item.key_value : null"
      :key_label="item.key_label ? item.key_label : null"
    />

    <h6>Multiselect with options fetched from URL</h6>

    <appup-multiselect
      :id="dynamicItem.id"
      :options="dynamicItem.option"
      v-model="dynamicItemValue"
      @input="onInput"
      :state="false"
      :url="dynamicItem.url ? dynamicItem.url : null"
      :key_value="dynamicItem.key_value ? dynamicItem.key_value : null"
      :key_label="dynamicItem.key_label ? dynamicItem.key_label : null"
    />

    <h6>Tags</h6>

    <appup-tags
      :id="dynamicItem.id"
      :options="options"
      v-model="dynamicItemValue"
      @input="onInput"
      :state="false"
      :key_value="dynamicItem.key_value ? dynamicItem.key_value : null"
      :key_label="dynamicItem.key_label ? dynamicItem.key_label : null"
      selectLabel="Demo"
    />

    <h6>Typeahead</h6>

    <appup-typeahead
      :id="typeaheadItem.id"
      v-model="typeaheadItemValue"
      @input="onInput"
      :state="false"
      :url="typeaheadItem.url ? typeaheadItem.url : null"
      :key_value="typeaheadItem.key_value ? typeaheadItem.key_value : null"
      :key_label="typeaheadItem.key_label ? typeaheadItem.key_label : null"
      :custom_query="true"
      @remove="remove"
      @select="select"
    />

    <hr>
    <appup-typeahead
      :id="typeaheadItem.id"
      v-model="typeaheadItemValue"
      @input="onInput"
      :state="false"
      :url="typeaheadItem.url ? typeaheadItem.url : null"
      :key_value="typeaheadItem.key_value ? typeaheadItem.key_value : null"
      :key_label="typeaheadItem.key_label ? typeaheadItem.key_label : null"
      response_key= "items"
      query_param_key="q"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
      item: {
        id: "70",
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
      itemValue: [{
            value: "ruby",
            label: "Ruby"
          }],
      dynamicItem: {
        id: "80",
        type: "multiselect",
        name: "multiselectDynamic",
        label: "Multiselect with Options from url",
        url: "https://api.github.com/search/users?q=hema",
        key_value: "itescore",
        key_label: "login",
        required: true
      },
      dynamicItemValue: "",
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
  },
  methods: {
    onInput(e) {
      console.log(this.item);
    },
    remove(obj,id){
      console.log(obj)
      console.log(id)
    },
    select(obj,id){
      console.log(obj)
      console.log(id)
    }
  }
};
</script>
