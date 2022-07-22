<template>
  <Navbar />
  <div class="p-3">
    <h3>All Songs</h3>
    <hr />
    <table class="table text-white">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Last Modified</th>
          <th><i class="fa-solid fa-clock"></i></th>
        </tr>
      </thead>
      <tbody>
        <SongRow
          v-for="i in 10"
          :key="i"
          :index="i"
          img_src="naruto.jpeg"
          title="Naruto"
          uploader="Rama Muhammad Murshal"
          last_modified="22 July 2022"
          time="3:33"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import SongRow from '@/components/SongRow.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Navbar,
    SongRow,
  },
});
</script>
