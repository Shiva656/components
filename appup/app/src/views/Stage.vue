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
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Publish</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" aria-current="page"><a href="/#/home/cloud">Cloud</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Publish</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end -->
                    </div>                  
                    <section class="block triggers-block"> 
                        <!-- Search navbar start -->
                        <nav class="navbar navbar-light float-right mb-3">
                            <form class="form-inline search">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                <b-button :href="`#/home/cloud/create/${$route.params.entity}/${$route.params.id}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button>
                            </form>
                        </nav>
                        <div class="clearfix"></div>
                        <!-- Search navbar end -->          
                        <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid"  >
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
                                                                <th scope="col">URL</th> 
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in sortedData" :key="index">
                                                                <td scope="row">{{index+1}}</td>
                                                                <td scope="row">{{item.NAME}}</td>
                                                                <td scope="row">{{item.NAME}}.{{item.CLOUD_ID}}.appup.cloud</td>
                                                                <td scope="row"><a :href="`#/edit/${$route.params.entity}/${item.ID}`" class="more">Edit</a></td>                                                
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