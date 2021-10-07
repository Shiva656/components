<template>
<div>
    <flat-pickr 
        :id=id
        class="appup-datetime form-control"
        :class="{'border border-danger': state==false }"
        v-model="date"
        :config="configure"
        :placeholder="placeholder"
         v-bind="$attrs"
         @on-change="onChangeFun($event)"
        >
    </flat-pickr>
</div>
</template>
<script>
    /**
     * Appup DateTime picker with capability to show only date, time or date & time
     */
    
    // https://github.com/ankurk91/vue-flatpickr-component
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: 'appup-datetime',
        props: {
            /**
             * Id of input elements.
             */
            id: {
                type: String,
                required: false
            },

            /**
             * The type attribute specifies the type of <strong>input</strong> element to display.
             * 
             *  `date, time, datetime, daterange`
             */
            type: {
                type: String,
                required: true
            },

            /**
             * Validation state of the component
             */
            state: {
                type: Boolean,
                required: false,
                default: null
            },

            /**
             * Value for v-model binding. Not to be binded directly
             */
            value: {
                required: false
            },

            /**
             * Config for extra configuration
             */
            config: {
                type: Object,
                default: () => {}
            },
            /**
             * Placeholder for datetime
             */
             placeholder: {
                type: String,
                required: false
             }
        },
        data: function() {
            return {
                // Initial value
                date: this.value
            }
        },
        created(){
            this.date = this.value
        },
        watch:{
            value(newval, oldval){
                this.date = newval;
            }
        },
        computed: {
         // Get more form https://chmln.github.io/flatpickr/options/
            configure: function() {
                const _ = this;
                return {
                    ...{
                    wrap: true, // set wrap to true only when using 'input-group'
                    onClose: (date, dateStr, instance) => {
                        this.$emit("input", dateStr);
                    },
                    altFormat: 'M	j, Y',
                    altInput: false,
                    enableTime:
                        _.type == 'time' || _.type == 'datetime' ? true : false,
                    noCalendar:
                        _.type == 'time' ? true : false,
                    dateFormat: 
                        _.type == 'date' || _.type == 'daterange' ? 'd-m-Y'
                            : _.type == 'time' ? 'H:i:S' : 'd-m-Y H:i:S',
                    mode:
                        _.type == 'daterange' ? 'range' : 'single'
                    },
                    ... this.config
                }       
            }
        },
        methods: {
            onChangeFun(event){
                this.$emit("on-change",event);
            }
        },
        components: { 
            flatPickr
        }
    };
</script>
<style scoped>
.appup-datetime.form-control[readonly] {
    background-color: #fff !important;
}
.flatpickr-day.endRange, .flatpickr-day.endRange.inRange, .flatpickr-day.endRange.nextMonthDay, .flatpickr-day.endRange.prevMonthDay, .flatpickr-day.endRange:focus, .flatpickr-day.endRange:hover, .flatpickr-day.selected, .flatpickr-day.selected.inRange, .flatpickr-day.selected.nextMonthDay, .flatpickr-day.selected.prevMonthDay, .flatpickr-day.selected:focus, .flatpickr-day.selected:hover, .flatpickr-day.startRange, .flatpickr-day.startRange.inRange, .flatpickr-day.startRange.nextMonthDay, .flatpickr-day.startRange.prevMonthDay, .flatpickr-day.startRange:focus, .flatpickr-day.startRange:hover {
        background: #007bff;
        border-color: #007bff;
}
.flatpickr-calendar {
    font-size: 12px;
}
</style>
