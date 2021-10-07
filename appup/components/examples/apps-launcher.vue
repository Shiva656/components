<template>
  <div>
    <apps-launcher url="http://www.json-generator.com/api/json/get/cblldJcomW?indent=2"/>
    <hr>
    <h1>with json</h1>
    <apps-launcher :appsJson="appsJosn"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appsJosn: {
        buttons: [
          {
            link: "https://www.gmail.com",
            label: "More"
          }
        ],
        apps: [
          {
            category: "Recommended Apps",
            image: "https://cdn-support.500apps.com/applogos/trackly.svg",
            link:
              "http://www.json-generator.com/api/json/get/clrcEukgaG?indent=2",
            label: "Trackly"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/signly.svg",
            link: "https://www.Signly.com",
            label: "Signly"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/agilecrm.svg",
            link: "https://www.agilecrm.com",
            label: "agilecrm"
          },
          {
            category: "Recommended Apps",
            image: "https://cdn-support.500apps.com/applogos/flowly.svg",
            link:
              "http://www.json-generator.com/api/json/get/clrcEukgaG?indent=2",
            label: "Flowly"
          },
          {
            category: "Recommended Apps",
            image: "https://cdn-support.500apps.com/applogos/recruitly.svg",
            link:
              "http://www.json-generator.com/api/json/get/clrcEukgaG?indent=2",
            label: "Recruitly"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/supportly.svg",
            link: "https://www.supportly.com",
            label: "Supportly"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/collably.svg",
            link: "https://www.collab.com",
            label: "Collab"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/crmio.svg",
            link: "https://www.crm.com",
            label: "CRM.io"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/projectsly.svg",
            link: "https://www.projects.com",
            label: "Projects"
          },
          {
            category: "My Apps",
            image: "https://cdn-support.500apps.com/applogos/contactspot.svg",
            link: "https://www.contactspot.com",
            label: "Contact"
          }
        ]
      }
    };
  }
};
</script>


<style>
</style>