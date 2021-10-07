<template>
    <div class="page-wrapper start-page block">
        <!-- Page-content -->
        <div class="page-content p-0">
            <div class="row">
                <div class="col-md-6">
                    <div class="sign-up-left-block text-center">
                        <img src="../styles/scss/images/sign-up-img.png" alt="/">
                        <h2>Start working with AppUp now!</h2>
                        <p>Start working now to benefit from AppUp and implement apps as easy as possible.</p>
                    </div>
                </div>   
                <div class="col-md-6">
                    <section class="block clearfix start-block start-block-new">
                        <div class="title">
                            <a href="index.html" class="logo"><span class="icon-logo"></span></a>
                             <h1>Forgot Password</h1>
                            <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                       <div class="appup-signup2">
                            <div class="row">
                                <div class="col-sm-8">

                                    <!-- Appup form component start -->
                                    <appup-form  
                                        preload="pre_load_entity"  
                                        submit="post_entity_forgotpassword"
                                        :workflow_params='{entity: "forgotpassword"}'
                                    />
                                    <!-- Appup form component end -->
                                </div>
                            </div>                            
                        </div>
                </section>
                </div> 
            </div>
        </div>
        <!-- /Page-content -->
    </div>
</template>
