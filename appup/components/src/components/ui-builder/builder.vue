<template>
  <iframe
    :src="src"
    id="ui_builder"
    frameborder="0"
    name="ui_builder"
    :width="width"
    :height="height"
    @load="load"
  ></iframe>
</template>

<script>
import axios from "axios";

var serialized_json;

var messageEventListener = function(event) {
  console.log("BD: inside serialize");
  // Initialize global workflow json variable - async will be waiting till this happens
  var data = event.data;
  if (data.command && data.command == "serialized") {
    serialized_json = data.builder_json;
  }
};

if (window.addEventListener) {
  window.addEventListener("message", messageEventListener, false);
} else {
  window.attachEvent("onmessage", messageEventListener);
}

export default {
  name: "appup-builder",
  props: {
    src: {
      type: String,
      required: true
    },

    width: {
      type: String,
      default: "100%"
    },

    height: {
      type: String,
      default: "900px"
    },

    value: {
      type: String,
      required: true
    }
  },
  methods: {
    fetchHelpers: function() {
      // axios
      //   .get(
      //     `/appdb/_db/BLOCKS?where=APPLICATION_ID=${this.$route.params.appId}`
      // , {
      //   headers: {
      //     crossdomain: true,
      //     token: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InhtYXRpb25wcm9qZWN0QGdtYWlsLmNvbSIsInVzZXJfaWQiOiI3MDMiLCJleHBpcnlfdGltZSI6IkZyaSwgMjcgU2VwIDIwMTkgMTk6Mzc6MjggR01UIn0.-QhgxguXdwdVXPCI8xbQd9lJ2Z6wsx2qyJtA_GrP7MM"
      //   }
      // }
      // )
      // .then(function(response) {

      // this.$appupajax
      //   .get2(
      //     `/appdb/_db/BLOCKS?where=APPLICATION_ID=${this.$route.params.appId}`,
      //     {},
      //     { withCredentials: true, credentials: "include" }
      //   )
        _this.$appupajax.get2(`/appdb/_db/BLOCKS?where=APPLICATION_ID=${this.$route.params.appId}`, {}, {}, {withCredentials: true, credentials: "include" })
        .then(this.$appupajax.handleResponse)
        .then(response => {
          debugger;
          console.log("testing fetchhelpers url");
          var iframeWindow = document.getElementById("ui_builder")
            .contentWindow;
          let data = {};
          data["helpers"] = response.data;
          iframeWindow.postMessage(data, "*");
        });
    },
    load: function() {
      console.log("frame loaded");

      setTimeout(() => {
        var data = {};
        data.command = "init";
        if (this.value) {
          console.log("inside value...");
          data.builder_json = this.value;
        } else {
          data.builder_json = "[]";
        }

        var iframeWindow = document.getElementById("ui_builder").contentWindow;
        iframeWindow.postMessage(data, "*");
      }, 3000);
    },
    save: async function() {
      // this.$emit("input", "testttt");

      var data = {};
      data.command = "save";
      var iframeWindow = document.getElementById("ui_builder").contentWindow;
      iframeWindow.postMessage(data, "*");

      var start = new Date().getTime();
      // Waits until global variable gets initialized asynchronously
      // through message event
      while (!serialized_json && this.checkMax(start)) {
        await this.sleep(5); // 5 milliseconds
      }
    },
    getJson: function() {
      return serialized_json;
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    checkMax: function(time) {
      var valid = new Date().getTime() - time <= 30000;

      if (!valid) console.log("Maximum time reached!!");

      return valid;
    }
  },
  mounted() {
    console.log("in mounted...");
    let that = this;
    this.$nextTick(function() {
      that.fetchHelpers();
    });
  }
};
</script>
