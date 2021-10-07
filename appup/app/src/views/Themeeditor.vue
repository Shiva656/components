<template>
        
                    <theme-editor :url="`${$route.query.url}${$route.hash}`" :themeID="$route.params.id" :appId="$route.params.appId"/>
                    <!-- <theme-editor url="/runtime/#/login?id=1610" mode="runtime" :id="`${$route.query.id}`" /> -->

</template>

<script>
// Import components and libraries

import ThemeEditor from "../../../theme-builder/src/ThemeBuilder.vue";

// Export components

export default {
    components: {
        ThemeEditor
    },
    data() {
        return {         
        };
    },
    computed: {},
    methods: {}
};
</script>
