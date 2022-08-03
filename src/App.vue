<template>
  <div id="app">
    app
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <router-link to="/baz">Go to Baz</router-link>
    <router-link to="/item/123">Go to Item123</router-link>
    <router-link to="/item/234">Go to Item234</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>
