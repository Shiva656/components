<template>
    <div>
        <button type="button" class="btn btn-outline-secondary bg-white back-button float-left" @click="$router.go(-1)"><span class="icon-arrow-left"></span></button>
        <appup-header
        textcolor="light"
        :title="title"               
        :right-controls="dropdowns"/>
    </div>
</template>
<script>
export default {
    props:['title'],
    data () {
        return {        
            leftControls: [
                {
                    type: "link",
                    label: "Pages",
                    icon: "file",
                    link_to: "#"
                },
                {
                    type: "link",
                    label: "Blocks",
                    icon: "th-large"
                }
            ],
            rightControls: [
                {
                    type: "dropdown",
                    label: "Test",
                    image: "http://agilecrm.dash.sweet-simple.com/assets/img/human01.jpg",
                    items: [
                        {
                            type: "link",
                            label: "Profile",
                            link_to: "/settings"
                        },
                        {
                            type: "link",
                            label: "Signout",
                            link_to: "#"
                        }
                    ]
                }
            ],
            dropdowns: [
                {
                    type: "dropdown",
                    label: "backend",                   
                    items: [
                        {
                            type: "link",
                            label: "Triggers",
                            link_to: "#"
                        },
                        {
                            type: "link",
                            label: "Workflows",
                            link_to: "#"
                        },
                        {
                            type: "link",
                            label: "Plugins",
                            link_to: "#"
                        }
                    ]
                },{
                    type: "dropdown",
                    label: "frontend",                   
                    items: [
                        {
                            type: "link",
                            label: "Pages",
                            link_to: "#"
                        },
                        {
                            type: "link",
                            label: "Blocks",
                            link_to: "#"
                        }
                    ]
                }
            ],
            links: [
                { 
                    type: "link",
                    label: "Profile",
                    link_to: "/settings"
                },{
                    type: "link",
                    label: "Apps",
                    link_to: "#"
                },{
                    type: "link",
                    label: "Themes",
                    link_to: "#"
                }
            ]         
        }
    },
    computed: {
        
    },
    methods: {
            
    }
};
</script>