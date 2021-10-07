<template>
  <div>
    <div class="page-wrapper preferences-settings">
    
      <!-- Header start -->
      <Navbar />
      <!-- Header end -->

      <!-- Page content start -->      
      <div class="page-content">
        <div class="container clearfix">
          <div class="page-title">
              <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
              <h1>Preferences</h1>
              <!-- Breadcrumbs start -->
              <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="#">Home</a></li>
                      <li class="breadcrumb-item" aria-current="page"><a href="#">Preferences</a></li>
                  </ol>
              </nav>
              <!-- Breadcrumbs end -->
          </div> 
          <!-- Tabs menu start -->
          <div class="tab-menu">
            <b-tabs>
              <!-- Settings tab start -->
              <b-tab title="Setting">
                <section class="block">
                  <appup-form  
                    preload="pre_load_entity_edit"  
                    submit="put"
                    :workflow_params='{entity: "settings"}'
                  />
                </section>
              </b-tab>  
              <!-- Settings tab end -->

              <!-- password tab start -->
              <b-tab title="Password">
                <section class="block">
                  <appup-form  
                    preload="pre_load_entity_edit" 
                    submit="put"
                    :workflow_params='{entity: "password"}'
                  />
                </section>
              </b-tab>
              <!-- password tab end -->
            </b-tabs>    
          </div>
          <!-- Tabs menu end -->
        </div>
      </div>      
      <div class="push"></div>
      <!-- Page content start -->
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
}
</script>
