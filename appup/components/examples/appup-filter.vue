<template>
  <div class="row">
    <div class="col-md-4">
      <appup-filter
        :filter-json="filters"
        :filter-data="form"
        :filter-width="myfilterwidth"
        :filter-height="filterHeight"
        @apply="log"
        @save="log"
        :config="config"
        onApplyClose = "true"
        onSaveClose = "true"
        :toggle="false"
      />
    </div>
    <div class="col-md-4">
      form
      <pre>{{form}}</pre>
    </div>
    <div class="col-md-4">
      outConfig
      <pre>  {{this.outConfig}}</pre>
    </div>
  </div>
</template>                                                                                                                                                                          

<script>
export default {
  data() {
    return {
      filters: {
        fields: [
          {
            "filter-label": "Tags123",
            "filter-type": "tags",
            "filter-name": "tags",
            "filter-checkbox": true,
            "hidden": true,
            "field-json": {
              type: "multiselect",
              name: "contact_tags",
              label: "Enter Tags",
              url: "http://www.mocky.io/v2/5b507e3a3600003b14dd0e66",
              key_value: "value",
              key_label: "label"
            },
            "filter-cdata": { dbtable: "contact" }
          },
          {
            "filter-label": "Score",
            "filter-type": "number",
            "filter-name": "score",
            "filter-checkbox": true,
            "hidden": true,
            "field-json": {
              type: "number",
              name: "score",
              label: "score"
            },
            "filter-cdata": {}
          },
          {
            "filter-label": "Created",
            "filter-checkbox": true,
            "hidden": true,
            "filter-type": "date",
            "filter-name": "created_on",
            "field-json": {
              type: "date",
              name: "date",
              label: "Created"
            },
            "filter-cdata": {}
          },
          {
            "filter-label": "Name",
            "filter-checkbox": true,
            "hidden": true,
            "filter-type": "string",
            "filter-name": "name",
            "field-json": {
              type: "text",
              name: "first_name",
              label: "Name"
            },
            "filter-cdata": {}
          },
          {
            "filter-label": "Owner",
            "filter-checkbox": true,
            "hidden": true,
            "filter-type": "boolean",
            "filter-name": "owner",
            "field-json": {
              type: "dropdown",
              name: "owner_id",
              label: "select owner",
              key_value: "value",
              key_label: "label",
              url: "http://www.mocky.io/v2/5b507e3a3600003b14dd0e66"
            },
            "filter-cdata": {}
          },
          {
            "filter-label": "Custom",
            "filter-checkbox": true,
            "hidden": true,
            "filter-name": "custom",
            "filter-type": "custom",
            "custom-field-json": {
              type: "dropdown",
              label: "Condition",
              option: [
                {
                  label: "Test",
                  value: "Test"
                }
              ]
            },
            "field-json": {
              type: "text",
              name: "first_name",
              label: "Name"
            },
            "filter-cdata": {}
          }
        ],
        buttons: []
      },
      form: {
        tags: {
          condition: "ALLOF",
          value: [2],
          cdata: {
            dbtable: "contact"
          }
        },
        score: {
          condition: "BW",
          value: "3",
          value_2: "2",
          cdata: {}
        }
      },
      config: {
        data: {
          fields:
            "tags.id as 'tagid',con.first_name as 'name',con.email as 'email'",
          tables: [
            {
              contact: "con"
            },
            {
              company: "com"
            },
            {
              contact_tag: "ctag"
            },
            {
              tag: "tags"
            }
          ],
          join: [
            {
              join_type: "left join",
              table1: "con",
              join_column1: "company_id",
              table2: "com",
              join_column2: "id"
            },
            {
              join_type: "left join",
              table1: "con",
              join_column1: "id",
              table2: "ctag",
              join_column2: "contact_id"
            },
            {
              join_type: "left join",
              table1: "ctag",
              join_column1: "tag_id",
              table2: "tags",
              join_column2: "id"
            }
          ],
          order_by: "con.id ASC",
          offset: 0,
          limit: 10
        }
      },
      outConfig: "",
      myfilterwidth:"my-filter-width",
      filterHeight:"my-filter-height"
    };
  },
  methods: {
    log(form, config) {
      this.form = form;
      this.outConfig = config;
    }
  }
};
</script>
<style>
.my-filter-width{
  width: 100%;
}
.my-filter-height{
  height: 250px;
}
</style>

