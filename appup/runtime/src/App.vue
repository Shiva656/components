<template>
  <div id="app">
    <div id="nav"></div>

    <!-- <keep-alive>
      <router-view :key="generateKey()" />
    </keep-alive>-->

    <!-- <keep-alive v-if="$route.meta.keepAlive">
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <router-view v-else :key="$route.fullPath"/>-->

    <!-- To make parent route cache -->
    <router-view />

    <!-- <notifications group="foo" /> -->
    <notifications group="toaster">
      <template slot="body" slot-scope="props">
        <!-- Get slot scope as props -->
        <div class="media toasters shadow rounded">
          <div class="smart-img">
            <div
              class="toaster-icon mr-3 text-white rounded-circle"
              :class="[props.item.type == 'success'? 'succeed':'', props.item.type == 'error'? 'fail':'',props.item.type == 'warning'? 'warning-ms':'',props.item.type == 'default'?'notify':'']"
            >
              <i v-if="props.item.type == 'success'" class="fal fa-shield-check"></i>
              <i v-if="props.item.type == 'error'" class="fal fa-times-circle"></i>
              <i v-if="props.item.type == 'warning'" class="fal fa-exclamation-triangle"></i>
              <i v-if="props.item.type == 'default'" class="fal fa-bell"></i>
            </div>
          </div>
          <div class="media-body">
            <template v-if="props.item.type == 'success'">
              <h5 v-if="props.item.title" class="my-0 d-block text-success">{{props.item.title}}</h5>
              <h5 v-else class="my-0 d-block text-success">Yay Success!</h5>
            </template>

            <template v-if="props.item.type == 'error'">
              <h5 v-if="props.item.title" class="my-0 d-block text-danger">{{props.item.title}}</h5>
              <h5 v-else class="my-0 d-block text-danger">Error!</h5>
            </template>

            <template v-if="props.item.type == 'warning'">
              <h5 v-if="props.item.title" class="my-0 d-block text-warning">{{props.item.title}}</h5>
              <h5 v-else class="my-0 d-block text-warning">Whoops!</h5>
            </template>

            <template v-if="props.item.type == 'default'">
              <h5 v-if="props.item.type == 'default'" class="my-0 d-block">{{props.item.title}}</h5>
            </template>

            <p class="text-muted mb-0">{{props.item.text}}</p>
          </div>
        </div>​
      </template>
    </notifications>

    <div v-if="$root.loader" class="loader row">
      <img
        v-if="$root.appupLoaderImgSrc"
        :src="$root.appupLoaderImgSrc"
        class="loader__image"
        alt="loader m-auto"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getTimestamp() {
      return new Date().getTime();
    },
    generateKey() {
      if (this.$route.meta.keepAlive) {
        return this.$route.fullPath;
      } else {
        return this.$route.fullPath + "_" + this.getTimestamp();
      }
    }
  }
};
</script>

<style>
.loader {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.65);
}
.loader__image {
  width: 100px;
}
.toasters {
  margin: 5px;
  padding: 20px;
  background: #ffffff;
  min-width: 290px;
}
​.toaster-icon {
  font-size: 22px;
  margin-right: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: inline-block;
  color: #fff;
}
.succeed {
  background: green;
  padding: 5px 9px;
}

.notify {
  background: blue;
  padding: 5px 9px;
}

.warning-ms {
  background: orange;
  padding: 5px 9px;
}

.fail {
  background: red;
  padding: 5px 9px;
}
.vue-notification-group {
  max-width: max-content;
  width: 425px !important;
}
.toasters .media-body {
  overflow: hidden;
}
</style>
