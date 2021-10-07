<template>
  <div>
    <b-form @submit="sendData">
      <label for="Old password/Verification code">Old password/Verification code:</label>
      <b-input
        v-model="formData.old_password"
        id="old_password/Verification code"
        type="password"
        class="form-control"
        placeholder="Enter old password/verification code"
        required
      ></b-input>
      <b-button class="float-right" @click.prevent="sendCode" variant="link">Send Verification Code</b-button>
      <label for="New Password">New Password:</label>
      <b-input
        class="form-control"
        v-model="formData.new_password"
        id="new_password"
        type="password"
        placeholder="Enter new password"
        required
      ></b-input>
      <b-form-invalid-feedback
        :state="validatePassword"
      >Your password must have 8 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</b-form-invalid-feedback>
      <label for="Confirm Password">Confirm Password:</label>
      <b-input
        class="form-control"
        v-model="formData.confirm_password"
        id="confirm_password"
        type="password"
        placeholder="Enter confirm password"
        required
      ></b-input>
      <b-form-invalid-feedback
        :state="validate_confirm"
        v-if="formData.confirm_password.length >= 4"
      >Confirm Password is not same</b-form-invalid-feedback>
      <br>
      <b-button type="submit" variant="primary" :disabled="enable">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "change-password",
  props: {
    oldpassword: {
      type: String
    },
    verificationcode: {
      type: String
    }
  },
  data() {
    return {
      old_password: "",
      regularExpression: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
      formData: {
        new_password: "",
        confirm_password: ""
      }
    };
  },
  methods: {
    sendData(evt) {
      evt.preventDefault();
      console.log(this.formData)
      this.$emit("submit", this.formData);
    },
    sendCode() {
      this.$emit("sendVerificationCode", this.formData);
    }
  },
  computed: {
    validate_confirm() {
      if (this.formData.new_password == this.formData.confirm_password) {
        return true;
      } else {
        return false;
      }
    },
    validatePassword() {
      if (!this.regularExpression.test(this.formData.new_password)) {
        return false;
      } else {
        return true;
      }
    },
    enable() {
      if (this.validatePassword && this.validate_confirm) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
</style>
