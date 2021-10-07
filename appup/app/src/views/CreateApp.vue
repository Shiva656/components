<template>
    <div>
        <div class="page-wrapper">
            
            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title clearfix">
                        <div class="float-left">
                            <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                            <h1>Add App</h1>
                        </div>               
                    </div> 
                    
                    <section class="block">
                        <div class="row">
                            <div class="col-12">
                                <p>User can add more apps from marketplace or build his own.</p>
                                <ul class="mt-4">
                                    <li class="mb-1"><a :href="`#/marketplaceapp/app/${$route.params.id}/marketplaceapp`"><span class="search_icon mr-2"></span>Get Apps</a></li>
                                    <li><a :href="`#/new/apps/${$route.params.cloudName}/${$route.params.id}`"><span class="icon-html mr-1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span> Build Your Own</a></li>                                   
                                    <li><a :href="`#/create/app/${$route.params.cloudName}/${$route.params.id}/buildapp`"><span class="icon-html mr-1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span> Build Your Own</a></li>                                   
                                </ul>                                
                            </div>
                        </div>
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
}
</script>
