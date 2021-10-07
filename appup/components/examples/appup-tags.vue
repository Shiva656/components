<template>
    <div>
        <br><br>
         <appup-tags
                :id="id"
                :options="option"
                v-model="mdl"
                :url="url ? url : null"
                :key_value="key_value ? key_value : null"
                :key_label="key_label ? key_label : null"
              />
    </div>
</template>

<script>
export default {
    data(){
        return{
        "id": 90,
        "option": [
          {
            "value": null,
            "label": "Please select an option"
          },
          {
            "value": "js",
            "label": "Javascript"
           
          },
          {
            "value": "java",
            "label": "Java",
            "checked":true
          },
          {
            "value": "ruby",
            "label": "Ruby",
            "checked":true
          },
          {
            "value": "php",
            "label": "PHP",
            "disabled": true
          }
        ],
        "required": true,
        "mdl": [] 
        }
    }
}
</script>

<style>

</style>
