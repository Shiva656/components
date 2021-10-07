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
                            <button type="button" class="btn btn-outline-secondary bg-white" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
                            <h1>Add Helper</h1>

                            <!-- Breadcrumbs start -->
                            <nav aria-label="breadcrumb" class="breadcrumbs">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                    <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                    <li class="breadcrumb-item active" aria-current="page"><a :href="`#/app/helperslist/${$route.params.cloudId}/${$route.params.appId}/helper`">Helpers</a></li>
                                    <li class="breadcrumb-item active" aria-current="page"><a href="#">Extentions</a></li>
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
                                        <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`">Publish</b-dropdown-item>
                                    </b-dropdown>                                     
                                </div>
                            </div>
                            <div class="btn-group filter second">
                                <div class="dropdown float-right">
                                    <b-dropdown id="ddown2" text="Frontend">
                                        <b-dropdown-item  :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                        <b-dropdown-item :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`">Category</b-dropdown-item>
                                    </b-dropdown>                                     
                                </div>
                            </div>                       
                        </div>
                        <!-- Frontend and Backend dropdowns end -->

                    </div>     
                <section class="block">
                    <h4>Form</h4>
                    <p>Helpers related to Form</p>
                    <div class="services">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6">
                            <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/form`">
                                <div class="trigger more-dropdown">
                                    <div class="trigger-title clearfix">
                                        <div class="float-left">                                                
                                        <h4>Form</h4>                                           
                                    </div>                                                
                                </div>
                                    <template>
                                        <div>
                                            <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/form`">Go</a>
                                        </div>
                                    </template>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 col-sm-6"> 
                            <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/appup-filter`">
                                <div class="trigger more-dropdown">
                                    <div class="trigger-title clearfix">
                                        <div class="float-left">                                                
                                        <h4>Filter Form</h4>                                           
                                    </div>                                                
                                </div>
                                    <template>
                                        <div>
                                            <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/appup-filter`">Go</a>
                                        </div>
                                    </template>                                    
                                </div>
                            </a>
                        </div>
                         <div class="col-lg-4 col-sm-6"> 
                            <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-formbuilder`">
                                <div class="trigger more-dropdown">
                                    <div class="trigger-title clearfix">
                                        <div class="float-left">                                                
                                        <h4>Form Builder</h4>                                           
                                    </div>                                                
                                </div>
                                    <template>
                                        <div>
                                            <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-formbuilder`">Go</a>
                                        </div>
                                    </template>                                    
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 col-sm-6"> 
                            <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-modal`">
                                <div class="trigger more-dropdown">
                                    <div class="trigger-title clearfix">
                                        <div class="float-left">                                                
                                        <h4>Modal</h4>                                           
                                    </div>                                                
                                </div>
                                    <template>
                                        <div>
                                            <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-modal`">Go</a>
                                        </div>
                                    </template>                                    
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-multi-search`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Multi Search</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-multi-search`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-global-search`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Global Search</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-global-search`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-search`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Simple Search</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-search`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-filter`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Simple Filter</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-filter`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                    </div>
                    </div>
                </section>
                <section class="block">
                    <h4>Collection</h4>
                    <p>Helpers related to Collection</p>
                    <div class="services">
                        <div class="row">
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-card`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Card</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-card`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-card-collection`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Card Builder</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-card-collection`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Grouped</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped-accordion`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Grouped Accordion</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped-accordion`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-table`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Table</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-table`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped-table`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Grouped Table</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped-table`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped-card`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Grouped Card</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-collection-grouped-card`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-grid`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Dashlets</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-grid`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-kanban`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Kanban</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-kanban`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                             <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-card`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Simple Card</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-card`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-move-up-down`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Collection Move Up and Down</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-move-up-down`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="block"> 
                    <h4>Charts</h4>
                    <p>Helpers related to Charts</p>
                    <div class="services">
                        <div class="row">
                          <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-chart`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Charts</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-chart`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-gantt-chart`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Gantt Charts</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-gantt-chart`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="block"> 
                    <h4>Menu</h4>
                    <p>Helpers related to Menu</p>
                    <div class="services">
                        <div class="row">
                           <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-material-dropdown`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">
                                            <h4>Material Dropdown</h4>
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-material-dropdown`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-header`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Header</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-header`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-onboarding-meter`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Onboarding Meter</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-onboarding-meter`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-tab`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Tab</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-tab`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-vertical-bar`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Vertical Bar</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-vertical-bar`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-vertical-navigation`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Vertical Navigation</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-vertical-navigation`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dropdown`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Split Dropdown</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dropdown`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-grouped-dropdown`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Grouped Dropdown</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-grouped-dropdown`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-tags-inline`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Tags Inline</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-tags-inline`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-button-group`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Button Group</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-button-group`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="block"> 
                    <h4>Misc</h4>
                    <p>Misc Helpers</p>
                    <div class="services">
                        <div class="row">
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-calendar`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Calendar</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-calendar`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                             <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-csv-mappingscreen`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>CSV Mapping Screen</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-csv-mappingscreen`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                          <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-accordion`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Accordion</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-accordion`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-automation`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Automation</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-automation`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-compose-message`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Compose Message</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-compose-message`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-gravatar`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Gravatar</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-gravatar`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-message`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Message</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-message`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-resource`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Resource</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-resource`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-date-range-picker`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Date Range Picker</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-date-range-picker`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>                            
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-image-upload`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Image Upload</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-image-upload`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-image-picker`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Image Picker</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-image-picker`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-wizard`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Simple Wizard</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-wizard`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dual-list`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Dual List</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dual-list`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                             <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-list-group`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>List Group</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-list-group`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-rating-bar`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Rating Bar</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-rating-bar`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </section>
                <section class="block"> 
                    <h4>Advanced</h4>
                    <p>Advanced helpers</p>
                    <div class="services">
                        <div class="row">
                         
                             <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-notifications`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Notifications</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-notifications`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dynamic-view`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Dynamic View</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dynamic-view`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-html`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>HTML</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-html`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                          
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-inline-form-edit`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Inline Edit</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-inline-form-edit`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-grid`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Simple Grid</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-simple-grid`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-form-preview`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Form Preview</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-form-preview`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-wizard-builder`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Filter Automation</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-wizard-builder`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                             <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dynamic-kanban`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Dynamic Kanban</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dynamic-kanban`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                             <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dynamic-chart`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Dynamic Chart</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-dynamic-chart`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-4 col-sm-6"> 
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-accordion-table`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>Accordion Table</h4>                                           
                                        </div>                                                
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/ac-accordion-table`">Go</a>
                                            </div>
                                        </template>                                    
                                    </div>
                                </a>
                            </div>
                        
                        </div>
                    </div>
                </section>


                <!-- <section class="block" v-for="(item, key) in components">
                    <h4>{{ key }}</h4>
                    <p>{{ item.description }}</p>
                    <div class="services">
                        <div class="row">
                            <template v-for="(inneritem, index) in item" >
                            <div class="col-lg-4 col-sm-6" :key="index">
                                <a class="underline-none" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/${inneritem.component}`">
                                    <div class="trigger more-dropdown">
                                        <div class="trigger-title clearfix">
                                            <div class="float-left">                                                
                                            <h4>{{inneritem.component}}</h4>                                           
                                            </div>                                                
                                        </div>
                                    </div>
                                        <template>
                                            <div>
                                                <a class="btn go-button" :href="`#/helper/${$route.params.cloudId}/${$route.params.appId}/ac-helper/${inneritem.component}`">Go</a>
                                            </div>
                                        </template>
                                </a>
                            </div>
                            </template>
                        </div>
                    </div>
                </section> -->
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
// import lodash from "lodash";
let componentsJSON = require("./helpers/components_form.json");
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
      ],
      components: ""
    };
  },
  // By using lodash, componentsJSON changes to category based JSON
  created() {
    //  this.components = lodash.groupBy(componentsJSON, "category");
    this.components = componentsJSON;
  },
  computed: {},
  methods: {}
};
</script>