<template>
       <div class="appup-card-collection">
           <!-- Slot of sorted Data. If key was given, it will have key, array or just array -->
           <slot v-if="sortKey" name="sections" v-bind:sortedData="sortedData"/>

           <!-- Slot for normal data -->
           <slot v-else name="section" v-bind:sortedData="sortedData"/>


        <template v-if="sortKey" v-for="(items, sort_key) in sortedData">
          <template v-if="section">
             <div class="sub-block" :key="sort_key">
              <slot name="category-header" v-bind:sort_key="sort_key" v-bind:items="items"/>
              <slot name="card" v-bind:items="items" />
             </div>
          </template>
          <template v-else>             
            <section class="block apps-block" :key="sort_key" >
              <slot name="category-header" v-bind:sort_key="sort_key" v-bind:items="items" />
              <slot name="card" v-bind:items="items"  />
            </section>            
          </template>

        </template>
    </div>
</template>

<script>
import { AjaxRequests } from "../../mixins/ajaxRequests";
import { Workflow } from "../../mixins/workflow";
import HTTP from "axios";

let _groupBy = require('lodash.groupby');

/**
 * Appup Gridview component which can be used to display Grid items
 */
export default {
  name: "appup-card",
  mixins: [AjaxRequests, Workflow],
  props: {
    /**
     * Fetch data with url
     */
    url: {
      type: String,
      required: false
    },
    /**
     * Action items for grid item
     *
     * 'view','edit','delete'
     */
    actions: {
      type: Array,
      required: false
    },

    /**
     * URL to deserialize the grid initially.
     */
    preload: {
      type: String,
      required: false
    },
    section: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {},
  data() {
    return {
      data: [],
      sortedData: {},
      sortKey: "",
      search: null,
      delete_key: null
    };
  },
  methods: {
    clickAction(item, action) {
      if (action === "edit") {
        this.$router.push(this.edit.route + "/" + item[this.edit.key]);
      } else if (action == "delete") {
        console.log("delete id ", item[this.edit.key]);
      } else {
        return;
      }
    },
    filter() {
      let searchData = this.data;
      if (!this.search || !this.search.key || !this.search.tokens)
        return searchData;

      // Search Key & tokens
      searchData = this.data.filter(item => {
        let flag = false;
        this.search.tokens.forEach(token => {
          if (item[token])
            flag =
              flag ||
              item[token]
                .toLowerCase()
                .indexOf(this.search.key.toLowerCase()) != -1;
          else flag = false;
        });

        // console.log('Found ' + flag +  " " + this.search.key + " " + JSON.stringify(item))
        return flag;
      });

      return searchData;
    },
    refresh() {
      // Called when the original data or search key changes
      console.log("Sort key " + this.sortKey);
      console.log("Search key " + JSON.stringify(this.search));

      // Filter based on search
      const searchData = this.filter();

      // If sort key is there
      if (this.sortKey && this.data) {
        var self = this;
        this.sortedData = _groupBy(searchData, function(data) {
          return data[self.sortKey];
        });
      } else {
        console.log("No sort key");
        this.sortedData = searchData;
      }
      // console.log(this.sortedData);
    }
  },
  watch: {
    data(newVal, oldVal) {
      this.refresh();
    },
    search(newVal, oldVal) {
      this.refresh();
    }
  },
  mounted() {
    if (this.preload) this.start(this.preload);
  }
};
</script>