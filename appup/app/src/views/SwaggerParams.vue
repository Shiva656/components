<template>
  <div>
    <div class="page-wrapper plugins">
      <!-- Header start -->
      <Navbar />
      <!-- Header end -->

      <!-- Page content start -->
      <div class="page-content">
        <div class="container clearfix">
          <div class="page-title float-left mb-5">
            <button
              type="button"
              class="btn btn-outline-secondary bg-white"
              @click="$router.go(-1)"
            >
              <span class="icon-arrow-left"></span>
            </button>
            <h1>Swagger Params</h1>

            <!-- Breadcrumbs start -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/#/home/cloud">Home</a>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <a
                    :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`"
                  >Developers</a>
                </li>

                <li class="breadcrumb-item" aria-current="page">
                  <a
                    :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`"
                  >Triggers</a>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <a href="#">Swagger Params</a>
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
                    :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`"
                  >Plugins</b-dropdown-item>
                  <b-dropdown-item
                    :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`"
                  >Triggers</b-dropdown-item>
                  <b-dropdown-item
                    :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`"
                  >Workflows</b-dropdown-item>
                  <b-dropdown-item
                    :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`"
                  >Filters</b-dropdown-item>
                  <b-dropdown-item
                    :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/publish`"
                  >Publish</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="btn-group filter second">
              <div class="dropdown float-right">
                <b-dropdown id="ddown2" text="Frontend">
                  <b-dropdown-item
                    :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/pages`"
                  >Pages</b-dropdown-item>
                  <b-dropdown-item
                    :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/block`"
                  >Blocks</b-dropdown-item>
                  <b-dropdown-item
                    :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`"
                  >Handlers</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
          <!-- Frontend and Backend dropdowns end -->

          <div class="clearfix"></div>
          <div class="row">
            <!-- Plugin Sidebar end -->

            <div class="col-md-12">
              <section class="block clearfix plugins-block no-margin">
                <div class="row">
                  <div class="col-sm-12">
                    <nav class="navbar navbar-light float-right mb-3">
                      <form class="form-inline search">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="SEARCH PARAMS"
                          aria-label="Search"
                          @keyup="_trigger('swaggerParams', 'search', `${$event.target.value}`, 'PARAM_NAME')"
                        />
                        <label></label>
                        <b-button
                          :href="`#/add/${$route.params.entity}/${$route.params.cloudId}/${$route.params.appId}/${$route.params.trigId}/${$route.params.wfId}`"
                          class="btn my-2 my-sm-0 btn-primary"
                          variant="text-white"
                        >Add Param</b-button>
                      </form>
                    </nav>
                  </div>
                </div>
                <appup-card
                  ref="swaggerParams"
                  label="ID"
                  preload="preload_entity"
                  :workflow_params="{entity: 'swagger'}"
                >
                  <template slot="section" slot-scope="{ sortedData }">
                    <div class="row">
                      <div class="col-lg-12">
                        <div v-if="sortedData.length" class="appup_table">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Param Name</th>
                                <th scope="col">Source</th>
                                <th scope="col">Data Type</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, index) in sortedData" :key="index">
                                <td scope="row">{{index+1}}</td>
                                <td scope="row">{{item.PARAM_NAME}}</td>
                                <td scope="row">{{item.PARAM_SOURCE}}</td>
                                <td scope="row">{{item.PARAM_DATA_TYPE}}</td>
                                <td scope="row">{{item.DESCRIPTION}}</td>
                                <td scope="row">
                                  <template>
                                    <a
                                      :href="`#/edit/swagger/param/${$route.params.cloudId}/${$route.params.appId}/${$route.params.trigId}/${$route.params.wfId}/${item.ID}`"
                                      class="more"
                                    >Edit</a>
                                  </template>
                                  <a
                                    href="#"
                                    @click.prevent="_trigger('swaggerParams', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': 'swagger'})"
                                    class="more delete-handler"
                                  >Delete</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div v-else-if="sortedData.length == 0">
                          <span>No Params</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </appup-card>
              </section>
            </div>
          </div>
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
    return {};
  },
  computed: {},
  methods: {}
};
</script>