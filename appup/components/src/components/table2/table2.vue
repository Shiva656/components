<template>
  <div class="ui container">
      <div>
          <input type="checkbox" @click="selectAll($event)">AllContacts
          <button type="button" class="btn btn-primary" ref="sendemail" @click="sendemail()">SendEmail</button>
          <button type="button" class="btn btn-danger" @click="onAction('delete')">DeleteAll</button>
      </div>
    <vuetable ref="vuetable"
      :api-url="apiUrl"
      :fields="fields"
      pagination-path=""
      @vuetable:pagination-data="onPaginationData"
      :css="css.table"
    >
    <!-- show image, name and nickname -->
    <template slot="picture" slot-scope="props">
      <div class="row">
        <div class="col-4 col-md-4">
          <img :src="props.rowData.picture" class="rounded-circle" alt="" width="50" height="50">
        </div>
        <div class="col-8 col-md-8">
          <span>{{props.rowData.name}}</span>
          <p>{{props.rowData.nickname}}</p>
        </div>
      </div>
    </template>
      <!-- delete action -->
    <template slot="actions" slot-scope="props">   
      <div class="custom-actions">
        <button class="btn btn-danger" 
          @click="onAction('delete-item', props.rowData, props.rowIndex)">
          delete
        </button>
      </div>
    </template>
    </vuetable>
    <!-- bootstrap4 pagination -->
    <div style="margin-top:10px">
			<vuetable-pagination ref="pagination"
				:css="css.pagination"
				class="pull-right"
				@vuetable-pagination:change-page="onChangePage"
			></vuetable-pagination>
		</div>

  </div>
</template>
<script>
import Vuetable from "./vuetable2/Vuetable";
import VuetableCssBootstrap from "./vuetable2/VuetableCssBootstrap4.js";
import VuetablePagination from "./vuetable2/VuetablePaginationBootstrap4.vue";
export default {
  name: "appup-table2",
  components: {
    Vuetable,
    VuetablePagination
  },
  props: {
    apiUrl: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      fields: [
        {
          name: "__checkbox"
        },
        {
          name: "__slot:picture",
          title: "picture"
        },
        {
          name: "email"
        },
        {
          name: "address.mobile",
          title: "mobile"
        },
        {
          name: "age"
        },
        {
          name: "__slot:actions",
          title: "Actions"
        }
      ],
      css: VuetableCssBootstrap
    };
  },
  methods: {
    sendemail() {
      console.log(JSON.stringify(this.$refs.vuetable.selectedTo));
    },
    //select all checkboxes
    selectAll(event) {
      let isChecked = event.target.checked;
      this.$refs.vuetable.toggleAllCheckboxes("__checkbox", {
        target: { checked: isChecked }
      });
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    // delete bulk action rows and single row 
    onAction(action, data, index) {
      if (action == "delete-item") {
        this.$refs.vuetable.tableData.splice(index, 1);
        this.$refs.vuetable.selectedTo.splice(0, 1);
      }
      if (action == "delete") {          
        this.$refs.vuetable.tableData = this.$refs.vuetable.tableData.filter(tdata => (this.$refs.vuetable.selectedTo.indexOf(tdata.id)) === -1);
      }
    }
  }
};
</script>
<style>
.vuetable tbody td {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
