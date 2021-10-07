```
<template>
    <div>
        <ac-sections :rule-json="ruleJson" v-model="value"></ac-sections>
        {{value}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
              value:'',
                ruleJson: {
                    selectedKey: "",
                    selectedOperator: "",
                    selectedVal: "",
                    keys: {
                        url: "https://restcountries.eu/rest/v2/all",
                        keyvalue: "alpha2Code",
                        keytext: "name",
                        keytype: "select",
                        options: []
                    },
                    controls: {
                        "password": { type: "text", value: "hg"},
                        "date": {
                            type: "appup-datetime",
                            name: "date",
                            input: "date",
                            label: "Date Picker",
                            placeholder: "Date here",
                            custom: {
                                "dateFormat": "m-Y-d"
                            },
                            value: ""
                        },
                        "select": { value: "", type: "select",
                          url: "https://jsonplaceholder.typicode.com/users",
                           keyvalue: "id",
                           keytext: "name", options: [] }

                    },
                    values: [
                        { type: "text", value: ""},
                       {
                            type: "appup-datetime",
                            name: "date",
                            input: "date",
                            label: "Date Picker",
                            placeholder: "Date here",
                            custom: {
                                "dateFormat": "m-Y-d"
                            },
                            value: ""
                        },
                         { type: "number",value: "" },
                         { value: "", type: "select",
                          url: "https://jsonplaceholder.typicode.com/users",
                           keyvalue: "id",
                           keytext: "name", options: [] }
                    ]
                }
                }
            }
            }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

```