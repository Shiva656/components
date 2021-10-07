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
              <h1>Publish Details</h1>
              <div>
                <br>
                <appup-card ref="triggerss" id="1" label="ID" preload="publish_details_name">
                  <template slot="section" slot-scope="{ sortedData }">
                    <template v-if="sortedData != null">
                      <div>
                        <template v-for="(item ,index) in sortedData">
                          <div :key="index">
                            <h3>Cluster Name : {{item.cluster_name}}</h3>
                            <h3>Published On : {{item.published_on}}(UTC)</h3>
                          </div>
                        </template>
                      </div>
                    </template>
                  </template>
                </appup-card>
              </div>
              <br>
              <div>
                <appup-card ref="triggers" id="1" label="ID" preload="publish_details">
                  <template slot="section" slot-scope="{ sortedData }">
                    <template v-if="$refs.triggers.sortedData != null">
                      <div>
                        <b-table :items="sortedData" :fields="fields"></b-table>
                      </div>
                    </template>
                  </template>
                </appup-card>
                <!--  -->
              </div>
            </div>
          </div>
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
  },
  data() {
    return {
      input_region_cluster: "",
      fields: [
        "id",
        "step_type",
        "request_id",
        "start_time",
        "end_time",
        "status"
      ]
    };
  }
};
</script>