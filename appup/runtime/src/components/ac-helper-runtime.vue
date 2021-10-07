<template>
  <div>
    <ac-helper-renderer :type="type" :props="componentObject" :params="helperParams" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    json: {
      type: Object
    },
    params: {
      type: [Object, String]
    }
  },
  data() {
    return {
      componentObject: null,
      helperParams: null
    };
  },
  created() {
    // Parse string representation of object or array to js object or array

    let componentObject = JSON.parse(JSON.stringify(this.json.formdata));
    
    //parse params
    try {
      this.helperParams = JSON.parse(this.params);
    } catch (error) {
      this.helperParams = this.params;
    }

    /**
    * formdata example: 
    [
      {
        type: "dropdown",
        label: "Admin",
        image: "http://agilecrm.dash.sweet-simple.com/assets/img/human01.jpg",
        items: [
          {
            type: "link",
            label: "Profile",
            link_to: "#/profile"
          },
          {
            type: "link",
            label: "Settings",
            link_to: "#/settings"
          }
        ]
      }
    ];
        */
    for (var key in componentObject) {
      if (
        typeof componentObject[key] == "string" &&
        (componentObject[key].indexOf("{") === 0 ||
          componentObject[key].indexOf("[") === 0)
      ) {
        // catch parse error when mustache syntax given
        try {
          componentObject[key] = JSON.parse(componentObject[key]);
        } catch (error) {
          console.log(error);
        }
      }

      // Converting stringified data to object
      if (typeof componentObject[key] == "object") {
        try {
          for (var obj1 in componentObject[key]) {
            var a = Object.keys(componentObject[key][obj1]);
            a.map(typ => {
              if (
                typeof componentObject[key][obj1][typ] == "string" &&
                (componentObject[key][obj1][typ].indexOf("{") === 0 ||
                  componentObject[key][obj1][typ].indexOf("[") === 0)
              ) {
                componentObject[key][obj1][typ] = JSON.parse(
                  componentObject[key][obj1][typ]
                );
                for (var obj2 in componentObject[key][obj1][typ]) {
                  var b = Object.keys(componentObject[key][obj1][typ][obj2]);
                  b.map(typ1 => {
                    if (
                      typeof componentObject[key][obj1][typ][obj2][typ1] ==
                        "string" &&
                      (componentObject[key][obj1][typ][obj2][typ1].indexOf(
                        "{"
                      ) === 0 ||
                        componentObject[key][obj1][typ][obj2][typ1].indexOf(
                          "["
                        ) === 0)
                    ) {
                      componentObject[key][obj1][typ][obj2][typ1] = JSON.parse(
                        componentObject[key][obj1][typ][obj2][typ1]
                      );
                    }
                  });
                }
              }
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    this.componentObject = componentObject;
  }
};
</script>
