<template>
  <div>
    <div>
      <div class="container-fluid">
        <div class="row justify-content-center align-items-stretch">
          <div class="mt-1 pb-4 col-xl-10">
            <div class="bg-white rounded">
              <div class="row">
                <div class="border-right col px-5 py-4 col-lg-6">
                  <h5 class="text-secondary mt-2 pt-1 pb-1">User photo</h5>
                  <div class="pt-5 pl-lg-3">
                    <appup-upload
                      id="hemanth"
                      ref="file"
                      :upload-congif="formCongif.uploadConfig"
                      v-model="formData.user_image"
                      class="pb-5 ml-4"
                      style="display:none;"
                    ></appup-upload>

                    <div class="container" v-if="show">
                      <img
                        :src="formData.user_image"
                        alt="Avatar"
                        class="image"
                        style="width:100%"
                        @click="$refs.file.$refs.file.click()"
                      />
                      <div class="middle">
                        <div class="text" @click="$refs.file.$refs.file.click()">Change</div>
                      </div>
                    </div>
                    <button
                      v-if="!show"
                      type="button"
                      class="btn add-logo-btn rounded-circle mx-auto btn-secondary"
                      @click="$refs.file.$refs.file.click()"
                    >
                      <i class="fal fa-plus"></i>
                    </button>
                  </div>
                  <div></div>
                </div>
                <div class="px-4 pt-4 pb-5 col-lg-6">
                  <div class="px-2 pt-2 mt-1">
                    <h5 class="text-secondary mb-4">User information</h5>

                    <b-form @submit="serializeForm">
                      <b-form-group label="Account Owner:">
                        <b-form-input
                          v-model="formData.account_owner"
                          type="text"
                          required
                          placeholder="Enter your super admin name"
                          disabled
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group label="Company:">
                        <b-form-input
                          v-model="formData.company"
                          type="text"
                          required
                          placeholder="Enter the Company Name"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group label="Email:">
                        <b-form-input
                          v-model="formData.email"
                          type="email"
                          required
                          placeholder="Enter your Email id"
                          disabled
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group label="Gender:">
                        <b-form-radio-group v-model="formData.gender">
                          <b-form-radio value="male">Male</b-form-radio>
                          <b-form-radio value="female">Female</b-form-radio>
                        </b-form-radio-group>
                      </b-form-group>
                      <b-form-group label="Phone:">
                        <b-input-group>
                          <b-form-input v-model="formData.phone_number" type="number"></b-form-input>

                          <b-form-select
                            v-model="formData.phone_country_code"
                            :options="formCongif.countrycode"
                            slot="prepend"
                          ></b-form-select>
                        </b-input-group>
                      </b-form-group>
                      <b-form-group id="input-group-3" label="Timezone:" label-for="Timezone">
                        <b-form-select
                          v-model="formData.timezone"
                          :options="formCongif.timezone"
                          required
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group id="input-group-3" label="Language:" label-for="input-3">
                        <b-form-select
                          v-model="formData.language"
                          :options="formCongif.language"
                          required
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group id="input-group-3" label="Currency:" label-for="input-3">
                        <b-form-select
                          v-model="formData.currency"
                          :options="formCongif.currency"
                          required
                        ></b-form-select>
                      </b-form-group>
                      <b-form-group label="Password:">
                        <div>
                          <a :href="formCongif.routes.changepassword">Change password</a>
                        </div>
                      </b-form-group>

                      <div class="d-flex justify-content-end pt-3">
                        <button type="button" @click="emitBack" class="btn btn-primary mr-2">Back</button>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          @submit="serializeForm"
                        >Save Changes</button>
                      </div>
                    </b-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-profile",
  props: {
    url: {
      type: String,
      required: false
    },
    formCongif: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {},
      mainProps: { width: 150, height: 100, class: "m1" }
    };
  },
  created() {
    this.apicall();
  },
  methods: {
    serializeForm(evt) {
      evt.preventDefault();
      this.$emit("submit", this.formData);
    },
    emitBack(evt) {
      evt.preventDefault();
      this.$emit("back");
    },
    apicall() {
      let _this = this;

      // axios.get(_this.url,{ withCredentials: true, credentials: 'include' }).then(function(response) {
      // _this.$appupajax
      //   .get2(_this.url, {}, { withCredentials: true, credentials: "include" })
        _this.$appupajax.get2(_this.url, {}, {}, {withCredentials: true, credentials: "include" })
        .then(_self.$appupajax.handleResponse)
        .then(response => {
          _this.formData = response.data;
        });
    }
  },
  computed: {
    show() {
      return this.formData.user_image != null;
    }
  }
};
</script>
<style scoped>
.add-logo-btn {
  border: 1px dashed rgba(194, 203, 225, 0.4);
  background-color: #f6f9ff;
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-logo-btn:hover {
  background-color: #f6f9ff !important;
}

.add-logo-btn i {
  color: #c2cbe1;
  font-size: 35px;
}

.container {
  position: relative;
  width: 50%;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .image {
  opacity: 0.3;
}

.container:hover .middle {
  opacity: 1;
}

.text {
  color: rgba(44, 46, 46, 0.808);
  font-size: 16px;
  padding: 16px 32px;
}
</style>
