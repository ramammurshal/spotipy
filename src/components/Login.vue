<template>
  <vee-form class="form__log__in" :validation-schema="schema" @submit="login">
    <h3 class="mb-3">Login</h3>
    <!-- alert -->
    <div
      class="alert"
      :class="log.alert_variant"
      role="alert"
      v-if="log.show_alert"
    >
      {{ log.alert_message }}
    </div>
    <!-- email -->
    <div class="mb-3">
      <label for="email" class="form-label"
        >Email <span class="text-warning">*</span></label
      >
      <vee-field type="Email" class="form-control" id="email" name="email" />
      <ErrorMessage name="email" class="text-warning d-inline-block mt-2" />
    </div>
    <!-- password -->
    <div class="mb-3">
      <label for="password" class="form-label"
        >Password <span class="text-warning">*</span></label
      >
      <vee-field
        type="password"
        class="form-control"
        id="password"
        name="password"
      />
      <ErrorMessage name="password" class="text-warning d-inline-block mt-2" />
    </div>
    <button class="btn btn-success mt-2 float-end">Login</button>
  </vee-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required',
      },
      log: {
        in_submission: false,
        show_alert: false,
        alert_variant: 'alert-primary',
        alert_message: 'Please wait! We are logging you in.',
      },
    };
  },
  methods: {
    async login(values: object) {
      this.log.in_submission = true;
      this.log.show_alert = true;
      this.log.alert_variant = 'alert-primary';
      this.log.alert_message = 'Please wait! We are logging you in.';

      try {
        await this.$store.dispatch('login', values);
      } catch (error: any) {
        this.log.in_submission = false;
        this.log.alert_variant = 'alert-danger';
        this.log.alert_message = error.message;
        return;
      }

      this.log.alert_variant = 'alert-success';
      this.log.alert_message = 'Success! You are now logged in.';

      window.location.reload();
    },
  },
});
</script>
