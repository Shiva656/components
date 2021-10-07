<template>
  <div>
    <appup-section :rule_json="ruleJson" :show_close_label="false" :show_add_label="false" @drag-drop="emit_drag" :prefill_data="editedData" :button_options="btn_labels" v-model="editedData"></appup-section>
  </div>
</template>

<script>
export default {
  methods:{
    emit_drag(data){
      debugger;
      console.log(data)
    }
  },
  data() {
    return {
      btn_labels:{
        add_label:"Add Rule label",
		close_label:"Close Label",
		show_add_icon:true,
		show_close_icon:true,
		add_icon:"fal fa-plus",
		close_icon:"fa fa-times",
		add_label_class:"bg-info"

      },
       ruleJson: {
		limit:3,
        controls: [
          {
            controlType: "text",
            placeholder: "Enter",
            label: "Name",
            name: "name"
          },
          {
            controlType: "text",
            placeholder: "Enter",
            label: "Last name",
            name: "last_name"
          },
          {
            controlType: "select",
            placeholder: "Enter",
            label: "Select",
            name: "select",
            url: "https://jsonplaceholder.typicode.com/posts",
            key_value: "id",
            key_label: "title",
          },
          {
            controlType: "text",
            placeholder: "Enter",
            label: "Email",
            name: "email"
          }
        ]
      },
      editedData: [
        {
          name: "john",
          last_name: "kenedy",
          select:"2",
          email: "john@yopmail.com"
        },{
          name: "tim",
          last_name: "tom",
          select:"7",
          email: "tim@yopmail.com"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
