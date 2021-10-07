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
                        <h1>Workflows</h1>

                        <!-- Breadcrumbs start -->
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/#/home/cloud">Home</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a :href="`#/app/dev/${$route.params.cloudId}/${$route.params.appId}/developers`">Developers</a></li>
                                <li class="breadcrumb-item" aria-current="page"><a href="#">Workflow</a></li>
                            </ol>
                        </nav>
                        <!-- Breadcrumbs end -->

                    </div>
                    <!-- Frontend and Backend dropdowns start -->
                    <div class="filters float-sm-left float-lg-right mb-sm-3 mt-lg-3">
                        <div class="btn-group filter">
                            <div class="dropdown float-right first">
                                <b-dropdown id="ddown1" text="Backend">
                                    <b-dropdown-item :href="`#/app/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflows`">Workflows</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/triggerlist/${$route.params.cloudId}/${$route.params.appId}/triggers`">Triggers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/plugin/config/${$route.params.cloudId}/${$route.params.appId}/pluginconfig`">Plugins</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/filterlist/${$route.params.cloudId}/${$route.params.appId}/filters`">Filters</b-dropdown-item>
                                    <b-dropdown-item :href="`#/create/stage/${$route.params.cloudId}/${$route.params.appId}/general`">Publish</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                        <div class="btn-group filter second">
                            <div class="dropdown float-right">
                                <b-dropdown id="ddown2" text="Frontend">
                                    <b-dropdown-item :href="`#/app/pagelist/${$route.params.cloudId}/${$route.params.appId}/pages`">Pages</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/blocklist/${$route.params.cloudId}/${$route.params.appId}/block`">Blocks</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/${$route.params.cloudId}/${$route.params.appId}/handler`">Handlers</b-dropdown-item>
                                    <b-dropdown-item :href="`#/app/categorylist/${$route.params.cloudId}/${$route.params.appId}/category`">Category</b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <!-- Frontend and Backend dropdowns end -->

                    <!-- Tab menu start -->
                    <!--nav class="tab-menu">
                        <ul>
                            <li class="active"><a href="#">REST</a></li>
                            <!-- <li><a href="cron.html">CRON</a></li>
                            <li><a href="event.html">EVENT</a></li>
                        </ul>
                    </nav-->
                    <!-- Tab menu end -->
                </div>
                <section class="block triggers-block">
                    <nav class="navbar navbar-light float-right mb-3">
                        <form class="form-inline search">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search workflows" aria-label="Search" @keyup="_trigger('triggers', 'search', `${$event.target.value}`, 'NAME')" />
                            <label></label>
                            <!-- <b-button :href="`#/create/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}`"  class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Workflow</b-button> -->
                            <b-button :href="`#/create/workflowlist/${$route.params.cloudId}/${$route.params.appId}/workflow/Authentication Workflows`" class="btn my-2 my-sm-0 btn-primary" variant="text-white">Add Workflow</b-button>
                            <!-- <b-button :href="`#/workflowtemplate/workflow`" class="btn my-2 my-sm-0 btn-primary btn-text-white" variant="text-white"  v-b-modal.newblock busy=false >Add Workflow</b-button> -->
                        </form>
                    </nav>

                    <appup-card ref='triggers' id="1" label="ID" :actions="actions" preload="preload_grid_trigcount">
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
                                            <template v-if="item.IS_WRITABLE == 1">
                                                <a class="underline-none" :href="`#/edit/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">
                                                    <div class="trigger-title clearfix">
                                                        <div class="float-left">
                                                            <h4>{{item.NAME}}</h4>
                                                            <template v-if="item.EXPRESSION">
                                                                <p>{{item.EXPRESSION}}</p>
                                                            </template>
                                                            <template v-if="item.EVENT_SUBJECT">
                                                                <p>{{item.EVENT_SUBJECT}}</p>
                                                            </template>
                                                        </div>
                                                        <template>
                                                            <div class="dropdown float-right">
                                                                <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                    <b-dropdown-item :href="`#/edit/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.ID}`">Edit</b-dropdown-item>
                                                                    <b-dropdown-item @click="_trigger('triggers', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                    <b-dropdown-item :href="`#/app/copy/${$route.params.cloudId}/${$route.params.appId}/copyworkflow/${item.ID}`">Copy</b-dropdown-item>
                                                                </b-dropdown>
                                                            </div>
                                                        </template>

                                                    </div>
                                                    <div class="trigger-content">
                                                        <template v-if="item.WORKFLOW_NAME">
                                                            <span class="icon icon-workflows"></span>
                                                            <h6>{{item.WORKFLOW_NAME}}</h6>
                                                        </template>
                                                        <template v-if="item.CREATE_DATE">
                                                            <p>Created on {{item.CREATE_DATE}}</p>
                                                        </template>
                                                        <template v-if="item.CREATED_BY">
                                                            <p>Created by {{item.CREATED_BY}}</p>
                                                        </template>
                                                        <template v-if="item.UPDATE_DATE">
                                                            <p>Last upated on {{item.UPDATE_DATE}}</p>
                                                        </template>
                                                    </div>
                                                </a>
                                            </template>
                                            <template v-if="item.IS_WRITABLE!=1">
                                                <a class="underline-none" :href="`#/editworkflowType/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`">
                                                    <div class="trigger-title clearfix">
                                                        <div class="float-left">
                                                            <h4>{{item.NAME}}</h4>
                                                            <template v-if="item.EXPRESSION">
                                                                <p>{{item.EXPRESSION}}</p>
                                                            </template>
                                                            <template v-if="item.EVENT_SUBJECT">
                                                                <p>{{item.EVENT_SUBJECT}}</p>
                                                            </template>
                                                        </div>
                                                        <template>
                                                            <div class="dropdown float-right">
                                                                <b-dropdown id="ddown1" text="..." class="outline-more">
                                                                    <b-dropdown-item :href="`#/editworkflowType/workflow/${$route.params.cloudId}/${$route.params.appId}/${$route.params.entity}/${item.IS_WRITABLE}/${item.ID}`">Edit</b-dropdown-item>
                                                                    <b-dropdown-item @click="_trigger('triggers', 'exec', 'grid_delete', {'key': `${item.ID}`, 'entity': `${$route.params.entity}`})">Delete</b-dropdown-item>
                                                                    <b-dropdown-item :href="`#/app/copy/${$route.params.cloudId}/${$route.params.appId}/copyworkflow/${item.ID}`">Copy</b-dropdown-item>
                                                                </b-dropdown>
                                                            </div>
                                                        </template>

                                                    </div>
                                                    <div class="trigger-content">
                                                        <template v-if="item.WORKFLOW_NAME">
                                                            <span class="icon icon-workflows"></span>
                                                            <h6>{{item.WORKFLOW_NAME}}</h6>
                                                        </template>
                                                        <template v-if="item.CREATE_DATE">
                                                            <p>Created on {{item.CREATE_DATE}}</p>
                                                        </template>
                                                        <template v-if="item.CREATED_BY">
                                                            <p>Created by {{item.CREATED_BY}}</p>
                                                        </template>
                                                        <template v-if="item.UPDATE_DATE">
                                                            <p>Last upated on {{item.UPDATE_DATE}}</p>
                                                        </template>
                                                    </div>
                                                </a>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </appup-card>

                </section>
            </div>
        </div>
        <!-- Page content end -->
        <div class="push"></div>
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
    trigger_count:{},
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