<template>
  <div>
    <div class="form-group">
      <label for="component_select_field">Select a Component</label>
      <select
        class="form-control"
        id="component_select_field"
        @change="onComponentSelected"
        v-model="selectedComponent"
      >
        <option
          v-for="(component,index) in componentList"
          :key="index"
          :value="component"
        >{{component}}</option>
      </select>
    </div>
    <ac-helper :type="selectedComponent" :form-json="selectedComponentFormJson"/>
  </div>
</template>

<script>
let componentsFormJson = require("./components_form.json");
export default {
  data() {
    return {
      componentList: [],
      selectedComponent: "",
      selectedComponentFormJson: {}
    };
  },
  created() {
    for (let i = 0; i < componentsFormJson.length; i++) {
      this.componentList.push(componentsFormJson[i].component);
    }
  },
  methods: {
    getComponentPropJson(type) {
      return componentsFormJson.find(obj => obj.component === type);
    },
    onComponentSelected() {
      this.selectedComponentFormJson = this.getComponentPropJson(
        this.selectedComponent
      );
    }
  }
};
</script>
