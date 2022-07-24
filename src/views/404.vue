<template>
  <div class="d-flex h-100 justify-content-center align-items-center">
    <div class="text-center">
      <img
        src="@/assets/images/spotipy.png"
        alt="Spotify Logo"
        class="img-fluid mb-3"
      />
      <h3 class="mb-3">Page not found</h3>
      <p class="mb-3">We can’t seem to find the page you are looking for.</p>
      <button class="bg__btn" @click.prevent="backHome">Home</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '404',
  methods: {
    backHome() {
      this.$router.push({ name: 'home' });
    },
  },
});
</script>

<style lang="scss" scoped>
img {
  width: 70px;
  height: 70px;
}
</style>
