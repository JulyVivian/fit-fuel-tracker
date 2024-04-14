// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../components/Login.vue';
import Reg from '../components/Reg.vue';
import List from '../components/List.vue';
import Create from '../components/Create.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;