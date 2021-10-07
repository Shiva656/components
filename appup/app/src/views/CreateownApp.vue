<template>
  <div>
    <div class="page-wrapper">
      <!-- Header start -->
      <Navbar />
      <!-- Header end -->

      <!-- Page content start -->
      <div class="page-content">
        <div class="container clearfix">
          <div class="page-title clearfix">
            <div class="float-left">
              <button
                type="button"
                class="btn btn-outline-secondary bg-white"
                @click="$router.go(-1)"
              >
                <span class="icon-arrow-left"></span>
              </button>
              <h1>Add App</h1>
            </div>
          </div>

          <section class="block">
            <div class="row">
              <div class="col-12">
                <b-input-group size="md" class="mb-2">
                  <label>
                    <strong>Client Id</strong>
                  </label>
                  <br />
                  <b-form-input
                    aria-placeholder="Client Id"
                    name="client_id"
                    aria-label="Large text input"
                  ></b-form-input>
                </b-input-group>
                <b-input-group size="md" class="mb-2">
                  <b-form-input
                    aria-placeholder="Gihub access token"
                    :value="token"
                    disabled
                    aria-label="Large text input"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      size="sm"
                      text="Button"
                      variant="success"
                      @click.prevent="redir_git"
                    >Github</b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </section>
        </div>
        <div class="push"></div>
      </div>
      <!-- Page content end -->
    </div>

    <!-- Appup footer start -->
    <AppupFooter />
    <!-- Appup footer end -->
  </div>
</template>
<script>
// Import components and libraries

import AppupHeader from "./AppupHeader.vue";
import AppupFooter from "./Appupfooter.vue";
import Navbar from "./Navbar.vue";
import axios from "axios";
// Export components

export default {
  components: {
    AppupHeader,
    Navbar,
    AppupFooter
  },
  data() {
    return {
      token: "34355532567",
      client_id: "f95c96fea3d9063f9c32",
      client_secret: "46a50a42178ccdfcdf708eaffd24cdb0fe701b40"
    };
  },
  methods: {
    redir_git: function() {
      window.location.href =
        "https://github.com/login/oauth/authorize?response_type=code&client_id=" +
        this.client_id +
        "&scope=repo+write:packages+read:packages+delete:packages+admin:org+admin:public_key+admin:repo_hook+admin:org_hook+user";
    }
  },
  created: function() {
    debugger;
    console.log(this.$route);
    if (window.location.search) {
      let code = window.location.search.replace("?code=", "");
      try {
        axios({
          method: "post",
          url: "https://github.com/login/oauth/access_token",
          withCredentials: true,
          credentials: "include",
          data: {
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: code
          }
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
