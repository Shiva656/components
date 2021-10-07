<template>
  <div class="ui container">
    <div class="py-3 d-flex justify-content-between align-items-center flex-column flex-md-row">
      <div class="d-flex align-items-end">
        <!-- <input type="checkbox" @click="selectAll($event)"> -->
        <h3 class="ml-2 mb-0 d-inline">All Contacts</h3>
        <div class="d-inline-block">
          <b-dropdown
            id="docddown1"
            variant="link text-decoration-none text-secondary align-items-center d-flex px-2 pb-1"
            class="mx-md-2"
            no-caret
          >
            <template slot="button-content">
              <i class="fal fa-angle-down fa-lg"></i>
            </template>
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary mr-2"
          ref="sendemail"
          @click="sendemail()"
        >Send Email</button>
        <button type="button" class="btn btn-danger" @click="onAction('delete')">Delete All</button>
      </div>
    </div>

    <appup-table
      class="table-responsive d-md-table border"
      ref="table"
      api-url="https://vuetable.ratiw.net/api/users"
      :fields="fields"
      pagination-path
      @pagination-data="onPaginationData"
    >
      <!-- show image, name and nickname -->
      <template slot="picture" slot-scope="props">
        <div class="media align-items-center">
          <!-- <img :src="props.rowData.picture" class="rounded-circle" alt="" width="50" height="50"> -->
          <appup-avatar class="mr-2" :username="props.rowData.name" size="40"></appup-avatar>
          <div class="media-body">
            <h6 class="mb-0">{{props.rowData.name}}</h6>
            <p class="mb-0 small text-muted">{{props.rowData.nickname}}</p>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-4 col-md-4">
             <img :src="props.rowData.picture" class="rounded-circle" alt="" width="50" height="50"> 
            <appup-avatar :username="props.rowData.name"></appup-avatar>
          </div>
          <div class="col-8 col-md-8">
            <span>{{props.rowData.name}}</span>
            <p>{{props.rowData.nickname}}</p>
          </div>
        </div>-->
      </template>
      <!-- delete action -->
      <template slot="actions" slot-scope="props">
        <div class="custom-actions">
          <!-- <button
            class="btn btn-danger"
            @click="onAction('delete-item', props.rowData, props.rowIndex)"
          >Delete</button>-->

          <div>
            <b-dropdown
              id="docddown1"
              variant="link align-items-center d-flex px-2 text-decoration-none"
              class="mx-md-2"
              right
              no-caret
            >
              <template slot="button-content">
                <i class="fal fa-ellipsis-h fa-lg"></i>
              </template>
              <b-dropdown-item
                @click="onAction('delete-item', props.rowData, props.rowIndex)"
              >Delete</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </template>
    </appup-table>

    <!-- pagination -->
    <div class="mt-3">
      <appup-pagination ref="pagination" class="float-right" @pagination:change-page="onChangePage"></appup-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        {
          name: "__checkbox"
        },
        {
          name: "__slot:picture",
          title: "Picture"
        },
        {
          name: "email"
        },
        {
          name: "address.mobile",
          title: "Mobile"
        },
        {
          name: "age"
        },
        {
          name: "__slot:actions",
          title: "Actions"
        }
      ]
    };
  },

  methods: {
    sendemail() {
      console.log(JSON.stringify(this.$refs.table.selectedTo));
    },
    //select all checkboxes
    selectAll(event) {
      let isChecked = event.target.checked;
      this.$refs.table.toggleAllCheckboxes("__checkbox", {
        target: { checked: isChecked }
      });
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.table.changePage(page);
    },
    // delete bulk action rows and single row
    onAction(action, data, index) {
      if (action == "delete-item") {
        this.$refs.table.tableData.splice(index, 1);
        this.$refs.table.selectedTo.splice(0, 1);
      }
      if (action == "delete") {
        this.$refs.table.tableData = this.$refs.table.tableData.filter(
          tdata => this.$refs.table.selectedTo.indexOf(tdata.id) === -1
        );
      }
    }
  }
};
</script>
<style>
/* .vuetable tbody td {
  overflow: hidden;
  text-overflow: ellipsis;
} */

.vuetable thead {
  background-color: #f8f9fa;
}
.vuetable td,
.vuetable th {
  vertical-align: middle;
}
.vue-avatar {
  /* width: 40px !important;
  height: 40px !important;
  font-size: 14px !important; */
}
.dropdown-toggle::after {
  border:0px !important;
}
/* Custom checkbox */
input[type="checkbox"] {
  position: relative;
  display: inline-block;
  vertical-align: top;
  outline: none;
  height: 14px;
  width: 14px;
  margin: 3px;
  color: #007bff;
  cursor: pointer;
}
input[type="checkbox"]:active,
input[type="checkbox"]:focus {
  outline: none;
}
input[type="checkbox"]:after {
  display: block;
  content: "";
  height: 20px;
  width: 20px;
  line-height: 16px;
  color: #ffffff;
  text-align: center;
  background-color: #ffffff;
  border-radius: 3px;
  border: 2px solid #e7eef0;
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 2;
  cursor: pointer;
}
input[type="checkbox"]:checked {
  color: #007bff;
}
input[type="checkbox"]:checked:after {
  font-family: "Font Awesome 5 Pro";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -webkit-font-feature-settings: "liga";
  font-feature-settings: "liga";
  content: "\f00c";
  font-size: 13px;
  padding-top: 1px;
  color: #ffffff;
  background-color: #007bff;
  border-color: #007bff;
  z-index: 3;
  cursor: pointer;
}
</style>
