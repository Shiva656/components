<template>
    <div id="app">
      <div class="header__item on-board-shuttle">
        <b-dropdown size="lg" variant="link" :dropup="bottomPosition" :right="!bottomPosition" toggle-class="text-decoration-none" no-caret>
          <template slot="button-content">
            <span href class="header__link">
              <transition name="slide-fade">
                <span
                  class="header--btn py-2"
                  key="on"
                  @click="showAppsLauncher = false"
                >
                  <span class="ninedotsnew"></span>
                </span>
                <button class="header--btn py-2" key="off">
                  <span class="ninedotsnew nineshow"></span>
                </button>
              </transition>
            </span>
          </template>
          <b-dropdown-text>
            <transition name="dropdown">
              <div
                id="style-3"
                class="header__dropdown-menu text-left"
                v-bind:class="{ active: showAppsLauncher , 'topright': bottomPosition }"
                
              >
                <div class="positionstick"></div>
                <template v-for="category in Object.keys(apps)">
                  <div class="topsticky bg-white">
                    <h6 class="text-center mb-0 pt-3">{{category}}</h6>
                    <hr class="m-3">
                  </div>
                  <ul class="header__dropdown-menu-nav px-3">
                    <li
                      class="header__dropdown-menu-item rower"
                      v-for="(app,appIndex) in apps[category]"
                      :key="appIndex"
                    >
                      <a
                        href="#"
                        @click.prevent="appClick(app)"
                        class="header__dropdown-menu-link position-relative"
                        :title="app.label"
                      >
                        <div class="header__dropdown-menu-svg">
                          <img :src="app.image">
                        </div>
                        <span v-if="app.trial" class="trial-tag badge">Trial</span>
                        <div class="header__dropdown-menu-text">{{app.label}}</div>
                      </a>
                    </li>
                  </ul>
                </template>
                <div class="manage-subscrip">
                  <ul class="header__dropdown-menu-nav2">
                    <li
                      class="header__dropdown-menu-item"
                      v-for="(button,buttonKey) in buttons"
                      :key="buttonKey"
                    >
                      <a
                        :href="button.link"
                        target="_blank"
                        class="header__dropdown-menu-link"
                        :title="button.label"
                      >
                        <div class="header__dropdown-menu-text">{{button.label}}</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </transition>
          </b-dropdown-text>
        </b-dropdown>
        <!-- Icon -->
  
        <!-- List view  -->
      </div>
      <!-- Modal -->
      <div>
        <template v-if="modalData != null">
          <b-modal ref="myModalRef" id="pricing_modal" size="xl" hide-footer>
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-7 bg-white position-relative px-4 pt-4 pb-6">
                  <div class="border-none">
                    <h4 class="mb-3 text-capitalize">{{modalData.app_name}}</h4>
                    <p class="sub-head mb-4 text-muted">{{modalData.content}}</p>
                  </div>
                  <div class="col-md-12 mx-auto px-0">
                    <b-carousel
                      id="carousel-fade"
                      style="text-shadow: 0px 0px 2px #000"
                      :interval="4000"
                      indicators
                    >
                      <template v-for="(item, index) in modalData.images ">
                        <b-carousel-slide :img-src="item" :key="index"></b-carousel-slide>
                      </template>
                    </b-carousel>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="row pt-3 mt-5" v-if="tryApp">
                    <div class="w-100 h-100 px-4 pt-5 mt-5 mb-2 text-center">
                      <i class="fal fa-check-circle fa-4x text-success mb-4"></i>
                      <h3 class="pt-2 mt-1 mb-2">
                        Thank you for choosing
                        <span
                          class="text-capitalize d-block"
                        >{{modalData.app_name}}</span>
                      </h3>
                      <div class="pt-3 mx-lg-3 pb-4">
                        <p class="mt-3 mb-2">
                          Your 30-day trial is 100% free and lasts until
                          <span
                            class="alert alert-danger p-1 mb-4 mt-0 d-block mx-auto w-50"
                          >{{expireDate}}</span>
                        </p>
                        <p class="mt-2">
                          Buy
                          <span class="h5">{{modalData.app_name}}</span> at just
                          <span class="text-capitalize font-weight-bold h5">
                            $10 (per user per
                            month)
                          </span>
                        </p>
  
                        <button
                          class="btn btn-primary text-uppercase w-50 px-5 py-3 mt-1"
                          @click="continueClick()"
                        >Continue</button>
                      </div>
                    </div>
                  </div>
  
                  <div class="row pt-3 mt-4" v-if="!tryApp">
                    <div class="col-sm-12 col-md-12 col-lg-12 mx-auto text-center">
                      <div class="pricing-header">
                        <img :src="appImage" style="width: 90px;" class="rounded-circle mr-3">
  
                        <h2 class="my-3">Pricing</h2>
  
                        <p class="font-weight-300 px-5 mb-3">
                          Just getting started with 500apps? Start with any
                          app you like. Each app comes with all the features, no caps! As you grow, add more
                          apps as and when you need them - a la carte.
                        </p>
  
                        <label class="toggle-label">
                          <input type="checkbox" v-model="checked">
                          <span class="back">
                            <span class="toggle"></span>
                            <span class="label on">Buy</span>
                            <span class="label off">Try</span>
                          </span>
                        </label>
  
                        <div class="col-sm-10 mt-3 mx-auto">
                          <template v-if="checked">
                            <div class="price mt-5">
                              <span class="currency">$</span>
                              <span class="value">0</span>
                            </div>
                            <div class="price mb-5">
                              <div class="usermon">Free/30 days</div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="price mt-5">
                              <span class="currency">$</span>
                              <span class="value">10</span>
                            </div>
                            <div class="price mb-5">
                              <div class="usermon">User/Month</div>
                            </div>
                          </template>
                          <div class>
                            <div class="pricing-footer pt-3">
                              <template v-if="checked">
                                <button
                                  type="button"
                                  class="btn mt-1 text-m py-3 w-75 btn-primary"
                                  @click="tryAppHit()"
                                >Try for Free</button>
                              </template>
                              <template v-else>
                                <button
                                  type="button"
                                  class="btn mt-1 text-m py-3 w-75 btn-primary"
                                >Buy Now</button>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  // Importing all the dependencies
  import axios from "axios";
  let _groupBy = require("lodash.groupby");
  import * as Cookie from "tiny-cookie";
  import moment from "moment";
  
  export default {
    data() {
      return {
        showAppsLauncher: false,
        apps: [],
        buttons: [],
        checked: false,
        modalData: {},
        appImage: "",
        tryApp: false,
        expireDate: "",
        bottomPosition: false
      };
    },
  
    // Props
    props: {
      // json object
      appsJson: {
        type: Object
      },
      // url to fetch data (JSON Object)
      url: {
        type: String
      },
      // headers to be binded, by default will be an empty object
      headers: {
        type: Object,
        default: () => {}
      },
      position: {
        type: String,
        default: "top"
      }
    },
  
    // Sorting apps based on category
    created() {
      if (this.appsJson) {
        this.buttons = this.appsJson.buttons;
        this.apps = _groupBy(this.appsJson.apps, "category");
      } else {
        this.apiCall();
      }
  
      // Check position prop by default top
      if (this.position == "bottom") {
        this.bottomPosition = true;
      }
    },
  
    // Register event when modal hides
    mounted() {
      this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
        this.tryApp = false;
        this.checked = false;
      });
    },
  
    // Methods
    methods: {
      // To fetch data
      apiCall() {
        let _this = this;
  
        let cookieValue = Cookie.get("token");
  
        // axios
        //   .get(_this.url, {
        //     headers: this.headers
        //   })
        //   .then(function(response) {

        _this.$appupajax
        .get2(
          _this.url,
          {},
          {
            headers: _this.headers,
            withCredentials: true,
            credentials: "include"
          }
        )
        .then(_this.$appupajax.handleResponse)
        .then(response => {
            _this.buttons = response.data.buttons;
            _this.apps = _groupBy(response.data.apps, "category");
          });
      },
  
      // When clicked on try app
      tryAppHit() {
        let _this = this;
  
        let cookieValue = Cookie.get("token");
  
        // axios
        //   .get(_this.modalData.try_app, {
        //     headers: this.headers
        //   })
        //   .then(function(response) {

        _this.$appupajax
        .get2(
          _this.modalData.try_app,
          {},
          {
            headers: _this.headers,
            withCredentials: true,
            credentials: "include"
          }
        )
        .then(_this.$appupajax.handleResponse)
        .then(response => {

            _this.tryApp = true;
            // Calculate expire date 30 days from now
            _this.expireDate = moment()
              .add(30, "days")
              .format("Do MMMM YYYY");
            // Emit expiry date
            _this.$emit("expireDate", _this.expireDate);
            window.open(_this.modalData.app_link, "_blank");
          })
          .catch(error => {
            // Error
            _this.$emit("error", error);
          });
      },
  
      // When continue is clicked
      continueClick() {
        this.$refs["myModalRef"].hide();
        this.tryApp = false;
        this.checked = false;
      },
  
      // When app is clicked from the grid view
      appClick(app) {
        this.appName = app.label;
        this.appImage = app.image;
        if (app.category != "Recommended Apps") {
          window.open(app.link, "_blank");
        } else {
          var _this = this;
          this.modalData = null;
          this.getDataForModel(app.link);
        }
      },
  
      // Fetch data for b-modal
      getDataForModel(url) {
        let _this = this;
  
        let cookieValue = Cookie.get("token");
  
        // axios
        //   .get(url, {
        //     headers: this.headers
        //   })
        //   .then(function(response) {

        _this.$appupajax
        .get2(
          url,
          {},
          {
            headers: _this.headers,
            withCredentials: true,
            credentials: "include"
          }
        )
        .then(_this.$appupajax.handleResponse)
        .then(response => {
            if (response.data) {
              _this.modalData = response.data;
              _this.$nextTick(function() {
                _this.$refs["myModalRef"].show();
              });
            }
          });
      }
    }
  };
  </script>
  
  <style>

  span.trial-tag.badge {
   position: absolute;
   background: orange;
   display: block;
       top: -10px;
    right: -62px;
   border: 1px solid #fff;
   color: #000;
}

  #pricing_modal___BV_modal_outer_ .toggle-label {
    position: relative;
    display: block;
    width: 127px;
    height: 30px;
    margin-top: 2rem;
    margin-left: auto;
    cursor: pointer;
    margin-right: auto;
    border: 1px solid #eaeaea;
    border-radius: 26px;
    background: #fff;
  }
  
  #pricing_modal___BV_modal_outer_ .toggle-label input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .toggle-label input[type="checkbox"] + .back {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    -webkit-transition: background 100ms linear;
    transition: background 100ms linear;
    border-radius: 50px;
    left: 0;
  }
  .on-board-shuttle ul.dropdown-menu.show {
      margin: 0;
      padding: 0;
      border: 0px solid #fff;
      top: 47px !important;
  }
  
  .on-board-shuttle p.b-dropdown-text {
      margin: 0;
      padding: 0;
  }
  .toggle-label input[type="checkbox"]:checked + .back {
    background: #fff;
    /*green*/
  }
  
  .toggle-label input[type="checkbox"] + .back .toggle {
    display: block;
    position: absolute;
    content: " ";
    background: #58acfc;
    width: 50%;
    height: 22px;
    -webkit-transition: margin 100ms linear;
    transition: margin 100ms linear;
    border-radius: 50px;
    margin: 3px;
  }
  
  .toggle-label input[type="checkbox"]:checked + .back .toggle {
    margin-left: 59px;
  }
  
  #pricing_modal___BV_modal_outer_ .toggle-label .label {
    display: block;
    position: absolute;
    width: 50%;
    color: #fff;
    line-height: 27px;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  #pricing_modal___BV_modal_outer_
    #pricing_modal___BV_modal_outer_
    .toggle-label
    .label.on {
    left: 5px;
  }
  
  #pricing_modal___BV_modal_outer_ .toggle-label .label.off {
    left: 47%;
  }
  
  #pricing_modal___BV_modal_outer_
    .toggle-label
    input[type="checkbox"]:checked
    + .back
    .label.on {
    color: #58acfc;
  }
  
  #pricing_modal___BV_modal_outer_
    .toggle-label
    input[type="checkbox"]
    + .back
    .label.off {
    color: #58acfc;
  }
  
  #pricing_modal___BV_modal_outer_
    .toggle-label
    input[type="checkbox"]:checked
    + .back
    .label.off {
    color: #fff;
  }
  
  #style-3 ul {
    margin: 0;
    padding: 0;
  }
  
  #style-3 h1 {
    margin: 0;
  }
  #style-3 li {
    list-style: none;
  }
  
  #style-3 hr {
    border: 0;
    height: 0;
    margin: 2rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  #style-3 .positionstick {
    position: sticky;
    top: 0;
    padding: 10px;
    background: #fff;
  }
  
  #style-3::-webkit-scrollbar-track {
    background-color: #ffffff;
    cursor: pointer;
  }
  
  #style-3::-webkit-scrollbar {
    width: 9px;
    background-color: #f5f5f5;
  }
  
  #style-3::-webkit-scrollbar-thumb {
    background-color: #d8d8d8;
  }
  
  .header__item {
    position: relative;
  }
  .header__link .header--icon {
    color: gray;
  }
  .header__link .header--btn {
    top: 0;
    right: 0;
    position: absolute;
  }
  .header__link .header--btn .header:focus {
    outline: 0;
  }
  
  .header--icon {
    fill: currentcolor;
    width: 1.65rem;
    height: 1.65rem;
    display: inline-flex;
  }
  .header--btn {
    cursor: pointer;
    padding: 0;
    display: inline-block;
    border: 1px solid transparent;
    background-color: transparent;
    appearance: none;
    user-select: none;
  }
  .header__dropdown-menu-text {
    margin: 4px 0;
  }
  .header__dropdown-menu {
    position: absolute;
    top: 0 !important;
    right: 0;
    height: 20rem;
    min-width: 158px;
    overflow-y: auto;
    margin-top: 0 !important;
    -webkit-box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, 0.15);
    box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, 0.15);
    background-color: white;
    background-clip: padding-box;
    width: 293px;
    height: 450px;
    z-index: 99999;
  }
  .header__dropdown-menu-link {
    font-size: 10px;
    margin-bottom: 0;
    text-decoration: none !important;
    color: #000;
  }
  .header__dropdown-menu-link .header:hover {
    background-color: rgba(0, 0, 0, 0.039);
  }
  
  .header__dropdown-menu-svg .header--icon {
    width: 1.4rem;
    height: 1.4rem;
  }
  ul.header__dropdown-menu-nav {
    margin-bottom: 15px;
  }
  .manage-subscrip {
    bottom: 0;
    text-align: center;
    width: 100%;
    background: #f7f7f7;
    position: sticky;
    padding: 0.75rem;
  }
  .rower {
    padding: 8px;
    display: inline-block;
    vertical-align: top;
    color: #000;
    z-index: 999;
    width: 84px;
    text-align: center;
  }
  
  li.rower:hover {
    background: #f5f5f5;
  }
  
  #pricing_modal___BV_modal_outer_ .modal-header {
    border-bottom: none;
    padding-bottom: 0 !important;
    z-index: 9;
    width: 100%;
  }
  
  #pricing_modal___BV_modal_outer_ .modal-dialog .modal-content {
    width: 1200px !important;
  }
  
  #pricing_modal___BV_modal_outer_ .modal-body {
    min-height: 610px;
    padding: 0 !important;
    background: #f4f8fb;
  }
  
  #pricing_modal___BV_modal_outer_ .carousel-indicators li {
    width: 10px !important;
    height: 10px !important;
    border-radius: 100%;
    background-color: #58acfc !important;
  }
  
  #pricing_modal___BV_modal_outer_ .carousel-indicators {
    bottom: -55px !important;
  }
  
  #pricing_modal___BV_modal_outer_ .img {
    width: 100% !important;
  }
  
  #pricing_modal___BV_modal_outer_ .modal-header {
    position: absolute;
    width: 100%;
    z-index: 9;
  }
  
  #pricing_modal___BV_modal_outer_ .currency {
    display: inline-block;
    margin-top: 10px;
    vertical-align: top;
    font-size: 20px;
    font-weight: 400;
    color: #403e3e;
  }
  #pricing_modal___BV_modal_outer_ .value {
    font-size: 40px;
    font-weight: 300;
  }
  #pricing_modal___BV_modal_outer_ .pricing-modal .modal-body {
    min-height: 610px;
    padding: 0 !important;
    background: #f4f8fb;
  }
  #pricing_modal___BV_modal_outer_ .pricing-modal .carousel-indicators {
    bottom: -55px !important;
  }
  .ninedotsnew {
    background: url(https://500apps.com/images/nine-dots-grey.svg) no-repeat top
      left;
    width: 22px;
    height: 22px;
    display: inline-block;
  }
  .ninedotsnew .nineshow {
    width: 22px;
    height: 22px;
    display: inline-block;
  }
  /* bottom left */
  div.header__dropdown-menu.topright {
    top: -470px !important;
    right: -161px;
  }
  .dropdown-toggle-no-caret::after{
    display:none;
  }
  
  /* Animation slide button */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.6s;
  }
  .slide-fade-enter,
  .slide-fade-leave-active {
    opacity: 0;
  }
  .slide-fade-enter {
    transform: translateX(31px);
  }
  .slide-fade-leave-active {
    transform: translateX(-31px);
  }
  
  /* Dropdown animation */
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 1s;
  }
  .dropdown-enter,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  </style>