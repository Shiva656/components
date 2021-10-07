import NProgress from 'nprogress'
import axios from 'axios'

// Loading bar for project
const Loading = {
  
    // Init Router
    initRouter: function(router)
    {
      router.beforeEach((to, from, next) => {
        // If this isn't an initial page load.
        if (to.name) {
            // Start the route progress bar.
            NProgress.start()
        }
        next()
      })

      router.afterEach((to, from) => {
        // Complete the animation of the route progress bar.
        NProgress.done()
      })
    },

    // Init Ajax
    initAjax()
    {
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    }
}

export default Loading