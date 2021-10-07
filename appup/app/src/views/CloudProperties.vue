<template>
    <div>
        <div class="page-wrapper plugins">

            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title float-left mb-5">
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Cloud Properties</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                 <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Cloud Properties</a></li>
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
                                </b-dropdown>                                     
                            </div>
                        </div>                       
                    </div>
                    <!-- Frontend and Backend dropdowns end -->

                    <div class="clearfix"></div>
                    <div class="row">

                        
                        <!-- Plugin Sidebar end -->

                        <div class="col-md-12">                            
                            <section class="block clearfix plugins-block no-margin">
                                <div class="row">
                                    <div class="col-sm-12">   
                                        <nav class="navbar navbar-light float-right mb-3">
                                            <form class="form-inline search">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search Properties" aria-label="Search"  @keyup="_trigger('appproperties', 'search', `${$event.target.value}`, 'KEY')" /><label></label>
                                           <b-button :href="`#/create-cloud-prop/${$route.params.cloudId}/0/${$route.params.entity}/`" class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Properties</b-button>   
                                            </form>
                                        </nav> 
                                    </div>
                                </div>        
                                <appup-card ref='appproperties' id="1" label="ID" :actions="actions" preload="preload_grid"  >
                                    <!-- Slot for sorted key -->
                                    <template slot="category-header" slot-scope="{ sort_key }">
                                        <div class="clearfix">
                                            <div class="title float-left"> 
                                                <h4>{{sort_key}}</h4>
                                            </div>
                                           
                                        </div>                                   
                                    </template>

                                    <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                                    
                                    <template slot="section" slot-scope="{ sortedData }">                
                                        <div class="row">
                                                                                       
                                                <div class="col-lg-12" :key="index">
                                                   <div class="appup_table">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <!-- <th scope="col">ID</th> -->
                                                                <th scope="col">KEY</th>      
                                                                <th scope="col">VALUE</th>                                                                
                                                                <th scope="col">ACTIONS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in sortedData" :key="index">
                                                                <!-- <td scope="row">{{item.ID}}</td> -->
                                                                <td scope="row">{{item.KEY}}</td>                                                               
                                                                <td scope="row">{{item.VALUE}}</td>  
                                                                <td scope="row">
                                                                <a :href="`#/edit-cloud-prop/${$route.params.cloudId}/${$route.params.entity}/${item.ID}`" class="more"> Edit</a>
                                                                <a href="#" @click.prevent="_trigger('appproperties', 'exec', 'prop_grid_delete', {'key': `${item.ID}`, 'keytwo': `Cloud Properties`,'entity': `${$route.params.entity}`})" class="more delete-handler"> Delete</a>
                                                                </td>                                                 
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
     
    };
  },
  computed: {},
  methods: {}
};
</script>