<template>
  <div
    class="ac-slideout modal fade in show"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
    ref="slideout"
    :size="size"
    :class="{'show-slideout': showSlideout, 'right': align == 'right', 'left': align == 'left'}"
    style="z-index: 1040;"
  >
    <div :class="dynamicSize" role="document">
      <div class="ac-slideout-content modal-content custom-close">
        <button v-if="closeBtn === 'show'" type="button" class="close" aria-label="Close">
          <span aria-hidden="true" @click.prevent="close">
            <i class="fal fa-times"></i>
          </span>
        </button>
        <b-button
          v-if="closeBtn === 'leftclose'"
          class="btn btn-light slideangle"
          @click.prevent="close"
          style="position: absolute; top: -1px; z-index: 99; left: -34px;border-top-right-radius: 0;border-bottom-right-radius: 0;"
        >
          <i class="fal fa-angle-right fa-lg"></i>
        </b-button>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Slideout panel component
 *
 * Use this to show nested(child) route inside slideout panel.
 *
 * In Appup runtime, nested route is automatically configured by finding page with `route` prop
 *
 * This is tightly coupled with vue-router, when used outside Appup runtime, explicitly configure route
 * and set meta data `isSlideout` to `true`
 *
 * @author Purushotham Reddy
 *
 */
export default {
  props: {
    /**
     * Appup runtime uses `route` to find a page and set child route
     *
     * eg: /view/:id
     */
    route: {
      type: String,
      required: true,
      default: ""
    },
    /**
     * Determines alignment of slideout panel
     *
     * accepted values: left, right
     */
    align: {
      type: String,
      default: "right",
      validator: function(value) {
        // The value must match one of these strings
        return ["left", "right"].indexOf(value) !== -1;
      }
    },
    /**
     * If value is "show", close button is shown - when clicked closes the panel
     *
     * To add custom close button, set prop to "hide"
     *
     * eg:
     *
     * ```
     * <appup-slideout route="/edit/:id" close-btn="hide"></appup-slideout>
     * In slideout page: create a custom button as follows
     * <button v-on:click="$parent.close()">Close Slideout Panel</button>
     * ```
     */
    closeBtn: {
      type: String,
      default: "show"
    },
    /**
     * Size of the slideout
     *
     */
    size: {
      type: String,
      default: "lg"
    },
    /**
     * It shows parent route
     */
    parentRoute: {
      type: String
    }
  },
  data() {
    return {
      /**
       * @private
       */
      showSlideout: true
    };
  },

  watch: {
    $route(to, from) {
      this.showSlideout = this.$route.meta.isSlideout ? true : false;
    }
  },

  methods: {
    /**
     * Closes slideout panel
     *
     * Useful when creating custom close button in slideout page
     *
     * eg:
     *
     * ```
     * <button v-on:click="$parent.close()">Close Slideout Panel</button>
     * ```
     */
    close() {
      this.showSlideout = false;
      if (this.parentRoute) {
        this.$router.push(this.parentRoute);
      } else {
        this.$router.back();
      }
    }
  },
  created() {
    // Show slideout if child page is a slideout page
    // Bug: this.$route is undefined when appup-slideout component is refrenced from components package
    // So adding it inside runtime components
    this.showSlideout = this.$route.meta.isSlideout ? true : false;
  },
  computed: {
    dynamicSize() {
      return "ac-slideout-dialog modal-dialog " + this.size;
    }
  }
};
</script>

<style>
.modal.left .modal-dialog,
.modal.right .modal-dialog {
  position: fixed;
  margin: auto;
  width: 320px;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

/* .modal.left .modal-content,
.modal.right .modal-content {
  height: 100%;
  overflow-y: auto;
} */

.modal.left .modal-body,
.modal.right .modal-body {
  padding: 15px 15px 80px;
}
.modal.left.fade .modal-dialog {
  left: -320px;
  -webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
  -o-transition: opacity 0.3s linear, left 0.3s ease-out;
  transition: opacity 0.3s linear, left 0.3s ease-out;
}

.modal.left.fade.in .modal-dialog {
  left: 0;
  width: 100%;
}

.modal.right.fade .modal-dialog {
  right: -320px;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
  -o-transition: opacity 0.3s linear, right 0.3s ease-out;
  transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
  right: 0;
  width: 100%;
}

.show-slideout {
  display: block !important;
  width: auto !important;
}

.ac-slideout .close {
  position: absolute;
  right: 0;
  padding: 0 1rem;
  z-index: 10010;
}
.ac-slideout .modal-content {
  border-radius: 0;
  padding: 0.5rem;
}
.slideangle {
  position: absolute;
  left: 424px;
  top: -144px;
}
</style>
