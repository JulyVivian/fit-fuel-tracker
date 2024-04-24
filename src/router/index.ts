// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Login = () => import('@/components/Login.vue')
const Reg = () => import('@/components/Reg.vue')
const List = () => import('@/components/List.vue')
const Create = () => import('@/components/Create.vue')
const Deal = () => import('@/components/Deal.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
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
  },
  {
    path: '/deal',
    name: 'Deal',
    component: Deal
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;