<template>
    <div>
        <div class="container">
            <appup-card id="1" label="ID" :actions="actions" preload="preload_grid" sortKey="CATEGORY_ID">

                    <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                    <template slot="sections" slot-scope="{ sortedData }" >   
                        
                        <!-- Loop through sorted data -->
                        <template v-for="(items, sort_key) in sortedData">

                            <div>
                                <hr/>
                                <!-- Header -->
                                <h4>Category Key {{sort_key}}</h4>

                                
                                <!-- Items -->
                                <template v-for="item in items">
                                    <div><h4>Name {{item.NAME}}</h4></div>
                                </template>
                            </div>

                        </template>
                        
                    </template>

                </appup-card>
        </div>
    </div>
</template>
<script>
export default {
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