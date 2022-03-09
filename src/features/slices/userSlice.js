import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: true
    },
    reducers: {
        login: (state) => {
            state.logged = !state.logged
        },
        logout: (state) => {
            state.logged = !state.logged
        }
    }
});



//createSlice already makes an action creator for each of the difference methods inside our reducers//
export const { login, logout } = userSlice.actions;
//exporting your reducer//
export default userSlice.reducer;