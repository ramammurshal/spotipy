<template>
  <div class="__app d-flex">
    <Sidebar />
    <main>
      <Navbar />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
    <Player />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Player from '@/components/Player.vue';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Navbar,
    Player,
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

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  opacity: 0;
  transition: all 0.5s linear;
}

.__app {
  background-color: #0e0e0e;
  color: white;
  font-family: 'Goth';
  height: calc(100vh - 90px);

  main {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
