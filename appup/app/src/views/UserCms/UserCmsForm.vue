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
                <appup-form ref="UserCMSForm" :form-json="formJson" v-model="formdata" />
                <!-- Appup form component end -->
              </div>
              <div class="col-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  name="button"
                  @click="submitdata()"
                >Apply</button>
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
      formJson: "",
      formdata: "",
      template: "",
      templateId: "",
      js: "",
      css: ""
    };
  },
  methods: {
    submitdata: function() {
      debugger;
      var name = this.formdata.name;
      var item = this.formdata.item;
      var url = this.formdata.route;
      delete this.formdata["name"];
      delete this.formdata["route"];
      delete this.formdata["item"];
      //    for (var k in this.formdata) {
      //         if(k === "name"){
      //             this.formdata = this.formdata.splice(0, Object.keys(this.formdata).indexOf(k));
      //         }else if(k === "item"){
      //             this.formdata = this.formdata.splice(0, Object.keys(this.formdata).indexOf(k));
      //         }else if(k === "route"){
      //             this.formdata = this.formdata.splice(0, Object.keys(this.formdata).indexOf(k));
      //         }else{
      //             console.log("");
      //         }
      //     }
      const requestBody = {
        NAME: name,
        TITTLE: item,
        URL: url,
        TEMPLATE: this.template,
        APPLICATION_ID: this.$route.params.appId,
        JS_CODE: this.js,
        BUILDER_JSON: "",
        JSON: JSON.stringify(this.formJson),
        TYPE: "CMS_TEMPLATE",
        CSS_CODE: "this.css",
        template_id: this.templateId,
        item_json: JSON.stringify(this.formdata)
      };
      //   this.start("save_cms_type", {
      //     cmsjson: requestBody,
      //     saveCmsData: (Response, status) => {
      //     }
      //   });
      const config = {
        headers: {
          test: "{{route.params.id}}"
        }
      };
      var _this = this;
      axios
        .post(
          "/appdb/_db/PAGE_ITEMS",
          queryString.stringify(requestBody),
          config
        )
        .then(result => {
          _this.start("get_cms_success", {});
        })
        .catch(err => {
          // Do somthing
          alert("err", err);
        });
    }
  },
  created() {
    if (Window.totalusercmsData) {
      var json = Window.totalusercmsData;
      for (var i = 0; i < json.length; i++) {
        if (json[i].ID === parseInt(this.$route.params.template)) {
          this.template = json[i].TEMPLATE;
          this.formJson = JSON.parse(json[i].JSON);
          this.templateId = json[i].ID;
          this.js = json[i].JS_CODE;
          this.css = json[i].CSS_CODE;
        }
      }
    }
    this.formJson.unshift(
      {
        id: "Name",
        type: "text",
        name: "name",
        label: "Name",
        description: "Please enter name",
        placeholder: "Name"
      },
      {
        id: "route",
        type: "text",
        name: "route",
        label: "URL",
        description: "Please enter URL",
        placeholder: "URL"
      },
      {
        id: "item",
        type: "text",
        name: "item",
        label: "Item",
        description: "Please enter item",
        placeholder: "Item"
      }
    );
    this.formJson["fields"]=this.formJson;
    debugger;
  }
};
</script>
