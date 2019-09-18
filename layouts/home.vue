<template>
  <div class="body-wrapper">
    <app-header></app-header>
    <transition name="layout" mode="out-in">
      <nuxt/>
    </transition>
  </div>
</template>
<script>
import AppHeader from "~/components/common/Header";

export default {
  components: {
    AppHeader
  }
};
</script>

<style scoped lang="scss">
</style>
