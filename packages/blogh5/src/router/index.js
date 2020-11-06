import Vue from 'vue/dist/vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'sidebar-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/blog/index.vue'),
    },
    {
      path: '/admin',
      name: 'Main',
      component: () => import('../main.vue'),
      redirect: {
        path: '/note',
      },
      children: [
        {
          path: '/notebook-list',
          name: 'NotebookList',
          component: () => import('../views/notebook-list/NotebookList.vue'),
        },
        {
          path: '/note',
          name: 'Note',
          component: () => import('../views/note-detail/NoteDetail.vue'),
        },
        {
          path: '/trash',
          name: 'TrashDetail',
          component: () => import('../views/trash-detail/TrashDetail.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/blog/index.vue'),
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: () => import('../views/blog/articleDetail.vue'),
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (!localStorage.getItem('token') && ['Login', 'Blog', 'articleDetail', 'home'].indexOf(to.name) === -1) {
    next({ path: '/login' });
    return;
  }
  next();
});
export default router;
