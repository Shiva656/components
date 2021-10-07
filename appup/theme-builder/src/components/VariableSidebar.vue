<template>
  <div>
    <ul class="nav flex-column" v-for="(variableSetting,key) in currentProp" :key="key">
      <li class="nav-item">
        <a class="nav-link medium btn text-left" @click.prevent="" href="#">{{ variableSetting.variable }}</a>
        <input type="text" class="form-control" v-model="variableSetting.value" @change="compilecss(variableSetting, categoryJson)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "VariableSidebar",
  props: ["currentProp", "categoryJson"],
  methods: {
    compilecss: function(updatedSingleJSON,updatedFulljson) {
      this.$emit("compilecss", updatedSingleJSON,updatedFulljson);
    }
  }
};
</script>

<style>
</style>
