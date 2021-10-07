<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <div class="form-group">
            <label>Define CustomField</label>
            <appup-custom-fields-builder v-model="form.fields"></appup-custom-fields-builder>
            <pre>
            {{form}}
        </pre>
          </div>
        </b-col>
        <b-col>
          <appup-form :form-json="form"></appup-form>
        </b-col>
        <pre></pre>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fields: []
      },
      test: [
        
      ]
    };
  }
};
</script>

<style>
</style>
