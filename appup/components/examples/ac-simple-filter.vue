<template>
  <div>
    <ac-simple-filter
      :inline-labels="inlinelabels"
      :inline="inline"
      :show_filter_button="show_filter_button"
      button_label="Simple Filter"
      button_icon="fa fa-filter"
      variant="transparent"
      :filter_json="test"
      @input="callInput($event)"
    ></ac-simple-filter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json: {},
      inlinelabels: true,
      inline: false,
      show_filter_button: true,
      test: {
        fields: [
          {
            type: "date-range",
            name: "activity.date",
            label: "Date",
            opens: "center",
            startDate: "2019-05-01",
            endDate: "2019-05-15",
            minDate: "2016-09-02",
            maxDate: "2019-10-02",
            dateRange: {
              startDate: "2019-05-01",
              endDate: "2019-05-10"
            },
            localeData: {
              firstDay: 1,
              format: "DD-MM-YYYY"
            },
            show_ranges: true,
            singleDatePicker: false,
            timePicker: true,
            timePicker24Hour: true,
            showDropdowns: true,
            autoApply: false,
            showWeekNumbers: true,
            class: "col-sm-12 col-md-4 select"
          },
          {
            type: "dropdown",
            name: "dp1",
            label: "dp1",
            inlineClass: "col-md-4",
            option: [
              {
                value: "1",
                label: "1",
                checked: true
              },
              {
                value: "2",
                label: "2"
              },
              {
                value: "3",
                label: "3"
              }
            ],
            required: true
          },
          {
            type: "dropdown",
            name: "dp2",
            label: "dp2",
            inlineClass: "col-md-4",
            option: [
              {
                value: null,
                label: "Please select an option",
                checked: true
              },
              {
                value: "today",
                label: "Today"
              },
              {
                value: "yesterday",
                label: "Yesterday"
              },
              {
                value: "thisweek",
                label: "This week"
              }
            ],
            required: false
          },
          {
            type: "text",
            name: "name1",
            label: "name1",
            placeholder: "Enter name1",
            required: true,
            inlineClass: "col-md-4"
          },
          {
            type: "text",
            name: "name2",
            label: "name2",
            placeholder: "Enter Name2",
            required: true,
            inlineClass: "col-md-4"
          }
        ]
      }
    };
  },
  methods: {
    callInput(event) {
      console.log("test", JSON.stringify(event.condition));
    }
  }
};
</script>

<style>