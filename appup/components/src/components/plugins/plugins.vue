<template></template>

<script>

import { AjaxRequests } from "../../mixins/ajaxRequests";
import { Workflow } from "../../mixins/workflow";
import HTTP from "axios";

// let _groupBy = require('lodash.groupby');

export default {
    name: "appup-plugin",
    mixins: [AjaxRequests, Workflow],
    props: {
    /**
     * URL to deserialize the grid initially.
     */
    preload: {
      type: String,
      required: false
    }
  },
  mounted() {
    if (this.preload) this.start(this.preload);
  }
    
}
</script>

<style>
</style>
