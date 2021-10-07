###### Different type of Alerts

```jsx
<div>
    <appup-alert message="Info" alert-type="info" show></appup-alert>
    <appup-alert message="Warn" alert-type="warn" show></appup-alert>
    <appup-alert message="Success" show></appup-alert>
    <appup-alert message="Failure" alert-type="failure" show></appup-alert>
</div>
```

###### Show Alert on click of a button
```vue
<template>
  <div>    
    <appup-alert 
        alert-type="failure"
        message="Error Occurred !!!"
        dismissible
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert=false"/>

    <button @click="showDismissibleAlert=!showDismissibleAlert">
        {{showDismissibleAlert?'Hide Alert':'Show Alert'}}
    </button>
  </div>
</template>

<script>
export default {
    data () {
        return {
            showDismissibleAlert: false
        }
    }
}
</script>
```