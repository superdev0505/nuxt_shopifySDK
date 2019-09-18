export const state = () => ({
    checkout: '',
    lineItemCount: 0,
})
  
export const mutations = {
    setCheckout (state, checkout_id) {
        state.checkout = checkout_id;
    },
    setLineItemCount (state, count) {
        state.lineItemCount = count;
    },
    increaseLineItem (state) {
        state.lineItemCount ++;
    },
    decreaseLineItem (state, qty) {
        state.lineItemCount -= qty;
    },
    updateLineItemCount (state, qty) {
        state.lineItemCount += qty;
    }
}
