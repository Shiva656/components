<template>
  <appup-audioplayer :audio_source="source" :audio_class="className">
    <template #audio_player>
      <div>hello in slot</div>
    </template>
  </appup-audioplayer>
</template>
<script>
export default {
  data() {
    return {
      className:"myclass",
      source:
        "https://appup-bucket.s3.amazonaws.com/invox/1575442145015000OmgDaddy-Naasongs.me.mp3"
    };
  }
};
</script>