<template>
    <div>
        <div class="page-wrapper plugins">

           <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title float-left">
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Mobile Market Place</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                 <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Plugins</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs start -->

                    </div> 

                    <!-- Frontend and Backend dropdowns start -->
                    <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
                        <div class="btn-group filter">
                            <div class="dropdown float-right first">
                                <b-dropdown id="ddown1" text="Backend">
                                    <b-dropdown-item  :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`">Plugins</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`">Triggers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`">Workflows</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`">Filters</b-dropdown-item>
                                    <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/publish`">Publish</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>
                        <div class="btn-group filter second">
                            <div class="dropdown float-right">
                                <b-dropdown id="ddown2" text="Frontend">
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                    <b-dropdown-item :href="`#`">Mobile Plugins</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>                       
                    </div>
                    <!-- Frontend and Backend dropdowns end -->

                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-md-12">                            
                            <div class="plugins-block">                                                                          
                                <div class="row">
                                    <div class="col-md-3">
                                        <appup-card ref='triggers' id="1" label="ID" preload="preload_grid">                                 
                                            <template slot="section" slot-scope="{ sortedData }">  
                                                <section class="block">
                                                    <div class="clearfix">
                                                        <div class="title float-left"> 
                                                            <ul class="categories-list">                                                                
                                                                <li :class="$route.params.type?'':'active'"><a :href="`#/app/pluginlist/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`">All</a></li>
                                                                <template v-if="clearRender()"></template>
                                                                <template v-for="sortedData in sortedData">
                                                                    <template v-if="!isObjectRendered(sortedData.PLUGIN_CATEGORY)">
                                                                        <li :class="$route.params.type==sortedData.PLUGIN_CATEGORY?'active':''" :key="sortedData.PLUGIN_CATEGORY"><a :href="`#/app/pluginlist/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${sortedData.PLUGIN_CATEGORY}`">{{sortedData.PLUGIN_CATEGORY}}</a></li> 
                                                                    </template>
                                                                </template>                                                              
                                                            </ul>
                                                        </div>                                          
                                                    </div>
                                                </section>
                                            </template>
                                        </appup-card>
                                    </div>
                                    <div class="col-md-9">
                                        <appup-card ref='triggers' id="1" label="ID" :preload="$route.params.type?'preload_grid_plugin_type':'preload_grid'">                                 
                                            <template slot="section" slot-scope="{ sortedData }">  
                                                <section class="block">
                                                    <div class="row">
                                                        <div class="col-sm-6">                                                            
                                                            <div class="title">
                                                                <template v-if="$route.params.type==sortedData.PLUGIN_CATEGORY?'sortedData.PLUGIN_CATEGORY':''"> 
                                                                    <h4 class="mt-2">All</h4>                                                              
                                                                </template>
                                                                <template v-else>
                                                                    <h4 class="mt-2">{{$route.params.type}}</h4>
                                                                </template>                                                                
                                                            </div>                                                    
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <nav class="navbar navbar-light float-right mb-4">
                                                                <form class="form-inline search">
                                                                    <input class="form-control" type="search" placeholder="SEARCH PLUGINS" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" />
                                                                    <label></label>
                                                                    <!-- <b-button :href="`#/create-plugin/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button> -->
                                                                </form>
                                                            </nav>
                                                        </div> 
                                                    </div>  
                                            
                                                    <div class="row">                                                                        
                                                        <template v-for="(item, index) in sortedData">                                                  
                                                            <div class="col-md-6 col-sm-12" :key="index">
                                                                <div class="plugin installed">
                                                                    <div class="plugin_content">
                                                                        <!-- <span class="icon-check"></span> -->
                                                                        <div class="clearfix plugin-image">
                                                                            <img class="float-left" :src="item.PLUGIN_LOGO_URL?item.PLUGIN_LOGO_URL:'../styles/scss/images/oracle.png'" >
                                                                            <!-- <a class="more float-right" :href="`#/edit/plugin/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">...</a> -->
                                                                        </div>                                                    
                                                                        <div class="title clearfix">
                                                                            <h4 class="float-md-left float-sm-none">{{item.NAME}}</h4>                                                           
                                                                            <!-- <div class="active-installations float-md-right float-sm-none">Active installations: <span>32</span></div> -->
                                                                        </div>
                                                                        <p v-if="item.PLUGIN_DESCRIPTION">{{item.PLUGIN_DESCRIPTION}}</p>
                                                                        <div class="voting">
                                                                            <div class="stars">
                                                                                <span class="icon-star1"></span>
                                                                                <span class="icon-star1"></span>
                                                                                <span class="icon-star1"></span>
                                                                                <span class="icon-star1"></span>
                                                                                <span class="icon-star2"></span>
                                                                            </div>
                                                                            <span>(43)</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="control delete text-center">
                                                                        <a :href="`#/edit/mobileplugin/${$route.params.cloudId}/${$route.params.appId}/mobile_install_plugins/${item.ID}`" >Install Plugin</a>
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
      actions: [
        {
          label: "Edit",
          title: "click to Edit",
          action: "edit",
          modal: "viewModal"
        },
        {
          label: "Delete",
          title: "click to Delete",
          action: "delete",
          url: ":/employee/edit"
        }
      ]
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
