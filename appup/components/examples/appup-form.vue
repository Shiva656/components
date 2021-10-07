<template>
  <div>
    <!-- <appup-form  :inline="true" :inlineLabels="true" preload="load_form_with_data" submit="submit" :workflow_params="{entity:'test'}" v-model="modelf"/> -->
    <!-- {{modelf}} -->
    <div>
      <appup-form :form-json="formJson" :form-data="form" v-model="form" ref="form">
        <template slot="email">
          <small>will be added before email field</small>
        </template>
        <template slot="email-after">
          <small>This will be added after email field</small>
        </template>
      </appup-form>
      {{form}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formJson: {
        fields: [
           {
            type: "workflow",
            design_type:"designer2",
            src: "http://localhost:8080/#/index.html",
            width: "1000px",
            height: "500px",
            toolbar1: {
              fields: [
                {
                  name: "Twilio-Queue",
                  thumbnail: "images/designer/twilio-queue.svg",
                  icon: "images/designer/twilio-queue.svg",
                  info:
                    "Add incoming numbers to specific queue untill agent is free",
                  author: "Sainath",
                  company: "Invox",
                  language: "en",
                  branches: "success",
                  type: {
                    name: "Queue",
                    type: "Queue",
                  },
                  phonesystem: "Voicexml-url",
                  phonesystemtypes: "",
                  category: "Standard PBX, Basic",
                  ui: [
                    {
                      dynamicValue: "recording_url",
                      dynamicName: "name",
                      name: "audio_url",
                      label: "Recorded Audio",
                      id: "Recorded",
                      title: "Select Any url",
                      category: "Settings",
                      type: "select",
                      fieldType: "dynamicselect",
                      url: "/pbxplusqa/audio",
                      required: false,
                    },
                    {
                      name: "text",
                      label: "Greetings",
                      id: "variable",
                      category: "Settings",
                      title: "Enter Greetings",
                      placeholder: "Enter Greetings here...",
                      type: "text",
                      fieldType: "input",
                      required: false,
                    },
                    {
                      dynamicValue: "id",
                      dynamicName: "name",
                      name: "queue_id",
                      label: "Queue Name",
                      id: "Queue-Node",
                      title: "Select Queue",
                      category: "Settings",
                      type: "select",
                      fieldType: "dynamicselect",
                      url: "/v2qa/queue?fields=id,name",
                      required: true,
                    },
                  ],
                  displayname: "Queue",
                },
                {
                  author: "Sainath",
                  branches: "Yes,No",
                  category: "Developers",
                  company: "Appup",
                  displayname: "Business Hours",
                  help: "Validates form fields.",
                  icon: "images/designer/business-hours-circle.svg",
                  info:
                    "Define your operiational hours that are open to receiving calls in 24 hour clock",
                  language: "en",
                  name: "Business Hours",
                  thumbnail: "images/designer/business-hours-circle.svg",
                  type: {
                    name: "Businesshours",
                    type: "Business-Hours",
                  },
                  ui: [
                    {
                      category: "Settings",
                      fieldType: "select",
                      id: "value",
                      label: "Select TimeZone",
                      name: "Time Zone",
                      options: {
                        "(GMT+00:00)Casablanca,Monrovia,Reykjavik":
                          "Africa/Casablanca",
                        "(GMT+00:00)GreenwichMeanTime:Dublin,Edinburgh,Lisbon,London":
                          "Etc/Greenwich",
                        "(GMT+01:00)Amsterdam,Berlin,Bern,Rome,Stockholm,Vienna":
                          "Europe/Amsterdam",
                        "(GMT+01:00)Belgrade,Bratislava,Budapest,Ljubljana,Prague":
                          "Europe/Belgrade",
                        "(GMT+01:00)Brussels,Copenhagen,Madrid,Paris":
                          "Europe/Brussels",
                        "(GMT+01:00)Sarajevo,Skopje,Warsaw,Zagreb":
                          "Europe/Sarajevo",
                        "(GMT+01:00)WestCentralAfrica": "Africa/Lagos",
                        "(GMT+02:00)Amman": "Asia/Amman",
                        "(GMT+02:00)Athens,Bucharest,Istanbul": "Europe/Athens",
                        "(GMT+02:00)Beirut": "Asia/Beirut",
                        "(GMT+02:00)Cairo": "Africa/Cairo",
                        "(GMT+02:00)Harare,Pretoria": "Africa/Harare",
                        "(GMT+02:00)Helsinki,Kyiv,Riga,Sofia,Tallinn,Vilnius":
                          "Europe/Helsinki",
                        "(GMT+02:00)Jerusalem": "Asia/Jerusalem",
                        "(GMT+02:00)Minsk": "Europe/Minsk",
                        "(GMT+02:00)Windhoek": "Africa/Windhoek",
                        "(GMT+03:00)Kuwait,Riyadh,Baghdad": "Asia/Kuwait",
                        "(GMT+03:00)Moscow,St.Petersburg,Volgograd":
                          "Europe/Moscow",
                        "(GMT+03:00)Nairobi": "Africa/Nairobi",
                        "(GMT+03:00)Tbilisi": "Asia/Tbilisi",
                        "(GMT+03:30)Tehran": "Asia/Tehran",
                        "(GMT+04:00)Baku": "Asia/Baku",
                        "(GMT+04:00)Yerevan": "Asia/Yerevan",
                        "(GMT+04:00)u2028AbuDhabi,Muscat": "Asia/Muscat",
                        "(GMT+04:30)Kabul": "Asia/Kabul",
                        "(GMT+05:00)Islamabad,Karachi,Tashkent": "Asia/Karachi",
                        "(GMT+05:00)Yekaterinburg": "Asia/Yekaterinburg",
                        "(GMT+05:45)Kathmandu": "Asia/Katmandu",
                        "(GMT+06:00)Almaty,Novosibirsk": "Asia/Almaty",
                        "(GMT+06:00)Astana,Dhaka": "Asia/Dhaka",
                        "(GMT+06:30)Yangon(Rangoon)": "Asia/Rangoon",
                        "(GMT+07:00)Bangkok,Hanoi,Jakarta": "Asia/Bangkok",
                        "(GMT+07:00)Krasnoyarsk": "Asia/Krasnoyarsk",
                        "(GMT+08:00)Beijing,Chongqing,HongKong,Urumqi":
                          "Asia/Hong_Kong",
                        "(GMT+08:00)Irkutsk,UlaanBataar": "Asia/Irkutsk",
                        "(GMT+08:00)KualaLumpur,Singapore": "Asia/Kuala_Lumpur",
                        "(GMT+08:00)Perth": "Australia/Perth",
                        "(GMT+08:00)Taipei": "Asia/Taipei",
                        "(GMT+09:00)Osaka,Sapporo,Tokyo": "Asia/Tokyo",
                        "(GMT+09:00)Seoul": "Asia/Seoul",
                        "(GMT+09:00)Yakutsk": "Asia/Yakutsk",
                        "(GMT+09:30)Adelaide": "Australia/Adelaide",
                        "(GMT+09:30)Darwin": "Australia/Darwin",
                        "(GMT+10:00)Brisbane": "Australia/Brisbane",
                        "(GMT+10:00)Canberra,Melbourne,Sydney":
                          "Australia/Canberra",
                        "(GMT+10:00)Guam,PortMoresby": "Pacific/Guam",
                        "(GMT+10:00)Hobart": "Australia/Hobart",
                        "(GMT+10:00)Vladivostok": "Asia/Vladivostok",
                        "(GMT+11:00)Magadan,SolomonIs.,NewCaledonia":
                          "Asia/Magadan",
                        "(GMT+12:00)Auckland,Wellington": "Pacific/Auckland",
                        "(GMT+12:00)Fiji,Kamchatka,MarshallIs.": "Pacific/Fiji",
                        "(GMT-01:00)Azores": "Atlantic/Azores",
                        "(GMT-01:00)CapeVerdeIs.": "Atlantic/Cape_Verde",
                        "(GMT-02:00)Mid-Atlantic": "America/Noronha",
                        "(GMT-03:00)Brasilia": "America/Sao_Paulo",
                        "(GMT-03:00)BuenosAires,Georgetown":
                          "America/Argentina/Buenos_Aires",
                        "(GMT-03:00)Greenland": "America/Godthab",
                        "(GMT-03:00)Montevideo": "America/Montevideo",
                        "(GMT-03:30)Newfoundland": "Canada/Newfoundland",
                        "(GMT-04:00)AtlanticTime(Canada)": "Canada/Atlantic",
                        "(GMT-04:00)Caracas,LaPaz": "America/Caracas",
                        "(GMT-04:00)Manaus": "America/Manaus",
                        "(GMT-04:00)Santiago": "America/Santiago",
                        "(GMT-05:00)Bogota,Lima,Quito,RioBranco":
                          "America/Bogota",
                        "(GMT-05:00)EasternTime(US,Canada)": "US/Eastern",
                        "(GMT-05:00)Indiana(East)": "US/East-Indiana",
                        "(GMT-06:00)CentralAmerica": "America/Managua",
                        "(GMT-06:00)CentralTime(US,Canada)": "US/Central",
                        "(GMT-06:00)Guadalajara,MexicoCity,Monterrey":
                          "America/Mexico_City",
                        "(GMT-06:00)Saskatchewan": "Canada/Saskatchewan",
                        "(GMT-07:00)Arizona": "US/Arizona",
                        "(GMT-07:00)Chihuahua,LaPaz,Mazatlan":
                          "America/Chihuahua",
                        "(GMT-07:00)MountainTime(US,Canada)": "US/Mountain",
                        "(GMT-08:00)PacificTime(US,Canada)":
                          "America/Los_Angeles",
                        "(GMT-08:00)Tijuana,BajaCalifornia": "America/Tijuana",
                        "(GMT-09:00)Alaska": "US/Alaska",
                        "(GMT-10:00)Hawaii": "Pacific/Honolulu",
                        "(GMT-11:00)MidwayIsland,Samoa": "Pacific/Midway",
                        "(GMT-12:00)InternationalDateLineWest": "Etc/GMT+12",
                        "*(GMT+05:30)Chennai,Kolkata,Mumbai,NewDelhi":
                          "Asia/Calcutta",
                      },
                      required: true,
                      title: "Zone type",
                      type: "select",
                    },
                    {
                      category: "Settings",
                      fieldType: "input",
                      id: "Time1",
                      label: "From Time",
                      name: "From Time",
                      required: "required",
                      title: "Enter From Time in 24 hrs clock",
                      type: "time",
                    },
                    {
                      category: "Settings",
                      fieldType: "input",
                      id: "Time2",
                      label: "To Time",
                      name: "To Time",
                      required: "required",
                      title: "Enter To Time in 24 hrs clock",
                      type: "time",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Add your business hours to streamline your calling features that lets you to conveniently route calls on a timely footing. Allow when you permit calls to communicate, forward, send a greeting, or play tunes voicemail.",
                      type: "label",
                    },
                  ],
                },
                {
                  author: "Appup Developer",
                  branches: "",
                  category: "Utilities",
                  company: "Appup.com",
                  displayname: "Menu",
                  dynamicbranch: "key",
                  dynamicportkey: "cases",
                  dynamicports: "yes",
                  help: "Switch case Step",
                  icon: "images/designer/menu_circle.svg",
                  id: "Switch_Case_Step",
                  info:
                    "Assign conditions and routing principles to streamline calls accordingly",
                  language: "en",
                  material_icon: "format_list_bulleted",
                  material_icon_bg_color: "bg_blue",
                  material_icon_color: "blue",
                  material_icon_img: "storage",
                  name: "Menu",
                  thumbnail: "images/designer/menu_circle.svg",
                  type: { name: "Menu" },
                  ui: [
                    {
                      category: "Settings",
                      dynamicName: "name",
                      dynamicValue: "url",
                      fieldType: "dynamicselect",
                      id: "Recorded",
                      label: "Recorded Audio",
                      name: "plugin_name",
                      required: false,
                      title: "Select Any url",
                      type: "select",
                      url: "/c/pbx/nodes",
                    },
                    {
                      category: "Settings",
                      fieldType: "input",
                      id: "variable",
                      label: "Greetings",
                      name: "variable",
                      placeholder: "Enter Greetings here...",
                      required: false,
                      title: "Enter Greetings",
                      type: "text",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Menu will route the call to different extensions numbers assigned to different functional departments based on user/client requirements:",
                      type: "label",
                    },
                    {
                      category: "Settings",
                      fieldType: "grid",
                      id: "cases",
                      label: "Extensions",
                      name: "cases",
                      required: false,
                      title: "",
                      type: "grid",
                      ui: [
                        {
                          fieldType: "input",
                          id: "value",
                          label: "Input",
                          maxlength: "3",
                          minlength: "1",
                          name: "key",
                          pattern: "^[0-9]+$",
                          required: true,
                          title: "Enter value",
                          type: "string",
                        },
                        {
                          fieldType: "input",
                          id: "value",
                          label: "Name",
                          name: "value",
                          required: true,
                          title: "Enter value",
                          type: "text",
                        },
                      ],
                    },
                  ],
                  unique_branches: "yes",
                },
                {
                  author: "Sainath",
                  branches: "success",
                  category: "Utilities",
                  company: "Appup",
                  displayname: "Play Audio",
                  help: "Validates form fields.",
                  icon: "images/designer/play-audio-circle.svg",
                  info:
                    "Select if you prefer to add audio/music to the flow while the caller waits or holds on",
                  language: "en",
                  name: "Play Audio",
                  view: "list",
                  thumbnail: "images/designer/play-audio-circle.svg",
                  type: {
                    name: "Greetings",
                    type: "Greetings",
                  },
                  ui: [
                    {
                      category: "Greetings",
                      dynamicName: "name",
                      dynamicValue: "url",
                      fieldType: "dynamicselect",
                      id: "Recorded",
                      label: "Recorded Audio",
                      name: "audio_url",
                      required: true,
                      title: "Select Any url",
                      type: "select",
                      url: "/c/pbx/nodes",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Add audio of preference to your flow to retain the customer while they wait to reach you out or while holding up for the subsequent action",
                      type: "label",
                    },
                  ],
                },
                {
                  author: "Sainath",
                  branches: "success",
                  category: "Utilities",
                  company: "Appup",
                  displayname: "Text To Speech",
                  help: "Validates form fields.",
                  icon: "images/designer/text-to-speech-circle.svg",
                  info:
                    "Convert text to speech to communicate even when remote",
                  language: "en",
                  name: "Text To Speech",
                  view: "list",
                  thumbnail: "images/designer/text-to-speech-circle.svg",
                  type: {
                    name: "Greetings",
                    type: "Greetings",
                  },
                  ui: [
                    {
                      category: "Greetings",
                      cols: "75",
                      fieldType: "textarea",
                      id: "tts-3",
                      label:
                        "Convert text into phonetic voice output, that aids in enhanced customer management by reading tour text to the caller",
                      name: "tts",
                      required: "required",
                      rows: "13",
                      title:
                        "Convert text into phonetic voice output, that aids in enhanced customer management by reading tour text to the caller",
                      type: "textarea",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label: "Given Text is converted in to speech",
                      type: "label",
                    },
                  ],
                },
                {
                  author: "Sainath",
                  branches: "success,failure",
                  category: "Developers",
                  company: "Appup",
                  displayname: "Forward Call",
                  help: "Validates form fields.",
                  icon: "images/designer/forward-call-circle.svg",
                  info:
                    "Facilitates a user to transport a current telephonic call to a different phone number or user.",
                  language: "en",
                  name: "Forward Call",
                  thumbnail: "images/designer/PNG/forward-call-circle.svg",
                  type: {
                    name: "forward-call",
                    type: "forward-call",
                  },
                  ui: [
                    {
                      category: "Forward To",
                      dynamicName: "name",
                      dynamicValue: "user_id",
                      fieldType: "dynamicselect",
                      id: "username",
                      label: "Select User",
                      name: "plugin_name",
                      required: false,
                      title: "Select User",
                      type: "select",
                      url: "/b1/users",
                    },
                    {
                      category: "Forward To",
                      fieldType: "input",
                      id: "fNumber",
                      label: "Number",
                      maxlength: "13",
                      minlength: "10",
                      name: "Number",
                      require: "false",
                      title: "Enter Phone Number.",
                      type: "tel",
                    },
                    {
                      category: "Forward To",
                      label: "Provided user and number user will be defaulted.",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Forward the call to the desired number or users. Get a list of All users, added to PBX Plus, in a dropdown along with the number/client associated with each.",
                      type: "label",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Ensure you provide numbers along with country code.",
                      type: "label",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Maximum Call Timeout is set for 60seconds if a custom number is provided while user selection, both numbers tend to ring at the identical time.",
                      type: "label",
                    },
                    {
                      category: "Forward To",
                      fieldType: "input",
                      label: "Recording on",
                      name: "Recording",
                      style: "width:0",
                      title:
                        "You can record all conversations for training and quality purposes. Please ensure that your account has call recording enabled for this feature to work. Also note that by enabling this feature, you have permission to record calls. Any legal issues arising from recording calls should be handled by the customer. Invox assumes no responsibility for any legal issues.",
                      type: "checkbox",
                      value: "true",
                    },
                  ],
                },
                {
                  author: "Sainath",
                  branches: "success,failure",
                  category: "Standard PBX, Basic",
                  company: "Invox",
                  displayname: "Findme-Simulring",
                  icon: "images/designer/find-me-circle.svg",
                  info:
                    "Forward incoming calls to your designated phone numbers.",
                  language: "en",
                  name: "Findme",
                  phonesystem: "Voicexml-url",
                  phonesystemtypes: "",
                  thumbnail: "images/designer/find-me-circle.svg",
                  type: {
                    name: "Find-Me-Enh-dropdown",
                    type: "Findme-Simulring",
                  },
                  ui: [
                    {
                      category: "Settings",
                      label: "Phone Numbers",
                      name: "phonegrid",
                      type: "grid",
                      ui: [
                        {
                          category: "Forward To",
                          dynamicName: "name",
                          dynamicValue: "user_id",
                          fieldType: "dynamicselect",
                          id: "SelectedUser",
                          label: "Select User",
                          name: "phone",
                          required: false,
                          title: "Select User",
                          type: "select",
                          url: "/b1/users",
                        },
                        {
                          category: "Forward To",
                          fieldType: "input",
                          id: "fNumber",
                          label: "Number",
                          maxlength: "13",
                          minlength: "10",
                          name: "Number",
                          require: "false",
                          title: "Enter Phone Number.",
                          type: "tel",
                        },
                      ],
                    },
                    {
                      category: "Settings",
                      fieldType: "input",
                      label: "Call Connection Timeout (sec)",
                      name: "timeout",
                      required: "true",
                      title:
                        "Specify the maximum duration for trying to connect the call to the specified phone number. After the timeout is reached, the phone call will be forwarded to the next phone number that is available in the list.",
                      type: "text",
                      value: "60",
                    },
                    {
                      category: "Settings",
                      checked: "checked",
                      fieldType: "input",
                      label: "Parallel Ringing",
                      name: "callallattime",
                      style: "width:0",
                      title:
                        "All of the specified phone numbers are called simultaneously. The call will be connected to the first phone number that answers the call. This is a useful feature when you have more than one agent to receive calls.",
                      type: "radio",
                    },
                    {
                      category: "Settings",
                      fieldType: "input",
                      label: "Call one by one",
                      name: "callallattime",
                      style: "width:0",
                      title:
                        "Designated numbers are called sequentially until the recipient answers the call. We recommend this feature as opposed to calling all the phone numbers at once.",
                      type: "radio",
                      value: "no",
                    },
                    {
                      category: "Settings",
                      fieldType: "h4",
                      value: "Record:",
                    },
                    {
                      category: "Settings",
                      fieldType: "input",
                      label: "Recording on",
                      name: "Recording",
                      style: "width:0",
                      title:
                        "You can record all conversations for training and quality purposes. Please ensure that your account has call recording enabled for this feature to work. Also note that by enabling this feature, you have permission to record calls. Any legal issues arising from recording calls should be handled by the customer. Invox assumes no responsibility for any legal issues.",
                      type: "checkbox",
                      value: "true",
                    },
                    {
                      category: "Settings",
                      label: "Provided user and number both are considered.",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Parallel Ring - ensures that all the provided numbers ring at the same time.",
                      type: "label",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Call One By One -  when a call is received to a certain number and is left unanswered, the call proceeds to a different number inline post the timeout period.",
                      type: "label",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Maximum Call Timeout is set for 60seconds if a custom number is provided while user selection, both numbers tend to ring at the identical time.",
                      type: "label",
                    },
                  ],
                },
                {
                  author: "Sainath",
                  branches: "success",
                  category: "Utilities",
                  company: "Appup",
                  displayname: "Voicemail",
                  icon: "images/designer/voicemail-circle.svg",
                  info:
                    "Verbal communication is digitized and filed for later playback to the intended recipient.",
                  language: "en",
                  name: "Voicemail",
                  thumbnail: "images/designer/voicemail-circle.svg",
                  type: {
                    name: "Voice-Mail",
                    type: "Voice-Mail",
                  },
                  ui: [
                    {
                      category: "Voice-Mail",
                      dynamicName: "name",
                      dynamicValue: "url",
                      fieldType: "dynamicselect",
                      id: "Recorded",
                      label: "Recorded Audio",
                      name: "audio_url",
                      title: "Select Any url",
                      type: "select",
                      url: "/c/pbx/nodes",
                    },
                    {
                      category: "Voice-Mail",
                      cols: "75",
                      fieldType: "textarea",
                      help: "Validates form fields.",
                      id: "Voice-Mail",
                      label:
                        "Eg:- Leave Message Here,Sorry You may leave some message here....",
                      name: "Voice-Mail",
                      rows: "13",
                      title:
                        "Eg:- Leave Message Here,Sorry You may leave some message here....",
                      type: "textarea",
                    },
                    {
                      category: "Voice-Mail",
                      dynamicName: "name",
                      dynamicValue: "email",
                      fieldType: "dynamicselect",
                      id: "Recorded",
                      label: "Select Name",
                      name: "plugin_name",
                      required: false,
                      title: "Select Any Name",
                      type: "select",
                      url: "/b1/users",
                    },
                    {
                      category: "Help",
                      fieldType: "label",
                      label:
                        "Exchange personal voice message - store,  select and deliver a voice message to callers for processing information even during disconnection  .Eg - leave your reply, sorry you may leva message here. Voicemail will be dropped to the given email in the input box",
                      type: "label",
                    },
                  ],
                },
                {
                  thumbnail: "images/designer/workflow-execute-step.svg",
                  author: "Appup Developer",
                  icon: "images/designer/workflow-execute-step.svg",
                  language: "en",
                  branches: "success",
                  type: { name: "Transer-Flow" },
                  material_icon: "storage",
                  workflow_tasklet_class_name:
                    "com.appup.workflows.external.steps.WorkflowExecuteStepExecutor",
                  help: "Workflow Execute Step",
                  ui: [
                    {
                      dynamicValue: "id",
                      dynamicName: "name",
                      name: "id",
                      label: "Flow Name",
                      id: "id",
                      title: "Select Workflow NAME",
                      category: "Settings",
                      type: "select",
                      fieldType: "dynamicselect",
                      url: "v2/call_flows?fields=id,name",
                      required: true,
                    },
                  ],
                  material_icon_color: "blue",
                  displayname: "Transer Flow",
                  material_icon_bg_color: "bg_blue",
                  name: "Workflow Execute Step",
                  material_icon_img: "storage",
                  company: "pbxplus",
                  id: "Workflow_execute",
                  category: "Utilities",
                  info: "Used to call another workflow.",
                },
              ],
            }
          },
          {
            type: "esign",
            name: "esign",
            label: "esign",
            permission: "admin",
            src: "http://www.africau.edu/images/default/sample.pdf",
            usersrc1: "http://www.africau.edu/images/default/sample.pdf",
            max_image_size: "525",

            active_tab: 0,
            s3_config_object: {
              url: "https://cmsapps.500apps.com/websitecms/presign?file_name=",
              id: "file_id",
              name: "file_name"
            },
            select_colors: [
              "#f1d3a1",
              "#e3dbd9",
              "#e6eff6",
              "#89b4c4",
              "#548999"
            ],
            users: [
              { id: 1, name: "User 1" },
              { id: 2, name: "User 2" },
              { id: 3, name: "User 3" },
              { id: 4, name: "User 4" },
              { id: 5, name: "User 5" }
            ],
            active_users_list: [
              { id: 2, name: "User 2" },
              { id: 3, name: "User 3" }
            ],
            edit_tools: ["text", "date"],
            description: "esign"
          },
          {
            type: "email-builder",
            name: "email_builder",
            label: "Email Builder",
            description: "Description",
            plugin:"webpage"
          },
          {
            type: "textarea",
            name: "textarea",
            label: "ID",
            charCount: true,
            description: "Description"
          },
          
          {
            id: "form-builder",
            name: "fields",
            label: "Add Fields",
            description: "Add fields to form like text, email, dropdown...",
            type: "form-builder"
          },
          {
            type: "konva",
            name: "konva",
            label: "konva",
            image_source:
              "https://cmswebsites.s3.us-west-1.amazonaws.com/Screenshot%20from%202019-01-23%2018-59-18.png",
            konva_config: {
              width: 500,
              height: 500,
              align: "right",
              SameSite: "None"
            },
            image_config: {
              width: 500,
              height: 500
            },
            show_info_icon: true,
            info_icon_text: "konva tooltip",
            show_action_icon: true,
            action_icon_class: "fas fa-plus ",
            action_icon_tooltip: "hiiiiiiiiiiiii"
          },
          {
            id: "id",
            type: "text",
            name: "id",
            label: "ID"
          },
          {
            type: "swatches",
            name: "swatches",
            description: "Ac swatches",
            label: "Sample swatches sdfgsdf",
            colors: ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5"],
            color: "",
            show_info_icon: true,
            info_icon_text: "swatches tooltip"
          },
          {
            id: "File_upload",
            type: "upload",
            name: "File_upload",
            uploadConfig: {
              buttonClass: "btn-primary",
              divClass: "mid-center",
              buttonName: "Upload File",
              url: "https://cmsapps.500apps.com/websitecms/presign?file_name=",
              id: "file_id",
              name: "file_name",
              image_source:
                "https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm",
              imagePreviewConfig: { height: "300px", width: "300px" },
              size: 1
            }
          },
          {
            type: "date-range",
            name: "date-range",
            description: "Ac Date range picker",
            label: "Sample swatches",
            opens: "center",
            dateFormat: "YYYY-MM-DD",
            minDate: "2016-09-02",
            maxDate: "2019-12-12",
            show_ranges: true,
            singleDatePicker: false,
            timePicker: true,
            timePicker24Hour: true,
            showDropdowns: true,
            autoApply: false,
            showWeekNumbers: true
          },
          {
            id: "select",
            type: "dropdown",
            name: "select",
            label: "Sample Select",
            option: [
              {
                value: null,
                label: "Please select an option"
              },
              {
                value: "one",
                label: "one"
              },
              {
                value: "two",
                label: "two"
              },
              {
                value: "three",
                label: "three"
              }
            ],
            required: true
          },
          {
            id: "section_field",
            name: "section",
            label: "section",
            description: null,
            type: "radio",
            option: [
              {
                label: "Yes",
                value: true
              },
              {
                label: "No",
                value: false
              }
            ]
          },
          {
            id: "checkbox",
            type: "checkbox",
            name: "checkbox",
            label: "Checkbox",
            option: [
              {
                label: "Orange",
                value: "orange"
              },
              {
                label: "Apple",
                value: "apple",
                checked: true
              },
              {
                label: "Pineapple",
                value: "pineapple"
              },
              {
                label: "Grape",
                value: "grape",
                disabled: true
              }
            ],
            required: true
          },
          {
            id: "dropdownDynamic",
            type: "dropdown",
            name: "dropdownDynamic",
            label: "Dropdown with Options from url",
            url: "https://jsonplaceholder.typicode.com/posts",
            key_value: "id",
            key_label: "title",
            required: true
          },
          {
            id: "name",
            type: "text",
            name: "name",
            label: "Name",
            placeholder: "Enter Name",
            required: true,
            container: "settings",
            "container-name": "Template",
            "container-active": "true"
          },
          {
            id: "username",
            type: "text",
            name: "username",
            label: "User Name",
            container: "settings",
            "container-name": "Template2"
          },
          {
            id: "email",
            type: "text",
            name: "email",
            label: "Email",
            required: true
          },
          {
            id: "company",
            type: "form",
            name: "company",
            label: "Company Details",
            fieldsUrl: "http://www.mocky.io/v2/5ce7b9713500009317cf60a7"
          },
          {
            id: "sss",
            type: "grid",
            name: "gridfield",
            columns: [
              {
                key: "age",
                label: "Age",
                sortable: true,
                class: "text-center"
              },
              {
                key: "first_name",
                label: "First Name",
                sortable: true,
                sortDirection: "desc"
              },
              {
                key: "last_name",
                label: "Last Name"
              },
              {
                key: "actions",
                label: ""
              }
            ],
            formJson: {
              fields: [
                {
                  type: "text",
                  name: "age",
                  label: "Age",
                  required: true
                },
                {
                  type: "text",
                  name: "first_name",
                  label: "First Name"
                },
                {
                  type: "text",
                  name: "last_name",
                  label: "Last Name"
                },
                {
                  name: "dual-list",
                  type: "dual-list",
                  collection_props: {},
                  dualValues: [{ label: "Option 3", value: "03" }],
                  dropdown: {
                    options: [
                      {
                        label: "Edit",
                        type: "edit",
                        icon: "fas fa-pencil-alt"
                      },
                      {
                        label: "Delete",
                        type: "delete",
                        icon: "fas fa-trash-alt"
                      }
                    ],
                    button_options: {
                      icon: "fas fa-ellipsis-v",
                      variant: "outline-secondary",
                      size: "sm",
                      right: true
                    }
                  },
                  collection: {
                    url: "https://demo7902876.mockable.io/duallist",
                    loading_image:
                      "https://cmswebsites.s3.us-west-1.amazonaws.com/Dual%20Ring-0.9s-200px.gif",
                    ac_cursor: {
                      postId: 1
                    },
                    method: "GET",
                    params: {
                      headers: {
                        "Custom-Header": "My custom header"
                      }
                    },
                    sort_key: "name"
                  },
                  options: [
                    { label: "Option 1", value: "01" },
                    { label: "Option 2", value: "02" }
                  ],
                  key_value: "id",
                  key_label: "value"
                }
              ]
            }
          },
          {
            name: "dual-list",
            type: "dual-list",
            description: "This is dual list component",
            dualValues: [],
            dropdown: {
              options: [
                {
                  label: "Edit",
                  type: "edit",
                  icon: "fas fa-pencil-alt"
                },
                {
                  label: "Delete",
                  type: "delete",
                  icon: "fas fa-trash-alt"
                }
              ],
              button_options: {
                icon: "fas fa-ellipsis-v",
                variant: "outline-secondary",
                size: "sm",
                right: true
              }
            },
            collection: {
              url: "https://demo7902876.mockable.io/duallist",
              loading_image:
                "https://cmswebsites.s3.us-west-1.amazonaws.com/Dual%20Ring-0.9s-200px.gif",
              ac_cursor: {
                postId: 1
              },
              method: "GET",
              params: {
                headers: {
                  "Custom-Header": "My custom header"
                }
              },
              sort_key: "name"
            },
            options: [
              { label: "Option 1", value: "01" },
              { label: "Option 2", value: "02" }
            ],
            key_value: "id",
            key_label: "value"
          }
        ]
      },
      fieldsUrl: "https://api.myjson.com/bins/qnf81",
      form: {
         esign: [
          {
            id: 2,
            user_id: 1,
            page_index: 0,
            offsetX: 102,
            offsetY: 364,
            props: {
              editable: false,
              value: "Nobody can't edit"
            }
          },
          {
            id: 2,
            user_id: 3,
            page_index: 0,
            offsetX: 106,
            offsetY: 411,
            props: {
              editable: true,
              value: "User 3 can edit"
            }
          },
          {
            id: 2,
            user_id: 2,
            page_index: 0,
            offsetX: 104,
            offsetY: 463,
            props: {
              editable: true,
              value: "User 2 can edit"
            }
          },
          {
            id: 2,
            user_id: 5,
            page_index: 0,
            offsetX: 104,
            offsetY: 522,
            props: {
              editable: true,
              value: "User 5 can edit"
            }
          },
          {
            id: 5,
            user_id: 2,
            page_index: 0,
            offsetX: 343,
            offsetY: 337,
            props: {
              width: 332,
              height: 65,
              value: null
            }
          },
          {
            id: 4,
            user_id: 3,
            page_index: 0,
            offsetX: 342,
            offsetY: 463,
            props: {
              width: 133,
              height: 144,
              value:
                "data:image/png;base64,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"
            }
          }
        ],
        id: 1,
        name: "Leanne Graham",
        username: "Bretss",
        email: "Sincere@april.bizssss",
        company: { name: "n", catchPhrase: "cp", bs: "bs" },
        select: "two",
        checkbox: ["pineapple"],
        dropdownDynamic: 10,
        section: "false",
        date: "16-06-2019",
        "date-range": { startDate: "2019-10-10", endDate: "2019-11-11" },
        email_builder: `<a class="button">Button</a><div id="iekko">,jnkhiuhiuhiuiu</div><style>* { box-sizing: border-box; } body {margin: 0;}#iekko{padding:10px;}</style>`
      },
      test: {
        fields: [
          {
            id: 50,
            type: "dropdown",
            name: "select",
            label: "Sample Select",
            inline: true,
            inline_class: "col-md-3",
            option: [
              {
                value: null,
                label: "Please select an option"
              },
              {
                value: "one",
                label: "one"
              },
              {
                value: "two",
                label: "two"
              },
              {
                value: "three",
                label: "three"
              }
            ],
            required: true
          },
          {
            inline: true,
            inline_class: "col-md-12",
            id: 60,
            type: "dropdown",
            name: "dropdownDynamic",
            label: "Dropdown with Options from url",
            url: "https://jsonplaceholder.typicode.com/posts",
            key_value: "id",
            key_label: "title",
            required: true
          },
          {
            inline: true,
            inline_class: "col-md-5",
            id: 130,
            type: "date",
            name: "date",
            label: "Date",
            placeholder: "Pick Date",
            required: true
          },
          {
            id: 5,
            type: "form",
            name: "company",
            label: "Company Details",
            fieldsUrl: "http://www.mocky.io/v2/5ce7b9713500009317cf60a7"
          }
        ],
        buttons: [
          {
            label: "Save1111",
            variant: "primary",
            type: "submit",
            function: "onSubmit"
          }
        ]
      },
      modelf: {}
    };
  }
};
</script>

