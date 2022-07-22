<template>
  <Navbar />
  <div class="p-3">
    <h3>About Page</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'About',
  components: {
    Navbar,
  },
});
</script>
