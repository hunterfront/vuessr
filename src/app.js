import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

export function createApp() {
  const router = createRouter();

  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
    router,
  });
  return { app, router };
}
