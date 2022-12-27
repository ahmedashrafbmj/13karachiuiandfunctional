import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderslice';
const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
  
    },
});

export default store;
