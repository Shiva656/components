<template>
  <div>
    <appup-select
      id="id"
      name="name"
      :options="option"
      :disabled="disable"
      :refresh_icon="refreshIcon"
      v-model="dp"
      @input="onInput"
      url="https://jsonplaceholder.typicode.com/posts"
      key_value = "id" 
      key_label = "title"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      refreshIcon:true,
      disable:false,
      option: [
        {
          value: null,
          label: "Please select an option"
        },
        {
          value: 1,
          label: "Javascript"
        },
        {
          value: 2,
          label: "Java"
        },
        {
          value: 4,
          label: "Ruby"
        },
        {
          value: 5,
          label: "PHP",
          disabled: true
        }
      ],
      dp: 1
    };
  },
  methods:{
    onInput: function(data){
      console.log("input selected is ",data);
    }
  }
};
</script>

<style>
</style>
