# slideout 

Slideout panel component

Use this to show nested(child) route inside slideout panel.

In Appup runtime, nested route is automatically configured by finding page with `route` prop

This is tightly coupled with vue-router, when used outside Appup runtime, explicitly configure route
and set meta data `isSlideout` to `true` 

- **author** - Purushotham Reddy 

## props 

- `route` ***String*** (*required*) `default: ''` 

  Appup runtime uses `route` to find a page and set child route
  
  eg: /view/:id 

- `align` ***String*** (*optional*) `default: 'right'` 

  Determines alignment of slideout panel
  
  accepted values: left, right 

- `close-btn` ***String*** (*optional*) `default: 'show'` 

  If value is "show", close button is shown - when clicked closes the panel
  
  To add custom close button, set prop to "hide"
  
  eg:
  
  ```
  <appup-slideout route="/edit/:id" close-btn="hide"></appup-slideout>
  In slideout page: create a custom button as follows
  <button v-on:click="$parent.close()">Close Slideout Panel</button>
  ``` 

## methods 

- `close()` 

  Closes slideout panel
  
  Useful when creating custom close button in slideout page
  
  eg:
  
  ```
  <button v-on:click="$parent.close()">Close Slideout Panel</button>
  ``` 

