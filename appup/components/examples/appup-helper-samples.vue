<template>
  <appup-helper-samples
    url="https://qa.appup.com/appdb/_db/BLOCKS?fields=ID,NAME%20as%20text%20,COMPONENT_JSON%20as%20value,TYPE&where=APPLICATION_ID=394%20AND%20TYPE=%22ac-header%22"
    @on_option_selected="my_options"
    helper_type="ac-collection-table"
  ></appup-helper-samples>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    my_options: function(opt) {
      debugger;
    }
  }
};
</script>
<style scoped>
</style>