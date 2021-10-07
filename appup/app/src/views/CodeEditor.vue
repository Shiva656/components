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
              <h1 v-if="$route.params.entity === 'javaeditor'">Java IDE</h1>
              <h1 v-if="$route.params.entity === 'pythoneditor'">Python IDE</h1>
            </div>
          </div>

          <section class="block">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>Name</label>
                  <b-input type="text" v-model="name"></b-input>
                </div>
                <div class="form-group">
                  <codemirror v-model="code" :options="cmOptions"></codemirror>
                </div>
                <div class="compile-message">
                  <span v-if="compileTrue" class="text-success">{{compileMessage}}</span>
                  <span v-if="compileFalse" class="text-danger">{{compileMessage}}</span>
                </div>
                <div class="form-group">
                  <label v-if="this.$route.params.entity === 'javaeditor'">Maven Dependency Plugins</label>
                  <label v-if="this.$route.params.entity === 'pythoneditor'">Python Plugins</label>
                  <b-form-select v-model="pluginName" class="mb-3" @input="getSelectedItem($event)">
                    <option :value="null">Please select Plugin</option>
                    <option
                      v-for="item in pluginData"
                      :value="item.ID"
                      :text="item.CONFIG_NAME"
                      :key="item.ID"
                    >{{item.CONFIG_NAME}}</option>
                  </b-form-select>
                </div>
                <div class="form-group">
                  <label>Assign To A Category</label>
                  <b-form-select v-model="category" class="mb-3">
                    <option :value="null">Please select Category</option>
                    <option
                      v-for="item in category_data"
                      :value="item.NAME"
                      :text="item.NAME"
                      :key="item.ID"
                    >{{item.NAME}}</option>
                  </b-form-select>
                  <span
                    v-show="errors.has('formBlock.category')"
                    class="help is-danger validations-text"
                    style="color: red"
                  >{{ errors.first('formBlock.category') }}</span>
                </div>
                <b-row>
                  <b-col cols="6">
                    <b-button
                      variant="primary"
                      v-if="this.$route.params.ID"
                      @click="updateData()"
                      align="center"
                    >Update</b-button>
                    <b-button v-else variant="primary" @click="saveData()" align="center">Save</b-button>
                  </b-col>
                  <b-col cols="6" v-if="this.$route.params.entity === 'javaeditor'">
                    <b-button
                      variant="primary"
                      @click="compileData()"
                      type="submit"
                      align="center"
                    >Compile</b-button>
                    <b-spinner v-if="compileLoading" variant="primary" label="Compiling"></b-spinner>
                  </b-col>
                </b-row>
              </div>
            </div>
          </section>
        </div>
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
import AppupHeader from "./AppupHeader.vue";
import AppupFooter from "./Appupfooter.vue";
import Navbar from "./Navbar.vue";
// require component
import { codemirror } from "vue-codemirror";
import axios from "axios";
// language js
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/base16-light.css";
// Export components
export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter,
    codemirror
  },
  data() {
    return {
      pluginName: "",
      pluginData: "",
      code: "",
      appName: "",
      name: "",
      category_data: "",
      packageName: "",
      className: "",
      category: "",
      jarData: "",
      foreignKey: "",
      saveJson: {},
      s3Json: {},
      editJSON: {},
      pythonEditJSON: {},
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-light",
        lineNumbers: true,
        line: true
      },
      compileMessage: "",
      compileLoading: false,
      compileTrue: false,
      compileFalse: false,
      propData: [],
      type: ""
    };
  },
  created() {
    if (this.$route.params.entity === "javaeditor") {
      //To get list categories of block
      this.start("get_category", {
        entity: "formCodeEditor",
        categories: (handlerResponse, status) => {
          if (status == 200 && handlerResponse) {
            this.category_data = handlerResponse;
          }
        }
      });
      // To get list of maven plugin dependencies
      this.start("get_plugin", {
        entity: "getPlugin",
        plugins: (pluginsResponse, status) => {
          if (status == 200 && pluginsResponse) {
            debugger;
            this.pluginData = pluginsResponse;
          }
        }
      });
      this.start("get_app_name", {
        entity: "getAppname",
        appNameResp: (applicationResponse, status) => {
          debugger;
          if (status == 200 && applicationResponse) {
            this.appName = applicationResponse[0].NAME.replace(
              /[^a-zA-Z ]/g,
              ""
            ).replace(/ /g, "");
            if (
              !this.$route.params.ID &&
              this.$route.params.entity === "javaeditor"
            ) {
              this.code =
                "package com.appup.apps." +
                this.appName +
                ";" +
                "\n" +
                "import com.appup.core.workflow.step.Context;" +
                "\n" +
                "import com.appup.core.workflow.step.executor.CodeExecutor;" +
                "\n" +
                "public class Myclass implements CodeExecutor{" +
                "\n" +
                "  @Override" +
                "\n" +
                "  public Map execute(Map workflowMap, Context wokflowContext) throws Exception{" +
                "\n" +
                "\n" +
                "    return workflowMap;" +
                "\n" +
                "\n" +
                "  }" +
                "\n" +
                "}";
            }
          }
        }
      });
    } else {
      //To get list categories of block
      this.start("get_python_category", {
        entity: "pythonCodeEditor",
        categories: (handlerResponse, status) => {
          if (status == 200 && handlerResponse) {
            this.category_data = handlerResponse;
          }
        }
      });
      this.start("get_python_plugin", {
        entity: "pythonPlugin",
        plugins: (pluginsResponse, status) => {
          if (status == 200 && pluginsResponse) {
            this.pluginData = pluginsResponse;
          }
        }
      });
    }
    if (this.$route.params.ID && this.$route.params.entity === "javaeditor") {
      this.start("get_code_editor", {
        entity: "pluginEdit",
        editorData: (handlerResponse, status) => {
          if (status == 200 && handlerResponse) {
            this.name = handlerResponse.NAME;
            this.code = handlerResponse.DATA;
            this.pluginName = handlerResponse.PLUGIN_CONFIG_ID;
            this.category = handlerResponse.CATEGORY_NAME;
            this.foreignKey = handlerResponse.ID;
            // Get prop table data
            this.start("get_code_editor_prop", {
              entity: "pluginEdit",
              code_id: this.foreignKey,
              editorPropData: (handlerResponse, status) => {
                if (status == 200 && handlerResponse) {
                  this.propData = handlerResponse;
                }
              }
            });
            this.getSelectedItem(handlerResponse.PLUGIN_CONFIG_ID);
          }
        }
      });
    } else if (
      this.$route.params.ID &&
      this.$route.params.entity === "pythoneditor"
    ) {
      this.start("get_python_editor", {
        entity: "pythonEdit",
        editorData: (handlerResponse, status) => {
          if (status == 200 && handlerResponse) {
            this.name = handlerResponse.NAME;
            this.code = handlerResponse.DATA;
            this.pluginName = handlerResponse.PLUGIN_CONFIG_ID;
            this.category = handlerResponse.CATEGORY_NAME;
            this.getSelectedItem(handlerResponse.PLUGIN_CONFIG_ID);
          }
        }
      });
    }
  },
  mounted() {},
  methods: {
    entityMethod() {
      // get package name from code
      this.packageName = this.code.split("\n")[0];
      let beforeclassName = JSON.stringify(this.code).split("public class ")[1];
      this.className = beforeclassName.substring(
        0,
        beforeclassName.indexOf("{")
      );

      // Get class name only, exclude anything after space
      let spacePosition = this.className.indexOf(" ");
      if (spacePosition != -1) {
        this.className = this.className.substr(0, spacePosition);
      }
    },
    compileData() {
      this.initCompile();
      this.entityMethod();
      this.start("compile_java_code", {
        code: {
          PLUGIN_CONFIG_ID: this.pluginName,
          VALUE: this.className,
          DATA: this.code
        },
        compileResponse: handlerResponse => {
          this.compileLoading = false;
          if (handlerResponse.code === "200") {
            this.compileTrue = true;
          } else {
            this.compileFalse = true;
          }
          this.compileMessage = handlerResponse.status;
        }
      });
    },
    initCompile() {
      this.compileLoading = true;
      this.compileTrue = false;
      this.compileFalse = false;
    },
    typeChecking() {
      if (this.$route.params.entity === "javaeditor") {
        this.entityMethod();
        this.type = "java";
      } else {
        this.type = "python";
      }
    },
    saveData() {
      debugger;
      this.typeChecking();
      this.saveJson["NAME"] = this.s3Json["NAME"] = this.name;
      this.saveJson["CATEGORY_NAME"] = this.category;
      this.saveJson["APPLICATION_ID"] = this.s3Json[
        "APPLICATION_ID"
      ] = this.$route.params.appId;
      this.saveJson["PLUGIN_CONFIG_ID"] = this.pluginName;
      this.saveJson["TYPE"] = this.type;
      this.saveJson["DATA"] = this.s3Json["DATA"] = this.code;
      if (this.$route.params.entity === "javaeditor") {
        this.start("save_plugin_type", {
          savejson: this.saveJson,
          saveEditorData: (Response, status) => {
            this.asyncData(Response, status);
          }
        });
      } else if (this.$route.params.entity === "pythoneditor") {
        this.start("save_python_plugin", {
          savejson: this.saveJson,
          saveEditorData: (Response, status) => {
            debugger;
            this.start("save_s3", {
              savejson: this.s3Json,
              saveEditorData: (Response, status) => {
                debugger;
                this.start("python_IDE_get_success", {});
              }
            });
            // this.start("get_success", {});
          }
        });
      }
    },
    updateData() {
      this.typeChecking();
      this.editJSON["NAME"] = this.pythonEditJSON["NAME"] = this.name;
      this.editJSON["ID"] = this.pythonEditJSON["ID"] = this.$route.params.ID;
      this.editJSON["APPLICATION_ID"] = this.pythonEditJSON[
        "APPLICATION_ID"
      ] = this.$route.params.appId;
      this.editJSON["PLUGIN_CONFIG_ID"] = this.pluginName;
      this.editJSON["TYPE"] = this.type;
      this.editJSON["DATA"] = this.pythonEditJSON["DATA"] = this.code;
      if (this.$route.params.ID && this.$route.params.entity === "javaeditor") {
        this.start("put_block_type_code_editor", {
          entity: "pluginEdit",
          editJson: this.editJSON,
          saveUpdateData: (Response, status) => {
            this.asyncData(Response, status);
          }
        });
      } else if (
        this.$route.params.ID &&
        this.$route.params.entity === "pythoneditor"
      ) {
        this.start("put_python_code_editor", {
          entity: "pythonEdit",
          editJson: this.pythonEditJSON,
          saveUpdateData: (Response, status) => {
            this.start("python_IDE_get_success", {});
          }
        });
      }
    },
    asyncData(Response, status) {
      if (status == 200 && Response) {
        let entityData = [];
        // init three id's for three props
        let packageID = null;
        let classnameID = null;
        let jarnameID = null;
        for (let i = 0; i < this.propData.length; i++) {
          if (this.propData[i].KEY == "package") {
            if (this.propData[i].ID) {
              packageID = this.propData[i].ID;
            } else {
              console.log("key not exist for package");
            }
          } else if (this.propData[i].KEY == "classname") {
            if (this.propData[i].ID) {
              classnameID = this.propData[i].ID;
            } else {
              console.log("key not exist for classname");
            }
          } else if (this.propData[i].KEY == "jarname") {
            if (this.propData[i].ID) {
              jarnameID = this.propData[i].ID;
            } else {
              console.log("key not exist for jarname");
            }
          } else {
            console.log("key names dont match");
          }
        }
        // If jarData dropdown is not changed, jarData will be empty, thus assigning previous value
        if (this.jarData == "") {
          this.getSelectedItem(this.pluginName);
        }
        if (this.$route.params.ID) {
          entityData.push({
            APPLICATION_ID: this.$route.params.appId,
            ID: packageID,
            KEY: "package",
            VALUE: this.packageName
          });
          entityData.push({
            APPLICATION_ID: this.$route.params.appId,
            ID: classnameID,
            KEY: "classname",
            VALUE: this.className
          });
          entityData.push({
            APPLICATION_ID: this.$route.params.appId,
            ID: jarnameID,
            KEY: "jarname",
            VALUE: this.jarData
          });
        } else {
          entityData.push({
            APPLICATION_ID: this.$route.params.appId,
            CODE_ID: Response.GENERATED_KEY,
            key: "package",
            value: this.packageName
          });
          entityData.push({
            APPLICATION_ID: this.$route.params.appId,
            CODE_ID: Response.GENERATED_KEY,
            key: "classname",
            value: this.className
          });
          entityData.push({
            APPLICATION_ID: this.$route.params.appId,
            CODE_ID: Response.GENERATED_KEY,
            key: "jarname",
            value: this.jarData
          });
        }
        function delay() {
          return new Promise(resolve => setTimeout(resolve, 300));
        }
        let _this = this;
        async function delayedLog(item) {
          let id = _this.$route.params.ID;
          await delay();
          if (id) {
            _this.start("update_entity_data", {
              entityjson: item
            });
          }
          if (!id) {
            _this.start("save_entity_data", {
              entityjson: item
            });
          }
        }
        async function arratofObjects() {
          entityData.forEach(async item => {
            await delayedLog(item);
          });
          _this.start("java_IDE_get_success", {});
        }
        arratofObjects();
      }
    },
    getSelectedItem(jarId) {
      for (var i = 0; i < this.pluginData.length; i++) {
        if (this.pluginData[i].ID === jarId) {
          var parseObject = JSON.parse(this.pluginData[i].FIELDS);
          this.jarData = parseObject.pom_data;
        }
      }
    }
  }
};
</script>
<style scoped>
.compile-message {
  height: 50px;
}
</style>