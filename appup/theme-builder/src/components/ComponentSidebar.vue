<template>
  <div>
    <h6 class="px-3 pt-3 mb-2 medium">
      <strong>Docs sections</strong>
    </h6>
    <!-- <a class="nav-link medium btn text-left" href="#">All Components</a> -->
    <ul class="nav flex-column" v-for="(componentJson,key) in categoryJson" :key="key">
      <li class="nav-item">
        <a class="nav-link medium btn text-left" href="#" @click.prevent="toggle(key)">{{ key }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ComponentSidebar",
  props: ["categoryJson"],
  methods: {
    toggle: function(componentName) {
      this.$emit("toggle", componentName);
    }
  }
};
</script>

<style>
</style>
