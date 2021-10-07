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
                        <h1>Plugins</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                 <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Plugins</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end -->

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
                                    <b-dropdown-item :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>                       
                    </div>
                    <!-- Frontend and Backend dropdowns end -->

                    <div class="clearfix"></div>
                    <div class="row">

                        <!-- Plugins start -->
                        <div class="col-md-3 col-xs-12">
                            <section class="block clearfix categories">
                                <h3>Categories</h3>
                                <ul class="categories-list">
                                    <li><a href="#">All</a></li>
                                    <li><a href="#">Analytics</a></li>
                                    <li class="active"><a href="#">Databases</a></li>
                                    <li><a href="#">Data Processing</a></li>
                                    <li><a href="#">Developer Tools</a></li>
                                    <li><a href="#">Event Servers</a></li>
                                    <li><a href="#">Mail Servers</a></li>
                                    <li><a href="#">Management Tools</a></li>
                                    <li><a href="#">Monitoring</a></li>
                                    <li><a href="#">Networking</a></li>
                                    <li><a href="#">Security</a></li>
                                    <li><a href="#">Storage</a></li>
                                    <li><a href="#">Oauth Servers</a></li>
                                    <li><a href="#">Identity Servers</a></li>
                                    <li><a href="#">Code</a></li>
                                </ul>
                            </section>
                        </div>
                        <!-- Plugins end -->
                        <div class="col-md-9 col-xs-12">
                            <section class="block clearfix plugins-block">           
                                <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid"  >
                                    <!-- Slot for sorted key -->
                                    <template slot="category-header" slot-scope="{ sort_key }">
                                        <div class="clearfix">
                                            <div class="title float-left"> 
                                                <h4>{{sort_key}}</h4>
                                            </div>
                                            <!-- Search start -->
                                            <nav class="navbar navbar-light float-lg-right float-sm-left mb-sm-3">
                                                <form class="form-inline search">
                                                    <input class="form-control mr-sm-2" type="search" placeholder="SEARCH PLUGINS" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'CONFIG_NAME')" />
                                                    <label></label>
                                                    <b-button :href="`#/create-plugin/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button>
                                                </form>
                                            </nav>
                                            <!-- Search end -->
                                        </div>                                   
                                    </template>

                                    <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                                    
                                    <template slot="section" slot-scope="{ sortedData }">                
                                        <div class="row">
                                            <template v-for="(item, index) in sortedData">                                                  
                                                <div class="col-lg-6 col-sm-12" :key="index">
                                                    <div class="plugin installed">
                                                        <!-- <span class="icon-check"></span> -->
                                                        <div class="clearfix">
                                                            <img class="float-left" src="../styles/scss/images/oracle.png">
                                                            <a class="more float-right" :href="`#/edit/plugin/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">...</a>
                                                        </div>                                                    
                                                        <div class="title clearfix">
                                                            <h4 class="float-md-left float-sm-none">{{item.NAME}}</h4>
                                                            <template v-if="item.EXPRESSION">
                                                                <p>{{item.EXPRESSION}}</p>
                                                            </template> 
                                                            <template v-if="item.EVENT_SUBJECT">
                                                                <p>{{item.EVENT_SUBJECT}}</p>
                                                            </template> 
                                                            <!-- <div class="active-installations float-md-right float-sm-none">Active installations: <span>32</span></div> -->
                                                        </div>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris…</p>
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
                                                        <div class="control delete text-center">
                                                            <a href="#">Install Plugin</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>                                    
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
  methods: {}
};
</script>