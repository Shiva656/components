<template>
    <div>
        <div class="page-wrapper plugins logginglist">

            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title float-left mb-5">
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Logging</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                 <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Logging</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end -->
                    </div> 

                    <!-- Frontend and Backend dropdowns start -->
                    <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
                        <div class="btn-group filter">
                            <div class="dropdown float-right first">
                                <b-dropdown id="ddown1" text="Backend">
                                    <b-dropdown-item :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`">Plugins</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`">Triggers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`">Workflows</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`">Filters</b-dropdown-item>
                                    <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`">Publish</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>
                        <div class="btn-group filter second">
                            <div class="dropdown float-right">
                                <b-dropdown id="ddown2" text="Frontend">
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`">Category</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>                       
                    </div>
                    <!-- Frontend and Backend dropdowns end -->

                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-md-12">                            
                            <section class="block clearfix plugins-block no-margin">                                     
                                <appup-card ref="triggers" >
                                   
                                    <template slot="section" slot-scope="{ sortedData }">  
                                        <!-- <form>
                                            <input type="text" id="data_type" ref=''/>
                                            <button  @click.prevent="_trigger('triggers', 'exec', 'log', {'key': ``, 'entity': ``})"> Submit </button>
                                        </form> -->
                                        <div class="row">
                                            <div class="col-12">
                                                <nav class="navbar navbar-light float-right mb-3">
                                                    <form class="form-inline search">
                                                         <div class="logging_form appup-form">    
                                                            <label class="block">Request ID</label>                                                   
                                                            <input class="form-control mr-sm-2" type="text" placeholder="Search for request id" id="data_type" required="true" ref='' />    
                                                        </div>
                                                       
                                                        <div class="logging_form appup-form">
                                                            <label id="pageid" class="block">No of Records per page</label>
                                                            <input class="form-control mr-sm-2" type="number" min="0" max="100" placeholder="No of Records" id="recordsPerPage" required="true" ref='' />
                                                        </div> 
                                                        <div class="logging_form appup-form">
                                                            <label id="numberid" class="block">Page Number</label>
                                                            <input class="form-control mr-sm-2" size="2" type="number" min="0" max="9999" placeholder="Page Number" id="pageNumber" required="true" ref='' />
                                                        </div>
                                                         <!-- <b-button @click="_trigger('triggers', 'exec', 'log', {'key': document.getElementById('data_type').value, 'entity': ``})"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Submit</b-button> -->
                                                        <b-button class="mt-4 " @click.prevent="_trigger('triggers', 'exec', 'log', {'key': ``, 'entity': ``})"> Submit </b-button>
                                                    </form>
                                                </nav> 
                                            </div>
                                        </div>
                                       <h4 class="mb-3">Total Logs Found: {{records}}</h4>
                                        <div class="row" v-show="sortedData.length>0">                                                                                       
                                           
                                            <div class="col-lg-12" :key="index">
                                                <div class="appup_table">
                                                    <table class="table">
                                                        <thead>                                                          
                                                            <tr>
                                                                <th>#</th>
                                                                <th scope="col">UTC Time</th>      
                                                                <th scope="col">Level</th>                                                                
                                                                <th scope="col">Message </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            
                                                            <tr v-for="(item, index) in sortedData" :key="index">
                                                                <td scope="row">{{index+1}}</td>
                                                                <td scope="row" v-html="parseDate(`${item._source.timeMillis}`)"></td>  
                                                                <td scope="row">{{item._source.level}}</td>                                                               
                                                                <td scope="row" class="text-left">{{item._source.message}}</td>
                                                            </tr>
                                                        </tbody>                                       
                                                    </table> 
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
    return {
      records: "0"
    };
  },
  computed: {
    total: function() {
      console.log("testing");
      this.records = value;
    }
  },
  methods: {
       parseDate:function(date){
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(date/1000);
            return d.toLocaleString();
      }
  }
};
</script>