<template>
  <tr>
    <td>{{ index }}</td>
    <td class="title">
      <img
        :src="require(`@/assets/images/${img_src}`)"
        :alt="`Image of ${title}`"
      />
      <div class="content">
        <h3>{{ title }}</h3>
        <small>{{ uploader }}</small>
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
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  .content {
    h3 {
      margin: 0;
    }

    small {
      color: rgb(167, 167, 167);
    }
  }
}
</style>
