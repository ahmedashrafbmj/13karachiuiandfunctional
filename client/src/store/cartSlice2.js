const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },

        remove(state, action) {
          return state.filter((item) => item._id !== action.payload);
          
        },

        addqty(state, action) {
            return state.filter((item) => item._id !== action.payload);
            
          },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
