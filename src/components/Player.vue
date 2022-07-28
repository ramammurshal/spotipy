<template>
  <div class="__container">
    <div class="__identifier">
      <img
        :src="
          current_song.cover
            ? current_song.cover
            : 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7c95ff105413925.5f788730616d6.jpg'
        "
        :alt="current_song.song_title"
      />
      <div class="__title">
        <h6>
          {{
            current_song.song_title ? current_song.song_title : 'No Song Played'
          }}
        </h6>
        <small>{{
          current_song.song_artist ? current_song.song_artist : '---'
        }}</small>
      </div>
    </div>
    <div class="__main">
      <button @click.prevent="toggleSong" v-if="!playing">
        <i class="fa-solid fa-play"></i>
      </button>
      <button @click.prevent="toggleSong" v-else>
        <i class="fa-solid fa-pause"></i>
      </button>
      <small>{{ seek }}</small>
      <div class="__scrub" @click.prevent="updateSeek">
        <span class="__player__ball" :style="{ left: playerProgress }">
          <i class="fa-solid fa-circle"></i>
        </span>
        <div class="__progress__bar" :style="{ width: playerProgress }"></div>
      </div>
      <small>{{ duration }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default defineComponent({
  name: 'Player',
  computed: {
    ...mapGetters(['playing']),
    ...mapState(['seek', 'duration', 'playerProgress', 'current_song']),
  },
  methods: {
    ...mapActions(['toggleSong', 'updateSeek']),
  },
});
</script>

<style lang="scss" scoped>
.__container {
  background: #222222;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  display: flex;

  .__identifier {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 20%;

    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
    }

    .__title {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      small {
        color: #aaa;
        // font-size: 12px;
      }
    }
  }

  .__main {
    margin-left: 20px;
    width: 60%;
    display: flex;
    align-items: center;
    padding-right: 20px;

    button {
      background: none;
      border: none;
      color: #fff;
      font-size: 24px;
      margin-right: 15px;
    }

    small:nth-of-type(1) {
      margin-right: 15px;
    }

    .__scrub {
      width: 100%;
      margin-right: 15px;
      position: relative;
      cursor: pointer;
      height: 5px;
      background: gray;

      .__progress__bar {
        background: #1ed760;
        // width: 50%;
        height: 5px;
        position: absolute;
        transition: all 0s ease;
      }

      .__player__ball {
        color: #fff;
        position: absolute;
        top: 50%;
        // left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        transition: all 0s ease;
      }
    }
  }
}
</style>
