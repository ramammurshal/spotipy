<template>
  <tr>
    <td>{{ index }}</td>
    <td class="title">
      <img
        :src="require(`@/assets/images/${img_src}`)"
        :alt="`Image of ${title}`"
      />
      <div class="content">
        <h4>{{ title }}</h4>
        <h6>Artist: {{ artist }}</h6>
        <small>Uploader: {{ uploader }}</small>
      </div>
    </td>
    <td>{{ last_modified }}</td>
    <td>{{ time }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SongRow',
  props: {
    index: {
      required: true,
      type: Number,
    },
    img_src: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    artist: {
      required: true,
      type: String,
    },
    uploader: {
      required: true,
      type: String,
    },
    last_modified: {
      required: true,
      type: String /* need improvement */,
    },
    time: {
      required: true,
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
td {
  vertical-align: middle;
}

.title {
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
</style>
