import { createSlice } from "@reduxjs/toolkit"

let initialState = []

const card_slice = createSlice({
    name: "card",
    initialState,
    reducers: {
        // Additem(state, action) {
        //     state.push(action.payload)
        // },
        Additem(state, action) {
            const existingProduct = state.find(item => item.Id === action.payload.Id);
            if (existingProduct) {
                existingProduct.count += 1; // Increment count if product already exists
            } else {
                state.push({ ...action.payload, count: 1 }); // Add new product with count = 1
            }
        },
        removeitem(state, action) {
            return state.filter(item => item.Id != action.payload)
        },
        incrementCount(state, action) {
            const product = state.find(item => item.Id === action.payload);
            if (product) {
                product.count += 1; // Increment product count
            }
        },
        decrementCount(state, action) {
            const product = state.find(item => item.Id === action.payload);
            if (product && product.count > 1) {
                product.count -= 1; // Decrement count only if greater than 1
            }
        }
    }

})
export const { removeitem, Additem, incrementCount, decrementCount } = card_slice.actions;
export default card_slice.reducer;