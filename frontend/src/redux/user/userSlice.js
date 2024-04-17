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
        }
    },
});

export const { userLoggedIn } = userSlice.actions;

export default userSlice.reducer;