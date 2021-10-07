<template>
  <div class="app">
    <div class="page-title clearfix">
      <div class="float-left">
        <h1>App</h1>           
      </div>
    </div>
    <appup-form  
      preload="pre_load_entity"   
      submit="post"
      :workflow_params='{entity: "app"}'
    />
  </div>
</template>
