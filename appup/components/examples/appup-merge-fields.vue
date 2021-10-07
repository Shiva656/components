<template>
  <div>
		<appup-merge-fields :controls="fieldsSet"></appup-merge-fields>
	</div>
</template>
<script>
export default {
	data () {
		return {
      fieldsSet:[
				{
          label: "Name",
					name: "name",
					append_key:"last_name",
					merges:[{
					controlType: "text",
          placeholder: "Enter",
					name: "last_name",
					class:"",
					value:"last name value"
				},{
            controlType: "select",
            placeholder: "Enter",
            label: "Select",
            name: "select",
            options:[{
						 label:'First Name',
						 value:'{{{first_name}}}'
						},{
						 label:'Last Name',
						 value:'{{{last_name}}}'
						}]
          }]
				},
				{
          label: "Email",
					name: "email",
					append_key:"last_email",
					merges:[{
					controlType: "text",
          placeholder: "Enter",
          label: "Last email",
          name: "last_email",
					value:''
				},{
            controlType: "select",
            placeholder: "Enter",
            label: "Select",
            name: "select",
            url: "https://jsonplaceholder.typicode.com/posts",
            key_value: "id",
            key_label: "title",
          }]
				}
			]
		}
	}
}
</script>