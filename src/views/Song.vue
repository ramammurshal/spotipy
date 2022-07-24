<template>
  <Navbar />
  <div class="p-3">
    <h3>Song Detail</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { songsCollection } from '@/includes/firebase';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'Song',
  components: {
    Navbar,
  },
  async beforeRouteEnter(to, from, next) {
    const songDocId: string = to.params.id;
    const docSnapshot = await songsCollection.doc(songDocId).get();
    // to do: fix error, check if id is exist, work in comment section
  },
});
</script>
