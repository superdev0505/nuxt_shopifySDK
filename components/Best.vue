<template>
  <section class="Best container">
    <div class="Max__Width">
      <h2>
        Best Sellers
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
              <p class="product-price">${{ product.node.variants.edges[0].node.price }}</p>
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
  padding-top: 100%;

  a {
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;

    img {
      width: 100%;
      transition: opacity .2s ease-in-out;
    }
  }
}
.Best {
  padding-top: 40px;
  padding-bottom: 20px;
  text-align: center;
  .row {
    @media (min-width: 420px) {
      margin: 0px;
    }
  }
  .row > div {
    padding: 20px .5rem;
  }

  a:hover {
    text-decoration: none;
    & img {
      opacity: .6;
    }
    & .product-title {
      opacity: .6;
    }
    & .product-price {
      text-decoration: none;
      opacity: .6;
    }
  }
}
.product-title {
  color: #364491;
  font-size: 18px;
  text-decoration: underline;
  margin-top: 1em;
  margin-bottom: 0px;
  line-height: 1.4em;
  font-weight: 600;
  transition: opacity .2s ease-in-out;
}
.product-price {
  font-size: 16px;
  margin-top: 0px;
  line-height: 1.8em;
  font-weight: 500;
  color: #999;
  transition: opacity .2s ease-in-out;
}
h2 {
  margin-bottom: 20px;
  line-height: 1.3em;
}
</style>
