###### Form with different input fields

```vue
<template>
    <div>
       <b-row class="my-1" v-for="(component, index) in formSchema.fields" :key="index">
            <b-col sm="3">
                <label for="input-none">{{component.label}}:</label>
            </b-col>
            <b-col sm="9">
                <component 
                    :is="component.type" 
                    :type="component.input" 
                    :placeholder="component.placeholder">
                </component>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formSchema: {
                fields: [                    
                    {
                        type: 'appup-form-datetime-input',
                        input: 'date',
                        label: 'Date Picker',
                        placeholder: 'Date here'
                    },
                    {
                        type: 'appup-form-datetime-input',
                        input: 'time',
                        label: 'Time Picker',
                        placeholder: 'Time here'
                    },
                    {
                        type: 'appup-form-datetime-input',
                        input: 'datetime',
                        label: 'Datetime Picker',
                        placeholder: 'DateTime here'
                    }
                ]
            }
        }
    },
    computed: {
        
    },
    methods: {
            
    }
}
</script>
```