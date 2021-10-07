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
                        <template v-if="$route.params.entity=='event'">
                            <h1>New Event Trigger</h1>
                        </template>
                        <template v-else-if="$route.params.entity=='cron'">
                            <h1>New Cron Trigger</h1>
                        </template>
                        <template v-else-if="$route.params.entity=='triggers'">
                            <h1>New Rest Trigger</h1>
                        </template>
                         <template v-else-if="$route.params.entity=='ApplicationProperties'">
                            <h1>New Application Properties</h1>
                        </template>
                         <template v-else-if="$route.params.entity=='triggers'">
                            <h1>New Rest Trigger</h1>
                        </template>
                        <template v-else-if="$route.params.entity=='appjs'">
                            <h1>New App JS</h1>
                        </template>
                        <template v-else-if="$route.params.entity=='appcss'">
                            <h1>New App CSS</h1>
                        </template>
                        <template v-else-if="$route.params.entity=='swagger'">
                            <h1>New Swagger Param</h1>
                        </template>
                        <template v-else>
                            <h1>New {{$route.params.entity}}</h1>
                        </template>
                    </div>
                </div>

                <section class="block">
                    <div class="row">
                        <div class="col-12">
                            <template v-if="$route.params.entity == 'swagger'">
                                <!-- Appup form component start -->
                                <appup-form preload="pre_load" submit="post_swagger" />
                                <!-- Appup form component end -->
                            </template>
                            <template v-else-if="$route.params.entity == 'event'">
                                <!-- Appup form component start -->
                                <appup-form preload="pre_load" submit="post_handler_event" />
                                <!-- Appup form component end -->
                            </template>
                            <template v-else-if="$route.params.entity != 'CloudProperties'">
                                <!-- Appup form component start -->
                                <appup-form preload="pre_load" submit="post_handler" />
                                <!-- Appup form component end -->
                            </template>                            
                            <template v-else>
                                <appup-form preload="pre_load" submit="post_properties" />
                            </template>
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
