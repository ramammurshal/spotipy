<template>
  <Navbar />
  <div v-if="song.song_title">
    <div class="song__header">
      <img :src="song.cover" :alt="song.song_title" />
      <div class="song__content">
        <h3>{{ song.song_title }}</h3>
        <p>Artist: {{ song.song_artist }}</p>
        <small>Uploader: {{ song.uploader }}</small>
      </div>
    </div>
    <div class="song__play">
      <button class="btn btn-success" @click.prevent="startSong(song)">
        <i class="fa-solid fa-play"></i> Play Song
      </button>
    </div>
    <div class="song__comments p-3">
      <div class="comments__header">
        <p v-if="comments.length === 0">0 comment</p>
        <p v-else-if="comments.length === 1">1 comment</p>
        <p v-else>{{ comments.length }} comments</p>
        <p><i class="fa-solid fa-comment"></i></p>
      </div>
      <div class="comments__form" v-if="userLoggedIn">
        <vee-form :validation-schema="schema" @submit="submitComment">
          <div
            class="alert"
            :class="alert_variant"
            role="alert"
            v-if="show_alert"
          >
            {{ alert_message }}
          </div>
          <div class="mb-3">
            <label for="comment" class="form-label">Enter your comment</label>
            <vee-field
              as="textarea"
              class="form-control"
              id="comment"
              name="comment"
            />
            <small>
              <ErrorMessage
                name="comment"
                class="text-warning d-inline-block mt-2"
              />
            </small>
          </div>
          <button class="btn btn-success" :disabled="in_submission">
            Submit
          </button>
        </vee-form>
      </div>
      <div class="comments__main">
        <div class="row" v-for="comment in comments" :key="comment.docId">
          <h5>{{ comment.name }}</h5>
          <small>{{ comment.date_posted }}</small>
          <p>
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="p-3">Loading...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import { songsCollection, commentsCollection, auth } from '@/includes/firebase';
import moment from 'moment';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'Song',
  components: {
    Navbar,
  },
  data() {
    return {
      song: {} as any,
      comments: [] as any,
      schema: {
        comment: 'required|min:5|max:100',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'alert-primary',
      alert_message: 'Please Wait! Your comment is being submitted.',
    };
  },
  async beforeRouteEnter(to, from, next) {
    const songDocId: any = to.params.id;
    const docSnapshot = await songsCollection.doc(songDocId).get();

    next((vm) => {
      if (!docSnapshot.exists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "The song you are looking for can't be found",
        });

        vm.$router.push({ name: 'home' });
        return;
      }
    });
  },
  async created() {
    const songDocId: any = this.$route.params.id;
    const docSnapshot = await songsCollection.doc(songDocId).get();

    this.getSong(docSnapshot);
    this.getComments();
  },
  computed: {
    ...mapState(['userLoggedIn', 'current_song']),
  },
  methods: {
    getSong(document: any) {
      this.song = document.data();
    },
    async submitComment(values: any) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'alert-primary';
      this.alert_message = 'Please Wait! Your comment is being submitted.';

      const comment = {
        comment: values.comment,
        date_posted: moment().format('YYYY-MM-DDTHH:mm:ss'),
        sid: this.$route.params.id,
        uid: auth.currentUser?.uid,
        name: auth.currentUser?.displayName,
      };
      await commentsCollection.add(comment);

      this.song.comment_count += 1;
      const songDocId: any = this.$route.params.id;
      await songsCollection.doc(songDocId).update({
        comment_count: this.song.comment_count,
      });

      this.alert_variant = 'alert-success';
      this.alert_message = 'Success! Your comment successfully submitted.';

      window.location.reload();
    },
    async getComments() {
      const commentsSnapshot = await commentsCollection
        .where('sid', '==', this.$route.params.id)
        .get();
      commentsSnapshot.forEach((document: any) => {
        const comment: any = {
          ...document.data(),
          date_posted: moment(document.data().date_posted).fromNow(),
          docId: document.id,
        };
        this.comments.push(comment);
      });
    },
    startSong(song: object) {
      this.$store.dispatch('startSong', song);
    },
  },
});
</script>

<style lang="scss" scoped>
$top: #4f3a98;
$bottom: #2a1f53;

.song__header {
  background: linear-gradient(to bottom, $top, $bottom);
  height: 230px;
  display: flex;
  align-items: flex-end;

  img {
    height: 100%;
    margin-right: 20px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
    border-radius: 0 0 60px 0;
  }

  .song__content {
    margin-bottom: 20px;

    h3 {
      font-size: 90px;
      font-weight: bold;
    }

    small {
      color: rgb(167, 167, 167);
    }
  }
}

.song__play {
  background-color: $bottom;
  padding: 20px;
}

.song__comments {
  .comments__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    p:nth-child(1) {
      color: rgb(167, 167, 167);
    }
  }

  .comments__form {
    margin-bottom: 20px;
  }

  .comments__main {
    padding: 0 10px;

    .row {
      margin-bottom: 20px;
      background-color: #222;
      padding: 10px;
      border-radius: 10px;

      small {
        color: rgb(167, 167, 167);
      }
    }
  }
}
</style>
