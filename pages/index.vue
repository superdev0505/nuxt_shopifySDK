<template>
  <div class="Home">
    <hero />
    <div class="publication-logos container">
      <no-ssr>
        <Flickity :options="flickityOptions" ref="flickityLogos">
          <div class="cell" v-for="(logo,index) in logos" :key="index">
            <img :key="'logo'+index"
                 :data-flickity-lazyload-src="logo.img" :data-flickity-lazyload-srcset="logo.srcset"
                 :alt="logo.alt" >
          </div>
        </Flickity>
      </no-ssr>
    </div>
    <popular :products="popularProducts"/>
    <InfoBox/>
    <div class="bg-gray">
      <best :products="bestProducts"/>
    </div>
    <review :reviews="reviews" />
  </div>
</template>

<script>
import Hero from "~/components/Hero.vue";
import Popular from "~/components/Popular.vue";
import Best from "~/components/Best.vue";
import Review from "~/components/Review.vue";
import InfoBox from "~/components/InfoBox.vue";
import reviews from '~/static/review.json';
import { throttle } from 'throttle-debounce'; //, debounce

let logosFlickityDesktopMql = window.matchMedia('(min-width:768px)');
let logosFlickityFitsMql = window.matchMedia('(min-width:1260px)');

export default {
  //layout: "home",
  components: {
    Hero,
    Popular,
    Best,
    Review,
    InfoBox
  },
  async asyncData({ $shopify, param, store }) {
    if (store.state.checkout == "") {
      $shopify.checkout.create().then (checkout => {
        var checkoutId = checkout.id;
        store.commit('setCheckout', checkoutId);
        console.log(store.state.checkout);
      })
    }
    const mostPopularCollection = $shopify.graphQLClient.query(root => {
      root.addConnection(
        "products",
        { args: { first:4, query: "title:'Flamingo Boxer Briefs' OR title:'Tropical Boxer Briefs' OR title:'420 Boxer Briefs' OR title:Forest Men\'s Boxer Briefs" } },
        product => {
          product.add("title");
          product.add("handle");
          product.addConnection("images", { args: { first: 1 } }, image => {
            image.add("originalSrc");
            image.add("altText");
          });
        }
      );
    });

    const bestSellersCollection = $shopify.graphQLClient.query(root => {
      root.addConnection(
        "collections",
        { args: { first: 1, query: "title:most popular" } },
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

    // Call the send method with the custom products query
    var { data } = await $shopify.graphQLClient.send(mostPopularCollection);
    let popular = data;
    var { data } = await $shopify.graphQLClient.send(bestSellersCollection);
    let best = data;

    function getLogoImages(r) {
      let logos = [];
      // populate logos with {img,alt,srcset} object
      r.keys().forEach(key => {
        let paths = r(key).split('/');
        let [fn,ext] = paths.pop().split('.');
        let path = paths.join('/')+'/';
        // make alt from the filename, ucwords + ' Logo'
        let alt = fn.replace('-',' ').replace(/\b[a-z]/g, l=>l.toUpperCase())+' Logo';
        let srcset = `${path+fn}.${ext} 1x, ${path+fn}@2x.${ext} 2x, ${path+fn}@3x.${ext} 3x`;
        // console.log('Alt: ',alt);
        logos.push({
          img:r(key),
          alt:alt,
          srcset:srcset
        });
        return logos;
      });
      return logos;
    }
    //load all base png's from the directory (no 2x & 3x)
    let logos = getLogoImages(require.context('~/assets/img/publication-logos', true, /^((?!@).)*\.png$/));
    //console.log("Logos: ",logos);
    return {
      logos: logos,
      popularProducts: popular.products.edges,
      bestProducts: best.collections.edges[0].node.products.edges,
      reviews: reviews
    };

    // promise.then(({ model, data }) => {
    //   // Do something with the products
    //   // console.log("Collection", model, data);
    //   console.log(
    //     "Popular Products: ",
    //     data.collections.edges[0].node.products.edges
    //   );
    //   return {
    //     popularProducts: data.collections.edges[0].node.products.edges
    //   };
    // });
  },
  created() {
    logosFlickityDesktopMql.addListener(this.handleLogosFlickityDesktopMediaChange);
    this.handleLogosFlickityDesktopMediaChange(logosFlickityDesktopMql);

    logosFlickityFitsMql.addListener(this.handleLogosFlickityFitsMediaChange);
    this.$nextTick(() => {
        this.handleLogosFlickityFitsMediaChange(logosFlickityFitsMql);
    });

    // Resize Flickity on resize event
    window.onresize = throttle(500, () => {
      if(this.flickityLogos)
        this.$refs.flickityLogos.resize();
    });
  },
  destroyed(){
    window.onresize = null;
  },
  data: function() {
    return {
      publication_logos: [],
      logos: [],
      popularProducts: [],
      bestProducts: [],
      flickityDesktop:true,
      flickityFits:false,
      flickityOptionsMobile: {
        contain: false,
        cellAlign: 'center',
        freeScroll: false,
        prevNextButtons: false,
        groupCells: 1,
        draggable: true,
        wrapAround: true,
        lazyLoad: 2,
        pageDots: false
      },
      flickityOptionsDesktop: {
        contain: true,
        cellAlign: 'left',
        freeScroll: false,
        prevNextButtons: false,
        groupCells: false,
        draggable: true,
        wrapAround: false,
        lazyLoad: 2,
        pageDots: false
      },
      flickityOptionsFits: { /* center logos when they fit within container */
        contain: true,
        cellAlign: 'center',
        freeScroll: false,
        prevNextButtons: false,
        groupCells: false,
        draggable: false,
        wrapAround: false,
        lazyLoad: 2,
        pageDots: false
      },
      reviews: {}
    };
  },
  computed: {
    flickityOptions(){
      return this.flickityFits ? this.flickityOptionsFits : (
                this.flickityDesktop ? this.flickityOptionsDesktop : this.flickityOptionsMobile
              );
    },
    flickityLogos(){
      return this.$refs.flickityLogos && this.$refs.flickityLogos.flickity();
    }
  },
  methods:{
    handleLogosFlickityDesktopMediaChange: function(mql){
      this.flickityDesktop = mql.matches;
    },
    handleLogosFlickityFitsMediaChange: function(mql){
      this.flickityFits = mql.matches;
    }
  },
  watch: {
    flickityDesktop:function(n,o){
      if(this.flickityLogos)
        this.$refs.flickityLogos.destroy();

      //rerender();
      this.$nextTick(() => {
          this.$refs.flickityLogos.init();
      });
    },
    flickityFits:function(n,o){
      if(this.flickityLogos)
        this.$refs.flickityLogos.destroy();

      this.$nextTick(() => {
          this.$refs.flickityLogos.init();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.publication-logos {
  margin: 70px auto;

  @media (min-width:992px) and (max-width:1079px),
         (min-width:1200px) and (max-width:1259px){

    padding-left:40px;
    padding-right:40px;
  }

  .flickity-enabled {
    width: 100%;
  }
  .cell{
    margin-right:30px;
    top:50%;
    transform:translateY(-50%);
  }
  img{
    opacity: .8;
  }
}

@include bp($tablet,true){
  .publication-logos {
    margin: 60px auto 60px;
    width: 100%;
  }
}
.bg-gray {
  background-color: #f4f4f4;
}
</style>
