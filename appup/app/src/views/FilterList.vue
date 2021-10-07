<template>
    <div>
        <div class="page-wrapper triggers-rest">

            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title float-left">
                        <!-- Route to create new filter -->
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Filters</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                 <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Filter</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end -->

                    </div> 
                    <!-- Frontend and Backend dropdowns start -->
                    <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
                        <div class="btn-group filter">
                            <div class="dropdown float-right first">
                                <b-dropdown id="ddown1" text="Backend">
                                    <b-dropdown-item  :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`">Filters</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`">Triggers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`">Workflows</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`">Plugins</b-dropdown-item>
                                    <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`">Publish</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>
                        <div class="btn-group filter second">
                            <div class="dropdown float-right">
                                <b-dropdown id="ddown2" text="Frontend">
                                    <b-dropdown-item :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`">Category</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>                       
                    </div>
                    <!-- Frontend and Backend dropdowns end -->

                    <!-- Tab for pre filter and post filter start-->
                    
                    <div class="tab-menu">
                        <b-tabs>                            
                            <b-tab title="PreFilter">
                                 <!-- Card Component start -->
                                <section class="block triggers-block">
                                    <nav class="navbar navbar-light float-right mb-3">
                                        <form class="form-inline search">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search filter" aria-label="Search"  @keyup="_trigger('triggers_pre', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                            <b-button :href="`#/create/new/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`" class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Filter</b-button>        
                                        </form>
                                    </nav>           
                                    <appup-card ref='triggers_pre' id="1" label="ID" :actions="actions" preload="preload_grid_prefilter"  >
                                        <!-- Slot for sorted key -->
                                        <template slot="category-header" slot-scope="{ sort_key }">
                                            <div class="clearfix">
                                                <div class="title float-left"> 
                                                    <h4>{{sort_key}}</h4>
                                                </div>                                    
                                            </div>
                                        </template>

                                        <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                                        <!-- Content for card -->
                                        <template slot="card" slot-scope="{ items }">                
                                            <div class="row">
                                                <template v-for="(item, index) in items">                                                  
                                                    <div class="col-lg-4 col-md-6" :key="index">
                                                         <template v-if="item.IS_WRITABLE == 1">
                                                        <a class="underline-none" :href="`#/edit/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">
                                                            <div class="trigger more-dropdown">
                                                                <div class="trigger-title clearfix">
                                                                    <div class="float-left">                                                            
                                                                        <h4>{{item.NAME}}</h4>                                                        
                                                                    </div>
                                                                    <template>
                                                                        <div class="dropdown float-right">
                                                                            <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                                <b-dropdown-item :href="`#/edit/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">Edit</b-dropdown-item>
                                                                                <b-dropdown-item @click="_trigger('triggers_pre', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                            </b-dropdown>
                                                                        </div>
                                                                    </template>            
                                                                </div>
                                                                <div class="trigger-content">
                                                                    <template v-if="item.FILTER_NAME">                                                           
                                                                    <h6>{{item.NAME}}</h6>
                                                                    </template>                                          
                                                                    <template v-if="item.EXPRESSIONS">
                                                                        <p> {{item.EXPRESSIONS}}</p>
                                                                    </template>
                                                                    <template v-if="item.CREATED_BY">
                                                                        <p>Created by {{item.CREATED_BY}}</p>
                                                                    </template>
                                                                    <template v-if="item.UPDATE_DATE">
                                                                        <p>Last upated on {{item.UPDATE_DATE}}</p> 
                                                                    </template>                                            
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </template>     
                                                           <template v-if="item.IS_WRITABLE != 1">
                                                        <a class="underline-none" :href="`#/editType/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`">
                                                            <div class="trigger more-dropdown">
                                                                <div class="trigger-title clearfix">
                                                                    <div class="float-left">                                                            
                                                                        <h4>{{item.NAME}}</h4>                                                        
                                                                    </div>
                                                                    <template>
                                                                        <div class="dropdown float-right">
                                                                            <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                                <b-dropdown-item :href="`#/editType/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`">Edit</b-dropdown-item>
                                                                                <b-dropdown-item @click="_trigger('triggers_pre', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                            </b-dropdown>
                                                                        </div>
                                                                    </template>            
                                                                </div>
                                                                <div class="trigger-content">
                                                                    <template v-if="item.FILTER_NAME">                                                           
                                                                    <h6>{{item.NAME}}</h6>
                                                                    </template>                                          
                                                                    <template v-if="item.EXPRESSIONS">
                                                                        <p> {{item.EXPRESSIONS}}</p>
                                                                    </template>
                                                                    <template v-if="item.CREATED_BY">
                                                                        <p>Created by {{item.CREATED_BY}}</p>
                                                                    </template>
                                                                    <template v-if="item.UPDATE_DATE">
                                                                        <p>Last upated on {{item.UPDATE_DATE}}</p> 
                                                                    </template>                                            
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </template> 
                                                    </div>
                                                </template>                                    
                                            </div>                    
                                        </template>
                                        
                                    </appup-card>           
                                </section>
                                <!-- Card Component end -->
                            </b-tab>
                            <b-tab title="PostFilter">
                                  <!-- Card Component start -->
                                <section class="block triggers-block">
                                    <nav class="navbar navbar-light float-right mb-3">
                                        <form class="form-inline search">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search filter" aria-label="Search"  @keyup="_trigger('triggers_post', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                            <b-button :href="`#/create/new/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`" class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Filter</b-button>        
                                        </form>
                                    </nav>           
                                    <appup-card ref='triggers_post' id="1" label="ID" :actions="actions" preload="preload_grid_postfilter"  >
                                        <!-- Slot for sorted key -->
                                        <template slot="category-header" slot-scope="{ sort_key }">
                                            <div class="clearfix">
                                                <div class="title float-left"> 
                                                    <h4>{{sort_key}}</h4>
                                                </div>                                    
                                            </div>
                                        </template>

                                        <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                                        <!-- Content for card -->
                                        <template slot="card" slot-scope="{ items }">                
                                            <div class="row">
                                                <template v-for="(item, index) in items">                                                  
                                                    <div class="col-lg-4 col-md-6" :key="index">
                                                        <template v-if="item.IS_WRITABLE == 1">
                                                        <a class="underline-none" :href="`#/edit/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">
                                                            <div class="trigger more-dropdown">
                                                                <div class="trigger-title clearfix">
                                                                    <div class="float-left">                                                            
                                                                        <h4>{{item.NAME}}</h4>                                                        
                                                                    </div>
                                                                    <template>
                                                                        <div class="dropdown float-right">
                                                                            <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                                <b-dropdown-item :href="`#/edit/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">Edit</b-dropdown-item>
                                                                                <b-dropdown-item @click="_trigger('triggers_post', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                            </b-dropdown>
                                                                        </div>
                                                                    </template>            
                                                                </div>
                                                                <div class="trigger-content">
                                                                    <template v-if="item.FILTER_NAME">                                                           
                                                                    <h6>{{item.NAME}}</h6>
                                                                    </template>                                          
                                                                    <template v-if="item.EXPRESSIONS">
                                                                        <p> {{item.EXPRESSIONS}}</p>
                                                                    </template>
                                                                    <template v-if="item.CREATED_BY">
                                                                        <p>Created by {{item.CREATED_BY}}</p>
                                                                    </template>
                                                                    <template v-if="item.UPDATE_DATE">
                                                                        <p>Last upated on {{item.UPDATE_DATE}}</p> 
                                                                    </template>                                            
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </template>
                                                        <template v-if="item.IS_WRITABLE != 1">
                                                        <a class="underline-none" :href="`#/editType/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`">
                                                            <div class="trigger more-dropdown">
                                                                <div class="trigger-title clearfix">
                                                                    <div class="float-left">                                                            
                                                                        <h4>{{item.NAME}}</h4>                                                        
                                                                    </div>
                                                                    <template>
                                                                        <div class="dropdown float-right">
                                                                            <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                                <b-dropdown-item :href="`#/editType/filter/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`">Edit</b-dropdown-item>
                                                                                <b-dropdown-item @click="_trigger('triggers_post', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                            </b-dropdown>
                                                                        </div>
                                                                    </template>            
                                                                </div>
                                                                <div class="trigger-content">
                                                                    <template v-if="item.FILTER_NAME">                                                           
                                                                    <h6>{{item.NAME}}</h6>
                                                                    </template>                                          
                                                                    <template v-if="item.EXPRESSIONS">
                                                                        <p> {{item.EXPRESSIONS}}</p>
                                                                    </template>
                                                                    <template v-if="item.CREATED_BY">
                                                                        <p>Created by {{item.CREATED_BY}}</p>
                                                                    </template>
                                                                    <template v-if="item.UPDATE_DATE">
                                                                        <p>Last upated on {{item.UPDATE_DATE}}</p> 
                                                                    </template>                                            
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </template>
                                                    </div>
                                                </template>                                    
                                            </div>                    
                                        </template>
                                        
                                    </appup-card>           
                                </section>
                                <!-- Card Component end -->

                            </b-tab>
                        </b-tabs>
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