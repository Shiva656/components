// Todo: elimate duplicate code in Wrapper.js and here
function fetchDependencies(cdnUrls, callback) {
  const loadjs = require("loadjs");
  loadjs(cdnUrls, callback);
}

function getAsyncComponent(acExportName, cdnUrls) {
  return new Promise(function (resolve, reject) {
    fetchDependencies(cdnUrls, () => {
      if (acExportName) {
        let keys = acExportName.split(".");
        // Dirty fix, need to add support to more than 1 dots
        resolve((typeof keys[1] !== "undefined") ? window[keys[0]][keys[1]] : window[keys[0]]);
      } else {
        reject();
      }
    });
  });
}

function loadComponent(compObjectName, cdnUrls) {
  return function (resolve, reject) {
    getAsyncComponent(compObjectName, cdnUrls).then(resolve, reject);
  };
}

export default {
  props: {
    acCdnUrls: {
      type: Array,
      default: []
    },
    acTag: {
      type: String,
      required: true
    },
    acExportName: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {
    this.dynamicComponent = loadComponent(
      this.acExportName,
      this.acCdnUrls
    );
  },
  mounted() {
    console.log(this);
  },
  render(h) {
    const children = Object.keys(this.$slots).map(slot =>
      h("template", { slot }, this.$slots[slot])
    );
    return h(
      this.dynamicComponent,
      {
        attrs: this.$attrs,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      },
      children
    );
  }
};