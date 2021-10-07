
<template>
  <div>
    <apps-profile
      :formCongif="test"
      url="http://www.json-generator.com/api/json/get/bVsbgSrtXC?indent=2"
      @submit="testA"
    ></apps-profile>
  </div>
</template>

<script>
import ChangePasswordVue from "../src/components/500-components/change_password/ChangePassword.vue";
export default {
  methods: {
    testA(formdata) {
      console.log(formdata);
      alert(formdata);
    }
  },

  data() {
    return {
      test: {
        uploadConfig: {
          buttonClass: "btn-primary",
          divClass: "mid-center",
          buttonName: "Upload File",
          url: "https://qa.build.ly/upload?file_name=",
          id: "file_id",
          name: "file_name"
        },
        routes: {
          changepassword: "/change-password"
        },
        countrycode: [
          {
            value: 91,
            text: 91
          },
          {
            value: 0,
            text: 0
          },
          {
            value: 33,
            text: 33
          },
          {
            value: 22,
            text: 22
          },
          {
            value: 11,
            text: 11
          }
        ],
        language: [
          {
            value: null,
            text: "Select Language"
          },
          {
            value: "English",
            text: "English"
          },
          {
            value: "Espanol",
            text: "Espanol"
          },
          {
            value: "Espanol",
            text: "Espanol"
          },
          {
            value: "Italiano",
            text: "Italiano"
          }
        ],
        currency: [
          {
            value: null,
            text: "Select Currency"
          },
          {
            value: "a",
            text: "Albania Lek"
          },
          {
            value: "b",
            text: "Afghanistan Afghani"
          },
          {
            value: {
              C: "3PO"
            },
            text: "Argentina Peso"
          }
        ],
        timezone: [
          {
            value: null,
            text: "Select Timezone"
          },
          {
            value: "Asia/Kabul",
            text: "Asia/Kabul"
          },
          {
            value: "Europe/Mariehamn",
            text: "Europe/Mariehamn"
          },
          {
            value: "Europe/Tirane",
            text: "Europe/Tirane"
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>
