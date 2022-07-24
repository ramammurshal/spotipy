<template>
  <Navbar />
  <div class="p-3">
    <h3>Manage Your Songs</h3>
    <hr />
    <div v-if="songs.length > 0">
      <ManageRow v-for="song in songs" :key="song.docId" :song="song" />
    </div>
    <div v-else>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { auth, songsCollection } from '@/includes/firebase';
import Navbar from '@/components/Navbar.vue';
import ManageRow from '@/components/ManageRow.vue';

export default defineComponent({
  name: 'Manage',
  components: {
    Navbar,
    ManageRow,
  },
  data() {
    return {
      songs: [] as object[],
      there_is_song: false,
      message: 'Loading...',
    };
  },
  async created() {
    const snapshot: any = await songsCollection
      .where('uid', '==', auth.currentUser?.uid)
      .get();

    if (snapshot.docs.length) {
      this.there_is_song = true;
      snapshot.forEach(this.addSong);
    } else {
      this.message = "You don't have any song yet.";
    }
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
