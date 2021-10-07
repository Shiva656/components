<template>
  <div id="app" v-if="show">
    <!-- Icon/Button here  -->
    <div
      :class="{ circle: repelEffect}"
      @click="toggleDropdown"
      v-click-outside="outsideClick"
      :key="repelEffect"
    >
      <i v-bind:class="[icon,{metericon : repelEffect}]"></i>
      <span
        class="badge badge-primary meter-badge"
        :class="{'activity-badge':repelEffect}"
        v-if="showBadge"
      >{{items.length-countCompleted}}</span>
    </div>

    <!-- List view -->
    <div
      class="card text-center meter-360 dropdown-meter"
      :class="transitionClass"
      v-bind:style="displayItems"
    >
      <!-- Header-->
      <div class="card-header bg-transparent p-3">
        <h4 class="text-left font-weight-bold" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </h4>
        <b-progress v-if="showProgress" :value="percent" show-value :variant="progressVariant"></b-progress>
      </div>
      <!-- Container -->
      <div class="card-body scrollmeter p-0">
        <div
          class="media p-3 border-bottom hover-meter"
          v-for="(item, index) in items"
          :key="index"
          @click="event => checkHelp(event, item)"
        >
          <div
            class="py-2 px-2 meter-40 rounded mr-3 text-white"
            :class="'bg-'+colorVariants[Math.floor(Math.random() * (5 - 0 + 1)) + 0]"
          >
            <i class="pt-1 fa-lg" :class="item.icon"></i>
          </div>
          <div class="media-body text-left">
            <h6 class="mb-1">{{item.name}}</h6>
            <p class="small text-muted mb-0">{{item.desc}}</p>
          </div>
          <div class="ml-auto mt-2" v-if="item.completed">
            <i class="fal fa-check text-success fa-lg"></i>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <div class="card-footer bg-light p-3" v-if="hasFooterSlot">
        <h5 class="mb-0">
          <slot name="footer"></slot>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "onboard-meter",
  data: () => {
    return {
      displayItems: {
        visibility: "hidden",
        opacity: 0,
        position: "absolute"
      },
      show: true,
      countCompleted: 0,
      percent: 0,
      hasHeaderSlot: false,
      hasFooterSlot: false,
      repelEffect: true,
      colorVariants: [
        "success",
        "info",
        "warning",
        "danger",
        "primary",
        "secondary"
      ]
    };
  },
  directives: {
    ClickOutside
  },
  props: {
    /**
     * This is list of items
     */
    items: {
      type: Array,
      required: true
    },
    /**
     * This is main icon of component
     */
    icon: {
      type: String,
      default: "fal fa-tachometer-alt-average fa-lg"
    },
    /**
     * Show badge with count completed items.
     * see screen http://prntscr.com/njocsw
     */
    showBadge: {
      type: Boolean,
      default: true
    },
    /**
     * Show percentage
     * see screen http://prntscr.com/njoej7
     */
    showProgress: {
      type: Boolean,
      default: true
    },
    /**
     * Name of transition class for show items list.
     */
    transitionClass: {
      type: String,
      default: "defaultTransition"
    },
    /**
     * Hide component if all items is completed.
     */
    hideIfComplete: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.items.completed = false;
  },
  beforeMount() {
    // for each item request to end point and receive status of item
    for (let i = 0; i < this.items.length; i++) {
      fetch(this.items[i].url, {
        headers: this.headers,
        withCredentials: true, 
        credentials: 'include'
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.result === "success") {
            this.items[i].completed = true;

            if (this.items[i].completed) {
              this.countCompleted++;

              //re-calc percent
              this.percent = this.countCompleted / (this.items.length * 0.01);

              // Round off percentage
              this.percent = this.percent.toFixed(0);

              // Since toFixed() returns String convert again to INT
              this.percent = parseInt(this.percent);

              // show when all items is checked
              if (i === this.items.length - 1) {
                // check hide-if-complete attribute if true and completed all items, then hide component
                this.show = !(this.hideIfComplete && this.percent === 100);
              }
            }
          }
        })
        .catch(() => {
          this.$emit("error-fetch-item");
        });
    }
  },
  mounted() {
    let _this = this;
    setTimeout(function() {
      _this.repelEffect = false;
    }, 6000);

    if (this.$slots["header"]) {
      this.hasHeaderSlot = true;
    }
    if (this.$slots["footer"]) {
      this.hasFooterSlot = true;
    }
  },
  computed: {
    progressVariant() {
      if (this.percent <= 33) {
        return "danger";
      } else if (this.percent <= 66) {
        return "primary";
      } else {
        return "success";
      }
    }
  },
  methods: {
    /**
     * This method used in click event for component and show items.
     * @return void
     */
    showItems() {
      this.displayItems = {
        visibility: "visible",
        opacity: 1,
        display: "block",
        position: "absolute"
      };
    },
    /**
     * This method used in click event for component and hide items.
     * @return void
     */
    hideItems() {
      this.displayItems = {
        visibility: "hidden",
        opacity: 0,
        display: "none",
        position: "absolute"
      };
    },
    toggleDropdown() {
      if (this.displayItems.visibility == "visible") {
        this.hideItems();
      } else if (this.displayItems.visibility == "hidden") {
        this.showItems();
      }
    },
    outsideClick() {
      this.hideItems();
    },
    checkHelp(event, item) {
      event.preventDefault();
      if (typeof item.help !== "undefined") {
        if (/http:[\w\W]+|https:[\w\W]+/.test(item.help)) {
          window.open(item.help, "_blank");
        } else {
          this.$router.push(item.help);
        }
      }
    }
  }
};
</script>

<style>
.defaultTransition {
  transition: visibility 0s, opacity 0.5s linear;
}
.hover-meter:hover {
  background: #e2e6ea;
  cursor: pointer;
}

.scrollmeter {
  overflow-y: auto;
  max-height: 250px;
}

.meter-360 {
  width: 360px;
}
.meter-40 {
  width: 40px;
  height: 40px;
}
.dropdown-meter {
  box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, 0.15);
  z-index: 99;
}
.scrollmeter::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 8px rgba(199, 199, 199, 0.3);
  background-color: #fff;
}

.scrollmeter::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.scrollmeter::-webkit-scrollbar-thumb {
  background-color: #e5e2e2;
}
.activity-badge {
  position: absolute !important;
  top: 0px !important;
  left: 14px;
  font-size: 10px;
}
.meter-badge {
  position: absolute !important;
  font-size: 10px;
}

.metericon {
  position: absolute;
  top: 5px;
  right: 1px;
}
.circle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  -webkit-transition: height 0.3s ease, width 0.3s ease;
  transition: height 0.3s ease, width 0.3s ease;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-40%, 10%);
  left: 6px;
}

.circle:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 1px solid #a2ceffed;
  box-shadow: 0px 0px 10px #a2ceffed;
}

.circle:before {
  -webkit-animation: 2s linear infinite;
  animation: ripple 2s linear infinite;
}

@-webkit-keyframes ripple {
  0% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.25);
    opacity: 1;
  }
  75% {
    -webkit-transform: scale(1.5);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.75);
    opacity: 0;
  }
}

@keyframes ripple {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
    opacity: 1;
  }
  75% {
    -webkit-transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.75);
    opacity: 0;
  }
}
</style>
