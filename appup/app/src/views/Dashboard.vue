<template>
    <div>
        <div class="page-wrapper dashboard">

            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title clearfix">
                        <div class="float-left">
                            <h1>{{$route.params.entity}}</h1>

                            <!-- Breadcrumbs start -->
                            <nav aria-label="breadcrumb" class="breadcrumbs">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                </ol>
                            </nav>
                            <!-- Breadcrumbs end -->

                        </div>                  
                        <div class="float-right new-app">
                            <!-- Search start -->
                            <form class="form-inline search">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search Apps" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" />
                                <label></label>
                                <b-button :href="`#/create/clouds`"  class="float-right" variant="warning text-white"><span class="icon-new-app"></span>New App {{$route.params.entity}}</b-button>
                            </form>  
                            <!-- Search end -->
                            
                            <!-- Example of delete modal dialog
                            <button @click="_trigger('triggers', 'exec', 'delete-modal')">Show modal</button>
                            -->

                        </div>
                    </div> 
                   
                    <!-- Appup card start -->
                    <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid_dashboard">
            
                        <!-- Slot for sorted key -->
                        <template slot="category-header" slot-scope="{ sort_key,items }">
                            <div class="title-apps">
                                <span class="circle green-circle"></span>
                                <h4 class="pr-2 pl-2">{{sort_key}}</h4>
                                <kbd>{{items[0].URL}}</kbd>
                                <div class="dropdown float-right">
                                    <b-dropdown id="ddown1" text="..." class="m-md-2">
                                        <b-dropdown-item :href="`#/home/edit/${$route.params.entity}/${items[0].CLOUD_ID}`">Settings</b-dropdown-item>
                                        <b-dropdown-item :href="`#/cloudprop/${items[0].CLOUD_ID}/CloudProperties`">Properties</b-dropdown-item>
                                        <!-- <b-dropdown-item :href="`#/home/cloud/stage/${items[0].CLOUD_ID}`">Publish</b-dropdown-item> -->
                                    </b-dropdown>                                     
                                </div>
                            </div>                        
                        </template>

                        
                        <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->                
                        
                        <template slot="card" slot-scope="{ items }" > 
                            <div class="apps">                   
                                <div class="row">

                                    <template v-for="(item, index) in items" v-if="item.ID">                                        
                                        <div class="col-xl-2 col-lg-4 col-md-4 appup_image" :key="index">
                                            
                                            <a class="underline-none" :href="`#/app/dev/${item.CLOUD_ID}/${item.ID}/developers`">
                                                <div class="app workplace">
                                                    <div class="app-image pt-3">
                                                        <template v-if="item.LOGO_URL && item.LOGO_URL!='null'">
                                                            <img src="item.LOGO_URL" />
                                                        </template>
                                                        <template v-else>
                                                            <img src="../styles/scss/images/cloud.png" height="60" alt="/">
                                                        </template>

                                                        <!-- App hover text start  -->
                                                        <div class="hover">
                                                            <div class="title-apps">
                                                            <div class="dropdown float-right">
                                                            <b-dropdown id="ddown1" text="..." class="outline-more app-overflow-menu">
                                                                <b-dropdown-item :href="`#/home/edit/app/${items[0].CLOUD_NAME}/${item.ID}`">Edit</b-dropdown-item>
                                                                <b-dropdown-item @click="_trigger('triggers', 'exec', 'grid_delete_app', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                <b-dropdown-item @click="_trigger('triggers', 'exec', 'duplicate-app', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Duplicate</b-dropdown-item>
                                                                <b-dropdown-item :href="`#/home/share/selectsharecloud/${items[0].CLOUD_NAME}/${item.ID}`">Share</b-dropdown-item>
                                                                <b-dropdown-item :href="`#/home/user/${items[0].CLOUD_NAME}/${item.ID}/${$route.params.entity}`">Copy</b-dropdown-item>
                                                                <b-dropdown-item :href="`#/application/${items[0].CLOUD_ID}/${item.ID}/ApplicationProperties`">Properties</b-dropdown-item>
                                                                <b-dropdown-item :href="`#/home/user/${items[0].CLOUD_ID}/${item.ID}/publishapp`">Add To App Store</b-dropdown-item>
                                                                <b-dropdown-item :href="`#/home/sql-query/${items[0].CLOUD_ID}/${item.ID}`">Version</b-dropdown-item>

                                                                <!-- <b-dropdown-item @click="_trigger('triggers', 'exec', 'copy-app', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`, 'cloudId': `${item.CLOUD_ID}`})">Copy</b-dropdown-item> -->
                                                            </b-dropdown>
                                                            </div> 
                                                            </div>
                                                            <!-- Star start -->
                                                            <!-- <div class="stars">
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
                                                            </div> -->
                                                            <!-- Star end -->
                                                        
                                                        </div>
                                                        <!-- App hover text end -->

                                                    </div>
                                                    <div class="description">
                                                        <h4><a :href="`#/app/dev/${item.CLOUD_ID}/${item.ID}/developers`" >{{item.NAME}}</a></h4>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>                                  
                                    </template>

                                    <template v-if="items[0]">                                        
                                        <div class="col-xl-2 col-lg-4 col-md-4" :key="index">
                                            <div class="app new-app">
                                                <a :href="`#/dashboard/app/createapp/${items[0].CLOUD_NAME}/${items[0].CLOUD_ID}`" >
                                                    <div class="app-image">
                                                        <span>+</span>
                                                    </div>
                                                    <div class="description">
                                                        <h4>Add one more app</h4>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>                                                  
                                    </template>

                                </div>   
                            </div>                     
                        </template>                
                    </appup-card>
                    <!-- Appup card end -->
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
    name: "Dashboard",
    components: {
        AppupHeader,
        Navbar,
        AppupFooter
    },
   data: {
   },
    computed: {},
    methods: {}
};
</script>
<style>
.app-overflow-menu .dropdown-item {
    font-size: 13.5px;
}
</style>
