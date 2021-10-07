<template>
  <div>    
    <b-modal v-model="modalShow"  no-fade class="appup_modal">
        <template>
            <div slot="modal-header">  
              <template v-if="$route.params.parententity=='cloud'">              
                <a :href="`#/home/edit/cloud/${$route.params.id}`"  class="float-right"><span class="icon-close-icon"></span></a>  
              </template>  
              <template v-if="$route.params.parententity=='clouds'">              
                <a :href="`#/create/clouds`"  class="float-right"><span class="icon-close-icon"></span></a>  
              </template>                                  
            </div>
        </template>
      <template>
            <div slot="modal-footer"></div>
        </template>
         <div class="container clearfix">
             
              <p><br><b>CNAME records </b></br>
              <br><b>Introduction</b></br>
         <br>A Canonical Name or CNAME record is a type of DNS record that maps an alias name to a true or canonical domain name.</br> <br> Once an app is deployed in any of the cloud environments, app developers may want this application to be pointed from a domain to be access by the users.</br>  

<br>The below examples gives the steps if your domain is registered with godaddy, however the steps can defer if you use another domain provider.</br><br> please refer to you domain provider documentation how to set the CNAME.</br>

<br>Steps</br>

<br>1.Log in to your GoDaddy account and open your product.</br>
<br>2.Select your domain name from the list to access the Domain Settings page.</br>
<br>3.Scroll down to the Additional Settings section and select Manage DNS.</br>
<br>4.On the DNS Management page, at the bottom of the Records section, click Add.</br>
<br>5.Select CNAME from the Type dropdown.</br>
<br>6.Complete the required fields:</br>
<br><b> Host </b> : The host name, or prefix, the CNAME record will be set to. 
You can include a period (.) but not as the first or last character. Consecutive periods (...) are not allowed. The host cannot exceed 25 characters or be the @ symbol</br>
<br><b>Points to </b>: The URL you are setting as the destination for the host. Type @ to point directly to your root domain name.</br>
<br></b>TTL </b>- How long the server should cache information</br>
<br>7.Click Save to complete the process.</br>
 <br>Note: All DNS changes can take 24 - 48 hours to fully update across global networks.</br></p>  
               
           
         </div>
    </b-modal>
  </div>
</template>


<script>
// Import components and libraries

import AppupHeader from "./AppupHeader.vue";
import AppupFooter from "./Appupfooter.vue";
import Navbar from "./Navbar.vue";

var renderedObj = {};
// Export components
export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {     
        modalShow: true
    };
  },
  computed: {},
  methods: {
    clearRender: function() {
      renderedObj = {};
      return true;
    },
    isObjectRendered: function(key) {
      if (
        typeof renderedObj[key] == undefined ||
        typeof renderedObj[key] == "undefined"
      ) {
        renderedObj[key] = "test";
        return false;
      }

      return true;
    }
  }
};
</script>