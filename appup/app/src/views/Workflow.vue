<template>
  <div>    
    <b-modal v-model="modalShow"  no-fade class="appup_modal">
        <template>
            <div slot="modal-header">                
                <a :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`"  class="float-right"><span class="icon-close-icon"></span></a>  
            </div>
        </template>
      <template>
            <div slot="modal-footer"></div>
        </template>
         <div class="container clearfix">
            <div class="page-title float-left">
                <h1>Select Workflows</h1>
            </div> 
            <div class="float-sm-left float-lg-right">                                            
                <nav class="navbar navbar-light float-right mb-3">
                    <form class="form-inline search">                                       
                        <b-button :href="`#/create/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Custom Workflow</b-button>
                    </form>
                </nav>                     
            </div>      
            <!-- Tab menu start -->
                <nav class="tab-menu"> 
                  
                </nav> 
            <!-- Tab menu end -->     
            <div class="triggers-block">    
              <div class="row">
                    <div class="col-md-2">
                        <appup-card ref='triggers' id="1" label="ID" preload="preload_grid">                                 
                            <template slot="section" slot-scope="{ sortedData }">                                
                                <div class="clearfix">
                                    <div class="title float-left">                                       
                                        <ul class="categories-list">                                                                
                                            <template v-if="clearRender()"></template>
                                            <!-- <template v-for="sortedData in sortedData">
                                                <template v-if="!isObjectRendered(sortedData.CATEGORY_NAME)">
                                                    <li :class="$route.params.type==sortedData.CATEGORY_NAME?'active':''" :key="sortedData.CATEGORY_NAME"><a :href="`#/create/workflowlist/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${sortedData.CATEGORY_NAME}`">{{sortedData.CATEGORY_NAME}}</a></li> 
                                                </template>
                                            </template> -->
                                            <b-tabs pills card vertical>
                                                <template  slot="tabs" v-for="sortedData in sortedData">      
                                                    <template v-if="!isObjectRendered(sortedData.CATEGORY_NAME)">
                                                        <b-nav-item  :class="$route.params.type==sortedData.CATEGORY_NAME?'active':''" :key="sortedData.CATEGORY_NAME"  :href="`#/create/workflowlist/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${sortedData.CATEGORY_NAME}`">{{sortedData.CATEGORY_NAME.replace("Workflows",'')}}</b-nav-item>  
                                                    </template>                                                   
                                                </template>
                                            </b-tabs>                                                                                                                            
                                        </ul>
                                    </div>                                          
                                </div>                               
                            </template>
                        </appup-card>
                    </div>
                    <div class="col-md-10">
                        <appup-card ref='triggers' id="2" label="ID" :preload="$route.params.type?'preload_grid_workflow_type':'preload_grid'">                                 
                            <template slot="section" slot-scope="{ sortedData }">  
                                <section class="block">
                                    <div class="row">
                                        <div class="col-sm-6">                                                            
                                            <div class="title">                                               
                                                <h4 class="mt-2">{{$route.params.type}}</h4>                    
                                            </div>                                                    
                                        </div>
                                        <div class="col-sm-6">
                                            <nav class="navbar navbar-light float-right mb-4">
                                                <form class="form-inline search">
                                                    <input class="form-control" type="search" placeholder="SEARCH WORKFLOWS" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" />
                                                    <label></label>
                                                    <!-- <b-button :href="`#/create-plugin/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button> -->
                                                </form>
                                            </nav>
                                        </div> 
                                    </div>  
                            
                                    <div class="row">                                                                        
                                        <template v-for="(item, index) in sortedData">                                                  
                                            <div class="col-lg-4 col-md-6" :key="index">                                                                                                              
                                                <div class="trigger more-dropdown">
                                                    <div class="trigger-title clearfix">
                                                        <div>  
                                                            <div>
                                                            <span class="icon-workflows icon workflow"></span> 
                                                            </div>                                                         
                                                            <h4 class="mb-2">{{item.NAME}}</h4> 
                                                            <p class="overflow" :title="item.DESCRIPTION">{{item.DESCRIPTION}}</p>
                                                            <!-- <div><a class="btn go-button" :href="`#/create/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`">Go</a></div>   -->
                                                            <div><a class="btn go-button" :href="`#/edit/workflow/go/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">Go</a></div>                                                  
                                                        </div>                                                                                      
                                                    </div>                                               
                                                </div>  
                                            </div>
                                        </template> 
                                    </div>
                                </section>
                            </template>
                        </appup-card>
                    </div>                                  
                </div>  
            </div>
         </div>
    </b-modal>
  </div>
</template>


<script>
// Import components and libraries

import AppupHeader from "./AppupHeader.vue";
import AppupFooter from "./Appupfooter.vue";
import Navbar from "./Navbar.vue";

var renderedObj = {};
// Export components
export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {     
        modalShow: true
    };
  },
  computed: {},
  methods: {
    clearRender: function() {
      renderedObj = {};
      return true;
    },
    isObjectRendered: function(key) {
      if (
        typeof renderedObj[key] == undefined ||
        typeof renderedObj[key] == "undefined"
      ) {
        renderedObj[key] = "test";
        return false;
      }

      return true;
    }
  }
};
</script>