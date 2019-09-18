<template>
  <div class="body-wrapper">
    <app-header></app-header>
    <transition name="layout" mode="out-in">
      <nuxt/>
    </transition>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/common/Header";
import AppFooter from "~/components/common/Footer";

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style scoped lang="scss">
.body-wrapper {
  padding-top: $navHeight;
  @include bp($navDesktop) {
    padding-top: $navHeightDesktop;
  }
}
</style>
