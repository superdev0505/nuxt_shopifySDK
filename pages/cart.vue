<template>
    <div class="cart">
        <div class="container">
            <div class="title">
                <h1>Shopping Cart</h1>
            </div>
            <div class="section">
                <div class="cart-top">
                    <div class="row">
                        <div class="col-md-6"></div>
                        <div class="col-md-3">Quantity</div>
                        <div class="col-md-3">Total</div>
                    </div>
                </div>
                <div class="cart-items">
                    <div class="item-list" v-if="this.$store.state.lineItemCount > 0">
                        <div class="row" v-for="(item, index) in this.lineItems" :key="'lineItem-'+index">
                            <div class="col-md-2">
                                <img class="product-img" :src="item.variant.image.src" />
                            </div>
                            <div class="col-md-4">
                                <p class="product-name">{{item.title}}</p>
                                <p class="options">{{item.variant.selectedOptions[0].name}}: {{item.variant.selectedOptions[0].value}}</p>
                                <p class="remove" v-on:click="removeLineItem(item.id, item.quantity)">Remove</p>
                            </div>
                            <div class="col-md-3 text-center">
                                <input type="text" class="quantity" :value="item.quantity" v-on:change="updateLineItem(index, item.id, $event)"> 
                            </div>
                            <div class="col-md-3 text-center">
                                <p class="item-total-price">{{(item.variant.price * item.quantity).toFixed(2)}} {{currency}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <nuxt-link to="/boxer-briefs" class="continue-shopping">
                            There are no items in your cart. Continue Shopping &#8594;
                        </nuxt-link>
                    </div>
                </div>
                <div class="checkout-cart">
                    <div class="row" v-if="this.$store.state.lineItemCount > 0">
                        <div class="col-md-8"></div>
                        <div class="col-md-4">
                            <div class="subtotal">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h3 class="subtotal">SUBTOTAL</h3>
                                    </div>
                                    <div class="col-md-6">
                                        <p class="subtotal-price">{{subtotal}} {{currency}}</p>
                                    </div>
                                </div>
                                <p class="tax">Excluding tax & shipping</p>
                                <a :href="checkoutUrl" class="checkout-btn">CHECKOUT</a>
                                <div class="text-center">
                                    <nuxt-link to="/boxer-briefs" class="continue-shopping">
                                        Continue Shopping &#8594;
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    async asyncData({$shopify, store}) {
        if (store.state.lineItemCount > 0) {
            let checkoutId = store.state.checkout;
            const data = await $shopify.checkout.fetch(checkoutId);
            console.log(data);
            var qty = 0;
            for (var i = 0; i < data.lineItems.length; i ++) {
                qty += data.lineItems[i].quantity;
            }
            store.commit('setLineItemCount', qty);
            return { 
                lineItems: data.lineItems, 
                currency: data.currencyCode, 
                subtotal: data.subtotalPrice, 
                checkoutUrl: data.webUrl 
            };
        }
    },
    data: function () {
        return {
            lineItems: [],
            currency: "USD",
            subtotal: "",
            checkoutUrl: ""
        }
    },
    methods: {
        removeLineItem: function(id, qty) {
            let checkoutId = this.$store.state.checkout;
            const lineItemIdsToRemove = [id];
            this.$shopify.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then(checkout => {
                this.lineItems = checkout.lineItems;
                this.subtotal = checkout.subtotalPrice;
                this.$store.commit('decreaseLineItem', qty);
            });
        },
        updateLineItem: function(index, id, event) {
            console.log(this.lineItems[index].quantity, id, event.target.value);
            const qty = parseInt(event.target.value);
            const checkoutId = this.$store.state.checkout;
            var current = this.lineItems[index].quantity;
            const lineItemsToUpdate = [{ id: id, quantity: qty }];
            this.$shopify.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(checkout => {
                this.lineItems = checkout.lineItems;
                this.subtotal = checkout.subtotalPrice;
                this.$store.commit('updateLineItemCount', qty - current);
            });
        }
    }
}
</script>
<style lang="scss">
.text-center {
    text-align: center;
}
.cart {
    padding: 150px 0 0 0;
    .title h1 {
        font-size: 14px;
        line-height: 1.8em;
        margin: 0 auto 15px;
        clear: both;
        font-weight: 500;
        padding-top: 4px;
        color: #999999;
        text-align: center;
        text-transform: uppercase;
    }
}
.cart-top {
    padding: 15px 0;
    .row {
        text-align: center;
    }
}
.cart-items {
    padding: 35px 0 0;
    border-top: solid 1px black;
    border-bottom: solid 1px black;
    .row {
        margin-bottom: 35px;
        div[class*="col-"] {
            padding-left: 15px;
            padding-right: 15px; 
        }
        .product-name {
            color: #364491;
            font-weight: 600;
            letter-spacing: 1px;
            line-height: 32px;
            margin-bottom: 0.5em;
        }
        .options {
            font-weight: 400;
            color: #111;
            line-height: 1.8em;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .remove {
            font-size: smaller;
            color: #111;
            &:hover {
                cursor: pointer;
            }
        }
        .product-img {
            width: 100%;
        }
        input.quantity {
            width: 70px;
            display: inline;
            margin-bottom: 0;
            padding: 8px 5px;
            border-color: transparent;
            background-color: #f6f6f6;
            color: #1c1d1d;
            text-align: center; 
        }
        p.item-total-price {
            font-weight: 500;
            margin-bottom: 5px;
            color: #111;
            line-height: 1.8em;
            font-size: 16px;
        }
        .continue-shopping {
            line-height: 1.8em;
            text-decoration: none;
        }
    }
}
.checkout-cart {
    padding: 35px 0;
    h3.subtotal {
        color: #999999;
        line-height: 32px;
        margin-bottom: .5em;
        padding: 7px 0;
        font-size: 18px;
    }
    p.subtotal-price {
        color: #111;
        line-height: 1.8em;
        margin: 7px 0;
        font-size: 16px;
        font-weight: 600; 
    }
    p.tax {
        font-size: 14.4px;
        font-style: italic;
        line-height: 28.8px;
        color: #111;
        font-weight: 100;
    }
    a.checkout-btn {
        padding: 22px 40px 20px 40px;
        font-size: 16px;
        background: #364491;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: 500;
        transition: all 200ms ease 0s;
        &:hover {
            background: #616ebe;
            text-decoration: none;
        }
    }
    .continue-shopping {
        margin-bottom: 15px;
        line-height: 1.8em;
        color: #364491;
        text-decoration: none;
        outline: 0;
        transition: color .1s linear;
        margin-top: 30px;
        display: inline-block;
        font-weight: 100;
        &:hover {
            color: #2a363b;
        }
    }
}
</style>

