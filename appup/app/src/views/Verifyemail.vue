<template>
    <div class="page-wrapper start-page start-page-new block">
        <!-- Page-content -->
        <div class="page-content p-0">
            <div class="row">
                <div class="col-lg-8 col-md-6">
                    <div class="sign-up-left-block text-center">
                        <img src="../styles/scss/images/sign-up-img.png" alt="/">
                        <h2>Start working with AppUp now!</h2>
                        <p>Start working now to benefit from AppUp and implement apps as easy as possible.</p>
                    </div>
                </div>   
                <div class="col-lg-4 col-md-6">
                    <section class="block clearfix start-block start-block-new">
                            <div class="title">
                                <a href="index.html" class="logo"><span class="icon-logo"></span></a>
                                <h1>Check your inbox to verify your email</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div class="verify-email">

                                <!-- Appup form component start -->
                                <appup-form  
                                    preload="pre_load_entity"  
                                    submit="post_verifycode"
                                    :workflow_params='{entity: "verifycode"}'
                                />
                                <!-- Appup form component end -->
                                
                            </div>
                        </section>
                </div> 
            </div>
        </div>
        <!-- /Page-content -->
    </div>
</template>
