import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

const HomeView = () => import('@/views/Home.vue');
const SearchView = () => import('@/views/Search.vue');
const UploadView = () => import('@/views/Upload.vue');
const ManageView = () => import('@/views/Manage.vue');
const AboutView = () => import('@/views/About.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
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
