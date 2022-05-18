export const state = () => ({
    items: [ /*{id, label, image, price, qte_stock, quantity, variant_value}*/ ]
})

export const getters = {
    items: (state) => {
        return state.items;
    },
    cartTotalPrice: (state) => {
        return state.items.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0);
    },
    cartNumberOfProducts: (state) => {
        return state.items.length;
    }
}

export const mutations = {
    incrementProductQuantity(state, payload) {
        const product = state.items.find((product) => product.id == payload.id);
        product.quantity += payload.quantity;
    },
    reduceProductQuantity(state, payload) {
        const product = state.items.find((product) => product.id == payload.id);
        product.quantity -= payload.quantity;
    },
    removeProduct(state, payload) {
        state.items.splice(state.items.findIndex(product => payload), 1);
    },
    addProduct(state, payload) {
        state.items.push(payload);
    },
    setProductQuantity(state, payload) {
        state.items.map((product) => product.id == payload.id);
    }
}

export const actions = {
    addProduct(context, payload) {
        let productIndex = context.state.items.find((p => p.id == payload.id));
        if (!productIndex) {
            context.commit('addProduct', payload)
        } else {
            context.commit('incrementProductQuantity', { id: payload.id, quantity: payload.quantity });
        }
    }
}