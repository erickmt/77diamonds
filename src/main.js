import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.http.options.root = 'https://localhost:44344'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
