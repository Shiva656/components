<template>
  <div>
    <appup-checkbox
      id="id"
      :options="option"
      v-model="modelvalue"
      :url="url"
      :key_value="key_value"
      :key_label="key_label"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelvalue: "",
      option: [
        {
          label: "Orange",
          value: "true"
        }
      ],
      url: "https://jsonplaceholder.typicode.com/posts",
      key_value: "id",
      key_label: "title"
    };
  }
};
</script>

<style>
</style>
