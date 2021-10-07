<template>
  <div class="bg-light"  v-if = "twilioReady == true">
    <!-- Twilio Ready -->
    <div class="btn-group-vertical ml-4 mt-4 py-4 px-3 dailer-pad bg-white shadow rounded mb-3 position-relative" role="group" aria-label="Basic example">
      
      <div v-if="buttonPressed || phoneNumber" class="input-group phone-pad-section px-3 pb-3 align-items-center mb-auto">
        <!-- <div class="input-group-prepend">
          <span class="input-group-text bg-white border-0 pr-0" id="phone-prefix">91</span>
        </div> -->
        <input class="text-center form-control my-2 border-0 phone-pad px-0" v-model="phoneNumber"><i v-if = "outgoing =='0'" class="fal fa-arrow-down pb-1"></i><i v-if = "outgoing =='1'" class="fal fa-arrow-up pb-1"></i>
      </div>    

      <div v-if="callconnected == false || callforward == true || callConference == true">
        <div class="btn-group w-100 mt-auto pt-3 dailed-btns justify-content-center">
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(1)">1
            <p class="small mb-0">&nbsp;</p>
          </button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(2)">2
            <p class="small mb-0">ABC</p>
          </button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(3)">3
            <p class="small mb-0">DEF</p>
          </button>
        </div>
        
        <div class="btn-group w-100 dailed-btns justify-content-center">
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(4)">4
            <p class="small mb-0">GHI</p>
          </button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(5)">5
            <p class="small mb-0">JKL</p>
          </button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(6)">6
            <p class="small mb-0">MNO</p>
          </button>
        </div>
        
        <div class="btn-group w-100 dailed-btns justify-content-center">
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(7)">7
            <p class="small mb-0">PQRS</p>
          </button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(8)">8
            <p class="small mb-0">TUV</p>
          </button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(9)">9
            <p class="small mb-0">WXYZ</p>
          </button>
        </div>
        
        <div class="btn-group w-100 dailed-btns justify-content-center">
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed('*')"><i class="fal fa-asterisk fa-sm"></i></button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed(0)">0</button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="digit_pressed('#')"><i class="fal fa-hashtag fa-sm"></i></button>
        </div>
      </div>
       
      <div class="d-inline-flex w-100 active-btns mt-3 dailed-btns justify-content-between">
        <button type="button" class="btn success-btn px-0 pt-0 small-icon w-100 rounded-circle" @click="digit_pressed('+')"><i class="fal fa-plus fa-sm"></i></button>
        <button v-if="callconnected == false" type="button" class="btn success-btn px-0 pt-0 w-100 rounded-circle" @click="make_call('false')" v-b-tooltip.hover title="Call"><i class="fal fa-phone fa-lg pl-1 text-success"></i></button>
        <button  v-else-if="callconnected == true && (callforward == true || callConference == true)" type="button" class="btn danger-btn px-0 pt-0 w-100 rounded-circle" @click="transfer_called()" v-b-tooltip.hover title="Call"><i class="fal fa-phone fa-sm pl-1 text-success"></i></button>
        <button v-if="callconnected == true && callforward == false" type="button" style="font-size: 18px !important;" class="btn btn-outline-secondary border-0 p-0 rounded-circle btn-sm" :disabled = "true" v-b-tooltip.hover title="Video"><i class="fal fa-video fa-sm"></i></button>
        <button type="button" class="btn danger-btn px-0 pt-0 small-icon w-100 rounded-circle" @click="backSpace()" v-b-tooltip.hover title="Backspace"><i class="fal fa-backspace fa-sm"></i></button>
      </div> 

      <div v-if = "callconnected == false && withCallMusic == true" class="d-inline-flex w-100 active-btns mt-3 dailed-btns justify-content-between">
        <button type="button" class="btn success-btn px-0 pt-0 small-icon w-100 rounded-circle"></button>
        <button type="button" class="btn success-btn px-0 pt-0 w-100 rounded-circle" @click="make_call('true')" v-b-tooltip.hover title="Play Music"><i class="fal fa-play"></i></button>
        <button type="button" class="btn danger-btn px-0 pt-0 w-100 rounded-circle"></button>
      </div> 

      <div v-if = "callconnected == true" class="mb-4 w-100">
        <div class="btn-group call-diconnect-btns small-icon w-100 justify-content-around">
          <button  type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="conference_call()" v-b-tooltip.hover title="Conference"><i class="fal fa-users"></i></button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle custom-phone-icon position-relative" :disabled="outboundTransfer == false" @click="transfer_call()"><i class="fal fa-phone fa-sm pl-1" v-b-tooltip.hover title="Transfer Call"></i></button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="mute_call()"><i v-if = "twilioMute == false" class="fal fa-microphone fa-sm" v-b-tooltip.hover title="Mute"></i><i v-if = "twilioMute == true" class="fal fa-microphone-slash fa-sm text-danger" v-b-tooltip.hover title="Unmute"></i></button>
          <button type="button" class="btn btn-outline-secondary border-0 p-0 rounded-circle" @click="hold_call()" :disabled = "true"><i v-if = "callonHold == false" class="fal fa-pause" v-b-tooltip.hover title="Hold"></i><i v-if = "callonHold == true" class="fal fa-play" v-b-tooltip.hover title="play"></i></button>
        </div>
      </div>

      <div class="px-4 w-100 mt-3 mb-4 call-disconnect-btn" v-if="callconnected == true">
        <button style="max-height: 50px;" type="button" class="btn btn-danger danger-btn text-light px-0 pt-0 w-100 mt-auto" @click="disconnect_call()" v-b-tooltip.hover title="End call"><i class="fal fa-phone fa-sm pb-1"></i></button>
      </div>
      <div v-if = "callconnected == true" class="d-flex justify-content-center recorded-call-time mt-4" id= "ongoingtimer"></div>
      
    </div>
  </div>
<div v-else> Device will be ready in few seconds, please wait....</div>
</template>
<script>
import Vue from 'vue'

// import vuejs dialog for incoming call dialog
import VuejsDialog from 'vuejs-dialog';

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Tell Vue to install the plugin.
Vue.use(VuejsDialog)

export default{
    name: "AppupTwilioDialer",
    props: {
      /**
     * Number to be Dialled
     * @label phoneNumber
     * @category_name 1_General
     */
      phoneNumber: {
        type: String,
        default:""
      },
      /**
     * Number to be Dialled for music
     * @label phoneNumber
     * @category_name 1_General
     */
      withCallMusic:
      {
        type:Boolean,
        default:false
      }
   },
    data()
    {
       return{
         // Intially this flag is false, set to true when Twilio is ready
         twilioReady:false,
         // set to true if the call is active
         callconnected:false,
         twilioMute:false,
         callonHold:false,
         callforward:false,
         callId:"",
         outgoing:"",
         outboundTransfer:"",
         buttonPressed:false,
         callConference:false
       }
    },
    mounted(){
      
      // When Twilio device is ready
      window.AppupPluginsManager.$on("twilio-ready", (device) => 
      { 
        this.twilioReady = true;
      });
      
      // After twilio call connected
      window.AppupPluginsManager.$on("twilio-call-connected",(call) =>
      { 
       this.callconnected = true;
        this.incrementTimer();
      });

      // Call disconnected by Twilio client device
      window.AppupPluginsManager.$on("twilio-call-disconnected", (callId) =>
      {
        debugger;
        console.log("Call disconnected in Twilio");
        // Method emits call disconnected data
        this.CallDisconnect(callId)
        // set call connected to false
        this.callconnected = false;
        this.outgoing = "";

        // Clear the phone number 
        this.phoneNumber = "";

        // Hide the textfield
        this.buttonPressed = false;

        // Clear calltimer after call disconnected
         clearInterval(this.timeInterval);
         this.timeInterval = null;
      });
      
      window.AppupPluginsManager.$on("twilio-incoming-call-cancelled", (conn) =>
      {
        // Clear the phone number if any
        this.phoneNumber = "";
        this.outgoing = "";

        // Hide the textfield
        this.buttonPressed = false;
        
        // Remove incoming call popup
        this.$dialog.destroy();

      });
      
      
      // Incoming call 
      window.AppupPluginsManager.$on("twilio-incoming-call", (event) =>
      {
         // Message to ask when incoming call received
         let callMessage = "Do you want to accept new call "+event.from_number;
         
         console.log(callMessage);

         // Options for dialog box
         let options = {
                 okText: 'Accept',
                 cancelText: 'Reject',
                 animation: 'zoom', // Available: "zoom", "bounce", "fade"
                 type: 'basic', // coming soon: 'soft', 'hard'
                  };
          var _this = this;
          // Shows the dialog box
         this.$dialog.confirm(callMessage, options)
            .then( function () {
              console.log("Call Accepted");

              // Fill the from number in textfield
             _this.phoneNumber = event.from_number;
             _this.outgoing = '0';

               // set transfer call to true
            _this.outboundTransfer = true;
            _this.buttonPressed = true;

             // If the user accepts call
              window.AppupPluginsManager.exec("AppupTwilio", "answer")


              })
            .catch(function () {
              console.log("Call Rejected");
              
              //If the user rejects call
               window.AppupPluginsManager.exec("AppupTwilio", "reject")
            });   
            
      });
      window.AppupPluginsManager.$on("twilio-call-ringing",(call) =>
      {
          console.log("Ringing event emitted");
      });
 
      // Call Transfer
       window.AppupPluginsManager.$on("twilio-call-transfer",() =>
      {
         console.log("Call is on transfer");
         this.callconnected = false;
         this.callforward = false;
         this.outgoing = 0;
      });

      // Call Mute
       window.AppupPluginsManager.$on("twilio-call-mute",() =>
      {
        if(this.twilioMute)
        {
          this.twilioMute = false;
        }
        else
          this.twilioMute = true;
      });

      // Make call without number
       window.AppupPluginsManager.$on("twilio-call-no-number",() =>
      {
          console.log("Please enter valid number");
      });

      // Conference Number
      window.AppupPluginsManager.$on("twilio-call-conference",(confJSon) =>
      {
          console.log("Call Conference");
          this.callconnected = true;
          this.callConference = false;
      });

      // Hold call
       window.AppupPluginsManager.$on("twilio-call-hold",() =>
      {
          console.log("Call hold");
          this.callonHold = !this.callonHold;
      });

     
    },
     methods:{
        digit_pressed(number) 
        {
          console.log("hello");
           // Update Phone number text area
            this.phoneNumber += number;
            
            this.buttonPressed = true;
           if(this.callconnected == true)
           {
             console.log("I am in DTF");
             //update pressed DTMF value textarea
            
             window.AppupPluginsManager.exec("AppupTwilio","dtmf",{id:this.callId,dtmf:number});
           }
        },
       make_call(isPlayMusic)
       {
          // Disable outbound transfer
          this.outboundTransfer = false;
          
          // outgoing 1, shows up direction in Dial pad
          this.outgoing = '1';

          // Calling function
           window.AppupPluginsManager.exec("AppupTwilio", "makeCall", {'To' : this.phoneNumber,"WithMusic":isPlayMusic}) ;
       }, 
       disconnect_call()
       {
          // Clear the phone number
          this.phoneNumber = "";
          this.outgoing = "";
          window.AppupPluginsManager.exec("AppupTwilio", "disconnect");
       },
       backSpace() 
       {
            this.phoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 1);
            if(this.phoneNumber.length == 0 || this.phoneNumber == 'undefined' || this.phoneNumber == "")
            {
               this.buttonPressed = false;
            }
       },

       // Conference call
       conference_call()
       {
         this.phoneNumber = "";
         this.callConference = true;
       },

       // Mute Call
       mute_call()
       {
          this.twilioMute = !this.twilioMute;
         window.AppupPluginsManager.exec("AppupTwilio","muteCall",this.twilioMute);
       },

       // Hold call
       hold_call()
       {
          var direction = "";
         if(this.outgoing == "1")
           direction = "outgoing";
         else
           direction = "incoming";
      
         var holdJSON = {"direction":direction}
         window.AppupPluginsManager.exec("AppupTwilio","holdCall",holdJSON);
       },

       // Transfer Call
       transfer_call()
       {
         this.phoneNumber = "";
         this.callforward = true;
       },

       transfer_called()
       {
         // For transfer call
          if(!this.callConference)
          {
            window.AppupPluginsManager.exec("AppupTwilio","transferCall",{'TransferNumber':this.phoneNumber});
            return;
          }
        
        // For conference call
         var direction = "";
         if(this.outgoing == "1")
           direction = "outgoing";
         else
           direction = "incoming";
      
         var conferenceJSON = {'To':this.phoneNumber,"direction":direction}
         window.AppupPluginsManager.exec("AppupTwilio","conferenceCall",conferenceJSON);

       },

       /**
        * Show the call timer when call connect or receive call
        */
       incrementTimer()
       {
         console.log("I am in increment Timer");
         var input = {
            day: 0,      
            hours: 0,
            minutes: 0,
            seconds: 0
         };
     
      var timestamp = new Date(input.day,
      input.hours, input.minutes, input.seconds);
     
      var interval = 1;
     
      this.timeInterval = setInterval(function () {
         timestamp = new Date(timestamp.getTime() + interval * 1000);
        // document.getElementById('ongoingtimer').innerHTML = timestamp.getDay() + ' : ' +  timestamp.getHours() + ' : ' + timestamp.getMinutes() + ' : ' + timestamp.getSeconds() + 's';
       //document.getElementById('ongoingtimer').innerHTML =  timestamp.getHours() + ' : '+ timestamp.getMinutes() + ' : ' + timestamp.getSeconds() + '';
       document.getElementById("ongoingtimer").innerHTML = timestamp.getHours().toString().padStart(2, '0') + " : " + timestamp.getMinutes().toString().padStart(2, '0') + " : " + timestamp.getSeconds().toString().padStart(2, '0') + "";
        }, Math.abs(interval) * 1000);
     },
     /**
      * It emits call disconnected data
      */
     CallDisconnect(event){
       this.$emit("callDisconencted", event)
     }
    }
};
</script>
<style scoped>
@import url("https://cdn-500.500apps.com/fontawesome/css/all.min.css");
/* @import url("https://fonts.googleapis.com/icon?family=Material+Icons"); */
@import url("https://fonts.googleapis.com/css?family=Montserrat:100,300,400&display=swap");

/*------------------------------
      Dailer pad css Start
-------------------------------*/
  .dailer-pad,
  .mw-250 {
      min-width: 250px;
      width: 250px;
  }
  .dailer-pad{
    min-height: 320px;
  }
  .dailer-pad .btn,
  .dailer-pad .phone-pad,
  #phone-prefix {
      font-family: 'Montserrat', sans-serif;
      font-size: 22px;
      font-weight: 300;
  }
  
  #ongoingtimer {
      font-family: 'Montserrat', sans-serif;
  }
  
  .small-icon .fal {
      font-size: 20px;
  }
  
  .dailer-pad .phone-pad {
      letter-spacing: 1px;
  }
  
  .dailer-pad .dailed-btns .btn {
      margin: 8px !important;
  }
  
  .dailer-pad .btn .fa-phone {
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
  }
  .call-disconnect-btn .danger-btn .fa-phone{
    transform: rotate(-130deg);
    -webkit-transform: rotate(-130deg);
    -moz-transform: rotate(-130deg);
  }
  .call-disconnect-btn .btn-danger:hover  {
    background-color: #dc3545 !important;
  }
  .dailer-pad .btn-outline-secondary {
      color: #000;
      max-width: 60px;
      /* height: 60px; */
      line-height: 18px;
      background-color: transparent;
      font-size: 28px;
  }
  .dailer-pad .btn-outline-secondary[data-v-4dd6106c]:hover {
      background: transparent !important;
      color: #007bff;
  }
  .btn:hover{
    background: transparent !important;
  }
  .active-btns .btn {
      max-width: 60px;
      height: 60px;
  }
  .active-btns .btn:hover {
      background: transparent !important;
  }
  .dailer-pad .btn-outline-secondary:hover,
  .dailer-pad .btn-outline-secondary:not(:disabled):not(.disabled):active {
      color: #1d1d1d;
  }
  
  .dailer-pad .btn p.small {
      font-size: 8px;
      letter-spacing: 2px;
      margin-top: 5px;
  }
  
  .btn.focus,
  .btn:focus,
  .form-control:focus {
      box-shadow: none !important;
  }
  
  .btn {
      background-position: center;
      transition: background 0.8s;
  }
  
  .btn:hover {
      background: #f9f9f9 radial-gradient(circle, transparent 1%, #fff 1%) center/15000%;
  }
  
  .btn:active {
      background-color: #f9f9f9;
      background-size: 100%;
      transition: background 0s;
  }
  
  .success-btn:hover {
      color: #28a745;
  }
  
  .danger-btn:hover {
      color: #dc3545;
  }
  
  .custom-phone-icon:before {
      content: "\f356";
      font-size: 14px;
      font-family: "Font Awesome 5 Pro";
      position: absolute;
      right: 15px;
      top: -1px;
  }
  .recorded-call-time{
    left: 50%;
    /* width: 100%; */
    top: 58px;
    transform: translateX(-50%);
    position: absolute;
  }
   
/*------------------------------
      End of Dailer pad css
-------------------------------*/
.row {
  margin: 0 auto;
  width: 280px;
  clear: both;
  text-align: center;
  font-family: "Exo";
}
.digit,
.dig {
  float: left;
  padding: 10px 30px;
  width: 30px;
  font-size: 2rem;
  cursor: pointer;
}
.sub {
  font-size: 0.8rem;
  color: grey;
}
.container {
  background-color: white;
  padding: 20px;
  margin: 30px auto;
  height: 320px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
#output {
  font-family: "Exo";
  font-size: 2rem;
  height: 60px;
  font-weight: bold;
  color: #1976d2;
}
#call {
  display: inline-block;
  background-color: #66bb6a;
  padding: 4px 30px;
  margin: 10px;
  color: white;
  border-radius: 4px;
  float: left;
  cursor: pointer;
}
.botrow {
  margin: 0 auto;
  width: 280px;
  clear: both;
  text-align: center;
  font-family: "Exo";
}
.digit:active,
.dig:active {
  background-color: #e6e6e6;
}
#call:hover {
  background-color: #81c784;
}
.dig {
  float: left;
  padding: 10px 20px;
  margin: 10px;
  width: 30px;
  cursor: pointer;
}
</style>