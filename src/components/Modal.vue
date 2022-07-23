<template>
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
              @click="changeTabSignUp"
            >
              Sign up
            </button>
            <button
              :class="{
                plain__btn: tab === 'sign_up',
                bg__btn: tab === 'log_in',
              }"
              @click="changeTabLogIn"
            >
              Log in
            </button>
          </div>
          <button type="button" data-bs-dismiss="modal" class="plain__btn">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <Register v-if="tab === 'sign_up'" />
          <Login v-if="tab === 'log_in'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Register from './Register.vue';
import Login from './Login.vue';

export default {
  name: 'Modal',
  components: {
    Register,
    Login,
  },
  computed: {
    ...mapState(['tab']),
  },
  methods: {
    ...mapMutations(['changeTabLogIn', 'changeTabSignUp']),
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #222222;
}
</style>
