import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./components/Home.vue') },
      { path: '/foo', component: () => import('./components/Foo.vue') },
      {
        path: '/bar',
        component: () => import('./components/Bar.vue'),
      },
      {
        path: '/baz',
        component: () => import('./components/Baz.vue'),
      },
      {
        path: '/item/:id',
        component: () => import('./components/Item.vue'),
      },
    ],
  });
}
