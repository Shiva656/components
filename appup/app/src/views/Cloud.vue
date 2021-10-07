<template>
  <div class="cloud">
    <div class="page-title clearfix">
      <div class="float-left">
        <h1>Cloud</h1>           
      </div>
    </div>
    <appup-form  
      preload="pre_load_entity"  
      submit="post"
      :workflow_params='{entity: "cloud"}'
    />
  </div>
</template>
