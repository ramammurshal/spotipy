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
      <router-link :to="{ name: 'home' }">
        <div class="item__link">
          <i class="fas fa-home icon"></i>
          <p>Home</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'search' }">
        <div class="item__link">
          <i class="fas fa-search icon"></i>
          <p>Search</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'manage' }">
        <div class="item__link">
          <i class="fa-solid fa-pen-to-square icon"></i>
          <p>Manage</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'about' }">
        <div class="item__link">
          <i class="fa-solid fa-tablet-screen-button icon"></i>
          <p>About</p>
        </div>
      </router-link>
    </div>
    <!-- ./ sidebar__content -->
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Sidebar',
  setup() {},
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
      margin: 0;
      position: relative;

      small {
        position: absolute;
        right: -15px;
        top: -5px;
        font-size: 16px;
      }
    }
  }

  .sidebar__content {
    // a.router-link-active soon

    .item__link {
      display: flex;
      align-items: center;
      color: #ccc;
      font-size: 16px;
      margin-bottom: 25px;

      &:hover {
        color: #fff;
      }

      .icon {
        font-size: 22px;
        width: 20px;
        margin-right: 25px;
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>
