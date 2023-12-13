import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'search-page',
        component: () => import('pages/SearchPage.vue'),
      },
    ],
  },

  {
    path: '/results',
    name: 'results',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'results-page',
        component: () => import('pages/ResultsPage.vue'),
      },
    ],
  },

  {
    path: '/add-person',
    name: 'add-person',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'add-page',
        component: () => import('pages/AddPersonPage.vue'),
      },
    ],
  },

  {
    path: '/rules',
    name: 'rules',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'rules-page',
        component: () => import('pages/RulesPage.vue'),
      },
    ],
  },

  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'contacts-page',
        component: () => import('pages/ContactsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
