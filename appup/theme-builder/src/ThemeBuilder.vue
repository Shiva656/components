<template>
  <div class="overflow-hidden">
    <div class="main-container container-fluid p-0">
      <div class="header-navigation">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div class="collapse navbar-collapse" id="navbarText">
            <!-- header -->
            <div class="row m-0 w-100" id="headerID">
              <ul
                class="navbar-nav justify-content-end ml-auto col-xl-6 col-lg-6 col-md-6 col-sm-12 pr-0"
              >
                <li class="nav-item dropdown">
                  <a
                    @click.prevent
                    class="nav-link dropdown-toggle dropappup"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >Appup Themes</a>

                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a
                      v-for="appupTheme in appupThemes"
                      :key="appupTheme.key"
                      class="dropdown-item"
                      @click.prevent="themeID = appupTheme.id"
                    >{{appupTheme.name}}</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="previewMode('preview')">Preview</a>
                </li>
                <li class="nav-link dropdown">
                  <a class="nav-link dropdown-toggle dropdown" href="#" @click.prevent>Themes</a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" @click.prevent="mode = 'category'">Category Pages</a>
                    <a
                      class="dropdown-item"
                      v-if="url !== 'undefined'"
                      @click.prevent="mode = 'runtime'"
                    >Runtime Pages</a>
                  </div>
                </li>
                <li class="nav-item ml-3">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="showModel(true)"
                  >Save & Apply</button>
                </li>
              </ul>
            </div>
            <!-- header -->
            <!-- modal -->
            <div v-if="model" class="modal" style="display: block">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Theme</h5>
                    <button
                      type="button"
                      class="close"
                      @click="showModel(false)"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" v-if="nameHide === true">
                    <label>Enter Name</label>
                    <input type="text" v-model="name" class="form-control" required>
                  </div>
                  <div class="modal-body" v-else-if="nameHide === false">
                    <label>Data Has been saved</label>
                  </div>
                  <div class="modal-body error" v-else-if="nameHide === 'compileError'">
                    <label>Error while compiling SASS</label>
                    <p>{{ sassError }}</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="showModel(false)"
                      data-dismiss="modal"
                    >Close</button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      v-if="saveHide"
                      @click="save_CSS"
                    >Save changes</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- modal -->
          </div>
        </nav>
      </div>
      <div class="row m-0">
        <ComponentSidebar
          v-if="componentHide"
          :categoryJson="categoryJson"
          @toggle="toggle"
          class="col-lg-2 col-xl-2 col-md-2 col-sm-12 left-sidebar border-right overflow-auto vh-100 scroll"
          id="componentID"
        ></ComponentSidebar>

        <div
          style="overflow-x:scroll !important;"
          class="col-lg-8 col-xl-8 col-md-8 col-sm-12 middle-main-content-area p-0 overflow-hidden scroll"
          id="iframeID"
        >
          <p
            style="text-align: right;font-size: xx-large;"
            class="d-none"
            @click="previewMode('remove')"
            id="crossmarkID"
          >&#x2715;</p>
          <div id="logoID">
            <img
              src="https://static-buildly.s3.amazonaws.com/assets/2018-Dec-19/loading_design_2_svg_1545214014330.svg"
              style="width:200px;height:200px;"
            >
          </div>
          <iframe
            @load="onIframePageLoaded"
            style="overflow-x:scroll !important;"
            class="border-0 overflow-auto"
            id="preview_iframe"
            :src="iframeSrc"
            fullscreen
            width="1024"
            height="600"
          ></iframe>
        </div>

        <VariableSidebar
          v-if="componentHide"
          id="variableID"
          :currentProp="currentProp"
          :categoryJson="categoryJson"
          @compilecss="compilecss"
          class="col-lg-2 col-xl-2 col-md-2 col-sm-12 right-sidebar border-left overflow-auto vh-100 scroll"
        ></VariableSidebar>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentSidebar from "./components/ComponentSidebar.vue";
import VariableSidebar from "./components/VariableSidebar.vue";
import { retriveData, insertUpdateData } from "./globals.js";
import { APPUP_URL, COMPILE_URL, CATEGORY_TEMPLATE_URL } from "./constants.js";
var querystring = require("querystring");

export default {
  name: "ThemeBuilder",
  components: {
    ComponentSidebar,
    VariableSidebar
  },
  /** Indicate data as function, why because when ever we are include this component to multiple component
   *  Ref: https://vuejs.org/v2/style-guide/#Component-data-essential
   **/
  data() {
    return {
      categoryJson: require("./curated-variables.json"), // static loaded JSON
      currentProp: null, // default
      name: null, // input field
      model: false, // popup
      catchedGeneratedCss: "",
      iframeSrc: "",
      regenratedJson: "",
      componentHide: true,
      appupThemes: [],
      nameHide: true,
      saveHide: true,
      sassError: "",
      sassVariable: {}
    };
  },
  props: {
    url: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: "runtime"
    },
    themeID: {
      type: String,
      required: false
    },
    appId: {
      type: String,
      required: true
    }
  },
  created: function() {
    // append default componentname to variablesidebar component
    this.currentProp = this.categoryJson["All Components"];

    // check mode for loading default theme or from appup theme
    if (this.mode == "runtime" && this.url !== "undefined") {
      this.iframeSrc = this.url;
    } else {
      // this.iframeSrc = "/templates/allcomponents.html";
      this.iframeSrc = CATEGORY_TEMPLATE_URL + "/allcomponents.html";
      this.mode = "category";
    }
    // check themeid exsists
    if (this.themeID) {
      this.withIdajaxMethod(this.themeID);
      this.withoutIdajaxMethod();
    }
  },

  mounted: function() {
    // todo for listning events from iframe
    // this.$nextTick(function(){
    //   this.setCssToIframe(this.catchedGeneratedCss);
    //   console.log("executed once");
    // });
  },
  methods: {
    // retrive component name from componentSidebar component
    toggle: function(blockName) {
      console.log(blockName);
      this.currentProp = this.categoryJson[blockName];
      if (this.mode == "category") {
        this.iframeSrc =
          CATEGORY_TEMPLATE_URL +
          "/" +
          blockName.replace(/\s/g, "").toLowerCase() +
          ".html";
      }
    },
    withIdajaxMethod: function(modifiedThemeId) {
      var self = this;
      const withIDAjax = retriveData(modifiedThemeId, "GET");
      withIDAjax
        .then(function(response) {
          self.catchedGeneratedCss = response.data.CSS_CODE;
          // self.categoryJson = JSON.parse(response.data.theme_json);
          self.sassVariable = JSON.parse(response.data.theme_json);
          const updatedJson = JSON.parse(response.data.theme_json);
          self.name = response.data.NAME;
          const modifiedComponentjson = self.categoryJson;
          for (var i = 0; i < Object.keys(modifiedComponentjson).length; i++) {
            var keys = Object.keys(modifiedComponentjson)[i];
            for (var j = 0; j < modifiedComponentjson[keys].length; j++) {
              // this.sassJson.push(categoryJson[keys][j].variable +":" +"  " +categoryJson[keys][j].value +";");
              for (var k = 0; k < Object.keys(updatedJson).length; k++) {
                if (
                  modifiedComponentjson[keys][j].variable ===
                  Object.keys(updatedJson)[k]
                ) {
                  modifiedComponentjson[keys][j].value = Object.values(
                    updatedJson
                  )[k];
                }
              }
            }
          }

          self.categoryJson = modifiedComponentjson;
        })
        .catch(err => console.log(err));
    },
    withoutIdajaxMethod: function() {
      var self = this;
      const withoutIDAjax = retriveData("", "GET");

      withoutIDAjax
        .then(function(response) {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].type) {
              self.appupThemes.push({
                name: response.data[i].NAME,
                id: response.data[i].ID
              });
            }
          }
        })
        .catch(err => console.log(err));
    },
    // modal
    showModel: function(condition) {
      this.model = condition;
    },
    // retrive particular json object and full json from variablesidebar compoenent

    compilecss: function(updatedSinglejson, updatedFulljson) {
      // this.showLoader("show");

      document.getElementById("logoID").style.display = "flex";
      var self = this;
      this.sassVariable[updatedSinglejson.variable] = updatedSinglejson.value;
      const sassJson = [];
      console.log(this.sassVariable);
      for (var i = 0; i < Object.keys(this.sassVariable).length; i++) {
        sassJson.push(
          Object.keys(this.sassVariable)[i] +
            ":" +
            "" +
            Object.values(this.sassVariable)[i] +
            ";"
        );
      }
      const convertArraytoString = sassJson.toString(sassJson);
      const resultSass = convertArraytoString.replace(/,/gi, "");
      this.regenratedJson = updatedFulljson;
      const data = { variables: resultSass, customSass: "" };
      this.insertUpdateputAjaxmethod(data, "POST", "");
    },
    insertUpdateputAjaxmethod: function(data, method, header) {
      var self = this;
      const sendScsstoCompile = insertUpdateData(data, method, header);
      sendScsstoCompile
        .then(function(response) {
          // assign to
          document.getElementById("logoID").style.display = "none";
          console.log(response);
          if (response.data.css) {
            self.catchedGeneratedCss = response.data.css;
          } else if (response.data.error_description) {
            self.model = true;
            self.nameHide = "compileError";
            self.saveHide = false;
            self.sassError = response.data.error_description;
          } else {
            console.log(response);
            self.model = true;
            self.nameHide = false;
            self.saveHide = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //Generated CSS and JSON send to DB
    save_CSS: function() {
      const applicationId = this.appId;

      var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Appup-Auth-token": ""
      };
      // theme id exsists
      if (this.themeID) {
        var dataWithId = {
          ID: this.themeID,
          NAME: this.name,
          CSS_CODE: this.catchedGeneratedCss,
          APPLICATION_ID: applicationId,
          // theme_json: JSON.stringify(this.regenratedJson),
          theme_json: JSON.stringify(this.sassVariable),
          type: "Theme",
          is_active: 1
        };
        // convert to encode format
        dataWithId = querystring.stringify(dataWithId);

        document.getElementById("logoID").style.display = "flex";
        // var self = this;
        this.insertUpdateputAjaxmethod(dataWithId, "PUT", headers);

        // const modifiedCss = insertUpdateData(dataWithId, "PUT", headers);
        // modifiedCss
        //   .then(function(response) {
        //     console.log(response);
        //     document.getElementById("logoID").style.display = "none";
        //     self.model = true;
        //     self.nameHide = false;
        //     self.saveHide = false;
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
      } else {
        var dataWithoutId = {
          NAME: this.name,
          CSS_CODE: this.catchedGeneratedCss,
          APPLICATION_ID: applicationId,
          // theme_json: JSON.stringify(this.regenratedJson),
          theme_json: JSON.stringify(this.sassVariable),
          type: "Theme",
          is_active: 1
        };
        dataWithoutId = querystring.stringify(dataWithoutId);
        var self = this;
        document.getElementById("logoID").style.display = "flex";

        this.insertUpdateputAjaxmethod(dataWithoutId, "POST", headers);

        // const generatedCss = insertUpdateData(dataWithoutId, "POST", headers);

        // generatedCss
        //   .then(function(response) {
        //     console.log("After insert success response is"+response);
        //     document.getElementById("logoID").style.display = "none";
        //     self.model = true;
        //     self.nameHide = false;
        //     self.saveHide = false;
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
      }
      this.model = false;
    },
    // theme preview
    previewMode: function(mode) {
      const headerID = document.getElementById("headerID");
      const componentID = document.getElementById("componentID");
      const variableID = document.getElementById("variableID");
      const iframeID = document.getElementById("iframeID");
      const crossmarkID = document.getElementById("crossmarkID");

      if (mode == "preview") {
        headerID.classList.add("d-none");
        componentID.classList.add("d-none");
        variableID.classList.add("d-none");
        iframeID.classList.add("offset-md-2");
        crossmarkID.classList.remove("d-none");
      } else if (mode == "remove") {
        headerID.classList.remove("d-none");
        componentID.classList.remove("d-none");
        variableID.classList.remove("d-none");
        iframeID.classList.remove("offset-md-2");
        crossmarkID.classList.add("d-none");
      }
    },
    // when ever swift theme, append CSS to iframe
    setCssToIframe: function(previousGeneratedcss) {
      if (previousGeneratedcss) {
        if (this.themeID && this.mode == "runtime") {
          setTimeout(function() {
            const retriveIframeid = document.getElementById("preview_iframe");
            var piID = retriveIframeid.contentDocument.getElementById(
              "global_css"
            );
            if (piID) {
              piID.textContent = previousGeneratedcss;
            }
          }, 3000);
        } else {
          const retriveIframewindow = document.getElementById("preview_iframe")
            .contentWindow;
          retriveIframewindow.postMessage(previousGeneratedcss, "*");
        }
      }
    },
    setDoccsstoIframe(event) {
      console.log(event);
      if (evt.origin !== "http://localhost:8080") {
        message = "You are not worthy";
      } else {
        console.log(event);
      }

      // var createStyleElement = retriveIframeid.contentDocument.createElement("style");
      // createStyleElement.id = "generated_CSS";
      // createStyleElement.textContent = previousGeneratedcss;
      // retriveIframeid.contentDocument.getElementsByTagName("head")[0].appendChild(createStyleElement);
    },
    onIframePageLoaded() {
      // Todo: Preloading css on theme edit

      // Set css once frame is loaded
      this.setCssToIframe(this.catchedGeneratedCss);
    }
  },
  watch: {
    mode: function(newvalue, oldvalue) {
      if (newvalue == "runtime") {
        this.iframeSrc = this.url;
      } else {
        // this.iframeSrc = "/templates/allcomponents.html";
        this.iframeSrc = CATEGORY_TEMPLATE_URL + "/allcomponents.html";
      }
    },
    themeID: function(newvalue, oldvalue) {
      this.withIdajaxMethod(newvalue);
    },
    catchedGeneratedCss: function(newvalue, oldvalue) {
      this.setCssToIframe(newvalue);
    },
    id: function(newvalue, oldvalue) {
      alert("newvalue" + newvalue + "oldvalue" + oldvalue);
    }
  }
};
</script>

<style scoped>
#logoID {
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 2;
  display: none;
}
.dropdown {
  position: relative;
  display: inline;
}
.dropdown-menu {
  display: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
.scroll {
  height: calc(100vh - 60px) !important;
}
.error {
  color: red;
}
</style>
