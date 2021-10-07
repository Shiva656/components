<template>
  <div>
    <appup-dynamic
      v-model="tags"
      ac-tag="vue-input-tag"
      ac-export-name="vueInputTag.default"
      :ac-cdn-urls="['https://unpkg.com/vue-input-tag@2.0.4/dist/vueInputTag.umd.min.js']"
    ></appup-dynamic>
    {{tags}}
    <hr>
    <appup-dynamic
      ac-tag="vue-bootstrap-typeahead"
      ac-export-name="VueBootstrapTypeahead"
      :ac-cdn-urls="['https://unpkg.com/vue-bootstrap-typeahead@0.2.6/dist/VueBootstrapTypeahead.umd.min.js', 'https://unpkg.com/vue-bootstrap-typeahead@0.2.6/dist/VueBootstrapTypeahead.css']"
      v-model="query"
      :data="countries"
      placeholder="Enter a country"
    >
      <p class="lead">
        Selected Country:
        <strong>{{query}}</strong>
      </p>
    </appup-dynamic>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      query: "",
      countries: ["Canada", "United States", "Mexico"]
    };
  }
};
</script>