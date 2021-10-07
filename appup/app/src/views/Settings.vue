<template>
    <div>

        <div class="page-wrapper preferences-settings">
        
            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title">
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>Preferences</h1>
                        
                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Preferences</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end -->
                        
                    </div> 
                    <div class="tab-menu">
                        <b-tabs>
                            <!-- Settings tab start -->
                            <b-tab title="Setting">
                              <section class="block">
                                    <form>                                        
                                         <input
                                            id="pid"
                                            v-model="profileId"
                                            type="hidden"
                                            name="name"
                                            >
                                    </form>
                                     <!-- <h4  id="pid" class="user-name d-inline-block" :title="profileId">{{profileId}}</h4> -->
                                     <section class="row col-12">
                                    <appup-form class="col-6" 
                                        preload="edit_prefences"  
                                        submit="fileEdit"
                                        :workflow_params='{entity: "settings"}'
                                    />
                                    <div class="col-6" style="display: flex;">
                                    <form id="profile_pic_upload" style="align-self: flex-end;margin-bottom: 70px;">
                                      <div class="row col-12">
                                          <div class="col-2">
                                              <img id="image_url" />
                                          </div>
                                          <div class="col-10">
                                                <input type="hidden" id="img_url" v-bind:value="image_url_val"/>
                                                <div id="fileUpload"><input type="file" name="myFile" @change.prevent="start( 's3upload',{'event': $event,'trig_type':'attach12345'})" /></div>
                                          </div>
                                      </div>
                                    </form>
                                    </div>
                                    </section>
                                </section>
                                
                            </b-tab>  
                            <!-- Settings tab end -->

                            <!-- Password tab start -->
                            <b-tab title="Password">
                                <section class="block">
                                    <appup-form  
                                        preload="pre_load_entity" 
                                        submit="post_entity"
                                        :workflow_params='{entity: "password"}'
                                    />
                                </section>
                            </b-tab>
                            <!-- Password tab end -->

                            <!-- Collaborators tab start -->
                            <b-tab title="Collaborators">
                                <div class="clearfix preferences collaborators-block">
                                    <section class="block">
                                    <div class="row">
                                        <div class='col-sm-12'>
                                            <nav class="navbar navbar-light float-right mb-3">
                                                <form class="form-inline search">
                                                    <input class="form-control mr-sm-2" type="search" placeholder="Search Collaborators" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'LAST_NAME')" /><label></label>
                                                    <b-button class="btn my-2 my-sm-0 btn-primary btn-text-white" variant="text-white" href="#/home/prefences/settings/collaborators" >Add Collaborators</b-button>
                                                </form>
                                            </nav> 
                                        </div>
                                    </div>
                                    <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="pre_load_grid_entity" :workflow_params='{entity: "collaborators"}'  >
                                       <template slot="card" slot-scope="{ items }">                
                                            <div class="row">
                                                <template v-for="(item, index) in items">                                                                          
                                                    <div class="col-lg-4 col-md-6 col-sm-12" :key="index">
                                                        <div class="collaborator">
                                                            <div class="more-dropdown float-right">
                                                            <template>
                                                                <div class="dropdown float-right">
                                                                    <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                        <b-dropdown-item @click="_trigger('triggers', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                    </b-dropdown>
                                                                </div>
                                                            </template>   
                                                            </div>  
                                                            <div class="collaborator-avatar">
                                                                <img src="../styles/scss/images/howard.png">
                                                            </div>
                                                            <div class="collaborator-info">
                                                                <h4 class="user-name">{{item.LAST_NAME}}</h4>
                                                                <a class="user-email">{{item.EMAIL}}</a> 
                                                                <!-- <template v-if="item.REGISTRATION_STATUS ==1">
                                                                    <button > Invite</button>
                                                                </template> -->
                                                            </div>
                                                                                                                     
                                                        </div>
                                                    </div>
                                                </template>                                                
                                            </div>
                                            <!-- <appup-form preload="pre_load_entity" submit="post_entity" :workflow_params='{entity: "collaborators"}'/> -->
                                        </template>
                                    </appup-card> 
                                    </section>            
                                </div>
                            </b-tab>
                            <!-- Collaborators tab end -->

                            <!-- Billings tab start -->
                            <b-tab title="Billing">
                                <div class="row">
                                    <div class="col-lg-8 col-md-12">
                                        <section class="block clearfix preferences billing-block table-responsive-sm">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Payment</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Receipt</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>824-185-2986</th>
                                                        <td>07 Dec 2018</td>
                                                        <td><span class="status paid">Paid</span></td>
                                                        <td>$985</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th>022-838-5449</th>
                                                        <td>05 Oct 2018</td>
                                                        <td><span class="status pending">Pending</span></td>
                                                        <td>$872</td>
                                                        <td>No</td>
                                                    </tr>
                                                    <tr>
                                                        <th>285-277-8281</th>
                                                        <td>06 Mar 2018</td>
                                                        <td><span class="status error">Error</span></td>
                                                        <td>$246</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th>624-785-9938</th>
                                                        <td>05 Jan 2018</td>
                                                        <td><span class="status paid">Paid</span></td>
                                                        <td>$506</td>
                                                        <td>No</td>
                                                    </tr>
                                                    <tr>
                                                        <th>022-838-5449</th>
                                                        <td>05 Oct 2018</td>
                                                        <td><span class="status paid">Paid</span></td>
                                                        <td>$872</td>
                                                        <td>Yes</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </section>
                                    </div>
                                    <div class="col-lg-4 col-md-6">
                                        <section class="block clearfix preferences card-block">
                                            <div class="card">
                                                <div class="card-number">
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                </div>
                                                <div class="card-holder float-left">
                                                    <span>CARD HOLDER</span>
                                                    <h4>SARAH HENRIETTA</h4>
                                                </div>
                                                <div class="expires float-right">
                                                    <span>D3DDE5</span>
                                                    <div class="date">  
                                                        <span class="mm">**</span>
                                                        <span class="separator">/</span>
                                                        <span class="yy">20</span>
                                                    </div>  
                                                </div>  
                                                <div class="hover">
                                                    <a href="#" class="edit" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="edit-form"><span class="icon-pencil"></span>Edit information</a>
                                                    <a href="#" class="delete"><span class="icon-basket"></span>Delete card</a>
                                                </div>
                                            </div>
                                            <div class="collapse edit-form" id="edit-form">
                                                    <form>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" id="number-card">
                                                            <label for="number-card">Card number</label>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" id="card-holder-name">
                                                            <label for="card-holder-name">Card holder name</label>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" id="expires">
                                                            <label for="expires">Expires</label>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" id="cvv">
                                                            <label for="cvv">CVV2 Code</label>
                                                        </div>
                                                    </form>
                                                    <div class="buttons-form float-lg-right float-sm-none">
                                                        <button class="btn btn-outline-secondary">Cancel</button>
                                                        <button class="btn btn-primary ml-sm-none">Save card</button>
                                                    </div>
                                                </div>
                                        </section>
                                    </div>
                                </div>
                            </b-tab>
                            <!-- Billings tab end -->
                        </b-tabs>    
                    </div>
                </div>
            </div>
            <div class="push"></div>
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
  computed: {
      profileId: function() {
      // return  username from UIJSON
      if (typeof UIJSON.login.profileId != undefined && typeof UIJSON.login.profileId != "undefined") {
        this.$cookies.set("_p_id", UIJSON.login.profileId);
      }
      return this.$cookies.get("_p_id");
    }
  },
  
  
  data() {
    return {
      image_url:"",
    };
  }
};
</script>
