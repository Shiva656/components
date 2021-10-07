<template>
  <div class="">
    <appup-quilljs v-model="test" s3presignurl="/test" :config="config" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: '<div id="editor-container"><p>Quill uses classes for most inline styles.</p> <p><br></p><p>The exception is <span class="ql-bg-yellow">background</span> and <span class="ql-color-purple">color</span>,</p><p>where it uses inline styles.</p> <p><br></p><p>This <span style="font-size: 18px">demo</span> shows how to <span style="font-size: 32px">change</span> this.</p></div>',
      config: {modules: { toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["link", "image"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"] // remove formatting button
          ]
        }
      }
    };
  }
};
</script>

<style>
.quill {
  background: red;
}
</style>
