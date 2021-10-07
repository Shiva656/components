<template>
  <quill-editor :id="id" ref="myTextEditor" v-model="content" :class="{'border border-danger': state==false }"
    :options="editorOptions" class="quill-scroll" @input="onEditorChange" bounds="self"></quill-editor>
</template>

<script>
  /**
   * @author Dharma
   * Quill js component is using Quill js api
   * ref: https://github.com/surmon-china/vue-quill-editor
   * Ex: https://quilljs.com/docs/modules/toolbar/
   */
  import axios from "axios";
  let _merge = require("lodash.merge");

  //load quilleditor api
  import { quillEditor } from "vue-quill-editor";
  import * as Quill from 'quill';
  import { ImageUpload } from "./imageUpload";
  var BackgroundStyle = Quill.import("attributors/style/background");
  var ColorStyle = Quill.import("attributors/style/color");

  var BackgroundClass = Quill.import("attributors/class/background");
  var ColorClass = Quill.import("attributors/class/color");

  const sizeClass = Quill.import("attributors/style/size");
  sizeClass.whitelist = [
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "30px",
    "32px",
    "36px"
  ];

  let fonts = Quill.import("attributors/style/font");
  fonts.whitelist = ["initial", "sans-serif", "serif", "monospace"];
  var DirectionAttribute = Quill.import('attributors/attribute/direction');
  Quill.register(DirectionAttribute, true);
  var AlignClass = Quill.import('attributors/class/align');
  Quill.register(AlignClass, true);
  var DirectionClass = Quill.import('attributors/class/direction');
  Quill.register(DirectionClass, true);
  var AlignStyle = Quill.import('attributors/style/align');
  Quill.register(AlignStyle, true);
  var DirectionStyle = Quill.import('attributors/style/direction');
  Quill.register(DirectionStyle, true);
  var FontStyle = Quill.import('attributors/style/font');
  Quill.register(FontStyle, true);

  var FontClass = Quill.import('attributors/class/font');
  Quill.register(FontClass, true);

  Quill.register(fonts, true);

  Quill.register(BackgroundClass, true);
  Quill.register(ColorClass, true);

  Quill.register(BackgroundStyle, true);
  Quill.register(ColorStyle, true);

  Quill.register(sizeClass, true);

  Quill.register("modules/imageUpload", ImageUpload);
  var css = require("./quill.css");
  var Link = Quill.import('formats/link');
  var builtInFunc = Link.sanitize;
  Link.sanitize = function customSanitizeLinkInput(linkValueInput) {
    var val = linkValueInput;
    if (/^\w+:/.test(val));
    else if (!/^https?:/.test(val))
      val = "https://" + val;
    return builtInFunc.call(this, val);
  };

  export default {
    name: "appup-quilljs",
    components: {
      quillEditor
    },
    props: {
      id: {
        type: String,
        required: false,
        default: null
      },
      s3presignurl: {
        type: String,
        required: false,
        default: null
      },
      value: {
        required: false
      },
      state: {
        type: Boolean,
        required: false,
        default: null
      },
      config: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        content: this.value,
        s3Url: "",
        aurl: this.s3presignurl,
        // quilljs options
        editorOptions: {
          modules: {
            toolbar: [
              [{ 'size': [false, '10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '32px', '36px'] }],
              ["bold", "italic"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],

            ],
            imageUpload: {
              url: "",
              method: "PUT",
              headers: {}, // add custom headers, example { token: 'your-token'}
              // personalize successful callback and call next function to insert new url to the editor
              callbackOK: (serverResponse, next) => {
                console.log(serverResponse);
                next(serverResponse.data.image_url);
              },
              // personalize failed callback
              callbackKO: serverError => {
                alert(serverError);
              },
              // optional
              // add callback when a image have been chosen
              checkBeforeSend: (file, next) => {
                console.log(file);
                let that = this;
                axios
                  .post(that.aurl + file.name, {
                    withCredentials: true,
                    credentials: "include",
                    "Access-Control-Allow-Origin": '*'
                  })
                  .then(function (response) {
                    that.$refs.myTextEditor.quill.options.modules.imageUpload.url =
                      response.data.s3_presign_url;
                    that.$refs.myTextEditor.quill.options.modules.imageUpload.s3url =
                      response.data.s3_url;
                    next(file);
                  });
              }
            }
          }
        }
      };
    },
    mounted: function () {
      console.log("devops testing...");
      this.showTooltips()

    },
    created: function () {
      // merge config object and predefined editorOptions object

      this.editorOptions = _merge(this.editorOptions, this.config);
    },
    watch: {
      value: function (newVal, oldVal) {
        this.content = newVal;
      }
    },
    methods: {
      showTooltips: function () {
        let toolbarTooltips = {
          font: "Select a font",
          size: "Select a font size",
          header: "Select the text style",
          bold: "Bold",
          italic: "Italic",
          underline: "Underline",
          strike: "Strikethrough",
          color: "Select a text color",
          background: "Select a background color",
          script: {
            sub: "Subscript",
            super: "Superscript"
          },
          list: {
            ordered: "Numbered list",
            bullet: "Bulleted list"
          },
          indent: {
            "-1": "Decrease indent",
            "+1": "Increase indent"
          },
          direction: {
            rtl: "Text direction (right to left | left to right)",
            ltr: "Text direction (left ro right | right to left)"
          },

          align: "Text alignment",
          link: "Insert a link",
          image: "Insert an image",
          formula: "Insert a formula",
          clean: "Clear format",
          "blockquote": "blockquote",
          "code-block": "code-block",
          "add-table": "Add a new table",
          "table-row": "Add a row to the selected table",
          "table-column": "Add a column to the selected table",
          "remove-table": "Remove selected table",
          help: "Show help"
        };
        let showTooltip = (which, el) => {
          if (which == "button") {
            var tool = el.className.replace("ql-", "");
          } else if (which == "span") {
            var tool = el.className.replace("ql-", "");
            tool = tool.substr(0, tool.indexOf(" "));
          }
          if (tool) {
            //if element has value attribute.. handling is different
            //buttons without value
            if (el.value == "") {
              if (toolbarTooltips[tool])
                el.setAttribute("title", toolbarTooltips[tool]);
            }
            //buttons with value
            else if (typeof el.value !== "undefined") {
              if (toolbarTooltips[tool][el.value])
                el.setAttribute("title", toolbarTooltips[tool][el.value]);
            }
            //default
            else el.setAttribute("title", toolbarTooltips[tool]);
          }
        };

        let toolbarElement = document.querySelector(".ql-toolbar");
        if (toolbarElement) {
          let matchesButtons = toolbarElement.querySelectorAll("button");
          for (let el of matchesButtons) {
            showTooltip("button", el);
          }
          //for submenus inside
          let matchesSpans = toolbarElement.querySelectorAll(
            ".ql-toolbar > span > span"
          );
          for (let el of matchesSpans) {
            showTooltip("span", el);
          }
        }
      },
      onEditorChange(content) {
        this.$emit("input", content);
      }
    }
  };
</script>
<style scoped>
  .quill-scroll {
    overflow-y: scroll;
    max-height: 350px;
  }

  .ql-picker-item[data-value="10px"]::before,
  .ql-picker-label[data-value="10px"]::before {
    content: "10px" !important;
  }

  .ql-picker-item[data-value="12px"]::before,
  .ql-picker-label[data-value="12px"]::before {
    content: "12px" !important;
  }

  .ql-picker-item[data-value="14px"]::before,
  .ql-picker-label[data-value="14px"]::before {
    content: "14px" !important;
  }

  .ql-picker-item[data-value="16px"]::before,
  .ql-picker-label[data-value="16px"]::before {
    content: "16px" !important;
  }

  .ql-picker-item[data-value="18px"]::before,
  .ql-picker-label[data-value="18px"]::before {
    content: "18px" !important;
  }

  .ql-picker-item[data-value="20px"]::before,
  .ql-picker-label[data-value="20px"]::before {
    content: "20px" !important;
  }

  .ql-picker-item[data-value="24px"]::before,
  .ql-picker-label[data-value="24px"]::before {
    content: "24px" !important;
  }

  .ql-picker-item[data-value="30px"]::before,
  .ql-picker-label[data-value="30px"]::before {
    content: "30px" !important;
  }

  .ql-picker-item[data-value="32px"]::before,
  .ql-picker-label[data-value="32px"]::before {
    content: "32px" !important;
  }

  .ql-picker-item[data-value="36px"]::before,
  .ql-picker-label[data-value="36px"]::before {
    content: "36px" !important;
  }
</style>