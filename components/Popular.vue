<template>
  <section class="Popular container">
    <div class="Max__Width">
      <h2>
        Most Comfortable Men’s Underwear.
        <a href="#satisfaction-guaranteed">Guaranteed</a>.
      </h2>
      <div class="row">
        <div v-for="(product,index) in products" :key="index" class="col-xs-6 col-sm-3">
          <div class="Product">
            <nuxt-link :to="`/product/${product.node.handle}`">
              <img :src="product.node.images.edges[0].node.originalSrc">
            </nuxt-link>
          </div>
          <div>
            <nuxt-link :to="`/product/${product.node.handle}`">
              <p class="product-title">{{ product.node.title }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  props: ["products"]
};
</script>



<style scoped lang="scss">
.Product {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
  padding-top: 100%;

  a {
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: opacity .2s ease-in-out;
    overflow: hidden;

    img {
      width: 100%;
      position: relative;
      top: -6%;
    }
  }
}
.Popular {
  text-align: center;
  padding-bottom: 20px;
  .row {

    @media (min-width: 420px) {
      margin: 0px;
    }
  }
  .row > div {
    padding: 20px .5rem;
  }

  a:hover {
    opacity: .6;

    & .product-title {
      opacity: 0.6;
    }
  }
}
.product-title {
  color: #364491;
  font-size: 18px;
  text-decoration: underline;
  margin-top: 1em;
  line-height: 1.4em;
  font-weight: 600;
  transition: opacity .2s ease-in-out;
}
h2 {
  margin-bottom: 20px;
  letter-spacing: 0;
  line-height: 1.3em;
  a {
    color: #364491;
    text-decoration: underline;
    transition: opacity .2s ease-in-out;
  }
}
</style>
