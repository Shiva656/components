<template>
<div>
    <header class="header clearfix">

        <!-- Logo start -->
        <a href="#" class="logo float-left">
                <span class="icon-logo">
                    <span class="path1"></span><span class="path2"></span>
                </span> 
            </a>
        <!-- Logo end -->

        <!-- Menu start -->
        <div class="menu-nav float-right d-inline-block">
            <a href="#" class="menu-btn">
                    <span class="icon-menu-btn">
                        <span class="path1"></span><span class="path2"></span>
                    </span>
                </a>
        </div>
        <!-- Menu end -->

        <div class="profile-info float-right d-none d-sm-block notification-header">
            <!-- Notification dropdown start -->
            <b-dropdown variant="link" size="lg" no-caret class="notification-info">
                <template slot="button-content">
                    <a href="#" class="notification new-notice d-inline-block dropdown-toggle btn-link" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="icon-notification">
                            <span class="path1"></span><span class="path2"></span>
                            </span>
                        </a>
                </template>

                <div class="notification-dropdown">
                    <div class="title-dropdown clearfix">
                        <h3 class="title-dropdown float-left">Notifications</h3>
                        <span class="new-notice-count float-right">1</span>
                    </div>
                </div>

                <b-dropdown-item href="#">
                    <h4>Published default cloud app</h4>
                    <p>Some text goes here to make it more.</p>
                    <span class="notification-date">31 minutes ago</span>
                </b-dropdown-item>

                <b-dropdown-item href="#">
                    <h4>Workflow1 has modified</h4>
                    <p>Some text goes here to make it more.</p>
                    <span class="notification-date">1 hour ago</span>
                </b-dropdown-item>

                <b-dropdown-item href="#">
                    <h4>Published default cloud app</h4>
                    <p>Some text goes here to make it more.</p>
                    <span class="notification-date">2 hour ago</span>
                </b-dropdown-item>

                <div class="dropdown-divider"></div>

                <b-dropdown-item class="show-all-button text-center" href="#">
                    Show all notifications
                </b-dropdown-item>

            </b-dropdown>
            <!-- Notification dropdown end -->

            <!-- User information dropdown start -->

            <div class="user-info d-inline-block">
                <b-dropdown variant="link" size="lg" no-caret>
                    <template slot="button-content">
                        <a class="dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h4 class="user-name d-inline-block" :title="userName">{{userName}}</h4>
                            <span class="user-avatar d-inline-block">
                                <img src="../styles/scss/images/user-avatar.png" alt="/">
                                <!-- Default image -->
                                <!-- <img src="../styles/scss/images/default-profile.png" alt="/"> -->
                                <!-- Default image -->
                            </span>
                        </a>
                    </template>
                    <b-dropdown-item href="/#/home/prefences/settings">
                        <h4>Preferences</h4>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                        <h4>Permissions</h4>
                    </b-dropdown-item>
                    
                    <b-dropdown-item href="#">
                        <h4>Developers</h4>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                        <h4>Support</h4>
                    </b-dropdown-item>
                    <div class="dropdown-divider"></div>
                    <b-dropdown-item class="show-all-button text-center" href="#">
                        <appup-card ref='logout'>
                            <template slot="section">
                                <h4 @click.prevent="_trigger('logout', 'exec', 'logout', {'key': ``, 'entity': ``})"> Logout </h4>
                            </template>
                        </appup-card>
                    </b-dropdown-item>
                </b-dropdown>
            </div>

            <!-- User information dropdown end -->
        </div>
    </header>
</div>
</template> 

<script>
// Export default object use as javascript
export default {
  /**
   * Get user name from window object
   *
   */
  computed: {
    userName: function() {
      // return  username from UIJSON
      if (typeof UIJSON.login.firstname != undefined && typeof UIJSON.login.firstname != "undefined") {
        this.$cookies.set("_user_name", UIJSON.login.firstname);
      }
      return this.$cookies.get("_user_name");
    }
  }
};
</script>
