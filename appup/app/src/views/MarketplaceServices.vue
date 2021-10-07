<template>
    <div>
        <div class="page-wrapper dashboard">
            
            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title float-left pb-3">
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Service Powered market place</h1>
                          <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb" class="breadcrumbs">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>                                
                                <li class="breadcrumb-item active" aria-current="page"><a href="#">Get Apps</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end-->
                    </div> 
                 
                    <div class="clearfix"></div>                   
                    <div class="clearfix marketplace">
                       <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid">
                            <template slot="category-header" slot-scope="{ sort_key,items }">
                                               
                        </template>
                            <template slot="card" slot-scope="{ items }">               
                                <div class="row">
                                    <template v-for="(item, index) in items">                                                  
                                        <div class="col-xl-2 col-lg-4 col-md-4 pt-3" :key="index">
                                            <div class="service">
                                                <div class="service-image pt-3 text-center mb-3">                                                    
                                                    <p>LOGO</p>
                                                </div>
                                                    <div class="description">
                                                    <h4><a href="#" >{{item.app_name}}</a></h4>
                                                    <p class="author-name">by {{item.first_name}}</p>
                                                    <p class="service-description">{{item.description}}</p>
                                                    <!-- Star start -->
                                                    <div class="stars">
                                                        <span class="icon-star1 star">
                                                            <span class="path1"></span><span class="path2"></span>
                                                        </span>
                                                        <span class="icon-star1 star">
                                                            <span class="path1"></span><span class="path2"></span>
                                                        </span>
                                                        <span class="icon-star1 star">
                                                            <span class="path1"></span><span class="path2"></span>
                                                        </span>
                                                        <span class="icon-star1 star">
                                                            <span class="path1"></span><span class="path2"></span>
                                                        </span>
                                                        <span class="icon-star2 star">
                                                            <span class="path1"></span><span class="path2"></span>
                                                        </span>
                                                    </div>
                                                    <!-- Star end -->
                                                    <p class="cost mb-1">{{item.price}}</p>
                                                    <a class="small-text" :href="`#/marketplaceapp/usercloud/${item.id}`">Get App</a>
                                                    </div>
                                            </div>
                                        </div> 
                                    </template>                           
                                </div>  
                            </template>
                        </appup-card>                                  
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