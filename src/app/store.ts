import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./features/setWallet";
import countReducer from "./features/setCount";

export default configureStore({
    reducer: {
        wallet: walletReducer,
        counter: countReducer,
    },
});
