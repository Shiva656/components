<template>
    <div class="page-wrapper start-page sign-in-page block">
        <!-- Page-content -->
        <div class="page-content p-0">
            <div class="container clearfix">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-sm-8 col-xs-12">
                        <section class="block clearfix start-block sign-in-block">
                            <div class="title">
                                <a href="index.html" class="logo"><span class="icon-logo"></span></a>
                                <h1>Sign in</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div class="appup-login">
                            <!-- Appup form component start -->
                            <appup-form  
                                preload="pre_load_entity"  
                                submit="post_login"
                                :workflow_params='{entity: "login"}'
                            />
                            <!-- Appup form component end -->
                            </div>
                            <div class="links mt-3">
                                <a  href="#/signup" >Signup</a>|
                                <a href="#/forgot-password" >Forgot Password ?</a>
                            </div>
                            <!-- <div class="social-icons">
                                <a href="https://our.appup.com/oauth_handler/linkedin" class="icon-linkedin" style="background: #138FCF"></a>
                                <a href="https://our.appup.com/oauth_handler/google" class="icon-google" style="background: #DF492F"></a>
                                <a href="https://our.appup.com/oauth_handler/github" class="icon-git" style="background: #2D2B2B"></a>
                            </div> -->
                        </section>
                    </div>
                </div>
            </div>
            <div class="push"></div>
        </div>
        <!-- /Page-content -->
    </div>
</template>
