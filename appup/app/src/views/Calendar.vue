<template>
    <div>
         <appup-calendar :events="events" @day-click="check($event)" @event-selected="check($event)" />
    </div>
</template>
<script>
	export default {
  name: 'calendar',
  methods:{
      check: function(event){
           console.log(event);
      }
  },
  data () {
    return {
			events: [
				{
            title  : 'event1',
            start  : '2018-10-01',
        },
        {
            title  : 'event2',
            start  : '2018-10-05',
            end    : '2018-10-07',
        },
        {
            title  : 'event3',
            start  : '2018-10-09T12:30:00',
            allDay : false,
        }
			],
			config: {
            defaultView: 'month',
				eventRender: function(event, element) {
        	console.log(event)
    		}
      }
    }
  }
}

</script>