<template>
  <div>
    <slot name="audio_player"></slot>
  </div>
</template>
<script>
export default {
  name: "appup-audioplayer",
  props: {
    /**
     * source url for audio file
     */
    audio_source: {
      type: String,
      required: true
    },
    /**
     * provide class name for player
     */
    audio_class: {
      type: String,
      required: true
    }
  },
  mounted() {
    var audio = document.createElement("audio");
    audio.setAttribute("src", this.audio_source);
    audio.setAttribute("controls", true);
    if (this.audio_class) audio.setAttribute("class", this.audio_class);
    this.$el.appendChild(audio);
  }
};
</script>