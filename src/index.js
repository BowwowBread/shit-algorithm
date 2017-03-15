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
import store from './store/index';
import VueSweetAlert from 'vue-sweetalert';
import VueProgressbar from 'vue-progressbar';
import 'babel-polyfill';
import lodash from 'lodash';

window.$ = jquery;

Vue.use(lodash);
Vue.use(VueCookie);
Vue.use(VueProgressbar, {
	color: 'rgb(247, 119, 97)',
	failedColor: 'red',
	thickness: '4px',
	transition: {
		speed: '.1ms',
		opacity: '1s',
	},
});
Vue.use(Vuex);
Vue.use(axios);
Vue.use(VueAwesomeSwiper);
Vue.use(VueTyperPlugin);
Vue.use(VueSweetAlert);

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
		store,
  router,
  template: '<App/>',
  components: { App },
});
