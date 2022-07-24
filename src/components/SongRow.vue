<template>
  <tr>
    <td>{{ index }}</td>
    <td class="title">
      <router-link :to="{ name: 'song', params: { id: song.docId } }">
        <img :src="song.cover" :alt="`Image of ${song.song_title}`" />
        <div class="content">
          <h4>{{ song.song_title }}</h4>
          <h6>Artist: {{ song.song_artist }}</h6>
          <small>Uploader: {{ song.uploader }}</small>
        </div>
      </router-link>
    </td>
    <td>{{ formatLastModified }}</td>
    <td>3.33</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
  name: 'SongRow',
  props: {
    index: {
      required: true,
      type: Number,
    },
    song: {
      required: true,
      type: Object,
    },
  },
  computed: {
    formatLastModified() {
      return moment(this.$props.song.last_modified).fromNow();
    },
  },
});
</script>

<style lang="scss" scoped>
td {
  vertical-align: middle;
}

tr:hover {
  background-color: #222222;

  h4 {
    text-decoration: underline;
  }
}

.title {
  a {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      margin-right: 15px;
    }

    .content {
      small {
        color: rgb(167, 167, 167);
      }
    }
  }
}
</style>
