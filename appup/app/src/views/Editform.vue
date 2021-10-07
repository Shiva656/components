<template>
  <div>
    <div class="page-wrapper">
      <!-- Header start -->
      <Navbar/>
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
              <template v-if="$route.params.entity=='event'">
                <h1>Edit Event Trigger</h1>
              </template>
              <template v-else-if="$route.params.entity=='cron'">
                <h1>Edit Cron Trigger</h1>
              </template>
              <template v-else-if="$route.params.entity=='triggers'">
                <h1>Edit Rest Trigger</h1>
              </template>
              <template v-else-if="$route.params.entity=='publishappcopy'">
                <h1>Copy To Cloud</h1>
              </template>
              <template v-else-if="$route.params.entity=='CloudProperties'">
                <h1>Edit Cloud Properties</h1>
              </template>
              <template v-else-if="$route.params.entity=='ApplicationProperties'">
                <h1>Edit Application Properties</h1>
              </template>
               <template v-else-if="$route.params.entity=='swagger'">
                <h1>Edit Swagger Param</h1>
              </template>
              <template v-else>
                <h1>Edit {{$route.params.entity}}</h1>
              </template>
            </div>
            <div class="float-right new-app" v-if="$route.params.entity=='pages'">
              <b-button
                :href="`#/app/pages/${$route.params.cloudId}/${$route.params.appId}/pagehandler/${$route.params.id}`"
                class="float-right"
                variant="warning text-white"
              >
                <span class="icon-new-app"></span>Handlers
              </b-button>
            </div>
            <div class="float-right new-app" v-if="$route.params.entity=='block'">
              <b-button
                :href="`#/app/blocks/${$route.params.cloudId}/${$route.params.appId}/blockhandler/${$route.params.id}`"
                class="float-right"
                variant="warning text-white"
              >
                <span class="icon-new-app"></span>Handlers
              </b-button>
            </div>
          </div>
          <section class="block">
            <div class="row">
              <div class="col-12">
                <!-- Appup form component start -->
                <template v-if="typeof $route.params.type != 'undefined' && $route.params.type ==0">
                  <!-- Appup form component start -->
                  <appup-form preload="pre_load_edit_type" submit="put"/>
                  <!-- Appup form component end -->
                </template>
                <template v-else-if="$route.params.entity=='publishappcopy'">
                  <appup-form preload="edit_market_product" submit="marketplaceCopy"/>
                  <div style="margin: -49px 0 0 169px !important;">
                    <b-button variant="primary" :href ="`#/marketplaceapp/app/${$route.params.cloudId}/marketplaceapp`">Cancel</b-button>
                  </div>
                </template>
                <template v-else-if="$route.params.entity == 'event'">
                  <appup-form preload="pre_load_trigger_event_edit" submit="put_trigger_event"/>
                  <!-- Appup form component end -->
                </template>                
                <template v-else>
                  <appup-form preload="pre_load_edit" submit="put"/>
                  <!-- Appup form component end -->
                </template>
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
    <AppupFooter/>
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
  }
};
</script>
