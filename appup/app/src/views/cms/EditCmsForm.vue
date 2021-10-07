<template>
  <div>
    <div class="page-wrapper">
      <!-- Header start -->
      <Navbar />
      <!-- Header end -->

      <!-- Page content start -->
      <div class="page-content">
        <div class="container clearfix">
          <div class="page-title clearfix">
            <div class="float-left">
              <button
                type="button"
                class="btn btn-outline-secondary bg-white"
                @click="$router.go(-1)"
              >
                <span class="icon-arrow-left"></span>
              </button>
              <h1>New CMS form</h1>
            </div>
          </div>

          <section class="block">
            <div class="row">
              <div class="col-12">
                <!-- Appup form component start -->
                <appup-form ref="CMSForm" preload="cms_pre_load_edit"  submit="cmsput" />
                <!-- Appup form component end -->
              </div>
            </div>
          </section>
        </div>
        <div class="push"></div>
      </div>
      <!-- Page content end -->
    </div>

    <!-- Appup footer start -->
    <AppupFooter />
    <!-- Appup footer end -->
  </div>
</template>
<script>
// Import components and libraries

import AppupHeader from "../AppupHeader.vue";
import AppupFooter from "../Appupfooter.vue";
import Navbar from "../Navbar.vue";
import axios from "axios";
const queryString = require("query-string");
// var formJson = require('./formjson.json')
// Export components

export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
     
    };
  },
  methods: {
  
  },
  created() {
    
  }
};
</script>
