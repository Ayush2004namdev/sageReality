import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./slices/misc";

const store = configureStore({
    reducer: {
        misc: miscReducer,
    },
})

export default store;