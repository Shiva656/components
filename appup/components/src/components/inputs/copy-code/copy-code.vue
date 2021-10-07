<template>
  <div>
    <div class="d-flex justify-content-between mb-2">
      <div>
        <span>{{label}}</span>
      </div>
      <div>
        <span v-if="copy">
          <i @click="copyto_clipboard()" class="fal fa-copy mr-2 btn btn-outline-primary btn-sm border-0"></i>
        </span>
        <span v-if="share">
          <i @click="share_clipboard()" class="fal fa-share btn btn-outline-success btn-sm border-0"></i>
        </span>
      </div>
    </div>
    <b-form-textarea id="copy_code_input" v-model="copy_data" rows="3" max-rows="6" readonly="true"></b-form-textarea>
    
  </div>
</template>
<script>
export default {
  name: "appup-copycode",
  props: {
    copy: {
      type: Boolean,
      default: false
    },
    share: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required:false
    },
    copy_data: {
      type: String,
      default: ""
    },
    share_data: {
      type: String,
      default: ""
    }
  },
  methods:{
      copyto_clipboard(){
          let copy_text = document.getElementById("copy_code_input");
          copy_text.select();
          /* Copy the text inside the text field */
         document.execCommand("copy");
      },
      share_clipboard(){
          let value = {copy_code:this.copy_data,share_data:this.share_data}
          this.$emit('share',value);
      }
  }
};
</script>