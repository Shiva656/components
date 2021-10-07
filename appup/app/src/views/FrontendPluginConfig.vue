<template>
 <div> 
          <div class="page-wrapper developers">
              <!-- Header start -->
              <Navbar />
              <!-- Header end -->

              <!-- Page content start -->
              <div class="page-content">
                  <div class="container clearfix">
                       <div class="page-title float-left mb-5">
                             <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                             <h1>Mobile Plugins</h1>
                             <!-- Breadcrumbs start -->
                            <nav aria-label="breadcrumb">
                              <ol class="breadcrumb">
                                 <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Mobile Plugins</a></li>
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
                                    <b-dropdown-item :href="`#`">Mobile Plugins</b-dropdown-item>
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
                                <div class="clearfix">
                                    <!-- Search start -->
                                    <nav class="navbar navbar-light float-right mb-3">
                                        <form class="form-inline search">
                                            <input class="form-control mr-sm-2" type="search" placeholder="SEARCH PLUGINS" aria-label="Search"  @keyup="_trigger('pluginconfig', 'search', `${$event.target.value}`, 'CONFIG_NAME')" /><label></label>
                                           <!-- Need to change -->
                                            <b-button :href="`#/app/mobilepluginslist/${$route.params.cloudId}/${$route.params.appId}/mobileplugins`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Plugins</b-button>
                                        </form>
                                    </nav>
                                    <!-- Search end -->
                                </div>
                                <appup-card ref='pluginconfig' id="1" label="ID" :actions="actions" preload="preload_grid" >
                                    <!-- Slot for sorted key -->
                                    <template slot="category-header" slot-scope="{ sort_key }">
                                        <div class="clearfix">
                                            <div class="title float-left"> 
                                                <h4>{{sort_key}}</h4>
                                            </div>
                                            <nav class="navbar navbar-light float-lg-right float-sm-left mb-sm-3">
                                                <form class="form-inline search">
                                                    <input class="form-control mr-sm-2" type="search" placeholder="SEARCH PLUGINS" aria-label="Search"  @keyup="_trigger('pluginconfig', 'search', `${$event.target.value}`, 'NAME')" />
                                                    <label></label>
                                                    <b-button :href="`#/create-plugin/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button>
                                                </form>
                                            </nav>
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
                                                                <th scope="col">#</th>      
                                                                <th scope="col">Name</th>                                                                
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in sortedData" :key="index">
                                                                <td scope="row">{{index+1}}</td>
                                                                <td scope="row">{{item.CONFIG_NAME}}</td>                                                               
                                                                <td scope="row">
                                                                <a :href="`#/edit/plugin/${item.PLUGIN_ID}/config/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`" class="more"> Edit</a>
                                                                <a href="#" @click.prevent="_trigger('pluginconfig', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})" class="more delete-handler"> Delete</a></td>                                                
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
              </div>
              <!-- Page content end -->
          </div>
    <AppupFooter/>
 </div>
</template>
<script>
  
  //Import components and libraries.
  import AppupFooter from "./Appupfooter.vue"
  import Navbar from "./Navbar.vue"

  //Export Components
  export default{
      components:{
          AppupFooter,
          Navbar
      },
      data(){
          return {
          };
      },
      computed:{},
      methods:{}
  }
</script>