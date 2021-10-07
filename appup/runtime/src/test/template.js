var html = `
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
                        <h1>Edit {{$route.params.entity}}</h1>
                    </div>
                    <div class="float-right new-app" v-if="$route.params.entity=='pages'">
                        <b-button :href="\`#/app/pages/\${$route.params.cloudId}/\${$route.params.appId}/pagehandler/\${$route.params.id}\`"  class="float-right" variant="warning text-white"><span class="icon-new-app"></span>Handlers</b-button>
                    </div> 
                    <div class="float-right new-app" v-if="$route.params.entity=='block'">
                        <b-button :href="\`#/app/blocks/\${$route.params.cloudId}/\${$route.params.appId}/blockhandler/\${$route.params.id}\`"  class="float-right" variant="warning text-white"><span class="icon-new-app"></span>Handlers</b-button>
                    </div>               
                </div> 
                <section class="block">
                    <div class="row">
                        <div class="col-12">

                            <!-- Appup form component start -->
                            <appup-form  
                                preload="pre_load_edit"  
                                submit="put"
                                />
                            <!-- Appup form component end -->

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
`;