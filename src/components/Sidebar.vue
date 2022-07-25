<template>
  <aside>
    <!-- sidebar__header -->
    <router-link to="/">
      <div class="sidebar__header">
        <img src="@/assets/images/spotipy.png" alt="Spotipy Logo" />
        <h3>Spotipy <small>®</small></h3>
      </div>
    </router-link>
    <!-- ./ sidebar__header -->

    <!-- sidebar__content -->
    <div class="sidebar__content">
      <SideLink to="home" icon="fas fa-home" title="Home" />
      <SideLink
        to="upload"
        icon="fa-solid fa-plus"
        title="Upload"
        v-if="userLoggedIn"
      />
      <SideLink
        to="manage"
        icon="fa-solid fa-pen-to-square"
        title="Manage"
        v-if="userLoggedIn"
      />
      <SideLink
        to="about"
        icon="fa-solid fa-tablet-screen-button"
        title="About Apps"
      />
    </div>
    <!-- ./ sidebar__content -->
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import SideLink from './SideLink.vue';

export default defineComponent({
  name: 'Sidebar',
  components: {
    SideLink,
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
});
</script>

<style lang="scss" scoped>
aside {
  background-color: #000;
  height: 100%;
  width: 350px;
  padding: 20px;

  a {
    text-decoration: none;
  }

  .sidebar__header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    h3 {
      color: white;
      position: relative;

      small {
        position: absolute;
        right: -15px;
        top: -5px;
        font-size: 16px;
      }
    }
  }
}
</style>
