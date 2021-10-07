<template>
    <component :is="block"></component>
</template>

<script>
export default {
    data: function () {
        return {

        }
    },
    props: {
        block: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>
