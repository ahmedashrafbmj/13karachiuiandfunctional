const { createSlice } = require('@reduxjs/toolkit');

const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
            
        },

    },
});

export const { add } = orderSlice.actions;
export default orderSlice.reducer;
