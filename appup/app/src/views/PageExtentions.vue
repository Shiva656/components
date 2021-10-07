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
            <div class="float-left">
              <button
                type="button"
                class="btn btn-outline-secondary bg-white"
                @click="$router.go(-1)"
              >
                <span class="icon-arrow-left"></span>
              </button>
              <h1>Add Page</h1>

              <!-- Breadcrumbs start -->
              <nav aria-label="breadcrumb" class="breadcrumbs">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/#/home/cloud">Home</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">
                    <a
                      :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`"
                    >Developers</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    <a
                      :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`"
                    >Pages</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    <a href="#">Extentions</a>
                  </li>
                </ol>
              </nav>
              <!-- Breadcrumbs end -->
            </div>

            <!-- Frontend and Backend dropdowns start -->
            <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
              <div class="btn-group filter">
                <div class="dropdown float-right first">
                  <b-dropdown id="ddown1" text="Backend">
                    <b-dropdown-item
                      :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`"
                    >Triggers</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`"
                    >Workflows</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`"
                    >Plugins</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`"
                    >Filters</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`"
                    >Publish</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
              <div class="btn-group filter second">
                <div class="dropdown float-right">
                  <b-dropdown id="ddown2" text="Frontend">
                    <b-dropdown-item
                      :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`"
                    >Blocks</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`"
                    >Pages</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`"
                    >Handlers</b-dropdown-item>
                    <b-dropdown-item
                      :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`"
                    >Category</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
            <!-- Frontend and Backend dropdowns end -->
          </div>
          <section class="block triggers-block">
            <!-- Slot for sorted key -->

            <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
            <div>
              <b-tabs content-class="mt-3">
                <b-tab title="Pages" active>
                  <div class="row">
                    <div class="col-lg-4 col-md-6">
                      <a
                        class="underline-none"
                        :href="`#/create/page/${$route.params.cloudId}/${$route.params.appId}/pages`"
                      >
                        <div class="trigger more-dropdown">
                          <div class="trigger-title clearfix">
                            <div class="float-left">
                              <h4>Custom Page</h4>
                            </div>
                          </div>
                          <template>
                            <div>
                              <a
                                class="btn go-button"
                                :href="`#/create/page/${$route.params.cloudId}/${$route.params.appId}/pages`"
                              >Go</a>
                            </div>
                          </template>
                        </div>
                      </a>
                    </div>
                    <div class="col-lg-4 col-md-6">
                      <a
                        class="underline-none"
                        :href="`#/create/page/${$route.params.cloudId}/${$route.params.appId}/dtemplates`"
                      >
                        <div class="trigger more-dropdown">
                          <div class="trigger-title clearfix">
                            <div class="float-left">
                              <h4>Form Page</h4>
                            </div>
                          </div>
                          <template>
                            <div>
                              <a
                                class="btn go-button"
                                :href="`#/create/page/${$route.params.cloudId}/${$route.params.appId}/dtemplates`"
                              >Go</a>
                            </div>
                          </template>
                        </div>
                      </a>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="CMS">
                  <b-tabs pills card vertical>
                    <b-tab title="System CMS" active>
                      <appup-card
                        ref="triggers"
                        id="1"
                        label="ID"
                        :actions="actions"
                        preload="preload_grid"
                      >
                        <!-- Slot for sorted key -->
                        <template slot="category-header" slot-scope="{ sort_key }">
                          <div class="clearfix">
                            <div class="title float-left">
                              <h4>{{sort_key}}</h4>
                            </div>
                          </div>
                        </template>

                        <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->

                        <template slot="card" slot-scope="{ items }">
                          <div class="row">
                            <template v-for="(item, index) in items">
                              <div class="col-lg-4 col-md-6" :key="index">
                                <div class="trigger more-dropdown">
                                  <div class="trigger-title clearfix">
                                    <div class="float-left">
                                      <h4>{{item.NAME}}</h4>
                                    </div>
                                  </div>
                                  <template>
                                    <div class="row">
                                      <a
                                        class="btn go-button"
                                        :href="`#/app/cmslist/${$route.params.cloudId}/${$route.params.appId}/cmsitems/${item.ID}`"
                                      >
                                        <i class="fas fa-list-ul"></i>
                                      </a>
                                      <a
                                        class="btn go-button"
                                        :href="`#/create/cmsform/${$route.params.cloudId}/${$route.params.appId}/${item.ID}`"
                                      >
                                        <i class="fas fa-plus"></i>
                                      </a>
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </template>
                          </div>
                        </template>
                      </appup-card>
                    </b-tab>
                    <b-tab title="User CMS">
                      <b-button
                        class="btn btn-primary float-right mr-4 mb-3"
                        variant="text-white"
                        :href="`#/appcms/add/template/${$route.params.cloudId}/${$route.params.appId}/page_cms`"
                      >Add User CMS</b-button>
                      <appup-card
                        ref="user_triggers"
                        id="1"
                        label="ID"
                        :actions="actions"
                        preload="user_cms_preload_grid"
                      >
                        <!-- Slot for sorted key -->
                        <template slot="category-header" slot-scope="{ sort_key }">
                          <div class="clearfix">
                            <div class="title float-left">
                              <h4>{{sort_key}}</h4>
                            </div>
                          </div>
                        </template>

                        <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->

                        <template slot="card" slot-scope="{ items }">
                          <div class="row">
                            <template v-for="(item, index) in items">
                              <div class="col-lg-4 col-md-6" :key="index">
                                <template v-if="item.IS_WRITABLE == 1">
                                  <div class="trigger more-dropdown">
                                    <div class="trigger-title clearfix">
                                      <div class="float-left">
                                        <h4>{{item.NAME}}</h4>
                                      </div>

                                      <template>
                                        <div class="dropdown float-right">
                                          <b-dropdown id="ddown1" text="..." class="outline-more">
                                            <template v-if="item.IS_WRITABLE!=1">
                                              <b-dropdown-item
                                                :href="`#/editType/${$route.params.cloudId}/${$route.params.appId}/page_cms/${item.IS_WRITABLE}/${item.ID}`"
                                              >Edit</b-dropdown-item>
                                            </template>
                                            <template v-if="item.IS_WRITABLE==1">
                                              <b-dropdown-item
                                                :href="`#/appcms/edit/${$route.params.cloudId}/${$route.params.appId}/page_cms/${item.IS_WRITABLE}/${item.ID}`"
                                              >Edit</b-dropdown-item>
                                            </template>
                                            <b-dropdown-item
                                              target="_blank"
                                              :href="`/runtime/#${item.URL}?id=${$route.params.appId}`"
                                            >Preview</b-dropdown-item>
                                            <b-dropdown-item
                                              target="_blank"
                                              @click="cmsTemplateDuplicate(item)"
                                            >Duplicate</b-dropdown-item>

                                            <b-dropdown-item @click="showDeleteModal(item)">Delete</b-dropdown-item>
                                          </b-dropdown>
                                        </div>
                                      </template>
                                    </div>

                                    <div class="trigger-content">
                                      <template v-if="item.URL">
                                        <p>{{item.URL}}</p>
                                      </template>
                                      <template>
                                        <div class="row">
                                          <a
                                            class="btn go-button"
                                            :href="`#/app/usercmslist/${$route.params.cloudId}/${$route.params.appId}/usercmsitems/${item.ID}`"
                                          >
                                            <i class="fas fa-list-ul"></i>
                                          </a>
                                          <a
                                            class="btn go-button"
                                            :href="`#/create/usercmsform/${$route.params.cloudId}/${$route.params.appId}/${item.ID}`"
                                          >
                                            <i class="fas fa-plus"></i>
                                          </a>
                                        </div>
                                      </template>
                                    </div>
                                  </div>
                                </template>
                              </div>
                            </template>
                          </div>
                        </template>
                      </appup-card>
                    </b-tab>
                  </b-tabs>
                </b-tab>
              </b-tabs>
            </div>
          </section>
        </div>
        <div class="push"></div>
      </div>
      <!-- Page content end -->
    </div>

    <template>
      <div>
        <b-modal ref="my-modal" hide-footer title="Delete">
          <div class="d-block text-center">
            <h3>Are you sure you want to delete?</h3>
          </div>
          <div class="delete-modal-footer">
            <b-button variant="outline-danger" @click="hideDeleteModal">No</b-button>
            <b-button variant="outline-warning" @click="deleteUserCMS()">Yes</b-button>
          </div>
        </b-modal>
      </div>
    </template>
  </div>
</template>

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
import axios from "axios";

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
          action: "delete"
        }
      ],
      itemData: "",
      cmsPages: [],
      userCmsPages: [],
      deleteURL: "/appdb/_db/PAGE_TEMPLATE"
    };
  },
  computed: {},
  watch: {
    userCmsPages(newVal, oldVal) {
      this.userCmsPages = newVal;
    }
  },
  methods: {
    getUserCmsPages: function() {
      var url =
        "/appdb/_db/PAGE_TEMPLATE_VIEW?where=APPLICATION_ID=" +
        this.$route.params.appId;
      var _self = this;
      _self.$appupajax
        .get2(url, {}, { withCredentials: true, credentials: "include" })
        .then(_self.$appupajax.handleResponse)
        .then(response => {
          var response_userCms = JSON.parse(JSON.stringify(response.data));
          _self.userCmsPages = response_userCms;
          _self.$refs.user_triggers.data = _self.userCmsPages;
          // Window.totalcmsData.concat(response.data);
          for (var i = 0; i < response_userCms.length; i++) {
            Window.totalcmsData.push(response_userCms[i]);
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    },
    cmsTemplateDuplicate: function(item) {
      var url =
        "/app/api/copy-cms-template/" +
        this.$route.params.appId +
        "/" +
        item.ID;
      var _self = this;
      _self.$appupajax
        .get2(url, {}, { withCredentials: true, credentials: "include" })
        .then(_self.$appupajax.handleResponse)
        .then(response => {
          _self.getUserCmsPages();
          _self.start("showAlert", {
            currentMessage: "Successfully Duplicated"
          });
        })
        .catch(function(error) {
          // handle error
          _self.start("showAlert", { currentMessage: "Failed to Duplicate" });
          console.log(error);
        });
    },
    deleteUserCMS: function() {
      debugger;
      var data = this.itemData;
      var url = this.deleteURL + "/" + data.ID;
      var _self = this;
      axios.delete(url).then(function(response) {
        setTimeout(() => {
          _self.hideDeleteModal();
          _self.getUserCmsPages();
        }, 400);
      });
    },
    showDeleteModal: function(item) {
      this.itemData = item;
      this.$refs["my-modal"].show();
    },
    hideDeleteModal() {
      this.$refs["my-modal"].hide();
    }
  }
};
</script>
<style>
.app.new-app {
  border-style: dashed;
}
.app {
  text-align: center;
  border: 1px solid #f5f7fa;
  padding: 0.4rem 0.4rem 0.6rem;
  margin-bottom: 1rem;
  min-height: 131px;
  -webkit-border-radius: 4px;
}
.app .app-image {
  height: 86px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-border-radius: 2px;
  position: relative;
}
.app .description {
  display: inline-block;
  vertical-align: middle;
  padding-top: 0.7rem;
}
.delete-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
}
</style>

