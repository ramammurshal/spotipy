<template>
  <div class="main__app d-flex">
    <Sidebar />
    <div class="main__content">
      <Navbar />
    </div>
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
  setup() {},
});
</script>

<style lang="scss">
@font-face {
  font-family: 'Goth';
  src: url('./assets/font/GothamMedium.ttf');
}

.main__app {
  background-color: #0e0e0e;
  color: white;
  font-family: 'Goth';

  .main__content {
    width: 100%;
  }
}
</style>
