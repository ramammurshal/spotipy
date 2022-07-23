<template>
  <Navbar />
  <div class="p-3">
    <h3>Upload Your Song</h3>
    <hr />
    <FormUpload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import FormUpload from '@/components/FormUpload.vue';

export default defineComponent({
  name: 'Upload',
  components: {
    Navbar,
    FormUpload,
  },
});
</script>
