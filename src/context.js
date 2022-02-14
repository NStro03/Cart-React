import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
// const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const totalItems = cartItems.reduce((count, item) => (count += item.amount), 0);
  console.log("CountedItems: " + totalItems);
  const totalCost = cartItems.reduce((cost, item) => (cost += (item.amount * item.price)), 0);
  console.log("Calculated Price: " + totalCost);

  const stateDefault = {
    totalCost,
    totalItems,
    cart: cartItems
  }
  const [state, dispatch] = useReducer(reducer, stateDefault);

  const incrementQtyForId = (id) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: id });
  }

  const decrementQtyForId = (id) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: id });
  }

  const removeItemWithId = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        incrementQtyForId,
        decrementQtyForId,
        removeItemWithId,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
