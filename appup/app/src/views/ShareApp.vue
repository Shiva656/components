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
                            <h1>Share App</h1>
                        </div>               
                    </div>                     
                  
                    <div class="row">
                        <div class="col-12">                           
                            <appup-form preload="pre_load_entity" submit="post_sentemail" :workflow_params='{entity: "selectsharecloud"}' />                           
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
