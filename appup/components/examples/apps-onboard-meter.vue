<template>
  <div id="app">
    <div class="row">
      <div class="col">
        Default
        <apps-onboard-meter ref="OnboardingMeter1" :items="items" >
          <template slot="header">
            <b>On board</b>
          </template>
          <!-- <template slot="footer">
            <a href="#" class="text-decoration-none">Invite users</a>
          </template> -->
        </apps-onboard-meter>
      </div>
      <div class="col">
        <p>show-badge=false</p>
        <apps-onboard-meter ref="OnboardingMeter2" :show-badge="false" :items="middle">
          <template slot="header">
            <b>New Here?</b>
          </template>
          <template slot="footer">
            <small>Invite users</small>
          </template>
        </apps-onboard-meter>
      </div>
      <div class="col">
        <p>show-progress=false</p>
        <apps-onboard-meter ref="OnboardingMeter3" :show-progress="false" :items="good">
          <template slot="header">
            <b>New Here?</b>
          </template>
          <template slot="footer">
            <small>Invite users</small>
          </template>
        </apps-onboard-meter>
      </div>
      <div class="col">
        <p>hide-if-complete=true</p>
        <apps-onboard-meter ref="OnboardingMeter4" :hide-if-complete="true" :items="hide">
          <template slot="header">
            <b>New Here?</b>
          </template>
          <template slot="footer">
            <a>Invite users</a>
          </template>
        </apps-onboard-meter>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: [
        {
          name: "Setup DKIM/SPF",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "/check/setup-dkim-spf",
          icon: "fab fa-angellist"
        }
      ],
      middle: [
        {
          name: "Setup DKIM/SPF",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "/check/setup-dkim-spf",
          icon: "fab fa-angellist"
        },
        {
          name: "Setup DKIM/SPF",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "/check/setup-dkim-spf",
          icon: "fab fa-angellist"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        },
        {
          name: "Setup DKIM/SPF",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "/check/setup-dkim-spf",
          icon: "fab fa-angellist"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        }
      ],
      good: [
        {
          name: "Setup DKIM/SPF",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "/check/setup-dkim-spf",
          icon: "fab fa-angellist"
        }
      ],
      items: [
        {
          name: "Setup DKIM/SPF",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "/check/setup-dkim-spf",
          icon: "fab fa-angellist"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fal fa-file "
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        },
        {
          name: "Setup push notifications",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6703100000f3212ce3f",
          help: "https://examples.com",
          icon: "fas fa-bell"
        },
        {
          name: "Add landing page",
          desc: "Cras sit amet nibh libero,in the control meter gravida nulla.",
          url: "http://www.mocky.io/v2/5cc9f6a0310000891212ce40",
          help: "/check/add-landing-page",
          icon: "fas fa-file"
        }
      ]
    };
  }
};
</script>

<style>
</style>