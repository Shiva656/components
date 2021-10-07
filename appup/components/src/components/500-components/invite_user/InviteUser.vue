<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Link" active>
        <p class="small">The below link expires after 1hr. use before it expires.</p>
        <div class="small">
          <span>URL:</span>
          <b-button  variant="link">{{inviteurl}}</b-button>
        </div>
      </b-tab>
      <b-tab title="Email">
        <b-form @submit="sendData">
          <div class="form-group">
            <label>Send To</label>
            <input type="text" v-model="formData.email" class="form-control" >
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea class="form-control" v-model="formData.message" rows="4"></textarea>
          </div>
          <b-button type="submit" variant="primary" @submit="sendData">Send</b-button>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "InviteUser",
  props: {
    inviteurl: {
      type: String,
    }
  },
  data() {
      return {
          formData:{
              email:"",
              message:""
          }
      }
  },
  methods: {
      sendData(evt) {
      evt.preventDefault();
      console.log(this.formData)
      
      this.$emit("sendmessage", this.formData);
    },
  },
};
</script>

<style>
</style>
