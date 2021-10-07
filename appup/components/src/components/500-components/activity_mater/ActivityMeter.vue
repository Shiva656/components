<template>
  <div>
    <div class="activity_meter">
      <b-dropdown variant="transparent" size="lg" no-caret>
        <template slot="button-content">
          <span>
            <i class="fab fa-bandcamp fa-2x"></i>
          </span>
        </template>

        <b-dropdown-item href="#">
          <button class="dropdown-item" type="button">
            <div class="d-flex justify-content-between">
              <div class="p-2 bd-highlight pl-0 pt-3 mt-1">
                <small class="font-weight-bold">New here?</small>
                <span class="small text-secondary">Get shared in mins.</span>
              </div>
              <div class="p-2 bd-highlight">
                <appup-chart :config="chartData" v-if="meterData != null" />
              </div>
            </div>
          </button>
        </b-dropdown-item>
        <template v-for="(item,index) in meterData.activityList" v-if="meterData != null">
          <b-dropdown-item href="#" :key="index">
            <button class="dropdown-item" type="button">
              <div class="d-flex justify-content-between bg-light pl-0">
                <div class="p-2 bd-highlight">
                  <a href="#" class="text-decoration-none text-secondary">
                    <i :class="item.activityIcon"></i>
                    <small>{{item.activityLabel}}</small>
                  </a>
                </div>
                <div class="p-2 bd-highlight text-secondary" v-if="item.completed ==100">
                  <i class="fas fa-check text-success"></i>
                </div>
                <div class="p-2 bd-highlight text-secondary" v-else>
                  <small>(+{{item.completed}}%)</small>
                </div>
              </div>
            </button>
          </b-dropdown-item>
        </template>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as Cookie from "tiny-cookie";
export default {
  name: "ActivityMeter",

  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      meterData: null
    };
  },
  created() {
    this.apicall();
  },
  methods: {
    // get data from url
    apicall() {
      let _this = this;

      let cookieValue = Cookie.get("token");

      // axios
      //   .get(_this.url, {
      //     headers: {
      //       crossdomain: true,
      //       token: cookieValue
      //     }
      //   })
      //   .then(function(response) {

      // _this.$appupajax
      //   .get2(
      //     _this.url,
      //     {},
      //     {
      //       crossdomain: true,
      //       token: cookieValue,
      //       withCredentials: true,
      //       credentials: "include"
      //     }
      //   )
        _this.$appupajax.get2(_this.url, {}, {}, {crossdomain: true,token: cookieValue,withCredentials: true, credentials: "include" })
        .then(_this.$appupajax.handleResponse)
        .then(response => {
          _this.meterData = response.data;
        });
    }
  },
  computed: {
    chartData() {
      return {
        chart: {
          type: "pie",
          plotShadow: false,
          backgroundColor: null,
          height: 45,
          width: 55
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            innerSize: "98%",
            borderWidth: 6,
            size: 35,
            borderColor: null,
            slicedOffset: 20,
            dataLabels: {
              connectorWidth: 0
            }
          }
        },
        title: {
          verticalAlign: "center",
          floating: true,
          text: this.meterData.totalCompleted + "%",
          align: "center",

          style: {
            color: "#7bf316",
            fontSize: "15 px"
          }
        },
        legend: {},
        series: [
          {
            data: [
              { name: "", y: this.meterData.totalCompleted, color: "#7bf316" },
              { name: "", y: this.meterData.totalPending, color: "#dae8cd" }
            ]
          }
        ]
      };
    }
  }
};
</script>

<style>
.activity_meter .dropdown-toggle::after {
  border-top: 0px solid rgba(247, 241, 241, 0) !important;
  padding: 0px !important;
  border-left: 0em solid transparent !important;
  border-right: 0em solid !important;
}
</style>
