import { createSlice } from '@reduxjs/toolkit';

export const countSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 1,
    },
    reducers: {
        incriment: (state) => {
            state.count += 1;
        },
        decriment: (state) => {
            state.count -= 1;
        }
    }
});

export const { incriment, decriment } = countSlice.actions;

export default countSlice.reducer;
