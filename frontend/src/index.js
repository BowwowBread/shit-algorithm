import VueTyperPlugin from 'vue-typer';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import jquery from 'jquery';
import 'semantic-ui/dist/semantic.min';
import 'semantic-ui/dist/semantic.min.css';
import Vuex from 'vuex';
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import VueSweetAlert from 'vue-sweetalert';

window.$ = jquery;

Vue.use(VueCookie);
Vue.use(Vuex);
Vue.use(axios);
Vue.use(VueAwesomeSwiper);
Vue.use(VueTyperPlugin);
Vue.use(VueSweetAlert);

Vue.prototype.$http = axios;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
