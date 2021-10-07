<template>
  <appup-upload name="upload" type="image" :uploadConfig="uploadConfig" custom_file_name = "file_name_chnaged" />
</template>
<script>
export default {
  data() {
    return {
      uploadConfig: {
        buttonClass: "btn-primary",
        divClass: "mid-center",
        buttonName: "Upload File",
        url:"https://ga.500apps.com/g/storage/track/get-signed-link/registration?file=",
        id: "file_id",
        name: "file",
        image_source: "https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm",
        imagePreviewConfig:{"height": "300px","width": "300px"},
        size: 1
      }
    };
  }
};
</script>