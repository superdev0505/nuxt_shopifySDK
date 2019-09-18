<template>
  <section>
    <h2 class="title">Men's Underwear</h2>
    <div class="container">
      <div class="products-container">
        <div class="products-collection">
          <h3 class="collection-title">Boxer Brief</h3>
          <div class="row">
            <div v-for="(product,index) in this.boxerBrief" :key="index" class="col-xs-6 col-sm-3">
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
        <div class="products-collection">
          <h3 class="collection-title">Bundle</h3>
          <div class="row">
            <div v-for="(product,index) in this.bundle" :key="index" class="col-xs-6 col-sm-3">
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  async asyncData({ $shopify, param }) {
    const boxerBriefCollection = $shopify.graphQLClient.query(root => {
      root.addConnection(
        "collections",
        { args: { first: 1, query: "title:boxer brief" } },
        collection => {
          collection.add("title");
          //product.add("tags"); // Add fields to be returned
          collection.addConnection(
            "products",
            { args: { first: 4 } },
            product => {
              product.add("title");
              product.add("handle");
              product.addConnection("images", { args: { first: 1 } }, image => {
                image.add("originalSrc");
                image.add("altText");
              });
              product.addConnection('variants', {args: {first: 50}}, (variant) => {
                  variant.add('title');
                  variant.add('price');
              });
            }
          );
        }
      );
    });
    const bundleCollection = $shopify.graphQLClient.query(root => {
      root.addConnection(
        "collections",
        { args: { first: 1, query: "title:bundle" } },
        collection => {
          collection.add("title");
          //product.add("tags"); // Add fields to be returned
          collection.addConnection(
            "products",
            { args: { first: 4 } },
            product => {
              product.add("title");
              product.add("handle");
              product.addConnection("images", { args: { first: 1 } }, image => {
                image.add("originalSrc");
                image.add("altText");
              });
              product.addConnection('variants', {args: {first: 50}}, (variant) => {
                  variant.add('title');
                  variant.add('price');
              });
            }
          );
        }
      );
    });

    var { data } = await $shopify.graphQLClient.send(boxerBriefCollection);
    let boxerBrief = data;
    var { data } = await $shopify.graphQLClient.send(bundleCollection);
    let bundle = data;

    return { boxerBrief: boxerBrief.collections.edges[0].node.products.edges, bundle: bundle.collections.edges[0].node.products.edges };

  }
};
</script>

<style scoped lang="scss">
.title {
  padding-top: 70px;
  padding-bottom: 60px;
  background: #f4f4f4;
  text-transform: capitalize;
  color: #364491;
  font-size: 60px;
  font-weight: 600;
  font-family: "Josefin sans";
}
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
.products-collection {
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
