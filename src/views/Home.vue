<template>
  <Navbar />
  <div class="p-3">
    <h3>All Songs</h3>
    <hr />
    <table class="table text-white" v-if="songs.length">
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
          v-for="(song, index) in songs"
          :key="song.docId"
          :song="song"
          :index="index + 1"
        />
      </tbody>
    </table>
    <p v-else>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { songsCollection } from '@/includes/firebase';
import Navbar from '@/components/Navbar.vue';
import SongRow from '@/components/SongRow.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Navbar,
    SongRow,
  },
  data() {
    return {
      songs: [] as Object[],
    };
  },
  async created() {
    const snapshot: any = await songsCollection.get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    addSong(document: any) {
      const song: any = {
        ...document.data(),
        docId: document.id,
      };
      this.songs.push(song);
    },
  },
});
</script>
