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
                            <template v-if="$route.params.entity=='clouds'">
                                <h1>New cloud</h1>
                            </template>
                            <template v-else-if="$route.params.entity=='setup'">
                                <h1>New cloud settings</h1>
                            </template>
                            <template v-else>
                                <h1>New {{$route.params.entity}}</h1>
                            </template>                            
                        </div>               
                    </div> 
                    
                    <section class="block">
                        <div class="row">
                            <div class="col-12">                               
                                <template v-if="$route.params.entity=='clouds'">
                                     <section class="row col-12">
                                    <appup-form  class="col-6"
                                        preload="pre_load_entity"  
                                        submit="post_newcloud"
                                        :workflow_params='{entity: "clouds"}'
                                    /> 
                                  <div class="col-6" style="display: flex;">
                                                        <div class= " text-align: left;" style="align-self: flex-end; position: absolute !important;left: -224px;top:244px;">
                                                   
                                                    <a v-b-modal.modal1 style="color: #007bff;cursor:pointer">Help</a>
                                                <div>
                                                            <!--<b-btn v-b-modal.modal1>Help</b-btn>-->

                                                            <!-- Modal Component -->
                                                            <b-modal id="modal1" title="CNAME RECORDS">
                                                                <br><b>Introduction</b></br>

                                                                <br>A Canonical Name or CNAME record is a type of DNS record that maps an alias name to a true or canonical domain name.</br>
                                                                <br> Once an app is deployed in any of the cloud environments, app developers may want this application to be pointed from a domain to be access by the users.</br>

                                                                <br>The below examples gives the steps if your domain is registered with godaddy, however the steps can defer if you use another domain provider.</br>
                                                                <br> please refer to you domain provider documentation how to set the CNAME.</br>

                                                                <br>Steps</br>

                                                                <br>1.Log in to your GoDaddy account and open your product.</br>
                                                                <br>2.Select your domain name from the list to access the Domain Settings page.</br>
                                                                <br>3.Scroll down to the Additional Settings section and select Manage DNS.</br>
                                                                <br>4.On the DNS Management page, at the bottom of the Records section, click Add.</br>
                                                                <br>5.Select CNAME from the Type dropdown.</br>
                                                                <br>6.Complete the required fields:</br>
                                                                <br><b> Host </b> : The host name, or prefix, the CNAME record will be set to. You can include a period (.) but not as the first or last character. Consecutive periods (...) are not allowed. The host cannot exceed 25 characters or be the @ symbol</br>
                                                                <br><b>Points to </b>: The URL you are setting as the destination for the host. Type @ to point directly to your root domain name.</br>
                                                                <br>
                                                                </b>TTL </b>- How long the server should cache information</br>
                                                                <br>7.Click Save to complete the process.</br>
                                                                <br>Note: All DNS changes can take 24 - 48 hours to fully update across global networks.</br>
                                                                

                                                            </b-modal>
                                                        </div>
                                                 </div>
                                                 </div>     
                                 </section> 
                                </template>
                                <template v-else-if="$route.params.entity=='setup'">
                                    <appup-form  
                                        preload="pre_load_entity"  
                                        submit="post_newcloudid"
                                        :workflow_params='{entity: "setup"}'
                                    /> 
                                </template>
                                <template v-else-if="$route.params.entity=='collaborators'">
                                    <appup-form  
                                        preload="pre_load_entity"  
                                        submit="post_sentemail"
                                        :workflow_params='{entity: "collaborators"}'
                                    /> 
                                </template>
                                <template v-else-if="$route.params.entity=='block'">
                                    <appup-form  
                                        preload="pre_load"  
                                        submit="post_appId"
                                    /> 
                                </template>
                                <template v-else>
                                    <appup-form  
                                        preload="pre_load"  
                                        submit="post"
                                    /> 
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
