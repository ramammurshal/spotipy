<template>
  <vee-form :validation-schema="schema" @submit="upload">
    <!-- alert & progress bar -->
    <div class="mb-3">
      <div
        class="alert"
        :class="upl.alert_variant"
        role="alert"
        v-if="upl.show_alert"
      >
        {{ upl.alert_message }}
      </div>
      <div class="progress" v-if="upl.show_progress">
        <div
          class="progress-bar"
          :class="upl.progress_variant"
          role="progressbar"
          :style="{ width: upl.progress_report + '%' }"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ upl.progress_report }}%
        </div>
      </div>
    </div>
    <!-- song title -->
    <div class="mb-3">
      <label for="song_title" class="form-label"
        >Song Title <span class="text-warning">*</span></label
      >
      <vee-field
        type="text"
        class="form-control"
        id="song_title"
        name="song_title"
      />
      <small>
        <ErrorMessage
          name="song_title"
          class="text-warning d-inline-block mt-2"
        />
      </small>
    </div>
    <!-- song artist -->
    <div class="mb-3">
      <label for="song_artist" class="form-label"
        >Song Artist <span class="text-warning">*</span></label
      >
      <vee-field
        type="text"
        class="form-control"
        id="song_artist"
        name="song_artist"
      />
      <small>
        <ErrorMessage
          name="song_artist"
          class="text-warning d-inline-block mt-2"
        />
      </small>
    </div>
    <!-- song upload -->
    <div class="mb-3">
      <label for="song_file" class="form-label"
        >Song File <span class="text-warning">*</span></label
      >
      <vee-field
        type="file"
        class="form-control"
        id="song_file"
        name="song_file"
        accept="audio/mpeg"
      />
      <small>
        <ErrorMessage
          name="song_file"
          class="text-warning d-inline-block mt-2"
        />
      </small>
    </div>
    <!-- song cover -->
    <div class="mb-3">
      <label for="song_cover" class="form-label"
        >Song Cover <span class="text-warning">*</span></label
      >
      <vee-field
        type="file"
        class="form-control"
        id="song_cover"
        name="song_cover"
        accept="image/png, image/jpeg"
      />
      <small>
        <ErrorMessage
          name="song_cover"
          class="text-warning d-inline-block mt-2"
        />
      </small>
    </div>
    <button class="btn btn-success mt-2" :disabled="upl.in_submission">
      Submit
    </button>
  </vee-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';
import { auth, songsCollection, storage } from '@/includes/firebase';

interface string_as_index {
  [index: string]: any;
}

export default defineComponent({
  name: 'FormUpload',
  data() {
    return {
      upl: {
        in_submission: false,
        show_alert: false,
        alert_variant: 'alert-primary',
        alert_message: 'Please wait! We are uploading your song.',
        show_progress: false,
        progress_variant: 'bg-primary',
        progress_report: 25,
      },
      schema: {
        song_title: 'required|min:3|max:50',
        song_artist: 'required|min:3|max:50',
        song_file: 'required',
        song_cover: 'required',
      },
    };
  },
  methods: {
    async upload(values: any) {
      // reset
      this.upl.in_submission = true;
      this.upl.show_alert = true;
      this.upl.alert_variant = 'alert-primary';
      this.upl.alert_message = 'Please wait! We are uploading your song.';
      this.upl.show_progress = true;
      this.upl.progress_variant = 'bg-primary';
      this.upl.progress_report = 0;

      if (!navigator.onLine) {
        this.upl.alert_variant = 'alert-danger';
        this.upl.alert_message =
          'You are offline! Check your internet connection.';
        this.upl.progress_variant = 'bg-danger';
        this.upl.progress_report = 100;
      }

      const song_file = values.song_file[0];
      const song_cover = values.song_cover[0];

      const storageRef = storage.ref();

      const songRef = storageRef.child(
        `songs/${auth.currentUser?.uid}/${song_file.name}`
      );
      const task_song = songRef.put(song_file);

      task_song.on(
        'state_changed',
        (snapshot) => {
          const progress_song =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.upl.progress_report = Number(progress_song.toFixed(2));
        },
        (error) => {
          this.upl.alert_variant = 'alert-danger';
          this.upl.alert_message =
            error.message || 'Failed to upload song! Please try again.';
          this.upl.progress_variant = 'bg-danger';
          this.upl.progress_report = 100;
        },
        async () => {
          this.upl.alert_message = 'Song uploaded! Uploading your cover now.';
          this.upl.progress_report = 0;

          const coverRef = storageRef.child(
            `songs/${auth.currentUser?.uid}/${song_cover.name}`
          );
          const task_cover = coverRef.put(song_cover);

          task_cover.on(
            'state_changed',
            (snapshot) => {
              const progress_cover =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.upl.progress_report = Number(progress_cover.toFixed(2));
            },
            (error) => {
              this.upl.alert_variant = 'alert-danger';
              this.upl.alert_message =
                error.message || 'Failed to upload cover! Please try again.';
              this.upl.progress_variant = 'bg-danger';
              this.upl.progress_report = 100;
            },
            async () => {
              this.upl.alert_message =
                'Cover uploaded! A little bit more, please wait.';

              const song: string_as_index = {
                uid: auth.currentUser?.uid,
                uploader: auth.currentUser?.displayName,
                song_title: values.song_title,
                song_artist: values.song_artist,
                song_path: `songs/${auth.currentUser?.uid}/${song_file.name}`,
                cover_path: `songs/${auth.currentUser?.uid}/${song_cover.name}`,
                last_modified: moment().format('YYYY-MM-DDTHH:mm:ss'),
                comment_count: 0,
              };

              song.url = await task_song.snapshot.ref.getDownloadURL();
              song.cover = await task_cover.snapshot.ref.getDownloadURL();
              await songsCollection.add(song);

              this.upl.alert_variant = 'alert-success';
              this.upl.alert_message =
                'Congrats! Your song song been uploaded successfully.';
              this.upl.progress_variant = 'bg-success';

              setTimeout(() => {
                this.$router.push({ name: 'manage' });
              }, 500);
            }
          );
        }
      );
    },
  },
});
</script>
