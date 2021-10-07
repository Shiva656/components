<template>
<full-calendar :events="events" :config="config" />
</template>

<script>
/**
 * Simple config based on current requirments
 */
import moment from "moment";

export default {
    name: "calendar",
    props: {
        preload: {
            type: String,
            required: false
        },
        events: {
            type: Array,
            required: false
        },
        config: {
            type: Object,
            default () {
                let self = this;
                /**
                 * Default events based on libary 
                 */
                return {
                    defaultView: 'month',
                    eventClick(...args) {
                        self.$emit('event-selected', ...args)
                    },
                    eventDrop(...args) {
                        self.$emit('event-drop', ...args)
                    },
                    eventResize(...args) {
                        self.$emit('event-resize', ...args)
                    },
                    dayClick(...args) {
                        self.$emit('day-click', ...args)
                    },
                }
            }
        }
    },
    created() {
        /**
         * On created we can  call handler
         */
        if (this.preload) this.start(this.preload);
    }
};
</script>
