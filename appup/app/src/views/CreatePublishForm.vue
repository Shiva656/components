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
                            <h1>New {{$route.params.entity}}</h1>
                        </div>               
                    </div> 
                    
                    <div class="row">
                        <div class="col-12">
                            
                            <div class="tab-menu">
                                <b-tabs>
                                    <!-- Settings tab start -->
                                    <b-tab title="general">
                                        <section class="block">
                                            <div class="row">
                                                <div class="col-sm-12 col-md-6">
                                            <!-- Appup form component start -->
                                            <!-- <appup-form preload="pre_load_entity_edit" submit="put" :workflow_params='{entity: "general"}' /> -->
                                             <appup-form  preload="pre_load_entity_publish" submit="post_create_publish" :workflow_params='{entity: "general"}' />
                                             <b-button style="margin-top: -1px; margin-left: 7px" variant="primary" @click="start('unpublish_app',{})">UNPUBLISH</b-button>
                                             
                                            <!-- Appup form component end -->
                                                </div>
                                                
                                             
                                                <div class="col-sm-12 col-md-6 publish_info">
                                                     <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid_publish">
                                                        <template slot="card" slot-scope="{ items }" >                                                                             
                                                            <div class="row">
                                                                <template v-if="items">  
                                                                    <template>
                                                                        <h4 class="mb-2 pl-2">Your Application is published in below Cluster.</h4>
                                                                    </template>                                                             
                                                                    <template v-for="item in items">          
                                                                      <div class="col-sm-12" :key="item.id">
                                                                            <a :href="`#/publishdetail/publish/${item.id}`">
                                                                            <p><b><span>{{ item.cluster_name}}</span></b> - <span>{{item.published_on}}(UTC)</span> 
                                                                             <span v-if="item.status == 'COMPLETED'"><i class="fas fa-check" style="color:green"></i></span> 
                                                                             <span v-else-if="item.status == 'ERROR'" ><i style="color:red" class="fas fa-times" ></i></span> 
                                                                             <span v-else-if="item.status == 'INPROGRESS'"><i style="color:#ffc107" class="fas fa-spinner" ></i></span>
                                                                            </p> </a>
                                                                        </div>                                                                                                                       
                                                                    </template>
                                                                </template>
                                                                <template v-else>
                                                                </template>
                                                            </div>                               
                                                        </template>                
                                                    </appup-card> 
                                                    
                                                </div>
                                                 <div class="col-10">
                                                <input type="hidden" id="res"  v-model="response_id"/>
                                                
                                                 </div>
                                                
                                            </div>
                                        </section>
                                    </b-tab> 
                                     <b-tab title="server">
                                        <section class="block">
                                            <appup-form preload="pre_load_entity_publish" submit="post_create_publish" :workflow_params='{entity: "publishserver"}' />
                                        </section>
                                    </b-tab> 
                                    <b-tab title="replication">
                                        <section class="block">
                                            <appup-form preload="pre_load_entity_publish" submit="post_create_publish" :workflow_params='{entity: "publishreplication"}' />                                           
                                        </section>
                                    </b-tab> 
                                </b-tabs>
                            </div>
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
    return {
        input_region_cluster:"",
        test:[{"id":10311,"cluster_name":"https://ui.qa.appup.cloud/examples","published_on":"Apr 25, 2019 7:18:22 AM","status":"COMPLETED","remarks":"df"},{"id":10219,"cluster_name":"https://ui.qa.appup.cloud/examples","published_on":"Apr 25, 2019 6:47:41 AM","status":"ERROR","remarks":"Issue with k8DeployWorkflow ..."},{"id":6698,"cluster_name":"https://ui.qa.appup.cloud/examples","published_on":"Apr 22, 2019 1:52:20 PM","status":"INPROGRESS","remarks":"sdAFG"}]
    };
  },
  computed: {},
  methods: {
       alertresponse() {
             
             this.start('publishstatus',{'linkid':document.getElementById('res').value});

            }
  }
};
</script>
