<template>
  <div class="appup-grid">
    <b-table striped hover :items="items" :fields="columns" show-empty :key="update_key">
      <template slot="actions" slot-scope="row">
        <a class="mr-2" @click.prevent="editRecord(row.item, row.index)">
          <i class="far fa-edit"></i>
        </a>
				<a class="mr-2" @click.prevent="copyRecord(row.item,row.index)">
					<i v-b-tooltip.hover title="Duplicate the field" class="far fa-clone"></i>
				</a>
				<a class="mr-2" @click.prevent="toggleRequired(row.item,row.index)">
					<i v-if="row.item.required" class="far fa-toggle-off" v-b-tooltip.hover title="Make required as false"></i>
					<i v-else class="far fa-toggle-on" v-b-tooltip.hover title="Make required as true"></i>
				</a>
        <a @click.prevent="deleteRecord(row.index)">
          <i class="fa fa-trash"></i>
        </a>
      </template>
      <template slot="empty" slot-scope="scope">{{scope.emptyText}}</template>
    </b-table>

    <b-button variant="outline-primary" @click="openModal()">{{buttonLabel}}</b-button>

    <b-modal
      no-close-on-backdrop
      no-close-on-esc
      ref="bModal"
      :id="'grid_record_modal_' + timestamp"
      title="Record"
      @hide="onModalHide"
    >
      <template slot="modal-footer">
        <b-button variant="primary" @click="onSave">Save</b-button>
      </template>

      <appup-form
        ref="appupForm"
        v-if="isModalShown"
        :form-json="gridFormJson"
        :form-data="currentForm"
        v-model="currentForm"
      />
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    buttonLabel: {
      type: String,
      default: "+"
    },
    columns: {
      type: Array,
      default: []
    },
    value: Array,
    formJson: Object
  },
  data() {
    return {
      currentForm: {},
      currentRecordIndex: -1,
      isModalShown: false,
      formData: {},
      items: [],
      timestamp: "",
			gridFormJson: { fields: [] },
			update_key:0
    };
  },
  created() {
    // uses to avoid duplicate b-modal id
    this.timestamp = new Date().getTime();
    this.setItems();

    //some cases formJson as array of fields(for form builder) so accepting both array and object
    if (Array.isArray(this.formJson)) {
      this.gridFormJson.fields = this.formJson;
    } else this.gridFormJson = this.formJson;
  },
  methods: {
    openModal() {
      this.formData = {};
      this.currentForm = {};
      this.showModal();
    },
    showModal() {
      this.$root.$emit(
        "bv::show::modal",
        "grid_record_modal_" + this.timestamp
      );
      this.isModalShown = true;
    },
    onModalHide() {
      this.currentRecordIndex = -1;
      this.isModalShown = false;
    },
    onSave() {
      // Check if form is valid
      this.$refs.appupForm.$validator.validateAll().then(isValid => {
        if (isValid) {
          if (this.currentRecordIndex !== -1) {
            Vue.set(
              this.items,
              this.currentRecordIndex,
              JSON.parse(JSON.stringify(this.currentForm))
            );
            this.$emit("input", this.items);
          } else {
            if (Object.keys(this.currentForm).length > 0) {
              this.items.push(JSON.parse(JSON.stringify(this.currentForm)));
              this.$emit("input", this.items);
            }
          }

          this.$refs.bModal.hide();
          this.$emit("saveRecord");
        }
      });
    },
    deleteRecord(index) {
      if (index > -1) {
        this.items.splice(index, 1);
        this.$emit("input", this.items);
      }
		},
		copyRecord(item, index) {
		 this.items.push(item)
		 this.$emit("copy", this.items);
		},
		toggleRequired(item, index){
			item.required = !item.required;
			this.update_key++;
			this.formData = JSON.parse(JSON.stringify(this.items));
			this.$emit("input", this.items);
		},
    editRecord(item, index) {
      this.formData = JSON.parse(JSON.stringify(item));
      this.currentForm = JSON.parse(JSON.stringify(item));
      this.currentRecordIndex = index;
      this.showModal();
    },
    /**
     * Component user can add data to the grid
     * @param {Array} items - Array of Objects
     */
    addData(items) {
      this.items = this.items.concat(items);
      this.$emit("input", this.items);
    },
    setItems() {
      try {
        // if valid JSON string parse
        this.items = JSON.parse(this.value);
      } catch (e) {
        if (typeof this.value === "string") {
          this.items = [];
        } else {
          this.items = this.value ? this.value : [];
        }
      }
    }
  },
  watch: {
    value(val) {
      this.setItems();
    },
    formJson(val) {
      //some cases formJson as array of fields(for form builder) so accepting both array and object
      if (Array.isArray(val)) {
        this.gridFormJson.fields = val;
      } else this.gridFormJson = val;
    }
  }
};
</script>