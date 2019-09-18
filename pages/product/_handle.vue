<template>
<div class="product-detail-page">
  <div class="product-details">
    <div class="image-slider">
        <div class="image">
            <div 
                class="image-slide"
                v-for="(image ,index) in this.product.images.edges"
                :key="'photo'+(index+1)"
            >
                <input
                    :id="'slide-dot-'+(index+1)"
                    type="radio"
                    name="slides"
                    hidden
                    aria-hidden="true"
                    v-bind:checked="index==0"
                >
                <img 
                    class="slider-image"
                    :src="image.node.originalSrc"
                >
            </div>
        </div>
        <div class="image-thumbnail">
            <label
                v-for="(image ,index) in this.product.images.edges"
                :for="'slide-dot-'+(index+1)"
                :key="(index+1)"
            >
                <img 
                    :src="image.node.originalSrc"
                >
            </label>
        </div>
    </div>
    <div class="product-content">
        <nuxt-link to="/boxer-breifs" class="collection-link">
            <h4>Men's Boxer Brief</h4>
        </nuxt-link>
        <div class="product-rating">
            <img :src="i < reviewrating + 1 ? i + 1 > reviewrating + 1 ? require('~/assets/img/star-half.svg') : require('~/assets/img/star.svg') : require('~/assets/img/star-gray.svg')" v-for="i in 5" :key="'star-' + i" width="14" />
            <a class="review-count" v-if="reviewcount">({{reviewcount}})</a>
        </div>
        
        <h2>{{this.product.title}}</h2>
        <p class="price">${{this.variants[current_state].node.price}}</p>
        <div class="variants">
            <span>SIZE</span>
            <button 
                class="variant-btn" 
                v-for="(variant, index) in this.variants"
                v-on:click="current_state = index"
                :key="'varient-'+(index)"
                v-bind:class="index == current_state ? 'active' : ''"
            >
                {{variant.node.title}}
            </button>

        </div>
        <button class="add-to-cart" v-on:click="add_to_cart">ADD TO CART</button>
        <p class="description" v-html="this.product.descriptionHtml"></p>
        <!-- {{this.product}} -->
    </div>
    
  </div>
  <InfoBox />
  <Review :reviews="reviews" />
  <div class="bg-gray">
      <Relative :products="relative_products"/>
  </div>
</div>
</template>

<script>
import Review from "~/components/Review.vue";
import InfoBox from "~/components/InfoBox.vue";
import Relative from "~/components/Relative.vue";
import reviews from '~/static/review.json';

export default {
    components: {
        Review,
        InfoBox,
        Relative
    },
    async asyncData ({ params, param, $shopify }) {
        // called every time before loading the component
        const product = $shopify.graphQLClient.query(root => {
            root.addConnection(
                "products",
                { args: { first: 1, query:`'${params.handle}'` } },
                product => {
                    product.add("handle");
                    product.add("title");
                    product.add("description");
                    product.add("descriptionHtml");
                    product.addConnection('variants', {args: {first: 50}}, (variant) => {
                        variant.add('title');
                        variant.add('price');
                    });
                    product.addConnection("images", { args: { first: 50} }, image => {
                        image.add("originalSrc");
                        image.add("altText");
                    });
                }
            );
        });

        let all_products_collection = await $shopify.collection.fetchAllWithProducts();
        let products =  all_products_collection[0].products;
        let relative_products = [];
        for (let i = 0; i < products.length; i ++) {
            if (products[i].handle.indexOf('boxer-brief') != -1 && products[i].handle != params.handle) {
                relative_products.push(products[i]);
            } 
            if (relative_products.length == 4) break;
        }


        // Call the send method with the custom products query
        var { data } = await $shopify.graphQLClient.send(product);
        
        // this.variants = data.products.edges[0].node.variant.edges;
        let descriptionHtml = data.products.edges[0].node.descriptionHtml;
        let reiview_numberStart = descriptionHtml.indexOf("reviews_number");
        let reviews_number = "";
        if (reiview_numberStart != -1) {
            reviews_number = descriptionHtml.substring(
                reiview_numberStart + 16, 
                descriptionHtml.indexOf("</label>", reiview_numberStart + 16)
            );
        }
        let reviewratingStart = descriptionHtml.indexOf("product_rating");
        let reviewrating = "5";
        if (reviewratingStart != -1) {
            reviewrating = descriptionHtml.substring(
                reviewratingStart + 16,
                descriptionHtml.indexOf("</label>", reviewratingStart + 16)
            );
        }
        descriptionHtml = descriptionHtml.replace(/(<label.*label>)/g, "");
        let temp_product = data.products.edges[0].node;
        temp_product.descriptionHtml = descriptionHtml;
        return { 
            product: temp_product,
            relative_products: relative_products,
            variants: temp_product.variants.edges,
            reviews: reviews,
            reviewcount: reviews_number,
            reviewrating: parseFloat(reviewrating),
        };

        // promise.then(({ model, data }) => {
        //     console.log(data);
        //     return {
        //         handle: `handle:${params.handle}`,
        //         product: data.products
        //     };
        // });
    },
    data: function() {
        return {
            variants: [],
            current_state: 0,
            reviews: {},
            reviewcount: "",
            reviewrating: 0,
            relative_products: []
        };
    },
    
    methods: {
        add_to_cart: function(event) {
            var checkoutId = this.$store.state.checkout;
            console.log(checkoutId);
            const lineItemsToAdd = [
                {
                    variantId: this.variants[this.current_state].node.id,
                    quantity: 1
                },
            ];
            if (checkoutId == "") {
                this.$shopify.checkout.create().then (checkout => {
                    checkoutId = checkout.id;
                    this.$store.commit('setCheckout', checkoutId);
                    this.$shopify.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
                        let count = 0;
                        for (let i = 0; i < checkout.lineItems.length; i ++) {
                            count += checkout.lineItems[i].quantity;
                        }
                        this.$store.commit('setLineItemCount', count);
                        this.$nuxt.$router.replace({ path: '/cart' });
                    });
                })
            } else {
                this.$shopify.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
                    let count = 0;
                    for (let i = 0; i < checkout.lineItems.length; i ++) {
                        count += checkout.lineItems[i].quantity;
                    }
                    this.$store.commit('setLineItemCount', count);
                    this.$nuxt.$router.replace({ path: '/cart' });
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">
.product-details {
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 60px;
    display: flex;
    @include bp($navDesktop) {
        flex-direction: row;
    }
    flex-direction: column;
    .image-slider {
        @include bp($navDesktop) {
            padding: 20px;
            width: 60%;
            flex-direction: row;
        }
        
        width: 100%;
        display: flex;
        flex-direction: column;
        .image {
            @include bp($navDesktop) {
                width: 80%;
            }
            width: 100%;
            position: relative;
            overflow: hidden;
            padding-top: 100%;
            .image-slide {
                .slider-image {
                    position: absolute;
                    width: 100%;
                    height: auto;
                    top: 0px;
                    left: 100%;
                    transition: left 0s .75s;
                }
                
                [id^="slide-dot"]:checked + .slider-image {
                    left: 0;
                    z-index: 100;
                    transition: left .65s ease-out;
                }
            }
            img {
                width: 100%;
            }
        }
        .image-thumbnail {
            @include bp($navDesktop) {
                width: 20%;
                display: block;
            }
            width: 100%;
            display: flex;
            padding: 0px 10px;
            label {
                display: flex;
                margin-bottom: 10px;
            }
            img {
                width: 100%;
            }
        }
    }
    .product-content {
        @include bp($navDesktop) {
            width: 40%;
        }
        width: 100%;
        padding: 20px;
        .collection-link {
            h4{
                font-size: 16px;
                line-height: 1.8em;
                color: #333;
                letter-spacing: normal;
            }
            text-decoration: none;
        }
        .product-rating {
            img {
                margin-right: 4px;
            }
            .review-count {
                font-weight: 200;
                font-size: 14px;
                color: black;
                text-decoration: none;
            }
        }
        .variants {
            padding: 20px 0px;
        }
        .variant-btn {
            width: 35px;
            height: 35px;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            background: transparent;
            color: #111;
            
            margin: 0px 5px;
            font-family: "Josefin sans";

            &.active {
                background: black;
                color: white;
                border-color: black;
            }
        }
        .add-to-cart {
            padding: 1.2em 3.8em;
            font-size: 16px;
            font-weight: bold;
            color: white;
            background: #364491;
            border: 0;
            font-family: "Josefin sans";
        }
        .description label {
            display: none;
        }
    }
}
.bg-gray {
    background-color: #f4f4f4;
}
</style>
