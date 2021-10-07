const FILTER_TYPES = {
    STRING: "string",
    NUMBER: "number",
    DATE: "date",
    TAGS: "tags",
    BOOLEAN: "boolean"
};

const FILTER_CONDITIONS = [
    {
        label: "Equals",
        value: "EQ",
        existsFor: [FILTER_TYPES.STRING, FILTER_TYPES.NUMBER, FILTER_TYPES.DATE,  FILTER_TYPES.TAGS]
    },
    {
        label: "Not Equals",
        value: "NE",
        existsFor: [FILTER_TYPES.STRING, FILTER_TYPES.NUMBER, FILTER_TYPES.DATE,  FILTER_TYPES.TAGS]
    },
    {
        label: "Contains",
        value: "IN",
        existsFor: [FILTER_TYPES.STRING]
    },
    {
        label: "Doesn't Contains",
        value: "NOTIN",
        existsFor: [FILTER_TYPES.STRING, FILTER_TYPES.TAGS]
    },
    {
        label: "Starts with",
        value: "STARTSWITH",
        existsFor: [FILTER_TYPES.STRING]
    },
    {
        label: "Ends with",
        value: "ENDSWITH",
        existsFor: [FILTER_TYPES.STRING]
    },
    {
        label: "Regular Expression",
        value: "REGEX",
        existsFor: [FILTER_TYPES.STRING]
    },
    {
        label: "Like",
        value: "LIKE",
        existsFor: [FILTER_TYPES.STRING]
    },
    {
        label: "Not Like",
        value: "NOTLIKE",
        existsFor: [FILTER_TYPES.STRING]
    },
    {
        label: "Null",
        value: "ISNULL",
        existsFor: [FILTER_TYPES.STRING, FILTER_TYPES.NUMBER, FILTER_TYPES.DATE, FILTER_TYPES.TAGS, FILTER_TYPES.BOOLEAN]
    },
    {
        label: "Not Null",
        value: "ISNOTNULL",
        existsFor: [FILTER_TYPES.STRING, FILTER_TYPES.NUMBER, FILTER_TYPES.DATE, FILTER_TYPES.TAGS, FILTER_TYPES.BOOLEAN]
    },
    {
        label: "Greater Than",
        value: "GT",
        existsFor: [FILTER_TYPES.NUMBER, FILTER_TYPES.DATE]
    },
    {
        label: "Less Than",
        value: "LT",
        existsFor: [FILTER_TYPES.NUMBER, FILTER_TYPES.DATE]
    },
    {
        label: "Greater Than or Equals",
        value: "GTE",
        existsFor: [FILTER_TYPES.NUMBER, FILTER_TYPES.DATE]
    },
    {
        label: "Less Than or Equals",
        value: "LTE",
        existsFor: [FILTER_TYPES.NUMBER, FILTER_TYPES.DATE]
    },
    {
        label: "In Between",
        value: "BW",
        existsFor: [FILTER_TYPES.NUMBER, FILTER_TYPES.DATE]
    },
    {
        label: "Has all of",
        value: "ALLOF",
        existsFor: [FILTER_TYPES.TAGS]
    },
    {
        label: "Has any of",
        value: "ANYOF",
        existsFor: [FILTER_TYPES.TAGS]
    },
    {
        label: "Is",
        value: "EQ",
        existsFor: [FILTER_TYPES.BOOLEAN]
    },
    {
        label: "Isn't",
        value: "NOTEQ",
        existsFor: [FILTER_TYPES.BOOLEAN]
    }
];

function getFilterConditions(filterType) {
    /* {
        label: "Equals",
        value: "EQ",
        existsFor: [FILTER_TYPES.STRING, FILTER_TYPES.NUMBER, FILTER_TYPES.DATE]
    } */
    return FILTER_CONDITIONS.filter((cond) => {
        return cond.existsFor.includes(filterType);
    });
}

function transformToFormJson(filterJson, id,index) {
    let formJson = {
        fields: [],
        buttons: []
    };
    let clearSlotFields = [];
    let addSlotFields = [];
    var filtersConfigData = {};
    let conditionCount = {};

    /* {
        "filter-label": "Tags",
        "filter-type": "tags",
        "filter-checkbox": true,
        "filter-json": {
            "type": "multiselect",
            "name": "contact_tags",
            "label": "Enter Tags",
            "url": "http://www.mocky.io/v2/5b507e3a3600003b14dd0e66",
            "key_value": "value",
            "key_label": "label"
        },
        "filter-cdata": {}
    } */
    let filters = filterJson.fields;
debugger;
    if(filters){
        for (let i = 0; i < filters.length; i++) {
            let checkboxId;
            if (id) {
                checkboxId = 'filter_field_' + id + index;
            } else {
                checkboxId = 'filter_field_' + index
            }
    
            filtersConfigData[filters[i]['filter-name']] = [];
    
            // Add filter field
            formJson.fields.push({
                id: checkboxId,
                type: 'checkbox',
                name: '_field_' + filters[i]['filter-name'],
                label: '',
                option: [
                    {
                        label: filters[i]['filter-label'],
                        value: true
                    }
                ]
            });
    
            // Generate filter conditions and add to form json
            let conditionOptions = [];
            if (filters[i]['filter-type'] !== "custom") {
                getFilterConditions(filters[i]['filter-type']).forEach(function (option) {
                    // Return only label, value properties
                    conditionOptions.push((({ label, value }) => ({ label, value }))(option));
                });
                let filterCondField = {
                    type: "dropdown",
                    name: "_cond_" + filters[i]['filter-name'],
                    label: "Condition",
                    condition: "form." + '_field_' + filters[i]['filter-name'] + " == 'true'",
                    option: conditionOptions
                }
                formJson.fields.push(filterCondField);
                filtersConfigData[filters[i]['filter-name']].push(filterCondField);
            } else {
                if (filters[i]['custom-field-json']) {
                    let filterCustomCondField = {
                        condition: "form." + '_field_' + filters[i]['filter-name'] + " == 'true'",
                        ...filters[i]['custom-field-json']
                    };
                    filterCustomCondField.name = "_cond_" + filters[i]['filter-name'];
                    formJson.fields.push(filterCustomCondField);
                    filtersConfigData[filters[i]['filter-name']].push(filterCustomCondField);
                }
            }
    
            // to add clear functionality to each set of condition
            let clearSoltField = {};
            clearSoltField["name"] = "_cond_" + filters[i]['filter-name'];
            clearSlotFields.push(clearSoltField);
    
            // Generate filter value field
            let filterValueField = {
                condition: "form." + '_field_' + filters[i]['filter-name'] + " == 'true'",
                ...filters[i]['field-json']
            };
            filterValueField.name = "_value_" + filters[i]['filter-name'];
            formJson.fields.push(filterValueField);
            filtersConfigData[filters[i]['filter-name']].push(filterValueField);
    
            //Generate second filter value field if condition is 'In Between'
            let filterValueField1 = {
                condition: "form." + '_field_' + filters[i]['filter-name'] + " == 'true'" + " && " + "form." + "_cond_" + filters[i]['filter-name'] + " == 'BW'",
                ...filters[i]['field-json']
            };
            filterValueField1.name = "_value_2_" + filters[i]['filter-name'];
            formJson.fields.push(filterValueField1);
            filtersConfigData[filters[i]['filter-name']].push(filterValueField1);
    
            // adding hidden field for formJson to (add) click event with slot after value 
            let hiddenField = { "type": "hidden", "name": "_hidden_" + filters[i]['filter-name'], condition: "form." + '_field_' + filters[i]['filter-name'] + " == 'true'" }
            formJson.fields.push(hiddenField);
    
            let addSoltField = {};
            addSoltField["name"] = "_hidden_" + filters[i]['filter-name'];
            conditionCount[filters[i]['filter-name']] = 0;
            addSlotFields.push(addSoltField);
    
            // Add cdata as hidden field
            if (filters[i]['filter-cdata']) {
                formJson.fields.push({
                    id: 'field_cdata_' + i,
                    type: 'hidden',
                    name: '_cdata_' + filters[i]['filter-name'],
                    value: filters[i]['filter-cdata'],
                    condition: "form." + '_field_' + filters[i]['filter-name'] + " == 'true'",
                })
            }
        }
    }
    

    return { formJson, clearSlotFields, addSlotFields, filtersConfigData, conditionCount };
}

function serializeFilterData(formData, conditionCountData) {

    /*  
    Input:
    _cond_custom: (...)
    _cond_score: (...)
    _cond_tags: (...)
    _field_custom: (...)
    _field_score: (...)
    _field_tags: (...)
    _value_custom: (...)
    _value_score: (...) 

    Output:
    "tags": {
        "type": "tags",
        "condition": "ANY_OF",
        "value": [
            "beta",
            "free"
        ],
        "cdata": {
            // what is cdata ?
        }
    } */
    for (let key in conditionCountData) {
        if (conditionCountData[key] > 0) {
            for (let i = 1; i <= conditionCountData[key]; i++) {
                formData["_field" + "_" + key + "_" + i] = [true]
            }
        }
    }

    let filterOutput = {};
    for (let key in formData) {
        if (key.indexOf('_field_') !== -1) {
            let filterField = key.replace("_field_", "");
            // Check if checkbox is checked
            if (formData[key] != "" && (Array.isArray(formData[key]) && formData[key].length != 0)) {
                filterOutput[filterField] = {};
                if (formData["_cond_" + filterField])
                    filterOutput[filterField].condition = formData["_cond_" + filterField];
                if (formData["_value_" + filterField])
                    filterOutput[filterField].value = formData["_value_" + filterField]
                if (formData["_value_2_" + filterField]) {
                    filterOutput[filterField].value_2 = formData["_value_2_" + filterField]
                }
                if (formData["_cdata_" + filterField])
                    filterOutput[filterField].cdata = formData["_cdata_" + filterField]

                if (Object.keys(filterOutput[filterField]).length <= 0)
                    delete filterOutput[filterField];
            }
        }
    }
    return filterOutput;
}

function deserializeFilterData(filterData) {

    /*  
    Input:
    "tags": {
        "type": "tags",
        "condition": "ANY_OF",
        "value": [
            "beta",
            "free"
        ],
        "cdata": {
            // what is cdata ?
        }
    }
    Output:
     _cond_custom: (...)
    _cond_score: (...)
    _cond_tags: (...)
    _field_custom: (...)
    _field_score: (...)
    _field_tags: (...)
    _value_custom: (...)
    _value_score: (...) 

     */
    let formdataOutput = {};
    for (let key in filterData) {
        formdataOutput['_field_' + key] = ["true"];
        if (filterData[key].condition) {
            formdataOutput['_cond_' + key] = filterData[key].condition;
        }
        if (filterData[key].value)
            formdataOutput["_value_" + key] = filterData[key].value;
        if (filterData[key].value_2) {
            formdataOutput["_value_2_" + key] = filterData[key].value_2;
        }
        if (filterData[key].cdata)
            formdataOutput["_cdata_" + key] = filterData[key].cdata;

    }
    return formdataOutput;
}

export default {
    toFormJson: function (filterJson, id, index) {
        return transformToFormJson(filterJson, id, index);
    },
    serializeFilterData: function (formData, conditionCountData) {
        return serializeFilterData(formData, conditionCountData);
    },
    deserializeFilterData: function (filterdata) {
        return deserializeFilterData(filterdata);
    }
}
