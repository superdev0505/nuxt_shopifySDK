<template>
  <div>
    <picture>
      <!--<img class="Picture" v-bind="{[srcAttr]: src, alt}">-->
      <img v-lazy="src" :alt="alt">
      <!--:src="src" :alt="alt">-->
    </picture>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  // computed: {
  //   srcAttr() {
  //     if (this.lazy) return "data-src";
  //     return "src";
  //   },
  //   photoDpis() {
  //     return `${this.photo} 1x, ${this.photo2x} 2x, ${this.photo3x} 3x`;
  //   },
  //   photo() {
  //     return require(this.src);
  //   },
  //   photo2x() {
  //     return this.dpi(2);
  //   },
  //   photo3x() {
  //     return this.dpi(3);
  //   }
  // },
  methods: {
    dpi(n) {
      let fn = this.src.split(".");
      let ext = fn.pop();
      fn = fn.join(".");
      return `${fn}@${n}x.${ext}`;
    }
  }
};
</script>
<style scoped lang="scss">
img {
  // position: relative;
  display: block;
  width: auto;
  @include bp($tablet) {
    width: 100%;
    height: unset;
    min-height: 465px;
  }
  height: 500px;
  left: 0; //50%;
  bottom: 0; //50%;
  //transform: translateX(-50%); //, -50%);
  opacity: 0;
  transform: scale(1.05);

  transition: opacity 1.2s $easeOutQuint, transform 2s $easeOutQuint;
  &[lazy="loaded"] {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
