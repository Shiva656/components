<template>
    <div>
        <div class="page-wrapper create-block-code">
            
            <!-- Header start -->
            <Navbar />
            <!-- Header end -->

            <!-- Page content start -->
            <div class="page-content">
                <div class="container clearfix">
                    <div class="page-title float-left">
                        <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                        <h1>New Block</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><a :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">New Block</a></li>
                            </ol>
                        </nav>  
                        <!-- Breadcrumbs end --> 
                       
                    </div>

                    <!-- Frontend and Backend dropdowns start --> 
                    <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
                        <div class="btn-group filter">
                            <div class="dropdown float-right first">
                                <b-dropdown id="ddown1" text="Backend">
                                    <b-dropdown-item :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`">Triggers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`">Workflows</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`">Plugins</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`">Filters</b-dropdown-item>
                                    <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/publish`">Publish</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>
                        <div class="btn-group filter second">
                            <div class="dropdown float-right">
                                <b-dropdown id="ddown2" text="Frontend">
                                    <b-dropdown-item  :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                </b-dropdown>                                     
                            </div>
                        </div>                       
                    </div>
                    <!-- Frontend and Backend dropdowns end -->
                    <div class="clearfix"></div>
                    <!-- Tab menu start -->
                    <div class="tab-menu">                        
                        <a href="#" class="open-components"  v-b-modal.newblock busy=false>+</a>  
                        <b-modal id="newblock" class="block-modal">     
                            <template>
                                <div slot="modal-header">
                                </div>
                            </template>
                            <template>
                                <div slot="modal-footer">
                                </div>
                            </template>
                            <section class="block clearfix create-block-section">
                                <a href="#" class="close-components icon-icon-back"></a>
                                <div class="tab-menu">
                                    <b-tabs>
                                        <b-tab title="LAYOUTS">
                                            <h4>Layouts</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum, ante sit amet pretium malesuada, leo magna auctor ipsum, et placerat eros turpis sit amet velit.</p>
                                            <img src="../styles/scss/images/layout-default.svg" alt="">
                                            <p>Default layout</p>
                                            <img src="../styles/scss/images/layout-right.svg" alt="">
                                            <p>With right column</p>
                                            <img src="../styles/scss/images/layout-left.svg" alt="">
                                            <p>With left column</p>
                                            <img src="../styles/scss/images/layout-default.svg" alt="">
                                            <p>3 columns layout</p>
                                        </b-tab>
                                        <b-tab title="ELEMENTS">
                                         
                                        <h4>Elements</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum, ante sit amet pretium malesuada, leo magna auctor ipsum, et placerat eros turpis sit amet velit.</p>
                                        <div class="elements-group row">
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-list"></span>
                                                    <h5>Form</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-table">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Table</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-text">
                                                        <span class="path1"></span><span class="path2"></span>
                                                    </span>
                                                    <h5>Text</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-button"></span>
                                                    <h5>Button</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-font">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
                                                    </span>
                                                    <h5>Label</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-columns">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Fixed panel</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-checkbox"></span>
                                                    <h5>Checkbox</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-division">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Dropdown</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-icon-box">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Date Box</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-slider">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Slider</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-radio-button-icon">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Radio group</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-push-pin">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Anchor</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-accordion">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Accordion</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-left-align">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>List</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-tabs">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Tabs</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-html">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>HTML</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-help-icon">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Help icon</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-picture">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Image</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-grid">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Grid</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-horizont-panel">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Horiz. panel</h5>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-6">
                                                <div class="element">
                                                    <span class="icon-vertical-panel">
                                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                                                    </span>
                                                    <h5>Vertical panel</h5>
                                                </div>
                                            </div>
                                        </div>
 
                                        </b-tab>
                                        <b-tab title="COMPONENTS">
                                            <h4>Components</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum, ante sit amet pretium malesuada, leo magna auctor ipsum, et placerat eros turpis sit amet velit.</p>
                                            <img src="../styles/scss/images/chart-bar.svg" alt="">
                                            <p>Bar chart</p>
                                            <img src="../styles/scss/images/chart-line.svg" alt="">
                                            <p>Line chart</p>
                                            <img src="../styles/scss/images/chart-donut.svg" alt="">
                                            <p>Donut chart</p>
                                            <img src="../styles/scss/images/chart-divided.svg" alt="">
                                            <p>Divided bar chart</p>
                                        </b-tab>
                                    </b-tabs>
                                </div>
                            </section>                        
                         </b-modal>
                        <b-tabs>
                            <!-- Code builder tab start -->
                            <b-tab title="Code Builder">     
                                <section class="block">
                                <div class="row">
                                        <div class="col-12">
                                            <appup-form  
                                                preload="pre_load"  
                                                submit="post_appId"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </b-tab>  
                            <!-- Code builder tab end -->

                            <!-- Visual builder tab start -->
                            <b-tab title="Visual Builder">
                                <section class="block">
                                    <div class="row">
                                        <div class="col-12">
                                            <appup-form  
                                                preload="pre_load"  
                                                submit="post_appId"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </b-tab>
                            <!-- Visual builder tab end --> 
                        </b-tabs> 
                    </div>
                    <!-- Tab menu end -->
                </div>
                <div class="push"></div>
            </div>            
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