<template>
<div>
    <appup-formbuilder v-model="value" />

        {{ value }}
</div>
</template>

<script>
export default {
    data(){
        return {
            value: ''
        }
    }
}
</script>

<style>

</style>
