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
                            <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>     
                            <template v-if="$route.params.entity=='copyworkflow'">
                                <h1>Select app name</h1>
                            </template>
                             <template v-else-if="$route.params.entity=='publishapp'">
                                <h1>Publish to Marketplace</h1>
                            </template>
                            <template v-else>
                                <h1>Select Usercloud</h1>
                            </template>
                        </div>               
                    </div>                     
                    <section class="block">
                        <div class="row">
                            <div class="col-12">
                                   <template v-if="$route.params.entity=='copyworkflow'">
                                      <appup-form  preload="pre_load_entity" submit="post_entity_filter" :workflow_params='{entity: "copyworkflow"}' /> 
                                 </template>
                                  <template v-else-if="$route.params.entity=='publishapp'">
                                      <appup-form  
                                        preload="pre_load_entity"  
                                        submit="post_marketapp"
                                        :workflow_params='{entity: "publishapp"}'
                                    /> 
                                       </template>     
                                 <template v-else>
                                    <appup-form  preload="pre_load_entity" submit="copy-app" :workflow_params='{entity: "usercloud"}' /> 
                                 </template>                                          
                            </div>
                        </div>
                    </section>
                   
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
    name: "Dashboard",
    components: {
        AppupHeader,
        Navbar,
        AppupFooter
    },
   data: {
   },
    computed: {},
    methods: {}
};
</script>
