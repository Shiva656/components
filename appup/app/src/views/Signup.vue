<template>
    <div class="page-wrapper start-page start-page-new block">
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
                                <h1>Get Started</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="appup-signup">
                                        <!-- Appup form component start -->
                                        <appup-form  
                                            preload="pre_load_entity"  
                                            submit="post_signup_email"
                                            :workflow_params='{entity: "signup_email"}'
                                        />
                                        <!-- Appup form component end -->
                                    </div>                           
                                    <!-- <div class="social-icons">
                                        <a href="https://our.appup.com/oauth_handler/linkedin" class="icon-linkedin" style="background: #138FCF"></a>
                                        <a href="https://our.appup.com/oauth_handler/google" class="icon-google" style="background: #DF492F"></a>
                                       <a href="https://our.appup.com/oauth_handler/github" class="icon-git" style="background: #2D2B2B"></a>
                                    </div> -->
                                </div>
                            </div>                            
                        </section>
                </div> 
            </div>
        </div>
        <!-- /Page-content -->
    </div>
</template>
