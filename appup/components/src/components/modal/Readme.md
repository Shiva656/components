###### Form with different input fields

```jsx
<div>
    <div class="row"> 
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.messageModal label="Open Modal with Message"/>
        </div>
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.confirmModal label="Open Modal with Confirmation Message" buttonStyle="secondary"/>
        </div>
    </div>
    <appup-modal 
        id="messageModal" 
        title="Message Modal Window" 
        type="message">
        <div>You are seeing this message in message window</div>
    </appup-modal>

    <appup-modal 
        id="confirmModal"
        title="Confirm Modal Window" 
        type="confirm"
        okLabel="Yes"
        cancelLabel="No">
        <div>
            You are seeing this message to do something which might affect the application. 
            Are you sure you want to proceed further ?
        </div>
    </appup-modal>
<div>
```

```vue
<template>
<div>
    <div class="row"> 
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.formModal label="Open Modal with Form"/>
        </div>
    </div>
    <appup-modal 
        id="formModal" 
        title="Form Modal" 
        type="form">
        <div>
            <div>Change your password</div>
            <br/>
            <appup-form :formFields="formFields"/>
        </div>            
    </appup-modal>
</div>
</template>

<script>
export default {
    data () {
        return {
            formFields: [
                {
                    id: 21,
                    type: 'password',
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Enter Password',
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                {
                    id: 22,
                    type: 'password',
                    name: 'reenterPassword',
                    label: 'Re-enter Password',
                    placeholder: 'Re-enter Password',
                    required: true,
                    minLength: 6,
                    maxLength: 10
                }
            ]
        }
    },
    computed: {
        
    },
    methods: {
    }
}
</script>
```

```jsx
<div>
    <div class="row">
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.centerModal label="Open Modal window in center of the screen" buttonStyle="secondary"/>
        </div>
        <div class="col-md-4 pb-2">
        </div>
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.largeModal label="Open Large Modal window" buttonStyle="secondary"/>
        </div>
    </div>
    <appup-modal 
        id="centerModal" 
        title="Modal Window displayed center of screen" 
        type="message"
        :displayCenter=true>
        <div>You are seeing this message in window which is displayed center of the screen</div>
    </appup-modal>

    <appup-modal 
        id="largeModal" 
        title="Larger Modal Window" 
        type="message"
        size="large">
        <div>You are seeing this message in large modal window</div>
    </appup-modal>
</div>
```

```jsx
<div>
    <div class="row">
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.darkHeader label="Modal with Dark Theme"/>
        </div>
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.warnHeader label="Modal with Warn Theme" buttonStyle="secondary"/>
        </div>
        <div class="col-md-4 pb-2">
            <appup-button v-b-modal.errorHeader label="Modal with Error Theme"/>
        </div>
    </div>
    <appup-modal 
        id="darkHeader" 
        title="Header in Dark Theme" 
        type="message"
        theme="dark">
        <div>You are seeing this message with Header in Dark Theme</div>
    </appup-modal>

    <appup-modal 
        id="warnHeader" 
        title="Header in Warn Theme" 
        type="message"
        theme="warn">
        <div>You are seeing this message with Header in warn Theme</div>
    </appup-modal>

    <appup-modal 
        id="errorHeader" 
        title="Header in Error Theme" 
        type="message"
        theme="error">
        <div>You are seeing this message with Header in error Theme</div>
    </appup-modal>
</div>
```