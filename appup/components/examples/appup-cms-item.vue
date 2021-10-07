<template>
    <appup-cms-item
    :page_template_url='`https://qa.appup.com/appdb/_db/PAGE_TEMPLATE?where=ID=201%20AND%20OWNER_ID=0%20OR%20APPLICATION_ID=3944`'
    :handler_url_method="GET"
    :handler_url='`https://api.myjson.com/bins/89gla`'
    ></appup-cms-item>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style scoped>

</style>