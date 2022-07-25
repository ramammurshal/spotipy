import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

const HomeView = () => import('@/views/Home.vue');
const SongView = () => import('@/views/Song.vue');
const UploadView = () => import('@/views/Upload.vue');
const ManageView = () => import('@/views/Manage.vue');
const AboutView = () => import('@/views/About.vue');
const NotFoundView = () => import('@/views/404.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView,
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
