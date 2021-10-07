<template>
  <div>
    <!-- simple usage -->
    <!-- time is a dateString that can be parsed by Date.parse() -->
    <appup-timeago datetime="04/05/2018 16:41:00"></appup-timeago>

    <br>

    <!-- Auto-update time every 60 seconds -->
    <appup-timeago :datetime="now" :auto-update="60"></appup-timeago>

    <!-- For more examples: https://github.com/egoist/vue-timeago -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: new Date()
    };
  }
};
</script>
