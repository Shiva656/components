<template>
    <div>
        <div class="container">

            <appup-card id="1" label="ID" :actions="actions" preload="preload_grid" sortKey="CATEGORY_ID">

                <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                <template slot="sections" slot-scope="{ sortedData }" >   
                    
                    <!-- Loop through sorted data -->
                    <template v-for="(items, sort_key) in sortedData">

                        <!-- Header -->
                        <div class='cat_name'>
                            <h4>Category Key {{sort_key}}</h4>
                        </div>

                        <!-- Items -->
                        <table class="table">
                            <tbody>
                            <tr v-for="item in items">
                                    <td v-for="(value, key) in item">{{value}}</td>
                            </tr>
                            </tbody>
                        </table>


                    </template>
                    
                </template>

            </appup-card>

            <hr/> <h4>Without Sort Key </h4>
            <!-- Without Sort Key -->
            <appup-card id="1" label="ID" :actions="actions" preload="preload_grid">

                <!-- Slot for Card - pass the template so that we can change it tomorrow as we need -->
                <template slot="section" slot-scope="{ sortedData }" >   
                    <!-- Items -->
                        <table class="table">
                            <tbody>
                            <tr v-for="item in sortedData">
                                    <td v-for="(value, key) in item">{{value}}</td>
                            </tr>
                            </tbody>
                        </table>

                    
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