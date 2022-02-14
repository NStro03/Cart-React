import { CLEAR_CART, DECREMENT_ITEM, INCREMENT_ITEM, REMOVE_ITEM } from "./constants";

const reducer = (state, action) => {
    if (action.type === INCREMENT_ITEM) {
        let newCost = state.totalCost;
        let itemCount = state.totalItems;
        let newCart = state.cart.map((item) => {
            if (item.id === action.payload) {
                itemCount += 1;
                newCost += item.price;
                return { ...item, amount: item.amount + 1 }
            }
            return item;
        })
        return { ...state, cart: newCart, totalItems: itemCount, totalCost: newCost }
    }

    if (action.type === DECREMENT_ITEM) {
        let itemCount = state.totalItems;
        let newCost = state.totalCost;
        let newCart = state.cart.map((item) => {
            if (item.id === action.payload && item.amount > 0) {
                itemCount -= 1;
                newCost -= item.price;
                return { ...item, amount: item.amount - 1 }
            }
            return item;
        }).filter((item) => item.amount !== 0);
        return { ...state, cart: newCart, totalItems: itemCount, totalCost: newCost }
    }

    if (action.type === REMOVE_ITEM) {
        let newCart = state.cart.filter((item) => item.id !== action.payload);
        let itemCount = newCart.reduce((count, item) => (count += item.amount), 0);
        let newCost = newCart.reduce((cost, item) => (cost += (item.amount * item.price)), 0);
        return { ...state, cart: newCart, totalItems: itemCount, totalCost: newCost }
    }

    if (action.type === CLEAR_CART) {
        return { ...state, cart: [], totalItems: 0, totalCost: 0 }
    }
}

export default reducer;