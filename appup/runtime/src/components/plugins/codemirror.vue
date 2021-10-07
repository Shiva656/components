<script>
import Vue from "vue";

import codemirror from "vue-codemirror";
// language js
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/base16-light.css";

import 'codemirror/lib/codemirror.css'

Vue.use(codemirror);


export default {
  name: "codemirror",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>