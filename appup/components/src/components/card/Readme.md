###### Show Grid
```vue
<template>
    <appup-grid
      id="1"
      url="http://localhost:3000/datatable"
      label="first_name"
      description="address"
      reference="email"
      :actions="actions"
    />  
</template>
<script>
export default {
    data () {
        return {
          actions: [{
            label: "Edit",
            title: "click to Edit",
            action: "modal",
            modal: "viewModal"
          }, {
            label: "Delete",
            title: "click to Delete",
            action: "navigate",
            url: ":/employee/edit"
          }]
        }
    },
    computed: {

    },
    methods: {
    
    }
}
</script>
```