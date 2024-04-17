import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.currentUser = action.payload;
        },
        userUpdated: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});

export const { userLoggedIn, userUpdated } = userSlice.actions;

export default userSlice.reducer;