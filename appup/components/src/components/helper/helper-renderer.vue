<script>
import Handlebars from "handlebars/dist/handlebars.js";
import moment from "moment";

// Helper to Parse JSON string
// Usage {{json-parse jsonStr key}}
Handlebars.registerHelper("json-parse", function(jsonStr, key) {
  var obj = JSON.parse(jsonStr);
  return obj[key];
});

Handlebars.registerHelper('if-equals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper('if-not-equals', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});

export default {
  props: ["type", "props", "params"],
  data() {
    return {
      events: {},
      refName: ""
    };
  },
  methods: {
    createComponent(template) {
      let _this = this;
      // return scopedSlot function
      return slotProps =>
        this.$createElement({
          data: function data() {
            return {
              helper: { show: true, hide: false },
              ...slotProps,
              params: _this.params
            };
          },
          methods: {
            getPage() {
              return this.$parent.$parent.$parent.$parent.$parent;
            },
            getMoment() {
              return new moment();
            },
            // This method is used in slots to call global functions
            call(functionName, ...args) {
              return window[functionName](...args);
            },
            global(variableName) {
              return window[variableName];
            }
          },
          template: template
        });
    },
    getScopedSlots() {
      let slots = {};
      for (let key in this.props) {
        if (key.indexOf("__slot__") === 0) {
          slots[key.replace("__slot__", "")] = this.props[key];
        }

        if (
          ((this.type === "ac-collection-table" ||
            this.type === "ac-action-navbar" ||
            this.type === "ac-collection-grouped-table" ||
            this.type === "ac-accordion-table" ) &&
            key === "columns") ||
            ((this.type === "ac-collection-table" || this.type === "ac-accordion-table") && key === "dropdown_options") ||
            (this.type === "ac-material-dropdown" && key === "options") ||
             (this.type === "ac-dropdown" && key === "items") ||
          (this.type === "ac-accordion" ||
            this.type === "ac-button-group" ||
            this.type === "ac-tab") ||
          (this.type === "ac-list-group" && key === "group-items") ||
          (this.type === "ac-simple-wizard")
        ) {
          for (let index in this.props[key]) {
            if (key === "data" && this.type === "ac-accordion") {
              slots[this.props[key][index].ref] = this.props[key][index].body;
            } else if(this.type === "ac-simple-wizard" && key === "steps"){
              slots[this.props[key][index].wizard_key] = this.props[key][index].wizard_data;
            }else {
              slots[this.props[key][index].key] = this.props[key][index].__slot__;
            }
          }
        }
      }

      const slotNames = Object.keys(slots);

      return slotNames.reduce((scopedSlots, slotName) => {
        if (slots[slotName]) {
          scopedSlots[slotName] = this.createComponent(slots[slotName]);
        }
        return scopedSlots;
      }, {});
    },
    // TODO: refactor
    compileComponentJson() {
      let slotProps = {};
      let props = {};
      let events = {};
      let eventParams = {};
      // Separate slot props and normal props
      // This will avoid slot template handlebars getting compiled
      for (let key in this.props) {
        if (
          key.indexOf("__slot__") === 0 ||
          ((this.type === "ac-collection-table" ||
            this.type === "ac-action-navbar" ||
            this.type === "ac-collection-grouped-table" ||
            this.type === "ac-accordion-table" ) &&
            key === "columns") ||
            ((this.type === "ac-collection-table" || this.type === "ac-accordion-table") && key === "dropdown_options") ||
            (this.type === "ac-material-dropdown" && key === "options") ||
             (this.type === "ac-dropdown" && key === "items") ||
          (this.type === "ac-accordion" ||
            this.type === "ac-tab" ||
            (this.type === "ac-button-group" && key === "data")) ||
          (this.type === "ac-list-group" && key === "group-items") ||
          (this.type === "ac-simple-wizard" && key === "steps")) {
          slotProps[key] = this.props[key];
        } else if (key.indexOf("__event__") === 0) {
          if (key.indexOf("__event__params__") === 0) {
            eventParams[key.replace("__event__params__", "")] = this.props[key];
          } else {
            events[key.replace("__event__", "")] = this.props[key];
          }
        } else {
          props[key] = this.props[key];
        }
      }

      // Compile handlebars
      if (this.get_hb_json) {
        /**
         * All the props are compiled here with handelbars to skip this we use if
         * we need handelbars data in this ac-form-preview
         */
        if (this.type == "ac-form-preview") {
          var compiledProps = props;
        } else {
          // let template = Handlebars.compile(JSON.stringify(props));
          // // Compile with data like this.$route etc., ref: workflow.js
          // let compiledPropsStr = template(
          //   this.get_hb_json({ params: this.params })
          // );
          let compiledPropsStr =  this.compileHandlebars(props);
          var compiledProps = JSON.parse(compiledPropsStr);
        }
        if (this.params) {
          compiledProps.params = this.params;
        }
        this.props = { ...slotProps, ...compiledProps };
      }    

      this.generateEvents(events, eventParams);
    },
    compileHandlebars(props){
      let template = Handlebars.compile(JSON.stringify(props));
          // Compile with data like this.$route etc., ref: workflow.js
          return template(
            this.get_hb_json({ params: this.params })
          );
    },
    generateEvents(events, eventParams) {
      if(this.type == "ac-vertical-bar"){
        let compiledEventsStr =  this.compileHandlebars(events);
        events = JSON.parse(compiledEventsStr)
      }
      // if workflow.js mixin is available
      if (this.start) {
        for (let key in events) {
          // Run Appup handler
          let handlers = events[key];
          this.events[key] = ($event, ...args) => {
            let handlersList = [];
            for (let i = 0; i < handlers.length; i++) {
              handlersList[i] = {};
              handlersList[i].name = handlers[i].name;

              let handlersParams = {};
              try {
                if (typeof handlers[i].params == "object") {
                  handlersParams = handlers[i].params;
                } else {
                  handlersParams = JSON.parse(handlers[i].params);
                }
              } catch (error) {
                handlersParams = {};
              }
              handlersList[i].params = {
                helper: {
                  component: this.refName ? this.$refs[this.refName] : null,
                  item: $event,
                  eventArgs: [...args],
                  custom: handlersParams,
                  helperParams: this.params
                }
              };
            }
            if (handlersList.length > 0) {
              this.start(handlersList);
            }
          };
        }
      }
    }
  },
  created() {
    this.compileComponentJson();
  },
  mounted() {
    // Set all helper refs in APPUP global
    if (this.refName) {
      window.APPUP.helpers = window.APPUP.helpers || {};
      window.APPUP.helpers[this.refName] = this.$refs[this.refName];
    }
  },
  updated() {
    if (this.refName && !window.APPUP.helpers[this.refName] && this.$refs[this.refName]) {
      window.APPUP.helpers[this.refName] = this.$refs[this.refName];
    }
  },
  render(h) {
    let dataObj = {
      props: this.props,
      on: this.events,
      scopedSlots: this.getScopedSlots()
    };

    // Take ref name from props and create a ref
    if (this.props.refs) {
      this.refName = this.props.refs;
      dataObj.ref = this.refName;
      dataObj.class = this.refName;
    }

    return h(this.type, dataObj);
  }
};
</script>