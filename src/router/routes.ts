import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/components/HomePage.vue'),
    children: [
      {
        path: '',
        redirect: '/timereminder',
      },
      {
        path: '/timereminder',
        component: () => import('src/components/TimeReminder/TimeReminder.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/timereminder',
  },
];

export default routes;
