import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/index/index.vue';
import Admin from '../components/admin/admin.vue';
import Problems from '../components/problems/problems.vue';
import Rank from '../components/rank/rank.vue';
import Solve from '../components/problems/solve.vue';

// import auth from '../../modules/auth';

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/problems',
      name: 'problems',
      component: Problems,
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/problems/:num',
      name: 'solve',
      component: Solve,
    },
  ],
});
