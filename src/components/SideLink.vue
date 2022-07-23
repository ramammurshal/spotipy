<template>
  <router-link :to="{ name: to }">
    <div class="item__link">
      <i class="icon" :class="icon"></i>
      <p>{{ title }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideLink',
  props: {
    to: {
      required: true,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
});
</script>

<style lang="scss" scope>
.item__link {
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 16px;
  margin-bottom: 25px;

  &:hover {
    color: #fff;
  }

  .icon {
    font-size: 22px;
    width: 20px;
    margin-right: 25px;
  }
}

a.router-link-exact-active {
  .item__link {
    color: #fff;
  }
}
</style>
