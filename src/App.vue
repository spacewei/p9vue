<template>
  <body id="app">
    <router-view name="header"></router-view>
    <router-view name="body"></router-view>
  </body>
</template>
<script>
export default {
  name: 'app',
  components: {
  }
}
</script>
<style>
  .center-all{
    width: 70rem;
    margin: 0 auto;
  }
</style>
