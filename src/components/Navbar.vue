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
        class="plain__btn"
        data-bs-toggle="modal"
        data-bs-target="#modal__auth"
        @click="tab = 'sign_up'"
      >
        Sign up
      </button>
      <button
        class="bg__btn"
        data-bs-toggle="modal"
        data-bs-target="#modal__auth"
        @click="tab = 'log_in'"
      >
        Log in
      </button>
    </div>
  </nav>

  <!-- Modal -->
  <div
    class="modal fade"
    id="modal__auth"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <button
              :class="{
                plain__btn: tab === 'log_in',
                bg__btn: tab === 'sign_up',
              }"
              @click="tab = 'sign_up'"
            >
              Sign up
            </button>
            <button
              :class="{
                plain__btn: tab === 'sign_up',
                bg__btn: tab === 'log_in',
              }"
              @click="tab = 'log_in'"
            >
              Log in
            </button>
          </div>
          <button type="button" data-bs-dismiss="modal" class="plain__btn">
            <i class="fa-solid fa-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <form class="form__sign__up" v-if="tab === 'sign_up'">
            <h2 class="mb-3">Register</h2>
            <div class="mb-3">
              <label for="name" class="form-label"
                >Name <span class="text-warning">*</span></label
              >
              <input type="text" class="form-control" id="name" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label"
                >Email <span class="text-warning">*</span></label
              >
              <input type="Email" class="form-control" id="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label"
                >Password <span class="text-warning">*</span></label
              >
              <input type="password" class="form-control" id="password" />
            </div>
            <button class="btn btn-success mt-2 float-end">Register</button>
          </form>
          <form class="form__log__in" v-else>
            <h2 class="mb-3">Login</h2>
            <div class="mb-3">
              <label for="email" class="form-label"
                >Email <span class="text-warning">*</span></label
              >
              <input type="Email" class="form-control" id="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label"
                >Password <span class="text-warning">*</span></label
              >
              <input type="password" class="form-control" id="password" />
            </div>
            <button class="btn btn-success mt-2 float-end">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- ./ Modal -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  data() {
    return {
      tab: 'sign_up' as 'sign_up' | 'log_in',
    };
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
}

.modal-content {
  background-color: #222222;
}
</style>
