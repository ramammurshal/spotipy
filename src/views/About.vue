<template>
  <div class="p-3">
    <div class="d-flex justify-content-between mb-4">
      <h3>About Apps</h3>
      <select
        class="form-select shadow-none"
        aria-label="Select language"
        @change="changeLocale"
        style="width: 150px"
      >
        <option value="en" selected>English</option>
        <option value="id">Indonesian</option>
      </select>
    </div>
    <p style="text-align: justify">{{ $t('about.us') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  computed: {
    currentLocale() {
      return this.$i18n.locale === 'en' ? 'English' : 'Indonesia';
    },
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'id' : 'en';
    },
  },
});
</script>
