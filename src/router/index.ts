import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const HomeView = () => import('@/views/Home.vue');
const SearchView = () => import('@/views/Search.vue');
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
    path: '/manage',
    name: 'manage',
    component: ManageView,
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

export default router;
