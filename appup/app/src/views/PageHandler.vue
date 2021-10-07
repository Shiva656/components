<template>
    <div>
        <div class="page-wrapper plugins">
            
            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix"> 
                    <div class="page-title clearfix">

                        <div class="float-left">
                            <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                            <h1>Page handler</h1>

                            <!-- Breadcrumbs start -->
                            <nav aria-label="breadcrumb" class="breadcrumbs">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                     <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                    <li class="breadcrumb-item active" aria-current="page"><a href="#">Pages</a></li>
                                </ol>
                            </nav>
                            <!-- Breadcrumbs end-->
                            
                        </div>

                        <!-- Frontend and Backend dropdowns start -->
                        <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
                            <div class="btn-group filter">
                                <div class="dropdown float-right first">
                                    <b-dropdown id="ddown1" text="Backend">
                                        <b-dropdown-item :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`">Triggers</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`">Workflows</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`">Plugins</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`">Filters</b-dropdown-item>
                                        <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/publish`">Publish</b-dropdown-item>
                                    </b-dropdown>                                     
                                </div>
                            </div>
                            <div class="btn-group filter second">
                                <div class="dropdown float-right">
                                    <b-dropdown id="ddown2" text="Frontend">
                                        <b-dropdown-item  :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                    </b-dropdown>                                     
                                </div>
                            </div>                       
                        </div>
                        <!-- Frontend and Backend dropdowns end -->

                    </div> 
                    <section class="block triggers-block">
                        <nav class="navbar navbar-light float-right mb-3">
                            <form class="form-inline search">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search page" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                <b-button :href="`#/app/pages/create/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${$route.params.id}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Page handler</b-button>
                            </form>
                        </nav>  
                        <!-- Appup card start -->
                        <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid_handler"  >
                            <!-- Slot for sorted key -->
                            <template slot="category-header" slot-scope="{ sort_key }">
                                <div class="clearfix">
                                    <div class="title float-left"> 
                                        <h4>{{sort_key}}</h4>
                                    </div>
                                    <!-- <nav class="navbar navbar-light float-right">
                                        <form class="form-inline search">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search page" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                            <b-button :href="`#/app/pages/create/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${$route.params.id}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button>
                                        </form>
                                    </nav> -->
                                </div>
                            </template>

                            <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                            
                            <!-- <template slot="card" slot-scope="{ items }">                
                                <div class="row">
                                    <template v-for="(item, index) in items">                            
                                        <div class="col-lg-4 col-md-6" :key="index">
                                            <div class="trigger more-dropdown">
                                                <div class="trigger-title clearfix">
                                                    <div class="float-left">                                                
                                                    <h4>{{item.NAME}}</h4>                                           
                                                    </div>
                                                  
                                                    <template>
                                                        <div class="dropdown float-right">
                                                            <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                <b-dropdown-item :href="`#/edit/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">Edit</b-dropdown-item>
                                                                <b-dropdown-item @click="_trigger('triggers', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                            </b-dropdown>
                                                        </div> 
                                                    </template>
                                                </div>
                                                <div class="trigger-content">
                                                    <template v-if="item.EVENT_SUBJECT">
                                                        <p>{{item.EVENT_SUBJECT}}</p>
                                                    </template>
                                                    <template v-if="item.CREATE_DATE">
                                                        <p>Created on {{item.CREATE_DATE}}</p>
                                                    </template>
                                                    <template v-if="item.CREATED_BY">
                                                        <p>Created by {{item.CREATED_BY}}</p>
                                                    </template>
                                                    <template v-if="item.UPDATE_DATE">
                                                        <p>Last upated on {{item.UPDATE_DATE}}</p> 
                                                    </template>                                            
                                                </div>
                                            </div>
                                        </div>                                        
                                    </template>
                                </div>                    
                            </template> -->


                            <template slot="section" slot-scope="{ sortedData }">
                                
                
                                <div class=clearfix></div>  

                                <div class="sub-block">
                                    <div class="element-block">             
                                        <div class="row">
                                            <div class="col-md-12">
                                                <!-- Appup table start -->
                                                <div class="appup_table">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>      
                                                                <th scope="col">Name</th>
                                                                <th scope="col">TRIGGER_NAME</th> 
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in sortedData" :key="index">
                                                                <td scope="row">{{index+1}}</td>
                                                                <td scope="row">{{item.NAME}}</td>
                                                                <td scope="row">{{item.TRIGGER_NAME}}</td>
                                                                <td scope="row">
                                                                   <a :href="`#/edit/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`" class="more">Edit</a>
                                                                   <a @click="_trigger('triggers', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})" class="more delete-handler"> Delete</a>

                                                                </td>                                                
                                                            </tr>
                                                        </tbody>                                       
                                                    </table> 
                                                </div>
                                                <!-- Appup table end -->
                                            </div>                                                                  
                                        </div> 
                                    </div>
                                </div>                   
                            </template>
                        </appup-card> 
                        <!-- Appup card end -->          
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