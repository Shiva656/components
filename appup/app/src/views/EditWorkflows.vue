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
                            <template v-if="$route.params.entity=='workflow'">
                                <h1>Add {{$route.params.entity}}</h1>
                            </template>                                    
                            <template v-else>
                                <h1>Edit {{$route.params.entity}}</h1>
                            </template>
                        </div>
                        <div class="float-right new-app" v-if="$route.params.entity=='pages'">
                            <b-button :href="`#/app/pages/${$route.params.cloudId}/${$route.params.appId}/pagehandler/${$route.params.id}`"  class="float-right" variant="warning text-white"><span class="icon-new-app"></span>Handlers</b-button>
                        </div> 
                        <div class="float-right new-app" v-if="$route.params.entity=='block'">
                            <b-button :href="`#/app/blocks/${$route.params.cloudId}/${$route.params.appId}/blockhandler/${$route.params.id}`"  class="float-right" variant="warning text-white"><span class="icon-new-app"></span>Handlers</b-button>
                        </div>               
                    </div> 
                    <section class="block">
                        <div class="row">
                            <div class="col-12">
                               
                                <!-- Appup form component start -->                                                              
                                <template v-if="$route.params.entity=='workflow'">
                                    <appup-form  
                                        preload="pre_load_edit_workflow"  
                                        submit="post_handler"
                                        />
                                </template>
                                <template v-else-if="$route.params.entity=='workflows' && typeof $route.params.type != 'undefined' && $route.params.type != ''">
                                    <appup-form  
                                        preload="pre_load_edit_type"  
                                        submit="put"
                                        />
                                </template>
                                <template v-else>
                                    <appup-form  
                                    preload="pre_load_edit"  
                                    submit="put"
                                    />
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
  }
}
</script>
