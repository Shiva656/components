<template>
  <div class="app_launcher">
    <div class="dropdown-nine">
      <img src="images/nine-dots.svg " class="d-none" width="25" />
      <i :class="iconClass" @click="dropDown()" v-click-outside="onClickOutside"></i>

      <div class="dropdown-content" :class="{showapps : showApps}">
        <div class="scrollbar" id="style-3">
          <div class="force-overflow bg-white pb-5">
            <template v-for="(category ,index) in Object.keys(apps)">
              <div class="mg-dropdown px-3 pt-2" :key="index">
                <div class="topsticky bg-white">
                  <h6 class="text-center mb-0 pt-3">{{category}}</h6>

                  <hr class="mx-3" />
                </div>
                <ul class="pl-0" :key="index">
                  <template v-for="(app,index) in apps[category]" :title="app.label">
                    <li
                      @click.prevent="showModal(app.link,app.label,app.category)"
                      class="rower"
                      :key="index"
                      :href="app.link"
                    >
                      <img :src="app.image" class="rounded text-center" />
                      <p class="app-title pt-1 text-center">{{app.label}}</p>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="position-absolute manage-subscrip">
                <template v-for="(button, index) in buttons">
                  <a
                    :href="button.link"
                    target="_bank"
                    class="small mag-color text-primary text-center my-2"
                    :key="index"
                  >{{button.label}}</a>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
        <div class="col-lg-12 text-center">
         
          <template v-for="(button, index) in buttons">
            <a
              :href="button.link"
              target="_bank"
              class="text-decoration-none"
              :key="index"
            >{{button.label}}</a>
          </template>
        </div>
    </div>-->

    <div>
      <template v-if="modelData != null">
        <b-modal ref="myModalRef" hide-footer :title="modelData.app_name">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <div>
                    <b-carousel
                      :interval="2000"
                      controls
                      indicators
                      background="#ababab"
                      img-width="1024"
                      img-height="480"
                      style="text-shadow: 1px 1px 2px #333;"
                    >
                      <template v-for="(item, index) in modelData.images ">
                        <b-carousel-slide :img-src="item" :key="index"></b-carousel-slide>
                      </template>
                    </b-carousel>
                  </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <p class="text-muted mt-5 mt-lg-0">{{modelData.content}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="mr-auto">
              <a
                :href="modelData.learn_more"
                target="_blank"
                @click="$refs.myModalRef.hide();"
                class="h6 text-decoration-none ml-3"
              >Learn more</a>
            </div>
            <div class="ml-auto">
              <button
                type="button"
                @click.prevent="tryAppHit()"
                class="btn btn-primary mr-3"
              >TRY APP</button>
            </div>
          </div>
        </b-modal>
      </template>
    </div>
  </div>
</template>


<script>
// Import dependency to outside click functionality
import vClickOutside from "v-click-outside";

import axios from "axios";
let _groupBy = require("lodash.groupby");

import * as Cookie from "tiny-cookie";

export default {
  name: "appsLauncher",
  props: {
    // Fetch data with url
    url: {
      type: String
      //required: true
    },
    iconClass: {
      type: String,
      default: "fas fa-th"
    },
    appsJson: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      apps: [],
      buttons: [],
      link: "",
      message: "",
      modelData: null,
      showApps: false
    };
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  methods: {
    // on click outside functionality
    onClickOutside() {
      this.showApps = false;
    },

    // get data from url
    apicall() {
      let _this = this;

      let cookieValue = Cookie.get("token");

      // axios
      //   .get(_this.url, {
      //     headers: {
      //       crossdomain: true,
      //       token: cookieValue
      //     }
      //   })
      //   .then(function(response) {
        _this.$appupajax.get2(_this.url, {}, {}, {crossdomain: true,token: cookieValue,withCredentials: true, credentials: "include" })
      // _this.$appupajax
      //   .get2(
      //     _this.url,
      //     {},
      //     {
      //       crossdomain: true,
      //       token: cookieValue,
      //       withCredentials: true,
      //       credentials: "include"
      //     }
      //   )
        .then(_this.$appupajax.handleResponse)
        .then(response => {
          _this.buttons = response.data.buttons;
          _this.apps = _groupBy(response.data.apps, "category");
        });
    },

    dropDown() {
      if (this.showApps) {
        this.showApps = false;
      } else {
        this.showApps = true;
      }
    },

    showModal(link, label, category) {
      console.log(category);
      if (category != "Recommended Apps") {
        window.open(link, "_blank");
      } else {
        var _this = this;
        this.modelData = null;
        this.getDataForModel(link);
      }
    },

    getDataForModel(url) {
      let _this = this;

      let cookieValue = Cookie.get("token");

      // axios
      //   .get(url, {
      //     headers: {
      //       crossdomain: true,
      //       token: cookieValue
      //     }
      //   })
      //   .then(function(response) {

      // _this.$appupajax
      //   .get2(url,{},
      //     {
      //       crossdomain: true,
      //       token: cookieValue,
      //       withCredentials: true,
      //       credentials: "include"
      //     }
      //   )
        _this.$appupajax.get2(url, {}, {}, {crossdomain: true,token: cookieValue,withCredentials: true, credentials: "include" })
        .then(_this.$appupajax.handleResponse)
        .then(response => {
          if (response.data) {
            _this.modelData = response.data;
            _this.$nextTick(function() {
              _this.$refs.myModalRef.show();
            });
          }
        });
    },
    tryAppHit() {
      let _this = this;

      let cookieValue = Cookie.get("token");

      // axios
      //   .get(_this.modelData.try_app, {
      //     headers: {
      //       crossdomain: true,
      //       token: cookieValue
      //     }
      //   })
      //   .then(function(response) {

        // _this.$appupajax
        // .get2(_this.modelData.try_app,{},
        //   {
        //     crossdomain: true,
        //     token: cookieValue,
        //     withCredentials: true,
        //     credentials: "include"
        //   }
        // )
        _this.$appupajax.get2(_this.modelData.try_app, {}, {}, {crossdomain: true,token: cookieValue,withCredentials: true, credentials: "include" })
        .then(_this.$appupajax.handleResponse)
        .then(response => {
        
          window.open(_this.modelData.app_link, "_blank");
        })
        .catch(error => {
          // Error
          _this.$emit("error");
        });
      _this.$refs.myModalRef.hide();
    }
  },

  created() {
    if (this.appsJson) {
      this.buttons = this.appsJson.buttons;
      this.apps = _groupBy(this.appsJson.apps, "category");
    } else {
      this.apicall();
    }
  }
};
</script>

<style>
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown-nine {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 500px;
  right: 0;
}

.dropdown-content a {
  color: black;
  padding: 3px 8px;
  text-decoration: none;
  display: block;
}
.rower:hover {
  background-color: #d6c9c91f;
}

.dropdown-content.showapps {
  display: block;
}

.dropdown-nine:hover .dropbtn {
  background-color: #3e8e41;
}
/* .business{
background-color: #62B942;
}
.simply{
background-color: #F65442;
}
.trendy{
background-color: #554CB9;
}
.logobg{
background-color: #0081FF;
} */
.mg-dropdown {
  width: 293px;
  height: auto;
}
.app-title {
  font-size: 10px;
  margin-bottom: 0px;
}
.app-hover {
  padding-top: 11px;
  margin-bottom: 0px;
  padding-bottom: 7px;
}
.app-hover:hover {
  background-color: #fcfcfc;
  cursor: pointer;
}
.rower {
  padding: 8px;
  display: inline-block;
  vertical-align: top;
  color: black;
  z-index: 999;
  width: 84px;
  text-align: center;
}
h6,
h5 {
  font-size: 0.9rem;
}
header {
  text-align: center;
  font-size: 25px;
}

#info {
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-bottom: 25px;
}

a {
  color: #074e8c;
}

#style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
}

#style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar-thumb {
  background-color: #d8d8d8;
}

.force-overflow {
  min-height: 450px;
}

#wrapper {
  text-align: center;
  width: 500px;
  margin: auto;
}

header {
  text-align: center;
  font-size: 25px;
}

#info {
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-bottom: 25px;
}

a {
  color: #074e8c;
}

.scrollbar {
  float: left;
  height: 500px;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 450px;
}

#wrapper {
  text-align: center;
  width: 500px;
  margin: auto;
}

.manage-subscrip {
  bottom: 0;
  text-align: center;
  width: 100%;
  background: #f7f7f7;
}
.mag-color {
  background-color: #f7f7f7;
}
</style>
