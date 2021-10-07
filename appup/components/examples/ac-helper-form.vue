<template>
  <div>
    <ac-helper-form v-model="form.fields"></ac-helper-form>
    <br />
    <br />
    {{form}}
    <appup-form :form-json="form" ref="appupForm" v-model="test" />
    {{test}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fields: [
          {
            type: "text",
            name: "file_name",
            label: "Label"
          },
          {
            type: "upload",
            name: "upload",
            label: "upload",
            custom_file_name: "form.file_name",
            uploadConfig: {
              buttonClass: "btn-primary",
              divClass: "mid-center",
              buttonName: "Upload File",
              url: "https://cmsapps.500apps.com/websitecms/presign?file_name=",
              id: "file_id",
              name: "file_name",
              image_source:
                "https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm",
              imagePreviewConfig: {
                height: "300px",
                width: "300px"
              },
              size: 1
            }
          }
        ]
      },
      test: {}
    };
  }
};
</script>

<style>
</style>
