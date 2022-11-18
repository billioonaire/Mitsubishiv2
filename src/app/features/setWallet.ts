import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: '',
        value: false,
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
            state.value = true;
        }
    }
});

export const { setAddress } = walletSlice.actions;

export default walletSlice.reducer;
