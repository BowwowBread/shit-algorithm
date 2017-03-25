import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/index/index.vue';
import Admin from '../components/admin/admin.vue';
import Problems from '../components/problems/problems.vue';
import Rank from '../components/rank/rank.vue';
import Solve from '../components/problems/solve.vue';
import Mypage from '../components/mypage/mypage.vue';
import Notice from '../components/notice/notice.vue';
import openNotice from '../components/notice/opennotice.vue';
import notFound from '../components/notfound/notfound.vue';
import Monitor from '../components/monitor/monitor.vue';
import contestIntro from '../components/introduce/contestintro.vue';

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
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage,
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice,
    },
    {
      path: '/notice/:num',
      name: 'openNotice',
      component: openNotice,
    },
    {
      path: '/contestIntro',
      name: 'contestIntro',
      component: contestIntro,
    },
    {
      path: '/404',
      name: 'notfound',
      component: notFound,
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor,
    },
    {
      path: '/*',
      redirect: { name: 'notfound' },
    },
  ],
});
