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
                        <h1>App JS</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb" class="breadcrumbs">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><a href="#">appjs</a></li>
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
                                    <b-dropdown-item :href="`#/app/handlerlist/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`">Category</b-dropdown-item>
                                    <b-dropdown-item  :href="`#/app/appjslist/${$route.params.cloudId}/${$route.params.appId}/appjs`">App JS</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/appcsslist/${$route.params.cloudId}/${$route.params.appId}/appcss`">App CSS</b-dropdown-item>

                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <!-- Frontend and Backend dropdowns end-->

                </div>
                <section class="block triggers-block">
                    <!-- <nav class="navbar navbar-light float-right mb-3">
                            <form class="form-inline search">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search handler" aria-label="Search"  @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                <template v-if="$route.params.entity=='block'">
                                <b-button :href="`#/create-block/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button>
                                </template>
                                    
                                <template v-else>
                                <b-button :href="`#/create/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add {{$route.params.entity}}</b-button>
                                </template>
                            </form>
                        </nav>  
                                  -->
                    <div class="clearfix">
                        <nav class="navbar navbar-light float-right mb-3">
                            <form class="form-inline search">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search App JS" aria-label="Search" @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" /><label></label>
                                <b-button :href="`#/create/new/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`" class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add App JS</b-button>
                            </form>
                        </nav>
                    </div>
                    <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid" >
                        <!-- Slot for sorted key -->
                        <template slot="category-header" slot-scope="{ sort_key }">
                            <div class="clearfix">
                                <div class="title float-left">
                                    <h4>{{sort_key}}</h4>
                                </div>
                            </div>
                        </template>

                        <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                        <template slot="section" slot-scope="{ sortedData }">
                            <div class="sub-block">
                                <div class="element-block">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="appup_table">
                                                <table class="table">

                                                    <template v-for="(item, index) in sortedData">
                                                        <!-- Table Header based on Key, except ID -->
                                                        <thead v-if="index==0" :key="index+'_thead'">
                                                            <th scope="col">#</th>
                                                            <th scope="col" v-for="(item,key) in item" :key="key" v-if="key!='ID'">
                                                                {{key}}
                                                            </th>
                                                            <th scope="col">Action</th>
                                                        </thead>
                                                        <!-- Table body -->
                                                        <tbody :key="index+'_tbody'">
                                                            <tr>
                                                                <td scope="row">
                                                                    {{index+1}}
                                                                </td>
                                                                <td scope="row" v-for="(item, key) in item" :key="key" v-if="key!='ID'">
                                                                    <span class="ellipsis">{{item}}</span>
                                                                </td>

                                                                <td scope="row">
                                                                    <template v-if="item.IS_WRITABLE != 1">
                                                                    <a :href="`#/editType/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`" class="more">Edit </a>
                                                                   </template>
                                                                   <template v-if="item.IS_WRITABLE == 1">
                                                                    <a :href="`#/edit/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`" class="more">Edit </a>
                                                                   </template>
                                                                    <a @click="_trigger('triggers', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})" class="more delete-handler"> Delete</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </appup-card>
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
    data() {
        return {
            actions: [{
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
