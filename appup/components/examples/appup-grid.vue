<template>
  <div>
    <appup-grid :columns="columns" :form-json="formJson" v-model="items" ref="ag"/>
    <a href="#" @click.prevent="addRecord">add</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" }
      ],
      columns: [
        { key: "age", label: "Age", sortable: true, class: "text-center" },
        {
          key: "first_name",
          label: "First Name",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "last_name", label: "Last Name" },
        { key: "actions", label: "" }
      ],
      formJson: {
        fields: [
          {
            type: "text",
            name: "age",
            label: "Age",
            required: true
          },
          {
            type: "text",
            name: "first_name",
            label: "First Name"
          },
          {
            type: "text",
            name: "last_name",
            label: "Last Name"
          }
        ]
      }
    };
  },
  methods: {
    addRecord() {
      this.$refs.ag.addData([{ age: 383, first_name: "Jamie", last_name: "Carneye" }]);
    }
  }
};
</script>

