import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/searchBike',
    name: 'SearchBike',
    component: () => import('../views/SearchBike.vue'),
    props: (route) => route.params,
  },
  {
    path: '/searchRoute',
    name: 'SearchRoute',
    component: () => import('../views/SearchRoute.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active disabled',
});

export default router;
