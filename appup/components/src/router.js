import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router);

// Add examples
import examplesRoutes from './example-routes';
import ExampleLayout from '../examples/example-layout.vue';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/examples',
      name: 'examples',
      component: ExampleLayout,
      children: examplesRoutes
    }
  ]
})
