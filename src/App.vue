<template>
  <div class="__app d-flex">
    <Sidebar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Navbar,
  },
  created() {
    this.$store.dispatch('init_login');
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: 'Goth';
  src: url('./assets/font/GothamMedium.ttf');
}

.__app {
  background-color: #0e0e0e;
  color: white;
  font-family: 'Goth';
  height: 100vh;

  main {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
