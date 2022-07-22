<template>
  <nav>
    <div class="helper__move">
      <button class="helper__button">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="helper__button">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="nav__auth">
      <button
        v-if="!userLoggedIn"
        class="bg__btn"
        data-bs-toggle="modal"
        data-bs-target="#modal__auth"
      >
        Sign up / Log in
      </button>
      <button
        v-else
        class="bg__btn dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-offset="0,10"
      >
        User
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <button class="dropdown-item" type="button" @click.prevent="signOut">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Modal -->
  <Modal />
  <!-- ./ Modal -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Modal from './Modal.vue';

export default defineComponent({
  name: 'Navbar',
  components: {
    Modal,
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('signOut');
      window.location.reload();
    },
  },
});
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  background-color: #222222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;

  .helper__move {
    .helper__button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #ccc;
      background-color: #111111;
      margin-right: 10px;

      &:hover {
        color: white;
      }
    }
  }

  .nav__auth {
    .dropdown-menu {
      &:hover {
        background: #1ed760;

        button {
          background: #1ed760;
          color: #fff;
        }
      }
    }
  }
}
</style>
