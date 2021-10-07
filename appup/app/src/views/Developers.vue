<template>
  <div>
    <div class="page-wrapper developers">
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
              <h1>Developers</h1>
              <!-- Breadcrumbs start -->
              <nav aria-label="breadcrumb" class="breadcrumbs">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/#/home/cloud">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    <a href="#">Developers</a>
                  </li>
                </ol>
              </nav>
              <!-- Breadcrumbs end -->
            </div>
            <!-- Frontend and Backend dropdowns start -->
            <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
              <div class="btn-group filter">
                <div class="dropdown float-right first">
                  <b-dropdown id="ddown1" text="Backend">
                    <b-dropdown-item
                      :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`"
                    >Triggers</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`"
                    >Workflows</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`"
                    >Plugins</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`"
                    >Filters</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`"
                    >Publish</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
              <div class="btn-group filter second">
                <div class="dropdown float-right">
                  <b-dropdown id="ddown2" text="Frontend">
                    <b-dropdown-item
                      :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`"
                    >Pages</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`"
                    >Blocks</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/handlerlist/${$route.params.cloudId}/${$route.params.appId}/handler`"
                    >Handlers</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`"
                    >Category</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
            <!-- Frontend and Backend dropdowns end -->
          </div>
          <section class="block">
            <h4>Backend</h4>
            <p>Drag and drop to build your complex backend in just mins</p>
            <div class="services">
              <div class="row">
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <!--appup-form preload="pre_load_count" submit="post" :workflow_params='{entity: "developers"}' /-->
                    <span class="icon-workflows icon"></span>
                    <!--span class="count" id="w_count"> 0 </span-->
                    <h4>
                      <a
                        :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`"
                      >Workflows</a>
                    </h4>
                    <p>Workflow is a new way to build your apps. Just drag and drop using our blocks. We will do the heavy lifting for you.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-triggers icon"></span>
                    <!--span class="count" id="t_count"> 0 </span-->
                    <h4>
                      <a
                        :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`"
                      >Triggers</a>
                    </h4>
                    <p>Trigger your workflows for REST, AI, cron or an event. Simple assign a condition and Appup will run your workflow automatically.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-filters icon"></span>
                    <!--span class="count" id="f_count"> 0 </span-->
                    <h4>
                      <a
                        :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`"
                      >Filters</a>
                    </h4>
                    <p>Need to check for authentication or access controls before you run your workflows? Filters will add that extra condition.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-plugins icon"></span>
                    <!--span class="count" id="p_count"> 0 </span-->
                    <h4>
                      <a
                        :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`"
                      >Plugins</a>
                    </h4>
                    <p>You can now install plugins for pretty much anything - authentication, database schemas, OAuth, and even AI.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-Publish-icon icon"></span>
                    <h4>
                      <a
                        :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`"
                      >Publish</a>
                    </h4>
                    <p>Publish your app to different services.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-Logs icon"></span>
                    <h4>
                      <a
                        :href="`#/app/logging/${$route.params.cloudId}/${$route.params.appId}/logginglist`"
                      >Logs</a>
                    </h4>
                    <p>Check the logs for your apps</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-pages icon"></span>
                    <h4>
                      <a
                        :href="`#/app/editorlist/${$route.params.cloudId}/${$route.params.appId}/java_compiler`"
                      >Java</a>
                    </h4>
                    <p>Compiler IDE</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-pages icon"></span>
                    <h4>
                      <a
                        :href="`#/app/editorlist/${$route.params.cloudId}/${$route.params.appId}/python_IDE`"
                      >Python</a>
                    </h4>
                    <p>IDE</p>
                  </div>
                </div>
                <!-- <div class="col-lg-4 col-sm-6">
                                <div class="service">
                                    <span class="icon-Publish-icon icon"></span>
                                    <h4><a :href="`#/home/user/${$route.params.cloudId}/${$route.params.appId}/publishapp`">Publish</a></h4>
                                    <p>Publish your app to market place</p>
                                </div>
                </div>-->
              </div>
            </div>
          </section>
          <section class="block">
            <h4>Frontend</h4>
            <p>More than 50+ components and a visual designer</p>
            <div class="services">
              <div class="row">
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-pages icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`"
                      >Pages</a>
                    </h4>
                    <p>Visual designer to build your awesome looking app. Simply choose your UI components and your app is shiny and Super fast.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-blocks-icon icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`"
                      >Blocks</a>
                    </h4>
                    <p>Repeated blocks such as menu, automatic forms, grids can be reused in your pages.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-field-schema icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/handlerlist/${$route.params.cloudId}/${$route.params.appId}/handler`"
                      >Handlers</a>
                    </h4>
                    <p>Handlers are your new way to make those AJAX calls, build complex logic, leave cookies. Did we say that it's visual?</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-blocks-icon icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/helperslist/${$route.params.cloudId}/${$route.params.appId}/helper`"
                      >Helpers</a>
                    </h4>
                    <p>Helpers such as Forms, Collection, Charts can be used in your pages.</p>
                  </div>
                </div>
                <!-- Added by Sandeep  ---->
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-plugins icon"></span>
                    <!-- <span class="count" id="p_count"> 10 </span> -->
                    <h4>
                      <a
                        :href="`#/app/mobileplugin/config/${$route.params.cloudId}/${$route.params.appId}/frontendpluginconfig`"
                      >Plugins</a>
                    </h4>
                    <p>Now plugins from frontend. Mobile plugins can be installed from here.</p>
                  </div>
                </div>
                <!-- End of plugin -->

                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-Javascript-icon icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/appjslist/${$route.params.cloudId}/${$route.params.appId}/appjs`"
                      >JS</a>
                    </h4>
                    <p>Use for global App JS.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-Css-icon icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/appcsslist/${$route.params.cloudId}/${$route.params.appId}/appcss`"
                      >CSS</a>
                    </h4>
                    <p>Use for global App CSS.</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                  <div class="service">
                    <span class="icon-Css-icon icon"></span>
                    <!-- <span class="count">3</span> -->
                    <h4>
                      <a
                        :href="`#/app/appthemelist/${$route.params.cloudId}/${$route.params.appId}/apptheme`"
                      >Themes</a>
                    </h4>
                    <p>Use for global App Themes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="push"></div>
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

// Export components

export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
      w_count: ""
    };
  },
  computed: {},
  methods: {}
};
</script>
