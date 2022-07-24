<template>
  <vee-form
    class="form__sign__up"
    :validation-schema="schema"
    @submit="register"
  >
    <h3 class="mb-3">Sign up</h3>
    <!-- alert -->
    <div
      class="alert"
      :class="regist.alert_variant"
      role="alert"
      v-if="regist.show_alert"
    >
      {{ regist.alert_message }}
    </div>
    <!-- name -->
    <div class="mb-3">
      <label for="name" class="form-label"
        >Name <span class="text-warning">*</span></label
      >
      <vee-field type="text" class="form-control" id="name" name="name" />
      <small>
        <ErrorMessage name="name" class="text-warning d-inline-block mt-2" />
      </small>
    </div>
    <!-- email -->
    <div class="mb-3">
      <label for="email" class="form-label"
        >Email <span class="text-warning">*</span></label
      >
      <vee-field type="Email" class="form-control" id="email" name="email" />
      <small>
        <ErrorMessage name="email" class="text-warning d-inline-block mt-2" />
      </small>
    </div>
    <!-- password -->
    <div class="mb-3">
      <label for="password" class="form-label"
        >Password <span class="text-warning">*</span></label
      >
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="form-control"
          id="passowrd"
          v-bind="field"
        />
        <small
          class="text-warning d-inline-block mt-2"
          v-for="error in errors"
          :key="error"
        >
          {{ error }}
        </small>
      </vee-field>
    </div>
    <!-- password confirm -->
    <div class="mb-3">
      <label for="password_confirmation" class="form-label"
        >Password Confirmation <span class="text-warning">*</span></label
      >
      <vee-field
        type="password"
        class="form-control"
        id="password_confirmation"
        name="password_confirmation"
      />
      <ErrorMessage
        name="password_confirmation"
        class="text-warning d-inline-block mt-2"
      />
    </div>
    <button
      class="btn btn-success mt-2 float-end"
      :disabled="regist.in_submission"
    >
      Register
    </button>
  </vee-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      schema: {
        name: 'required|min:4|max:70|alpha_spaces',
        email: 'required|min:4|max:70|email',
        password: 'required|min:6|max:50',
        password_confirmation: 'password_mismatch:@password',
      },
      regist: {
        in_submission: false,
        show_alert: false,
        alert_variant: 'alert-primary',
        alert_message: 'Please wait! Your account is being created.',
      },
    };
  },
  methods: {
    async register(values: object) {
      this.regist.in_submission = true;
      this.regist.show_alert = true;
      this.regist.alert_variant = 'alert-primary';
      this.regist.alert_message = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (error: any) {
        this.regist.in_submission = false;
        this.regist.alert_variant = 'alert-danger';
        this.regist.alert_message = error.message;
        return;
      }

      this.regist.alert_variant = 'alert-success';
      this.regist.alert_message = 'Success! Your account has been created';

      window.location.reload();
    },
  },
});
</script>
