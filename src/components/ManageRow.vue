<template>
  <div class="__card__">
    <!-- alert -->
    <div
      class="alert mb-2"
      :class="alert_variant"
      role="alert"
      v-if="show_alert"
    >
      {{ alert_message }}
    </div>

    <!-- main card -->
    <div class="__card" v-if="!edit_song">
      <div class="content">
        <img :src="song.cover" :alt="song.song_title" />
        <div>
          <h4>{{ song.song_title }}</h4>
          <h6>Artist: {{ song.song_artist }}</h6>
        </div>
      </div>
      <div>
        <button
          class="btn btn-warning"
          :disabled="in_submission"
          @click.prevent="toggleEditSong"
        >
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button
          class="btn btn-danger"
          :disabled="in_submission"
          @click.prevent="deleteSong"
        >
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>

    <!-- form edit -->
    <vee-form :validation-schema="schema" v-else>
      <button
        class="float-end btn btn-warning mt-1"
        @click.prevent="toggleEditSong"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h4 class="mb-3">Edit song</h4>
      <!-- title -->
      <div class="mb-3">
        <label for="title" class="form-label"
          >Song Title <span class="text-warning">*</span></label
        >
        <vee-field
          type="text"
          class="form-control"
          id="title"
          name="title"
          v-model="song.song_title"
        />
        <small>
          <ErrorMessage name="title" class="text-warning d-inline-block mt-2" />
        </small>
      </div>
      <!-- artist -->
      <div class="mb-3">
        <label for="artist" class="form-label"
          >Song Artist <span class="text-warning">*</span></label
        >
        <vee-field
          type="text"
          class="form-control"
          id="artist"
          name="artist"
          v-model="song.song_artist"
        />
        <small>
          <ErrorMessage
            name="artist"
            class="text-warning d-inline-block mt-2"
          />
        </small>
      </div>
      <button class="btn btn-success">Submit</button>
    </vee-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { songsCollection, storage } from '@/includes/firebase';

export default defineComponent({
  name: 'ManageRow',
  props: {
    song: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      edit_song: false,
      schema: {
        title: 'required|min:3|max:50',
        artist: 'required|min:3|max:50',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-primary',
      alert_message: 'Please wait!',
    };
  },
  methods: {
    async deleteSong() {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-primary';
      this.alert_message = 'Please wait! We are deleting your song.';

      const storageRef = storage.ref();

      const songRef = storageRef.child(this.$props.song.song_path);
      await songRef.delete();

      const coverRef = storageRef.child(this.$props.song.cover_path);
      await coverRef.delete();

      await songsCollection.doc(this.$props.song.docId).delete();

      window.location.reload();
    },
    toggleEditSong() {
      this.edit_song = !this.edit_song;
    },
  },
});
</script>

<style lang="scss" scoped>
.__card__ {
  background-color: #222222;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 10px;

  .__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 0;

    .content {
      display: flex;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        margin-right: 15px;
      }
    }

    button {
      margin: 0 0 0 8px;
    }
  }
}
</style>
