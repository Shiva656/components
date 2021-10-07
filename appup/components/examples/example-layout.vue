<template>
  <div class="container-fluid">
    <div class="row">
      <div class="toc-wrapper p-0 col-md-2 d-none d-md-block border-right">
        <h6 class="px-3 py-3 mb-0 toc-h1 border-bottom">
          <strong>Examples</strong>
        </h6>
        <div
          class="overflow-auto vh-100"
          style="height: calc(100vh - 4rem) !important; overflow: auto !important;"
        >
          <!-- <ul class="toc-nav pt-2">
            <li class="toc-entry toc-h2">
              <a href="#how-it-works" class="active">How it works</a>
            </li>
            <li class="toc-entry toc-h2">
              <a href="#supported-content">Supported content</a>
              <ul>
                <li class="toc-entry toc-h3">
                  <a href="#brand">Brand</a>
                </li>
                <li class="toc-entry toc-h3">
                  <a href="#nav">Nav</a>
                </li>
                <li class="toc-entry toc-h3">
                  <a href="#forms">Forms</a>
                </li>
                <li class="toc-entry toc-h3">
                  <a href="#text">Text</a>
                </li>
              </ul>
            </li>
            <li class="toc-entry toc-h2">
              <a href="#color-schemes">Color schemes</a>
            </li>
            <li class="toc-entry toc-h2">
              <a href="#containers">Containers</a>
            </li>
            <li class="toc-entry toc-h2">
              <a href="#placement">Placement</a>
            </li>
            <li class="toc-entry toc-h2">
              <a href="#responsive-behaviors">Responsive behaviors</a>
            </li>
          </ul>-->
          <ul class="toc-nav pt-2">
            <li class="toc-entry toc-h2" v-for="(example,index) in exampleLinks" :key="index">
              <a :href="example.url">{{example.title}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-10 col-xl-10 col-md-10 col-sm-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Appup from "../src/appup-components";
let _forEach = require('lodash.foreach');

export default {
  computed: {
    exampleLinks() {
      let examples = [];
      _forEach(Appup, function(value, key) {
        examples.push({
          title: key,
          url: "#/examples/" + key.replace("appup-", "")
        });
      });
      return examples;
    }
  }
};
</script>


<style>
.toc-nav {
  /*reset ul default padding left*/
  padding-left: 0;
}

.toc-nav ul {
  padding-left: 1rem;
}

.toc-entry {
  display: block;
}

.toc-entry a {
  display: block;
  padding: 0.125rem 1rem;
  font-size: 90%;
  color: rgba(0, 0, 0, 0.65);
}

.toc-entry a:hover {
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
}

.toc-entry a.active {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}
</style>

