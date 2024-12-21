import { configureStore } from "@reduxjs/toolkit"
import card_slice from "./card_slice"


const store = configureStore({
    reducer: {
        card: card_slice
    }
})

export default store;