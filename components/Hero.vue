<template>
  <section class="Hero">
    <picture-bg :src="require('~/assets/img/hero-bg.png')" alt="My Hero" class="Bg" lazy/>
    <div class="Padded">
      <h1>Voted Best Men’s Underwear</h1>
      <p>Softer than Katy Perry's lips, two-hand touch football and Kate Upton's right boob*</p>
      <nuxt-link to="/collections/best-mens-underware">
        Shop Collections
      </nuxt-link>
    </div>
    <p class="Disclaimer Padded">*We haven’t actually kissed them, but it’s true!</p>
  </section>
</template>
<script>
import PictureBg from "./common/PictureBg.vue";

export default {
  components: {
    pictureBg: PictureBg
  }
};
</script>
<style scoped lang="scss">
.Hero {
  position: relative;
  width: 100%;
  padding: 85px 0 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  background-color: #40805d; //this is replacement before image loads
  color: white;

  .Padded a {
    padding: 22px 40px 20px 40px;
    border-radius: 0;
    line-height: 1;
    min-width: 250px;
    -webkit-appearance: none;
    background: #364491;
    color: #ffffff;
    border: 0;
    text-align: center;
    cursor: pointer;
    font-family: Josefin Sans;
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
    display: inline-block;
    transition: background-color .5s ease-in-out;

    &:hover {
      background-color: #616ebe;
      text-decoration: none;
    }
  }

  margin-top: -$navHeight;

  @include bp($navDesktop) {
    margin-top: -$navHeightDesktop;
  }
}
h1 {
  margin-bottom: 0.2em;
  font-weight: 500;
}
p {
  color: white;
  letter-spacing: 1px;
  @include poly-fluid-sizing(
    "font-size",
    (
      $mobileM: 16px,
      $laptop: 20px
    )
  );

  &.Disclaimer {
    @include poly-fluid-sizing(
      "font-size",
      (
        $mobileM: 14px,
        $laptop: 18px
      )
    );
    position: absolute;
    @include poly-fluid-sizing(
      "bottom",
      (
        $mobileM: 20px,
        $laptop: 30px
      )
    );
  }
}
.Padded {
  position: absolute;
  z-index: 1;
}
.Bg {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // min-width: 100%;
  // min-height: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
  top: 0;
}
</style>
